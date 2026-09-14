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
  Plus,
  Trash2,
  Edit3,
  Sliders,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Layers,
  Check,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";
import { personalizeMaterial, optimizeExamPrep } from "../../lib/aiService";

export default function PersonalizedLearningView({ onNavigate }) {
  // 'overview' | 'plan' | 'material' | 'exam' | 'projects'
  const [activeTab, setActiveTab] = useState("overview");
  const [learningPlan, setLearningPlan] = useState(storageService.getLearningPlan("uid_rahul"));
  const [skills, setSkills] = useState(storageService.getStudentSkills("uid_rahul"));

  // Manual Study Plan Editing State
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSkill, setNewTaskSkill] = useState("skill_trees");
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);
  const [newTaskPriority, setNewTaskPriority] = useState("high");

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
    if (!learningPlan || isEditingPlan) return;
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

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    storageService.addTaskToLearningPlan("uid_rahul", {
      title: newTaskTitle.trim(),
      skillId: newTaskSkill,
      allocatedMinutes: Number(newTaskMinutes) || 30,
      priority: newTaskPriority,
    });
    setNewTaskTitle("");
    setNewTaskMinutes(30);
  };

  const handleDeleteTask = (taskId, e) => {
    e.stopPropagation();
    storageService.deleteLearningPlanTask("uid_rahul", taskId);
  };

  const handleAdjustMinutes = (taskId, currentMins, delta, e) => {
    e.stopPropagation();
    const newMins = Math.max(10, currentMins + delta);
    storageService.updateLearningPlanTask("uid_rahul", taskId, { allocatedMinutes: newMins });
  };

  const handleAdjustBudget = (hours) => {
    if (!learningPlan) return;
    storageService.saveLearningPlan("uid_rahul", {
      ...learningPlan,
      availableHoursPerWeek: Number(hours),
    });
  };

  const handleResetPlan = () => {
    storageService.resetLearningPlanToDefault("uid_rahul");
    setIsEditingPlan(false);
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

  const featuresList = [
    {
      id: "plan",
      title: "Adaptive Study Plan & Schedule",
      subtitle: "Dynamic Weekly Schedule with Manual Customizer",
      icon: Calendar,
      badge: "Interactive Editor",
      badgeVariant: "accent",
      description:
        "AI-scheduled learning tasks tailored to close verified skill gaps, with full manual schedule editing, custom tasks, and weekly study hour budget controls.",
      meta: `${learningPlan?.tasks?.length || 4} Tasks • ${learningPlan?.availableHoursPerWeek || 6} hrs/week budget`,
      highlights: ["Add & edit custom tasks", "Adjust duration per topic", "Synchronized with Skill Graph"],
    },
    {
      id: "material",
      title: "Learning Material Personalizer",
      subtitle: "Multi-Modal & Multilingual Adaptation",
      icon: BookOpen,
      badge: "Multi-Modal AI",
      badgeVariant: "default",
      description:
        "Adapts complex algorithmic concepts into your preferred cognitive style: Real-World Analogies, Visual Diagrams, or Formal Proofs across English, Hindi, and Hinglish.",
      meta: "3 Cognitive Styles • English, Hindi, Hinglish",
      highlights: ["Beginner to Advanced levels", "Real-World Analogy engine", "Mathematical rigor option"],
    },
    {
      id: "exam",
      title: "Exam Preparation Optimizer",
      subtitle: "High-Yield Countdown & Confidence Matrix",
      icon: Target,
      badge: "High-Yield Focus",
      badgeVariant: "critical",
      description:
        "Calculates countdown study schedules, topic priority matrices, and high-yield focus areas for upcoming midterms and technical placement tests.",
      meta: "Target Date: 30 Oct • 6 Core Topics",
      highlights: ["Urgent vs Mastered topic ranking", "Days-remaining countdown", "Targeted review strategy"],
    },
    {
      id: "projects",
      title: "Employability Project Lab",
      subtitle: "Gap-Targeted Engineering Capstones",
      icon: FolderGit2,
      badge: "Hands-On Coding",
      badgeVariant: "success",
      description:
        "Hands-on capstone engineering assignments designed to close detected skill gaps and build demonstrable portfolio evidence for recruiters.",
      meta: "2 Gap-Targeted Projects • Rubric Evaluated",
      highlights: ["Directly closes BST & Graph gaps", "Call-stack visualizers", "Industry-grade specifications"],
    },
  ];

  const currentFeature = featuresList.find((f) => f.id === activeTab);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* ================= VIEW 1: FULL SCREEN FEATURE CARDS GRID ================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Executive Category Header (Clean, NO tab buttons inside) */}
          <div className="bg-white border-[3px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2.5 py-1 border border-[#0A2858] rounded-xs">
                  Category • Personalized Learning
                </span>
                <span className="font-mono text-xs text-[#16A34A] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded-xs border border-[#16A34A]">
                  ● 4 Features Available
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2858] tracking-tight">
                Personalized Learning Suite
              </h1>
              <p className="font-body text-sm text-[#55729D] mt-1">
                Select any learning feature below to open it in full-width workspace mode:
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <div className="font-mono text-xs text-[#55729D]">Learner Profile</div>
              <div className="font-heading font-bold text-sm text-[#0A2858]">Rahul Sharma (B.Tech CS)</div>
            </div>
          </div>

          {/* Complete Screen Feature Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuresList.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveTab(feat.id)}
                  className="group cursor-pointer bg-white border-[3px] border-[#0A2858] rounded-md p-6 md:p-8 shadow-[5px_5px_0px_#0A2858] hover:shadow-[8px_8px_0px_#1867E8] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-sm bg-[#EAF2FF] border-[2px] border-[#0A2858] flex items-center justify-center text-[#1867E8] group-hover:bg-[#1867E8] group-hover:text-white transition-colors shadow-[2px_2px_0px_#0A2858]">
                        <Icon className="w-7 h-7" />
                      </div>
                      <NeoBadge variant={feat.badgeVariant}>{feat.badge}</NeoBadge>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#0A2858] group-hover:text-[#1867E8] transition-colors tracking-tight">
                        {feat.title}
                      </h2>
                      <div className="font-mono text-xs font-bold text-[#1867E8] mt-0.5">
                        {feat.subtitle}
                      </div>
                      <p className="font-body text-sm text-[#55729D] leading-relaxed mt-2.5">
                        {feat.description}
                      </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-1.5 pt-2">
                      {feat.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#0A2858]">
                          <span className="text-[#16A34A] font-bold">✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Metadata & Launch Button */}
                  <div className="pt-5 mt-5 border-t-2 border-[#DDE7F5] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#55729D]">
                      {feat.meta}
                    </span>
                    <button className="btn btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5 group-hover:bg-[#0A2858] group-hover:text-white transition-colors shadow-[2px_2px_0px_#0A2858]">
                      <span>Launch Feature</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= VIEW 2: FULL-WIDTH OPEN FEATURE WORKSPACE ================= */}
      {activeTab !== "overview" && (
        <div className="w-full space-y-6">
          {/* Top Full-Width Return Bar */}
          <div className="bg-white border-[3px] border-[#0A2858] p-4 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("overview")}
                className="btn btn-primary text-xs px-4 py-2 flex items-center gap-2 shadow-[2px_2px_0px_#0A2858]"
                title="Return to Feature Cards Grid"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Features</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
                <span className="text-[#8298BA]">Personalized Learning</span>
                <span className="text-[#8298BA]">/</span>
                <span className="font-bold text-[#0A2858] text-sm">{currentFeature?.title}</span>
              </div>
            </div>

            <NeoBadge variant={currentFeature?.badgeVariant || "accent"}>
              {currentFeature?.badge}
            </NeoBadge>
          </div>

          {/* FEATURE 1: ADAPTIVE STUDY PLAN (FULL WIDTH) */}
          {activeTab === "plan" && (
            <NeoCard variant="default" shadow="md" className="w-full border-[3px] border-[#0A2858]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#DDE7F5] pb-4 mb-5">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#0A2858]">
                    Weekly Adaptive Learning Schedule
                  </h3>
                  <p className="font-body text-xs text-[#55729D] mt-0.5">
                    Goal: <strong>{learningPlan?.goal}</strong> • Weekly Budget:{" "}
                    <strong>{learningPlan?.availableHoursPerWeek} Hours/Week</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditingPlan(!isEditingPlan)}
                    className={`btn text-xs px-3.5 py-2 flex items-center gap-1.5 ${
                      isEditingPlan
                        ? "bg-[#16A34A] text-white border-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
                        : "btn-primary"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingPlan ? "Done Customizing" : "Customize Schedule ✏️"}</span>
                  </button>
                  <button
                    onClick={handleResetPlan}
                    className="btn btn-secondary text-xs px-3 py-2 text-[#55729D] hover:text-[#DC2626]"
                    title="Reset to initial AI-generated baseline plan"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Editing Controls Banner */}
              {isEditingPlan && (
                <div className="p-5 bg-[#EAF2FF] border-[2px] border-[#0A2858] rounded-sm mb-5 space-y-4 animate-fade-in shadow-[3px_3px_0px_#0A2858]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#1867E8]" />
                      <span className="font-heading font-bold text-xs uppercase text-[#0A2858]">
                        Custom Study Plan Controls
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold">
                      <span>Weekly Budget:</span>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={learningPlan?.availableHoursPerWeek || 6}
                        onChange={(e) => handleAdjustBudget(e.target.value)}
                        className="w-16 px-2 py-1 bg-white border border-[#0A2858] rounded-xs font-mono text-xs text-center"
                      />
                      <span>hrs/wk</span>
                    </div>
                  </div>

                  {/* Add New Task Form */}
                  <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 border-t border-[#0A2858]/20">
                    <input
                      type="text"
                      placeholder="Task Title (e.g. BST Balancing Practice)"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="sm:col-span-2 px-3 py-2 bg-white border border-[#0A2858] rounded-xs text-xs font-body"
                      required
                    />
                    <select
                      value={newTaskSkill}
                      onChange={(e) => setNewTaskSkill(e.target.value)}
                      className="px-2 py-2 bg-white border border-[#0A2858] rounded-xs text-xs font-mono"
                    >
                      <option value="skill_arrays">Arrays</option>
                      <option value="skill_strings">Strings</option>
                      <option value="skill_complexity">Complexity</option>
                      <option value="skill_recursion">Recursion</option>
                      <option value="skill_trees">Trees</option>
                      <option value="skill_graphs">Graphs</option>
                    </select>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="5"
                        step="5"
                        value={newTaskMinutes}
                        onChange={(e) => setNewTaskMinutes(e.target.value)}
                        className="w-16 px-2 py-2 bg-white border border-[#0A2858] rounded-xs text-xs font-mono text-center"
                      />
                      <span className="text-[11px] font-mono text-[#55729D]">mins</span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary text-xs py-2 flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Task</span>
                    </button>
                  </form>
                </div>
              )}

              {learningPlan?.changeReason && !isEditingPlan && (
                <div className="p-3.5 bg-[#F0FDF4] border-[1.5px] border-[#16A34A] rounded-sm text-xs font-mono text-[#16A34A] mb-5 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Plan adapted: {learningPlan.changeReason}</span>
                </div>
              )}

              <div className="space-y-3">
                {learningPlan?.tasks?.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-4 border-[2px] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      task.status === "done"
                        ? "bg-[#F8FAFC] border-[#CBD5E1] opacity-75 line-through"
                        : "bg-[#F4F8FF] border-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
                    } ${!isEditingPlan ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-xs border-[2px] border-[#0A2858] flex items-center justify-center ${
                          task.status === "done" ? "bg-[#16A34A] text-white" : "bg-white"
                        }`}
                      >
                        {task.status === "done" && "✓"}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-[#0A2858]">
                          {task.title}
                        </div>
                        <div className="text-xs font-mono text-[#55729D]">
                          Skill Target: {task.skillId.replace("skill_", "").toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <div className="flex items-center gap-1 text-xs font-mono bg-white px-2.5 py-1 border border-[#0A2858] rounded-xs">
                        <Clock className="w-3 h-3 text-[#1867E8]" />
                        <span>{task.allocatedMinutes} mins</span>
                      </div>

                      {isEditingPlan && (
                        <div className="flex items-center gap-1 ml-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleAdjustMinutes(task.id, task.allocatedMinutes, -15, e)}
                            className="px-2 py-1 bg-white border border-[#0A2858] text-[11px] font-mono hover:bg-[#F4F8FF]"
                            title="Decrease 15 mins"
                          >
                            -15m
                          </button>
                          <button
                            onClick={(e) => handleAdjustMinutes(task.id, task.allocatedMinutes, 15, e)}
                            className="px-2 py-1 bg-white border border-[#0A2858] text-[11px] font-mono hover:bg-[#F4F8FF]"
                            title="Increase 15 mins"
                          >
                            +15m
                          </button>
                          <button
                            onClick={(e) => handleDeleteTask(task.id, e)}
                            className="p-1.5 bg-[#FEE2E2] border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white rounded-xs ml-1"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <NeoBadge
                        variant={
                          task.priority === "high"
                            ? "critical"
                            : task.priority === "medium"
                            ? "accent"
                            : "default"
                        }
                      >
                        {task.priority}
                      </NeoBadge>
                    </div>
                  </div>
                ))}
              </div>
            </NeoCard>
          )}

          {/* FEATURE 2: MATERIAL PERSONALIZER (FULL WIDTH) */}
          {activeTab === "material" && (
            <NeoCard variant="default" shadow="md" className="w-full border-[3px] border-[#0A2858]">
              <h3 className="font-heading font-extrabold text-xl text-[#0A2858] mb-1">
                Multi-Modal Material Adaptation
              </h3>
              <p className="font-body text-xs text-[#55729D] mb-5">
                Adapts complex algorithmic concepts into your preferred cognitive style and native language.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
                <div>
                  <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                    Concept:
                  </label>
                  <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-body text-xs text-[#0A2858]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                    Target Level:
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-mono text-xs text-[#0A2858]"
                  >
                    <option value="beginner">Beginner (Remedial)</option>
                    <option value="intermediate">Intermediate (Standard)</option>
                    <option value="advanced">Advanced (Rigorous)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                    Cognitive Style:
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-mono text-xs text-[#0A2858]"
                  >
                    <option value="analogy">Real-World Analogy</option>
                    <option value="example-based">Visual / Diagrammatic</option>
                    <option value="rigorous">Mathematical Proof</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                    Language:
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-mono text-xs text-[#0A2858]"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Hinglish">Hinglish</option>
                  </select>
                </div>
              </div>

              <NeoButton
                variant="primary"
                size="md"
                disabled={loadingPersonalizer}
                onClick={handleGenerateMaterial}
              >
                <Sparkles className="w-4 h-4" />
                <span>{loadingPersonalizer ? "Adapting Material..." : "Generate Adaptive Explanation"}</span>
              </NeoButton>

              {personalizedContent && (
                <div className="mt-6 p-5 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-[#DDE7F5] pb-2 mb-2">
                    <span className="font-heading font-bold text-sm text-[#0A2858]">
                      Adaptive Explanation ({language} • {style})
                    </span>
                    <NeoBadge variant="accent">AI Synthesized</NeoBadge>
                  </div>
                  <div className="font-body text-xs text-[#0A2858] whitespace-pre-wrap leading-relaxed">
                    {personalizedContent}
                  </div>
                </div>
              )}
            </NeoCard>
          )}

          {/* FEATURE 3: EXAM PREP OPTIMIZER (FULL WIDTH) */}
          {activeTab === "exam" && (
            <NeoCard variant="default" shadow="md" className="w-full border-[3px] border-[#0A2858]">
              <h3 className="font-heading font-extrabold text-xl text-[#0A2858] mb-1">
                Exam Preparation & Confidence Optimizer
              </h3>
              <p className="font-body text-xs text-[#55729D] mb-5">
                Calculates high-yield study priorities based on remaining days until your exam and current mastery deficits.
              </p>

              <div className="flex flex-col sm:flex-row items-end gap-3 mb-6">
                <div className="w-full sm:w-72">
                  <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                    Exam Target Date:
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-mono text-xs text-[#0A2858]"
                  />
                </div>

                <NeoButton
                  variant="primary"
                  size="md"
                  disabled={loadingExam}
                  onClick={handleRunExamOptimizer}
                >
                  <Target className="w-4 h-4" />
                  <span>{loadingExam ? "Analyzing Syllabus..." : "Calculate Revision Priorities"}</span>
                </NeoButton>
              </div>

              {examPriorities && (
                <div className="space-y-4 pt-4 border-t-2 border-[#0A2858] animate-fade-in">
                  <div className="p-4 bg-[#EAF2FF] border-[2px] border-[#0A2858] rounded-sm flex items-center justify-between">
                    <div>
                      <div className="font-heading font-extrabold text-lg text-[#0A2858]">
                        {examPriorities.daysRemaining} Days Until Examination
                      </div>
                      <div className="font-body text-xs text-[#55729D]">
                        Recommended Strategy: {examPriorities.recommendedStrategy}
                      </div>
                    </div>
                    <div className="font-mono text-2xl font-extrabold text-[#1867E8]">
                      Score: 68/100
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#FEF2F2] border-[2px] border-[#DC2626] rounded-sm">
                      <div className="font-heading font-bold text-sm text-[#DC2626] uppercase mb-2">
                        🚨 High Priority (Critical Gaps)
                      </div>
                      <ul className="text-xs font-mono space-y-1.5 text-[#0A2858]">
                        {examPriorities.priorities?.HIGH?.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-[#FFFBEB] border-[2px] border-[#F59E0B] rounded-sm">
                      <div className="font-heading font-bold text-sm text-[#F59E0B] uppercase mb-2">
                        ⚠️ Medium Priority (Reinforce)
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
          )}

          {/* FEATURE 4: PROJECT LAB (FULL WIDTH) */}
          {activeTab === "projects" && (
            <div className="w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858]">
                  <NeoBadge variant="critical" className="mb-2">Target Gap: Tree Traversal</NeoBadge>
                  <h3 className="font-heading font-bold text-lg text-[#0A2858] mb-2">
                    Interactive BST Visualizer (React + Canvas)
                  </h3>
                  <p className="font-body text-xs text-[#55729D] leading-relaxed mb-4">
                    Build a web application that visually traces In-Order, Pre-Order, and Post-Order recursion with step-by-step call-stack animation. Directly closes your demonstrated tree gaps.
                  </p>
                  <div className="text-[11px] font-mono text-[#1867E8] font-bold">
                    Difficulty: Intermediate • Est: 6-8 Hours
                  </div>
                </NeoCard>

                <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858]">
                  <NeoBadge variant="accent" className="mb-2">Target Gap: Graphs & Queues</NeoBadge>
                  <h3 className="font-heading font-bold text-lg text-[#0A2858] mb-2">
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
      )}
    </div>
  );
}
