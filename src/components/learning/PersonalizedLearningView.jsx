"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  Calendar,
  BookOpen,
  Sparkles,
  Target,
  CheckCircle,
  FolderGit2,
  Clock,
  Languages,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";
import { personalizeMaterial, optimizeExamPrep } from "../../lib/aiService";

export default function PersonalizedLearningView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("plan"); // 'plan' | 'material' | 'exam' | 'projects'
  const [learningPlan, setLearningPlan] = useState(storageService.getLearningPlan("uid_rahul"));
  const [skills, setSkills] = useState(storageService.getStudentSkills("uid_rahul"));

  // Personalizer State
  const [concept, setConcept] = useState("Tree Traversal & BST");
  const [level, setLevel] = useState("beginner");
  const [style, setStyle] = useState("example-based");
  const [language, setLanguage] = useState("English");
  const [personalizedContent, setPersonalizedContent] = useState("");
  const [loadingPersonalizer, setLoadingPersonalizer] = useState(false);

  // Exam Optimizer State
  const [examDate, setExamDate] = useState("2026-10-30");
  const [examPriorities, setExamPriorities] = useState(null);
  const [loadingExam, setLoadingExam] = useState(false);

  useEffect(() => {
    const unsub = storageService.subscribe(() => {
      setLearningPlan(storageService.getLearningPlan("uid_rahul"));
      setSkills(storageService.getStudentSkills("uid_rahul"));
    });
    return unsub;
  }, []);

  const handleToggleTask = (taskId) => {
    if (!learningPlan) return;
    const updatedTasks = learningPlan.tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: t.status === "done" ? "pending" : "done" };
      }
      return t;
    });
    storageService.saveLearningPlan("uid_rahul", {
      ...learningPlan,
      tasks: updatedTasks,
    });
  };

  const handleGenerateMaterial = async () => {
    setLoadingPersonalizer(true);
    try {
      const content = await personalizeMaterial({ concept, level, style, language });
      setPersonalizedContent(content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPersonalizer(false);
    }
  };

  const handleRunExamOptimizer = async () => {
    setLoadingExam(true);
    try {
      const res = await optimizeExamPrep({
        syllabus: ["Arrays", "Strings", "Complexity", "Recursion", "Trees", "Graphs"],
        examDate,
        studentSkills: skills,
      });
      setExamPriorities(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingExam(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
              Category 2 • Personalized Learning
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              Adaptive Learning & Material Suite
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Dynamic study plans, multi-language material personalizer, and exam priority optimizer.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "plan", label: "Study Plan (S07)", icon: Calendar },
            { id: "material", label: "Personalizer (S08)", icon: BookOpen },
            { id: "exam", label: "Exam Prep (S11)", icon: Target },
            { id: "projects", label: "Projects (S10)", icon: FolderGit2 },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-[2px] font-heading text-xs font-bold uppercase transition-all ${
                  isActive
                    ? "bg-[#1867E8] text-white border-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
                    : "bg-white text-[#0A2858] border-[#0A2858] hover:bg-[#F4F8FF]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: S07 ADAPTIVE STUDY PLAN */}
      {activeTab === "plan" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#DDE7F5] pb-3 mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                  Weekly Adaptive Learning Schedule
                </h3>
                <p className="font-body text-xs text-[#55729D]">
                  Goal: {learningPlan?.goal} • Budget: {learningPlan?.availableHoursPerWeek} Hours/Week
                </p>
              </div>
              <NeoBadge variant="accent">
                Last Recalculated: Today
              </NeoBadge>
            </div>

            {learningPlan?.changeReason && (
              <div className="p-3 bg-[#F0FDF4] border-[1.5px] border-[#16A34A] rounded-sm text-xs font-mono text-[#16A34A] mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Plan adapted: {learningPlan.changeReason}</span>
              </div>
            )}

            <div className="space-y-3">
              {learningPlan?.tasks?.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3.5 border-[2px] rounded-sm flex items-center justify-between cursor-pointer transition-all ${
                    task.status === "done"
                      ? "bg-[#F4F8FF] border-[#8298BA] opacity-75"
                      : "bg-white border-[#0A2858] shadow-[2px_2px_0px_#0A2858] hover:bg-[#EAF2FF]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-xs border-[2px] border-[#0A2858] flex items-center justify-center font-bold text-xs ${
                        task.status === "done" ? "bg-[#16A34A] text-white" : "bg-white"
                      }`}
                    >
                      {task.status === "done" && "✓"}
                    </div>
                    <div>
                      <div
                        className={`font-heading text-sm font-bold ${
                          task.status === "done" ? "line-through text-[#8298BA]" : "text-[#0A2858]"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="font-mono text-[11px] text-[#55729D]">
                        Topic: {task.skillId?.replace("skill_", "")} • Priority: {task.priority}
                      </div>
                    </div>
                  </div>

                  <div className="font-mono text-xs font-bold text-[#0A2858] bg-[#EAF2FF] border border-[#0A2858] px-2.5 py-1 rounded-sm">
                    {task.allocatedMinutes} Mins
                  </div>
                </div>
              ))}
            </div>
          </NeoCard>
        </div>
      )}

      {/* TAB 2: S08 LEARNING MATERIAL PERSONALIZER */}
      {activeTab === "material" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-4">
              AI Learning Material Personalizer
            </h3>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Concept:
                </label>
                <select
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold"
                >
                  <option value="Tree Traversal & BST">Tree Traversal & BST</option>
                  <option value="Recursion & Base Cases">Recursion & Base Cases</option>
                  <option value="Binary Search Complexity">Binary Search Complexity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Experience Level:
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold"
                >
                  <option value="beginner">Beginner (With Analogy)</option>
                  <option value="intermediate">Intermediate (System Model)</option>
                  <option value="advanced">Advanced (Memory & Optimization)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Style:
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold"
                >
                  <option value="example-based">Example-Based</option>
                  <option value="visual-style">Visual Call-Stack</option>
                  <option value="concise">Concise Cheat-Sheet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold"
                >
                  <option value="English">English</option>
                  <option value="Hinglish">Hindi / Hinglish</option>
                </select>
              </div>
            </div>

            <NeoButton
              variant="primary"
              size="md"
              onClick={handleGenerateMaterial}
              disabled={loadingPersonalizer}
              className="mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingPersonalizer ? "Generating Tailored Explanation..." : "Personalize Explanation"}</span>
            </NeoButton>

            {personalizedContent && (
              <div className="p-5 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm text-sm font-body text-[#0A2858] leading-relaxed whitespace-pre-wrap">
                {personalizedContent}
              </div>
            )}
          </NeoCard>
        </div>
      )}

      {/* TAB 3: S11 EXAM PREP OPTIMIZER */}
      {activeTab === "exam" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                  AI Exam Preparation Optimizer
                </h3>
                <p className="font-body text-xs text-[#55729D]">
                  Prioritize exam revision based on upcoming target deadline and demonstrated skill gaps.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="p-1.5 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-mono text-xs font-bold"
                />
                <NeoButton
                  variant="primary"
                  size="sm"
                  onClick={handleRunExamOptimizer}
                  disabled={loadingExam}
                >
                  {loadingExam ? "Analyzing..." : "Optimize Schedule"}
                </NeoButton>
              </div>
            </div>

            {examPriorities && (
              <div className="space-y-4">
                <div className="p-3 bg-[#EAF2FF] border-[1.5px] border-[#0A2858] rounded-sm text-xs font-mono font-bold text-[#0A2858]">
                  📌 Strategy: {examPriorities.recommended_action}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#FEF2F2] border-[2px] border-[#DC2626] rounded-sm">
                    <div className="font-heading font-bold text-sm text-[#DC2626] uppercase mb-2">
                      🔥 High Priority (Blockers)
                    </div>
                    <ul className="text-xs font-mono space-y-1.5 text-[#0A2858]">
                      {examPriorities.priorities?.HIGH?.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FFFBEB] border-[2px] border-[#D97706] rounded-sm">
                    <div className="font-heading font-bold text-sm text-[#D97706] uppercase mb-2">
                      ⚡ Medium Priority
                    </div>
                    <ul className="text-xs font-mono space-y-1.5 text-[#0A2858]">
                      {examPriorities.priorities?.MEDIUM?.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#F0FDF4] border-[2px] border-[#16A34A] rounded-sm">
                    <div className="font-heading font-bold text-sm text-[#16A34A] uppercase mb-2">
                      ✓ Low Priority (Mastered)
                    </div>
                    <ul className="text-xs font-mono space-y-1.5 text-[#0A2858]">
                      {examPriorities.priorities?.LOW?.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </NeoCard>
        </div>
      )}

      {/* TAB 4: S10 PROJECT-BASED LEARNING */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeoCard variant="default" shadow="md">
              <NeoBadge variant="critical" className="mb-2">Target Gap: Tree Traversal</NeoBadge>
              <h3 className="font-heading font-bold text-base text-[#0A2858] mb-2">
                Interactive BST Visualizer (React + Canvas)
              </h3>
              <p className="font-body text-xs text-[#55729D] leading-relaxed mb-4">
                Build a web application that visually traces In-Order, Pre-Order, and Post-Order recursion with step-by-step call-stack animation. Directly closes your demonstrated tree gaps.
              </p>
              <div className="text-[11px] font-mono text-[#1867E8] font-bold">
                Difficulty: Intermediate • Est: 6-8 Hours
              </div>
            </NeoCard>

            <NeoCard variant="default" shadow="md">
              <NeoBadge variant="accent" className="mb-2">Target Gap: Graphs & Queues</NeoBadge>
              <h3 className="font-heading font-bold text-base text-[#0A2858] mb-2">
                Pathfinding Grid Visualizer (BFS/DFS)
              </h3>
              <p className="font-body text-xs text-[#55729D] leading-relaxed mb-4">
                Implement Dijkstra and Breadth-First search to find the shortest path in a 2D matrix with obstacles. Demonstrates graph representation proficiency.
              </p>
              <div className="text-[11px] font-mono text-[#1867E8] font-bold">
                Difficulty: Intermediate • Est: 8 Hours
              </div>
            </NeoCard>
          </div>
        </div>
      )}
    </div>
  );
}
