// Deterministic Scoring Engine for EduRaahi
// Invariant: AI never calculates scores or checks correctness.

/**
 * Score an assessment attempt deterministically against the canonical question keys.
 * @param {Object} assessment The assessment object containing questions
 * @param {Array} userAnswers Array of { questionId, selectedOptionId, timeTakenSec }
 * @returns {Object} { score, totalQuestions, percentage, answersBreakdown, perSkillBreakdown, timeTakenSec }
 */
export function scoreAssessmentAttempt(assessment, userAnswers) {
  if (!assessment || !assessment.questions) {
    throw new Error("Invalid assessment definition");
  }

  const answersMap = new Map();
  userAnswers.forEach((ans) => {
    answersMap.set(ans.questionId, ans);
  });

  let correctCount = 0;
  const answersBreakdown = [];
  const skillStats = {}; // { skillId: { total: 0, correct: 0 } }
  let totalTime = 0;

  assessment.questions.forEach((question) => {
    const userAnswer = answersMap.get(question.id);
    const selectedOptionId = userAnswer ? userAnswer.selectedOptionId : null;
    const isCorrect = selectedOptionId === question.correctOptionId;
    const timeTaken = (userAnswer && userAnswer.timeTakenSec) || 0;
    totalTime += timeTaken;

    if (isCorrect) {
      correctCount += 1;
    }

    // Misconception identification based on the deterministic question misconception map
    let detectedMisconception = null;
    if (!isCorrect && selectedOptionId && question.misconceptionMap) {
      detectedMisconception = question.misconceptionMap[selectedOptionId] || null;
    }

    // Accumulate per-skill breakdown
    const sId = question.skillId;
    if (sId) {
      if (!skillStats[sId]) {
        skillStats[sId] = { total: 0, correct: 0 };
      }
      skillStats[sId].total += 1;
      if (isCorrect) {
        skillStats[sId].correct += 1;
      }
    }

    answersBreakdown.push({
      questionId: question.id,
      questionText: question.text,
      skillId: question.skillId,
      selectedOptionId,
      correctOptionId: question.correctOptionId,
      isCorrect,
      detectedMisconception,
      timeTakenSec: timeTaken,
    });
  });

  const totalQuestions = assessment.questions.length;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Calculate perSkillBreakdown (0 - 100)
  const perSkillBreakdown = {};
  Object.keys(skillStats).forEach((sId) => {
    const { total, correct } = skillStats[sId];
    perSkillBreakdown[sId] = total > 0 ? Math.round((correct / total) * 100) : 0;
  });

  return {
    score: correctCount,
    totalQuestions,
    percentage,
    answersBreakdown,
    perSkillBreakdown,
    totalTimeTakenSec: totalTime,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Generate simulated answers for Rahul's initial 58% diagnostic attempt
 */
export function getRahulDiagnosticAnswers() {
  return [
    { questionId: "q1", selectedOptionId: "opt_b", timeTakenSec: 42 }, // correct (Arrays)
    { questionId: "q2", selectedOptionId: "opt_b", timeTakenSec: 55 }, // correct (Arrays)
    { questionId: "q3", selectedOptionId: "opt_b", timeTakenSec: 61 }, // correct (Strings)
    { questionId: "q4", selectedOptionId: "opt_b", timeTakenSec: 48 }, // correct (Strings)
    { questionId: "q5", selectedOptionId: "opt_b", timeTakenSec: 35 }, // correct (Complexity)
    { questionId: "q6", selectedOptionId: "opt_b", timeTakenSec: 72 }, // incorrect (Complexity - picked O(log N) assuming balanced tree)
    { questionId: "q7", selectedOptionId: "opt_a", timeTakenSec: 85 }, // incorrect (Recursion - picked defaults to 0)
    { questionId: "q8", selectedOptionId: "opt_b", timeTakenSec: 64 }, // correct (Recursion)
    { questionId: "q9", selectedOptionId: "opt_a", timeTakenSec: 90 }, // incorrect (Trees - picked Pre-Order instead of In-Order)
    { questionId: "q10", selectedOptionId: "opt_a", timeTakenSec: 80 }, // incorrect (Trees - summed depths)
  ];
}

/**
 * Generate simulated answers for Rahul's successful Tree Reassessment (all 5 correct -> 100% on practice)
 */
export function getRahulRetestAnswers() {
  return [
    { questionId: "re_q1", selectedOptionId: "opt_b", timeTakenSec: 32 }, // In-order 5, 10, 15 (Correct)
    { questionId: "re_q2", selectedOptionId: "opt_b", timeTakenSec: 28 }, // Base case null check (Correct)
    { questionId: "re_q3", selectedOptionId: "opt_b", timeTakenSec: 41 }, // Post-order deletion (Correct)
    { questionId: "re_q4", selectedOptionId: "opt_b", timeTakenSec: 36 }, // O(log N) search (Correct)
    { questionId: "re_q5", selectedOptionId: "opt_a", timeTakenSec: 45 }, // Synthesized solution return (Correct)
  ];
}
