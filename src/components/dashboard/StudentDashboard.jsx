"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  Zap,
  Clock,
  Target,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  CheckCircle,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoStat from "../common/NeoStat";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";
import { computeLearnerOverview, computeCareerReadiness } from "../../lib/masteryEngine";

export default function StudentDashboard({ onNavigate }) {
  const [currentUser, setCurrentUser] = useState(storageService.getCurrentUser());
  const [skills, setSkills] = useState(storageService.getStudentSkills(currentUser.uid));
  const [learningPlan, setLearningPlan] = useState(storageService.getLearningPlan(currentUser.uid));
  const [careerGoal, setCareerGoal] = useState(storageService.getCareerGoal(currentUser.uid));
  const [insights, setInsights] = useState(storageService.getInsights(currentUser.uid));

  useEffect(() => {
    const unsub = storageService.subscribe(() => {
      const u = storageService.getCurrentUser();
      setCurrentUser(u);
      setSkills(storageService.getStudentSkills(u.uid));
      setLearningPlan(storageService.getLearningPlan(u.uid));
      setCareerGoal(storageService.getCareerGoal(u.uid));
      setInsights(storageService.getInsights(u.uid));
    });
    return unsub;
  }, []);

  const overview = computeLearnerOverview(skills);

  // Check if Trees mastery has been improved via reassessment
  const treeSkill = skills.find((s) => s.skillId === "skill_trees");
  const isTreeImproved = treeSkill && treeSkill.mastery >= 70;

  // Find highest impact gap
  const highestImpactGap = overview.topGaps[0] || null;

  // Active recommendations from AI insights
  const primaryInsight = insights.find((i) => i.type === "gap") || insights[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* 1. Header Greeting & Golden Path Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2858] tracking-tight">
              Welcome back, {currentUser.name.split(" ")[0]}!
            </h1>
            <span className="hidden sm:inline-block">
              <NeoBadge variant="accent">Target: Placements 2026</NeoBadge>
            </span>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Goal: <strong className="text-[#0A2858]">{currentUser.careerGoal}</strong> • Continuous skill mapping active.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isTreeImproved ? (
            <div className="flex items-center gap-2 bg-[#DCFCE7] border-[2px] border-[#16A34A] px-3 py-2 rounded-sm text-xs font-mono font-bold text-[#16A34A]">
              <CheckCircle className="w-4 h-4" />
              <span>Tree Traversal Improved: 38% → {treeSkill.mastery}% (+34%)</span>
            </div>
          ) : (
            <NeoButton
              variant="primary"
              size="md"
              onClick={() => onNavigate("assess_improve")}
              className="w-full sm:w-auto"
            >
              <span>Take Diagnostic (10 Qs)</span>
              <ArrowRight className="w-4 h-4" />
            </NeoButton>
          )}
        </div>
      </div>

      {/* 2. Compact Learning KPI Metrics (How am I doing?) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <NeoStat
          label="Overall Mastery"
          value={`${overview.overallMastery}%`}
          trend={isTreeImproved ? "up" : "stable"}
          trendValue={isTreeImproved ? "+9%" : "steady"}
          subtext={`${overview.completedSkillsCount} of ${skills.length} skills verified`}
          icon={Brain}
        />
        <NeoStat
          label="Learning Streak"
          value={`${currentUser.streak || 12} Days`}
          trend="up"
          trendValue="+1"
          subtext="Consistent daily practice"
          icon={Zap}
        />
        <NeoStat
          label="Study Budget"
          value={`${currentUser.studyHoursWeek || 6}h / wk`}
          subtext="Adaptive plan balanced"
          icon={Clock}
        />
        <NeoStat
          label="Placement Match"
          value={`${careerGoal ? careerGoal.readinessScore : 58}%`}
          trend={isTreeImproved ? "up" : "stable"}
          trendValue={isTreeImproved ? "+14%" : "needs practice"}
          subtext={currentUser.careerGoal}
          icon={Target}
        />
      </div>

      {/* 3. The Core Decision Cockpit (Highest Impact Gap & Next Action) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Insights & Next Best Action */}
        <div className="lg:col-span-2 space-y-4">
          {/* Next Best Action Card (Prominent CTA) */}
          <NeoCard
            variant="default"
            shadow="md"
            className="border-[3px] border-[#0A2858] relative overflow-hidden bg-gradient-to-br from-white via-white to-[#EAF2FF]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-sm bg-[#1867E8] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-sm tracking-wider uppercase text-[#0A2858]">
                  AI Recommended Next Action
                </span>
              </div>
              <NeoBadge variant="accent">Priority: High</NeoBadge>
            </div>

            <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
              {isTreeImproved
                ? "Excellent progress! Now advance to Graph Algorithms (BFS/DFS)"
                : "Targeted Mastery Practice: Tree Traversal Fundamentals"}
            </h3>

            <p className="text-sm font-body text-[#55729D] mt-2 mb-4 leading-relaxed">
              {isTreeImproved
                ? "Your recent targeted retest verified Tree Traversal at 72%. Your next logical dependency is Graph Traversal algorithms to complete placement requirements."
                : primaryInsight
                ? primaryInsight.insight
                : "Rahul's main weakness is Tree Traversal and recursive subtree reasoning. Closing this gap directly unlocks higher placement readiness."}
            </p>

            {/* Evidence Callout */}
            <div className="bg-[#F4F8FF] border-[1.5px] border-[#0A2858] p-3 rounded-sm mb-4">
              <div className="text-[11px] font-mono font-bold uppercase text-[#55729D] mb-1">
                Grounded Evidence & Rationale:
              </div>
              <ul className="text-xs font-mono space-y-1 text-[#0A2858]">
                {isTreeImproved ? (
                  <>
                    <li className="flex items-center gap-1.5 text-[#16A34A]">
                      ✓ 5 of 5 questions answered correctly in targeted practice (+34%)
                    </li>
                    <li>• Call stack unwinding misconceptions resolved</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-1.5 text-[#DC2626]">
                      • 2 of 2 Tree questions incorrect in recent diagnostic
                    </li>
                    <li>• Confused pre-order root-first processing with in-order BST sorting</li>
                    <li>• Prerequisite Recursion mastery (41%) is below the 60% threshold</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {isTreeImproved ? (
                <NeoButton
                  variant="primary"
                  onClick={() => onNavigate("learning_intelligence")}
                >
                  <span>Explore Updated Skill Graph</span>
                  <ChevronRight className="w-4 h-4" />
                </NeoButton>
              ) : (
                <NeoButton
                  variant="primary"
                  onClick={() => onNavigate("assess_improve")}
                >
                  <span>Start Targeted Practice (5 Qs)</span>
                  <ArrowRight className="w-4 h-4" />
                </NeoButton>
              )}

              <NeoButton
                variant="secondary"
                onClick={() => onNavigate("ai_tutor")}
              >
                <span>Ask Socratic Tutor</span>
              </NeoButton>
            </div>
          </NeoCard>

          {/* Skill Breakdown Grid */}
          <NeoCard variant="default" shadow="sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#1867E8]" />
                <h3 className="font-heading font-bold text-base text-[#0A2858] uppercase tracking-wide">
                  Topic Mastery Snapshot
                </h3>
              </div>
              <button
                onClick={() => onNavigate("learning_intelligence")}
                className="text-xs font-mono font-bold text-[#1867E8] hover:underline"
              >
                View Skill Graph →
              </button>
            </div>

            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="font-bold text-[#0A2858]">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#55729D]">
                        Trend: {skill.trend === "up" ? "↑ Up" : skill.trend === "down" ? "↓ Down" : "→ Stable"}
                      </span>
                      <span className="font-bold px-1.5 py-0.5 rounded-xs bg-white border border-[#0A2858]">
                        {skill.mastery}%
                      </span>
                    </div>
                  </div>
                  <NeoProgressBar
                    value={skill.mastery}
                    color="dynamic"
                    showPercentage={false}
                    height="h-3"
                  />
                </div>
              ))}
            </div>
          </NeoCard>
        </div>

        {/* Right Col: Adaptive Plan & Career Linkage */}
        <div className="space-y-4">
          {/* Adaptive Study Plan (7-Day Overview) */}
          <NeoCard variant="default" shadow="sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1867E8]" />
                <h4 className="font-heading font-bold text-sm uppercase tracking-wide text-[#0A2858]">
                  Adaptive Study Plan
                </h4>
              </div>
              <NeoBadge variant="default">7-Day</NeoBadge>
            </div>

            {isTreeImproved ? (
              <div className="p-2.5 bg-[#F0FDF4] border-[1.5px] border-[#16A34A] rounded-sm text-xs font-mono text-[#16A34A] mb-3">
                ✓ Plan recalculated: Tree time reduced; Graph algorithms queued.
              </div>
            ) : (
              <div className="p-2.5 bg-[#FFFBEB] border-[1.5px] border-[#D97706] rounded-sm text-xs font-mono text-[#92400E] mb-3">
                ⚡ Plan adapted: Tree allocation increased 20m → 45m due to gap evidence.
              </div>
            )}

            <div className="space-y-2">
              {learningPlan?.tasks?.map((task) => (
                <div
                  key={task.id}
                  className={`p-2.5 border-[1.5px] rounded-sm flex items-center justify-between text-xs font-mono ${
                    task.status === "done"
                      ? "bg-[#F4F8FF] border-[#8298BA] text-[#8298BA] line-through"
                      : "bg-white border-[#0A2858] text-[#0A2858]"
                  }`}
                >
                  <span className="font-semibold">{task.title}</span>
                  <span className="font-bold">{task.allocatedMinutes}m</span>
                </div>
              ))}
            </div>

            <NeoButton
              variant="secondary"
              size="sm"
              onClick={() => onNavigate("personalized_learning")}
              className="w-full mt-3 text-xs"
            >
              Open Full Study Plan
            </NeoButton>
          </NeoCard>

          {/* Career Readiness Linkage */}
          <NeoCard variant="default" shadow="sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#1867E8]" />
                <h4 className="font-heading font-bold text-sm uppercase tracking-wide text-[#0A2858]">
                  Target Role Readiness
                </h4>
              </div>
              <span className="font-mono text-xs font-bold text-[#1867E8]">
                {careerGoal?.targetRole}
              </span>
            </div>

            <div className="mb-3">
              <NeoProgressBar
                value={careerGoal ? careerGoal.readinessScore : 58}
                label="Job Readiness Index"
                color="dynamic"
                height="h-4"
              />
            </div>

            <p className="text-xs font-body text-[#55729D] leading-relaxed mb-3">
              {isTreeImproved
                ? "Your Trees mastery now satisfies the minimum threshold for Backend Developer requirements!"
                : "Trees & BST Algorithms is currently flagged as a critical missing competency."}
            </p>

            <NeoButton
              variant="secondary"
              size="sm"
              onClick={() => onNavigate("career_skills")}
              className="w-full text-xs"
            >
              View Skill-Career Map
            </NeoButton>
          </NeoCard>
        </div>
      </div>
    </div>
  );
}
