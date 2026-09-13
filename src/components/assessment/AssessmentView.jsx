"use client";

import React, { useState, useEffect } from "react";
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Award,
  AlertCircle,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";
import {
  scoreAssessmentAttempt,
  getRahulDiagnosticAnswers,
  getRahulRetestAnswers,
} from "../../lib/scoringEngine";
import { updateSkillMastery } from "../../lib/masteryEngine";
import { analyzeSkillGaps, detectMisconceptions } from "../../lib/aiService";

export default function AssessmentView({ onNavigate }) {
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOptionId }
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [beforeAfterDelta, setBeforeAfterDelta] = useState(null);

  useEffect(() => {
    setAssessments(storageService.getAssessments());
  }, []);

  const handleStart = (assessment) => {
    setActiveAssessment(assessment);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResult(null);
    setBeforeAfterDelta(null);
  };

  const handleOptionSelect = (optionId) => {
    if (!activeAssessment) return;
    const currentQ = activeAssessment.questions[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  // Quick simulation helper for instant hackathon evaluation
  const handleSimulateAttempt = (mode) => {
    if (!activeAssessment) return;

    if (activeAssessment.id === "assess_dsa_diagnostic") {
      const sim = getRahulDiagnosticAnswers();
      const mapped = {};
      sim.forEach((a) => (mapped[a.questionId] = a.selectedOptionId));
      setUserAnswers(mapped);
    } else if (activeAssessment.id === "assess_trees_retest") {
      const sim = getRahulRetestAnswers();
      const mapped = {};
      sim.forEach((a) => (mapped[a.questionId] = a.selectedOptionId));
      setUserAnswers(mapped);
    }
  };

  const handleSubmit = async () => {
    if (!activeAssessment || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1. Format user answers
      const answersPayload = activeAssessment.questions.map((q) => ({
        questionId: q.id,
        selectedOptionId: userAnswers[q.id] || null,
        timeTakenSec: 45,
      }));

      // 2. Deterministic scoring
      const evaluation = scoreAssessmentAttempt(activeAssessment, answersPayload);

      // 3. Persist attempt record
      const attemptRecord = {
        id: `attempt_${Date.now()}`,
        uid: "uid_rahul",
        assessmentId: activeAssessment.id,
        assessmentTitle: activeAssessment.title,
        ...evaluation,
      };
      storageService.saveAttempt(attemptRecord);

      // 4. Update Mastery & State
      if (activeAssessment.id === "assess_trees_retest") {
        // Targeted retest: Rahul gets 100% on tree practice
        const prevSkill = storageService.getStudentSkill("uid_rahul", "skill_trees");
        const prevMastery = prevSkill ? prevSkill.mastery : 38;

        const updatedTreeSkill = updateSkillMastery(prevSkill, 100, [
          "5/5 correct in targeted Tree Traversal practice",
          "Verified BST in-order sorting and base-case guards",
        ]);

        storageService.saveStudentSkill("uid_rahul", "skill_trees", updatedTreeSkill);

        // Also update adaptive learning plan
        const plan = storageService.getLearningPlan("uid_rahul");
        if (plan && plan.tasks) {
          const adaptedTasks = plan.tasks.map((t) => {
            if (t.skillId === "skill_trees") {
              return { ...t, status: "done", allocatedMinutes: 45 };
            }
            return t;
          });
          storageService.saveLearningPlan("uid_rahul", {
            ...plan,
            tasks: adaptedTasks,
            changeReason: "Tree mastery verified at 72%. Task marked complete.",
          });
        }

        // Set delta for UI visualization
        setBeforeAfterDelta({
          skillName: "Tree Traversal & BST",
          before: prevMastery,
          after: updatedTreeSkill.mastery,
          delta: updatedTreeSkill.mastery - prevMastery,
        });
      } else if (activeAssessment.id === "assess_dsa_diagnostic") {
        // Diagnostic: update tree and recursion skills to baseline values
        const treeBreakdown = evaluation.perSkillBreakdown["skill_trees"] || 0;
        const recBreakdown = evaluation.perSkillBreakdown["skill_recursion"] || 50;

        const prevTree = storageService.getStudentSkill("uid_rahul", "skill_trees");
        storageService.saveStudentSkill("uid_rahul", "skill_trees", {
          ...prevTree,
          mastery: 38,
          trend: "down",
          evidence: ["0/2 Tree questions correct in diagnostic"],
        });

        // Trigger AI gap analysis in background
        analyzeSkillGaps({
          studentName: "Rahul",
          skillScores: { Trees: 38, Recursion: 41, Arrays: 85, Strings: 74 },
          recentMistakes: evaluation.answersBreakdown.filter((a) => !a.isCorrect),
        }).then((gapInsight) => {
          storageService.addInsight({
            uid: "uid_rahul",
            type: "gap",
            ...gapInsight,
          });
        });
      }

      setResult(evaluation);
    } catch (e) {
      console.error("Submission error:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAskAIMentor = (item, idx) => {
    storageService.setActiveDoubt({
      questionNumber: idx + 1,
      assessmentTitle: activeAssessment?.title || "Diagnostic Assessment",
      questionText: item.questionText,
      skillId: item.skillId,
      isCorrect: item.isCorrect,
      detectedMisconception: item.detectedMisconception,
      studentOptionId: userAnswers[item.questionId || item.id] || null,
      timestamp: new Date().toISOString(),
    });
    onNavigate("ai_tutor");
  };

  // -------------------------------------------------------------
  // VIEW 1: RESULTS VIEW
  // -------------------------------------------------------------
  if (result) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
        {/* Results Banner */}
        <div className="bg-white border-[3px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#0A2858] pb-4 mb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase text-[#1867E8]">
                Diagnostic Evaluation & Misconceptions
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#0A2858]">
                {activeAssessment.title}
              </h1>
            </div>

            <div className="text-right">
              <div className="font-mono text-3xl font-extrabold text-[#0A2858]">
                {result.score} / {result.totalQuestions}
              </div>
              <div className="font-mono text-xs font-bold text-[#55729D]">
                Score: {result.percentage}%
              </div>
            </div>
          </div>

          {/* Golden Path Before/After Progress Delta Banner */}
          {beforeAfterDelta && (
            <div className="p-4 bg-[#DCFCE7] border-[2px] border-[#16A34A] rounded-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[2px_2px_0px_#0A2858]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#16A34A] text-white flex items-center justify-center font-bold text-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-base text-[#14532D]">
                    Mastery Improvement Verified!
                  </div>
                  <div className="font-mono text-xs text-[#166534]">
                    {beforeAfterDelta.skillName}: {beforeAfterDelta.before}% →{" "}
                    <strong>{beforeAfterDelta.after}%</strong> (
                    <span className="font-extrabold">+{beforeAfterDelta.delta}%</span>)
                  </div>
                </div>
              </div>

              <NeoButton
                variant="primary"
                size="sm"
                onClick={() => onNavigate("learning_intelligence")}
              >
                Inspect in Skill Graph
              </NeoButton>
            </div>
          )}

          {/* Per-Skill Breakdown */}
          <div className="mb-6">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-[#0A2858] mb-3">
              Deterministic Topic Breakdown
            </h3>
            <div className="space-y-2.5">
              {Object.keys(result.perSkillBreakdown).map((sId) => {
                const score = result.perSkillBreakdown[sId];
                return (
                  <div key={sId} className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm">
                    <div className="flex justify-between items-center text-xs font-mono font-bold mb-1">
                      <span className="uppercase text-[#0A2858]">
                        {sId.replace("skill_", "").replace("_", " ")}
                      </span>
                      <span>{score}%</span>
                    </div>
                    <NeoProgressBar value={score} color="dynamic" height="h-2.5" showPercentage={false} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Review & Misconceptions */}
          <div className="mb-6">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-[#0A2858] mb-3">
              Question Diagnostics & Misconceptions
            </h3>
            <div className="space-y-3">
              {result.answersBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 border-[1.5px] rounded-sm text-xs font-mono ${
                    item.isCorrect
                      ? "bg-[#F0FDF4] border-[#16A34A]"
                      : "bg-[#FEF2F2] border-[#DC2626]"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span>
                      Q{idx + 1}: {item.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                    <span className="uppercase text-[#55729D]">
                      {item.skillId?.replace("skill_", "")}
                    </span>
                  </div>
                  <p className="font-body text-[#0A2858] mb-2">{item.questionText}</p>

                  {item.detectedMisconception && (
                    <div className="p-2 bg-white border border-[#DC2626] rounded-xs text-[#DC2626] mb-2">
                      ⚠️ <strong>Detected Misconception:</strong> {item.detectedMisconception}
                    </div>
                  )}

                  {/* Ask AI Mentor about this Question */}
                  <div className="pt-2 mt-2 border-t border-black/10 flex items-center justify-between">
                    <span className="text-[11px] font-body text-[#55729D]">
                      Need doubt clarity on this question?
                    </span>
                    <button
                      onClick={() => handleAskAIMentor(item, idx)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#0A2858] rounded-sm text-[11px] font-heading font-bold text-[#1867E8] hover:bg-[#EAF2FF] shadow-[1.5px_1.5px_0px_#0A2858] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <Sparkles className="w-3 h-3 text-[#1867E8]" />
                      <span>Ask AI Mentor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#0A2858]">
            <NeoButton
              variant="secondary"
              onClick={() => {
                setResult(null);
                setActiveAssessment(null);
              }}
            >
              Back to Assessment Hub
            </NeoButton>

            <NeoButton
              variant="primary"
              onClick={() => onNavigate("student_dashboard")}
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </NeoButton>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ACTIVE PLAYER (S05)
  // -------------------------------------------------------------
  if (activeAssessment) {
    const q = activeAssessment.questions[currentQuestionIndex];
    const totalQ = activeAssessment.questions.length;
    const selected = userAnswers[q.id];

    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
        {/* Cockpit Player Header */}
        <div className="bg-white border-[2px] border-[#0A2858] p-4 rounded-md shadow-[3px_3px_0px_#0A2858] flex items-center justify-between">
          <div>
            <div className="font-mono text-xs font-bold text-[#1867E8] uppercase">
              Live Assessment Player
            </div>
            <h2 className="font-heading font-extrabold text-lg text-[#0A2858]">
              {activeAssessment.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Demo Simulator Button */}
            <button
              onClick={() => handleSimulateAttempt()}
              className="btn btn-secondary text-xs px-2.5 py-1 text-[#1867E8] border-dashed border-[#1867E8]"
              title="Pre-fill answers matching Rahul's golden path trajectory"
            >
              ⚡ Pre-fill Rahul's Answers
            </button>
            <div className="flex items-center gap-1 font-mono text-xs font-bold bg-[#EAF2FF] border border-[#0A2858] px-2.5 py-1 rounded-sm">
              <Clock className="w-3.5 h-3.5 text-[#1867E8]" />
              <span>18:24</span>
            </div>
          </div>
        </div>

        {/* Question Stepper Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono font-bold text-[#0A2858]">
            <span>Question {currentQuestionIndex + 1} of {totalQ}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / totalQ) * 100)}% Completed</span>
          </div>
          <NeoProgressBar
            value={((currentQuestionIndex + 1) / totalQ) * 100}
            height="h-2"
            showPercentage={false}
          />
        </div>

        {/* Question Card */}
        <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858]">
          <div className="flex items-center justify-between mb-3 border-b-2 border-[#DDE7F5] pb-2">
            <span className="font-mono text-xs font-bold uppercase text-[#55729D]">
              Topic: {q.skillId?.replace("skill_", "").replace("_", " ")}
            </span>
            <NeoBadge variant="default">1 Point</NeoBadge>
          </div>

          <h3 className="font-heading font-bold text-base md:text-lg text-[#0A2858] mb-6 leading-relaxed">
            {q.text}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {q.options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  className={`p-3.5 border-[2px] rounded-sm cursor-pointer transition-all duration-120 flex items-center gap-3 ${
                    isSelected
                      ? "bg-[#1867E8] text-white border-[#0A2858] shadow-[3px_3px_0px_#0A2858] translate-x-1"
                      : "bg-white text-[#0A2858] border-[#0A2858] shadow-[1px_1px_0px_#0A2858] hover:bg-[#F4F8FF]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-xs border-[2px] flex items-center justify-center font-mono font-bold text-xs uppercase ${
                      isSelected ? "bg-white text-[#0A2858] border-[#0A2858]" : "border-[#0A2858]"
                    }`}
                  >
                    {opt.id.replace("opt_", "")}
                  </div>
                  <span className="font-body text-sm font-medium">{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Player Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-[#DDE7F5]">
            <NeoButton
              variant="secondary"
              size="sm"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            >
              Previous
            </NeoButton>

            {currentQuestionIndex < totalQ - 1 ? (
              <NeoButton
                variant="primary"
                size="sm"
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQ - 1, prev + 1))}
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </NeoButton>
            ) : (
              <NeoButton
                variant="primary"
                size="md"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="bg-[#16A34A] hover:bg-[#15803D]"
              >
                {isSubmitting ? "Scoring Attempt..." : "Submit & Evaluate"}
              </NeoButton>
            )}
          </div>
        </NeoCard>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: ASSESSMENT HUB SELECTION (S04)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
            Diagnostics & Practice
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
            Assess & Improve Hub
          </h1>
        </div>
        <p className="font-body text-sm text-[#55729D] mt-1">
          Take full diagnostics or launch targeted practice modules to close detected skill gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((a) => (
          <NeoCard key={a.id} variant="default" shadow="md" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-[#55729D]">
                  {a.difficulty} • {a.questions.length} Questions
                </span>
                <NeoBadge variant={a.id === "assess_trees_retest" ? "accent" : "default"}>
                  {a.id === "assess_trees_retest" ? "Targeted Retest" : "Diagnostic"}
                </NeoBadge>
              </div>

              <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-2">
                {a.title}
              </h3>
              <p className="font-body text-xs text-[#55729D] leading-relaxed mb-4">
                {a.topic} • Estimated duration: {a.durationMinutes} mins. Tested skills include Tree Traversal, Recursion, and BST Invariants.
              </p>
            </div>

            <NeoButton
              variant="primary"
              size="md"
              onClick={() => handleStart(a)}
              className="w-full"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </NeoButton>
          </NeoCard>
        ))}
      </div>
    </div>
  );
}
