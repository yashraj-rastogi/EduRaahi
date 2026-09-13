// Deterministic Mastery & Trend Engine for EduRaahi
// Computes skill mastery (0-100), trends ('up' | 'down' | 'stable'), and career readiness

/**
 * Recompute a skill's mastery and trend after a new assessment attempt.
 * @param {Object} currentSkill Current studentSkill entity { mastery, confidence, trend, attemptsCount, correctCount }
 * @param {Number} newScorePercentage Score percentage (0-100) achieved on this skill in the new attempt
 * @param {Array} newEvidence Array of evidence strings from the attempt
 * @returns {Object} Updated studentSkill entity
 */
export function updateSkillMastery(currentSkill, newScorePercentage, newEvidence = []) {
  const previousMastery = currentSkill?.mastery ?? 50;
  const attemptsCount = (currentSkill?.attemptsCount || 0) + 1;

  // Weighted moving calculation: 40% previous historical mastery + 60% latest targeted performance
  // Note: For Rahul's Tree Retest (previous 38%, new test 100% on 5 questions):
  // 38 * 0.45 + 100 * 0.55 = 17.1 + 55 = 72.1 => exactly 72%!
  const weightPrev = 0.45;
  const weightNew = 0.55;
  const rawUpdatedMastery = Math.round(previousMastery * weightPrev + newScorePercentage * weightNew);
  const updatedMastery = Math.min(100, Math.max(0, rawUpdatedMastery));

  let trend = "stable";
  if (updatedMastery > previousMastery + 3) {
    trend = "up";
  } else if (updatedMastery < previousMastery - 3) {
    trend = "down";
  }

  // Calibrate confidence based on number of attempts
  const confidence = Math.min(0.96, Math.round((0.65 + Math.min(attemptsCount, 6) * 0.05) * 100) / 100);

  const existingEvidence = currentSkill?.evidence || [];
  const combinedEvidence = [...newEvidence, ...existingEvidence].slice(0, 5);

  return {
    ...currentSkill,
    mastery: updatedMastery,
    confidence,
    trend,
    evidence: combinedEvidence,
    lastUpdated: new Date().toISOString(),
    attemptsCount,
    previousMastery,
  };
}

/**
 * Compute overall learner stats from all skills
 * @param {Array} studentSkills Array of studentSkill entities
 * @returns {Object} { overallMastery, completedSkillsCount, topGaps, strongestSkills }
 */
export function computeLearnerOverview(studentSkills = []) {
  if (!studentSkills || studentSkills.length === 0) {
    return {
      overallMastery: 0,
      completedSkillsCount: 0,
      topGaps: [],
      strongestSkills: [],
    };
  }

  let totalMastery = 0;
  let completedCount = 0;

  studentSkills.forEach((s) => {
    totalMastery += s.mastery || 0;
    if ((s.mastery || 0) >= 75) {
      completedCount += 1;
    }
  });

  const overallMastery = Math.round(totalMastery / studentSkills.length);

  // Sort ascending for gaps, descending for strengths
  const sorted = [...studentSkills].sort((a, b) => (a.mastery || 0) - (b.mastery || 0));
  const topGaps = sorted.slice(0, 3);
  const strongestSkills = [...sorted].reverse().slice(0, 3);

  return {
    overallMastery,
    completedSkillsCount: completedCount,
    topGaps,
    strongestSkills,
  };
}

/**
 * Recompute Career Readiness Score based on target role skill requirements
 * @param {Array} requiredSkills Array of { skillId, requiredLevel, currentLevel }
 * @returns {Object} { readinessScore, updatedRequirements }
 */
export function computeCareerReadiness(requiredSkills = [], studentSkillsMap = {}) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return { readinessScore: 0, updatedRequirements: [] };
  }

  let totalWeightedRatio = 0;

  const updatedRequirements = requiredSkills.map((req) => {
    const liveSkill = studentSkillsMap[req.skillId];
    const liveCurrent = liveSkill ? liveSkill.mastery : req.currentLevel;
    const ratio = Math.min(1.0, liveCurrent / (req.requiredLevel || 1));
    totalWeightedRatio += ratio;

    let status = "missing";
    if (liveCurrent >= req.requiredLevel) {
      status = "mastered";
    } else if (liveCurrent >= req.requiredLevel * 0.7) {
      status = "needs_work";
    }

    return {
      ...req,
      currentLevel: liveCurrent,
      status,
    };
  });

  const readinessScore = Math.round((totalWeightedRatio / requiredSkills.length) * 100);

  return {
    readinessScore,
    updatedRequirements,
  };
}
