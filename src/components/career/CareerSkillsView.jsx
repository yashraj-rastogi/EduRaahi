"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Target,
  FileText,
  Mic,
  FolderGit2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Compass,
  MessageSquare,
  Clock,
  Layers,
  Check,
  ArrowLeft,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";
import { generateCustomCareerRoadmap } from "../../lib/aiService";

export default function CareerSkillsView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'navigator' | 'map' | 'resume' | 'projects' | 'viva'
  const [careerGoal, setCareerGoal] = useState(storageService.getCareerGoal("uid_rahul"));
  const [skills, setSkills] = useState(storageService.getStudentSkills("uid_rahul"));

  // Custom Career Path Generator State
  const [customRole, setCustomRole] = useState("Cloud DevOps & Site Reliability Engineer");
  const [customDomain, setCustomDomain] = useState("Fintech & Distributed Payment Gateways");
  const [customTimeline, setCustomTimeline] = useState("6 months");
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [customRoadmapResult, setCustomRoadmapResult] = useState(null);
  const [goalAppliedToast, setGoalAppliedToast] = useState(false);

  // Resume State
  const [resumeText, setResumeText] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState(null);

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: "proj_1",
      title: "Distributed KV-Store with BST Indexing",
      role: "Backend Engineer",
      targetGap: "Tree Traversal & BST Algorithms",
      status: "in_progress",
      impact: "High Employability (+18% placement match)",
      description: "Implement an in-memory key-value store using balanced AVL/BST index structures and log-structured storage.",
    },
    {
      id: "proj_2",
      title: "Real-time Collaborative Whiteboard",
      role: "Full Stack Engineer",
      targetGap: "Graph Traversal & WebSockets",
      status: "recommended",
      impact: "Demonstrates Multi-Client Concurrency",
      description: "Build an interactive canvas whiteboard with live cursor broadcasting and topological graph sorting.",
    },
    {
      id: "proj_3",
      title: "Algorithmic Trading Order Book",
      role: "Backend Engineer",
      targetGap: "Time Complexity & Memory Management",
      status: "recommended",
      impact: "High-Frequency System Design",
      description: "Low-latency limit order book with O(1) order cancellation using hash maps and doubly-linked priority queues.",
    },
  ]);

  // Viva State
  const [vivaStep, setVivaStep] = useState(1);
  const [vivaAnswer, setVivaAnswer] = useState("");
  const [vivaReport, setVivaReport] = useState(null);

  useEffect(() => {
    const unsub = storageService.subscribe(() => {
      setCareerGoal(storageService.getCareerGoal("uid_rahul"));
      setSkills(storageService.getStudentSkills("uid_rahul"));
    });
    return unsub;
  }, []);

  const handleGenerateCustomRoadmap = async () => {
    if (!customRole.trim() || !customDomain.trim()) return;
    setIsGeneratingRoadmap(true);
    setGoalAppliedToast(false);

    try {
      const studentSkills = storageService.getStudentSkills("uid_rahul");
      const result = await generateCustomCareerRoadmap({
        targetRole: customRole,
        targetDomain: customDomain,
        studentSkills,
        timeline: customTimeline,
      });

      setCustomRoadmapResult(result);
    } catch (err) {
      console.error("Roadmap generation error:", err);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const handleApplyCustomRoadmap = (roadmapData) => {
    const uid = storageService.getCurrentUser().id;

    // Construct benchmarks from roadmap gaps or realistic default requirements
    const benchmarks = [
      { skill: "Core Data Structures & Algorithms", current: 78, required: 85 },
      { skill: `${roadmapData.targetDomain} Tooling`, current: 52, required: 80 },
      { skill: `${roadmapData.targetRole} Architecture`, current: 48, required: 85 },
      { skill: "Testing & Production Observability", current: 60, required: 80 },
    ];

    const newGoal = {
      targetRole: roadmapData.targetRole,
      targetDomain: roadmapData.targetDomain,
      readinessScore: roadmapData.estimatedFit || 68,
      timeline: roadmapData.timeline || customTimeline,
      benchmarks,
      requiredSkills: benchmarks.map((b, i) => ({
        skillId: `req_${i}`,
        name: b.skill,
        requiredLevel: b.required,
        currentLevel: b.current,
      })),
    };

    storageService.saveCareerGoal(uid, newGoal);
    storageService.saveCustomCareerRoadmap(uid, {
      ...roadmapData,
      createdAt: new Date().toISOString(),
    });

    setCareerGoal(newGoal);
    setGoalAppliedToast(true);
    setTimeout(() => setGoalAppliedToast(false), 3500);
  };

  const handlePreFillResume = () => {
    setResumeText(
      `RAHUL SHARMA — B.Tech Computer Science\n\nTECHNICAL SKILLS:\n• Languages: C++, Java, JavaScript, Python\n• Core Competencies: Advanced Data Structures & Algorithms, Binary Search Trees, Recursion, Dynamic Programming\n• Projects: Full Stack E-Commerce App, Library Management System\n• Aiming for: Backend Software Engineering Internships`
    );
  };

  const handleAnalyzeResume = () => {
    const treeSkill = skills.find((s) => s.skillId === "skill_trees");
    const recSkill = skills.find((s) => s.skillId === "skill_recursion");
    const arrSkill = skills.find((s) => s.skillId === "skill_arrays");

    setResumeAnalysis({
      claimedSkills: [
        {
          name: "Arrays & Basic Data Structures",
          claimed: "Advanced",
          demonstratedMastery: `${arrSkill?.mastery || 85}%`,
          verified: true,
          evidence: "Diagnostic verified: 4/4 correct",
        },
        {
          name: "Recursion & Call Stack",
          claimed: "Proficient",
          demonstratedMastery: `${recSkill?.mastery || 41}%`,
          verified: false,
          evidence: "Platform gap detected: Failed base case checks",
        },
        {
          name: "Binary Search Trees & Traversal",
          claimed: "Advanced",
          demonstratedMastery: `${treeSkill?.mastery || 38}%`,
          verified: treeSkill?.mastery >= 70,
          evidence:
            treeSkill?.mastery >= 70
              ? "Reassessment verified (+34% leap)"
              : "Platform gap detected: Confused In-Order with Pre-Order",
        },
      ],
      recommendation:
        treeSkill?.mastery >= 70
          ? "Resume claims now align with verified platform evidence!"
          : "Discrepancy detected: Your resume claims advanced BST mastery, but recent platform diagnostic shows 38%. Complete targeted retest before applying.",
    });
  };

  const handleVivaSubmit = () => {
    if (vivaStep === 1) {
      setVivaStep(2);
      setVivaAnswer("");
    } else {
      setVivaReport({
        conceptualUnderstanding: "Solid on recursion base cases, developing on BST traversal.",
        clarity: "High — articulated stack frames clearly.",
        technicalDepth: "Intermediate",
        recommendedPractice: "Continue practicing step-by-step whiteboard recursion unwinding.",
      });
    }
  };

  const handleToggleProject = (id) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus =
            p.status === "recommended"
              ? "in_progress"
              : p.status === "in_progress"
              ? "completed"
              : "recommended";
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const tabsConfig = [
    {
      id: "navigator",
      label: "Career Navigator",
      title: "AI Career Match Navigator",
      icon: Compass,
      badge: "Custom Roadmaps",
      description:
        "Ranked placement role matches grounded in platform skills, plus an interactive custom domain roadmap generator.",
      meta: `Goal: ${careerGoal?.targetRole || "Backend Engineer"} (${careerGoal?.readinessScore || 58}%)`,
    },
    {
      id: "map",
      label: "Skill Benchmark",
      title: "Role Skill Benchmark",
      icon: Target,
      badge: "Benchmark Matrix",
      description:
        "Directly compares your demonstrated platform mastery against target industry benchmark standards.",
      meta: `${careerGoal?.requiredSkills?.length || 4} Target Competencies Monitored`,
    },
    {
      id: "resume",
      label: "Resume Audit",
      title: "Resume Claims vs. Evidence Audit",
      icon: FileText,
      badge: "Recruiter Grade",
      description:
        "Cross-references claimed qualifications on your resume against platform-verified diagnostic test attempts.",
      meta: "Automated Evidence Verification",
    },
    {
      id: "projects",
      label: "Proof Projects",
      title: "Employability Project Recommender",
      icon: FolderGit2,
      badge: "Portfolio Boost",
      description:
        "Recommended portfolio projects specifically targeted at proving demonstrated skill to recruiters and closing resume gaps.",
      meta: `${projects.length} Gap-Closing Projects`,
    },
    {
      id: "viva",
      label: "Interview Viva",
      title: "AI Technical Viva Simulator",
      icon: Mic,
      badge: "Oral Simulation",
      description:
        "Oral technical interview simulation that dynamically adjusts technical depth based on your explanations.",
      meta: "Technical Depth & Articulation",
    },
  ];

  const currentTabInfo = tabsConfig.find((t) => t.id === activeTab);

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
                  Category • Career & Employability
                </span>
                <span className="font-mono text-xs text-[#16A34A] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded-xs border border-[#16A34A]">
                  ● 5 Features Available
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2858] tracking-tight">
                Career Navigator & Employability Intelligence
              </h1>
              <p className="font-body text-sm text-[#55729D] mt-1">
                Select any career capability below to open it in full-width workspace mode:
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <div className="font-mono text-xs text-[#55729D]">Placement Readiness</div>
              <div className="font-heading font-extrabold text-xl text-[#1867E8]">{careerGoal?.readinessScore || 58}% Ready</div>
            </div>
          </div>

          {/* Complete Screen Feature Cards (3-Col / 2-Col Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabsConfig.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="group cursor-pointer bg-white border-[3px] border-[#0A2858] rounded-md p-6 md:p-8 shadow-[5px_5px_0px_#0A2858] hover:shadow-[8px_8px_0px_#1867E8] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-sm bg-[#EAF2FF] border-[2px] border-[#0A2858] flex items-center justify-center text-[#1867E8] group-hover:bg-[#1867E8] group-hover:text-white transition-colors shadow-[2px_2px_0px_#0A2858]">
                        <Icon className="w-7 h-7" />
                      </div>
                      <NeoBadge variant={item.badge === "Custom Roadmaps" ? "accent" : "default"}>
                        {item.badge}
                      </NeoBadge>
                    </div>

                    <div>
                      <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#0A2858] group-hover:text-[#1867E8] transition-colors tracking-tight">
                        {item.title}
                      </h2>
                      <p className="font-body text-sm text-[#55729D] leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t-2 border-[#DDE7F5] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#55729D]">
                      {item.meta}
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
                <span className="text-[#8298BA]">Career & Employability</span>
                <span className="text-[#8298BA]">/</span>
                <span className="font-bold text-[#0A2858] text-sm">{currentTabInfo?.title}</span>
              </div>
            </div>

            <NeoBadge variant="accent">
              {currentTabInfo?.badge}
            </NeoBadge>
          </div>

          {/* TAB 1: AI CAREER NAVIGATOR */}
          {activeTab === "navigator" && (
        <div className="space-y-6">
          {/* AI Career Counselor Banner */}
          <div className="bg-[#EAF2FF] border-[2px] border-[#0A2858] p-4 rounded-md shadow-[3px_3px_0px_#0A2858] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1867E8] text-white rounded-sm border border-[#0A2858] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-sm text-[#0A2858]">
                  Unsure which trajectory suits your strengths best?
                </h4>
                <p className="font-body text-xs text-[#55729D]">
                  Chat with our AI Career Counselor to discover custom engineering roles and industry verticals through guided dialogue.
                </p>
              </div>
            </div>

            <NeoButton
              variant="secondary"
              size="sm"
              onClick={() => onNavigate && onNavigate("ai_tutor")}
              className="shrink-0 text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              <span>Talk to AI Career Counselor</span>
            </NeoButton>
          </div>

          {/* Section: Custom Career Path & Domain Roadmap Generator */}
          <NeoCard variant="default" shadow="md" className="border-[2px] border-[#0A2858]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#DDE7F5] pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase bg-[#FFD43B] text-[#0A2858] px-2 py-0.5 border border-[#0A2858] rounded-xs">
                    Custom Roadmaps
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                    Personalized Career Path & Domain Roadmap
                  </h3>
                </div>
                <p className="font-body text-xs text-[#55729D] mt-0.5">
                  State any career aspiration and industry domain to generate an AI-tailored 4-phase preparation roadmap.
                </p>
              </div>

              {goalAppliedToast && (
                <div className="flex items-center gap-1.5 bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A] px-3 py-1 rounded-xs font-mono text-xs font-bold animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Active Goal Updated!</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                  Target Role / Specialty:
                </label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="e.g. Cloud DevOps Engineer, AI/ML Specialist"
                  className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-body text-xs text-[#0A2858] focus:outline-none focus:ring-2 focus:ring-[#1867E8]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                  Target Domain / Industry:
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="e.g. Fintech, Healthcare AI, Web3, E-Commerce"
                  className="w-full p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-body text-xs text-[#0A2858] focus:outline-none focus:ring-2 focus:ring-[#1867E8]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#0A2858] uppercase mb-1">
                  Preparation Timeline:
                </label>
                <div className="flex gap-2">
                  <select
                    value={customTimeline}
                    onChange={(e) => setCustomTimeline(e.target.value)}
                    className="flex-1 p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs font-mono text-xs text-[#0A2858] focus:outline-none"
                  >
                    <option value="3 months">3 Months (Intensive)</option>
                    <option value="6 months">6 Months (Standard)</option>
                    <option value="12 months">12 Months (Comprehensive)</option>
                  </select>

                  <NeoButton
                    variant="primary"
                    size="sm"
                    onClick={handleGenerateCustomRoadmap}
                    disabled={isGeneratingRoadmap || !customRole.trim() || !customDomain.trim()}
                    className="shrink-0 text-xs"
                  >
                    {isGeneratingRoadmap ? (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Generate Roadmap
                      </span>
                    )}
                  </NeoButton>
                </div>
              </div>
            </div>

            {/* Generated Custom Roadmap Display */}
            {customRoadmapResult && (
              <div className="p-4 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDE7F5] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-base text-[#0A2858]">
                        {customRoadmapResult.targetRole}
                      </span>
                      <NeoBadge variant="accent">
                        {customRoadmapResult.targetDomain}
                      </NeoBadge>
                    </div>
                    <p className="font-body text-xs text-[#55729D] mt-0.5">
                      Estimated Platform Readiness Fit:{" "}
                      <strong className="text-[#1867E8]">
                        {customRoadmapResult.estimatedFit}%
                      </strong>{" "}
                      • Target Timeline: {customRoadmapResult.timeline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <NeoButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleApplyCustomRoadmap(customRoadmapResult)}
                      className="text-xs"
                    >
                      <Target className="w-3.5 h-3.5 mr-1" />
                      <span>Set as Active Career Goal</span>
                    </NeoButton>
                  </div>
                </div>

                {/* 4 Phases */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {customRoadmapResult.phases?.map((ph, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border-[1.5px] border-[#0A2858] rounded-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[11px] font-extrabold text-[#1867E8] uppercase">
                            Phase {idx + 1}
                          </span>
                          <span className="font-mono text-[10px] text-[#55729D] bg-[#EAF2FF] px-1.5 py-0.5 rounded-xs">
                            {ph.duration}
                          </span>
                        </div>
                        <h5 className="font-heading font-bold text-xs text-[#0A2858] mb-1">
                          {ph.phase}
                        </h5>
                        <p className="font-body text-[11px] text-[#55729D] leading-relaxed mb-2">
                          {ph.focus}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#DDE7F5] font-mono text-[10px] text-[#16A34A] font-bold">
                        ★ Milestone: {ph.milestone}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Target Gaps & Industry Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 bg-white border border-[#0A2858] rounded-xs">
                    <span className="font-bold text-[#DC2626] uppercase block mb-1">
                      Key Competency Gaps to Close:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-[#0A2858]">
                      {customRoadmapResult.keyGaps?.map((gap, i) => (
                        <li key={i}>{gap}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-white border border-[#0A2858] rounded-xs">
                    <span className="font-bold text-[#1867E8] uppercase block mb-1">
                      {customRoadmapResult.targetDomain} Industry Requirements:
                    </span>
                    <p className="font-body text-[#0A2858] leading-relaxed">
                      {customRoadmapResult.industryContext}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </NeoCard>

          {/* Standard Placement Role Matches */}
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-1">
              Platform-Matched Career Trajectories
            </h3>
            <p className="font-body text-xs text-[#55729D] mb-4">
              Ranked career matches grounded strictly in your verified platform skill scores.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  role: careerGoal?.targetRole || "Backend Software Engineer",
                  domain: careerGoal?.targetDomain || "Core Engineering",
                  match: careerGoal?.readinessScore || 58,
                  status: "Active Goal",
                  rationale:
                    "Strong in Arrays (85%) & Basic Logic. Tree Traversal and Recursion are key advancement priorities.",
                  badge: "accent",
                },
                {
                  role: "Full Stack Developer",
                  domain: "Modern Web",
                  match: 72,
                  status: "High Match",
                  rationale:
                    "Good algorithmic fundamentals combined with API structuring skills. Lowest friction path to industry.",
                  badge: "default",
                },
                {
                  role: "Data Systems Engineer",
                  domain: "Cloud & Analytics",
                  match: 51,
                  status: "Emerging Match",
                  rationale:
                    "Requires advanced Graph algorithms, distributed storage, and complexity optimization.",
                  badge: "default",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-4 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <NeoBadge variant={c.badge}>{c.status}</NeoBadge>
                      <span className="font-mono text-2xl font-extrabold text-[#0A2858]">
                        {c.match}%
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-[#0A2858] mb-1">
                      {c.role}
                    </h4>
                    <span className="font-mono text-[11px] text-[#1867E8] font-bold block mb-2">
                      {c.domain}
                    </span>
                    <p className="font-body text-xs text-[#55729D] leading-relaxed mb-4">
                      {c.rationale}
                    </p>
                  </div>

                  <NeoButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveTab("map")}
                    className="w-full text-xs"
                  >
                    View Role Skill Benchmarks
                  </NeoButton>
                </div>
              ))}
            </div>
          </NeoCard>
        </div>
      )}

      {/* ================= TAB 2: SKILL-TO-CAREER BENCHMARKING ================= */}
      {activeTab === "map" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#DDE7F5] pb-4 mb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#55729D]">
                  Active Career Benchmark
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#0A2858]">
                  {careerGoal?.targetRole || "Backend Software Engineer"}
                </h3>
                {careerGoal?.targetDomain && (
                  <span className="font-mono text-xs text-[#1867E8] font-bold">
                    Domain: {careerGoal.targetDomain}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="font-mono text-3xl font-extrabold text-[#1867E8]">
                  {careerGoal?.readinessScore || 58}%
                </div>
                <div className="font-mono text-xs text-[#55729D]">Job Readiness Index</div>
              </div>
            </div>

            <div className="space-y-3">
              {(
                careerGoal?.requiredSkills || [
                  { skillId: "skill_arrays", name: "Arrays & Dynamic Memory", currentLevel: 85, requiredLevel: 80 },
                  { skillId: "skill_trees", name: "Tree Traversal & BST", currentLevel: 38, requiredLevel: 75 },
                  { skillId: "skill_recursion", name: "Recursion & Backtracking", currentLevel: 41, requiredLevel: 70 },
                  { skillId: "skill_graphs", name: "Graphs & Topological Sort", currentLevel: 25, requiredLevel: 70 },
                ]
              ).map((req) => {
                const live = skills.find((s) => s.skillId === req.skillId);
                const current = live ? live.mastery : req.currentLevel;
                const isMastered = current >= req.requiredLevel;

                return (
                  <div
                    key={req.skillId}
                    className="p-3.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="font-heading font-bold text-sm text-[#0A2858] flex items-center gap-2">
                        <span>{req.name}</span>
                        {isMastered ? (
                          <span className="text-xs font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-xs border border-[#16A34A]">
                            ✓ Mastered
                          </span>
                        ) : (
                          <span className="text-xs font-mono font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded-xs border border-[#DC2626]">
                            ✗ Skill Gap
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-[#55729D]">
                        Demonstrated: <strong>{current}%</strong> • Required Benchmark:{" "}
                        <strong>{req.requiredLevel}%</strong>
                      </div>
                    </div>

                    <div className="w-full sm:w-48">
                      <NeoProgressBar
                        value={current}
                        color="dynamic"
                        height="h-2.5"
                        showPercentage={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </NeoCard>
        </div>
      )}

      {/* ================= TAB 3: RESUME SKILL GAP ANALYZER ================= */}
      {activeTab === "resume" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                  Resume Claims vs. Demonstrated Evidence
                </h3>
                <p className="font-body text-xs text-[#55729D]">
                  Cross-references claimed resume qualifications against platform-verified diagnostic attempts.
                </p>
              </div>
              <NeoButton variant="secondary" size="sm" onClick={handlePreFillResume}>
                Load Demo Resume
              </NeoButton>
            </div>

            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume or technical summary here..."
              className="w-full p-3 font-mono text-xs text-[#0A2858] bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1867E8] mb-3"
            />

            <NeoButton
              variant="primary"
              size="md"
              disabled={!resumeText.trim()}
              onClick={handleAnalyzeResume}
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Claimed vs. Demonstrated Skills</span>
            </NeoButton>

            {resumeAnalysis && (
              <div className="mt-6 space-y-4 pt-4 border-t-2 border-[#0A2858]">
                <div className="p-3 bg-[#EAF2FF] border-[1.5px] border-[#0A2858] rounded-sm text-xs font-mono text-[#0A2858] font-bold">
                  💡 Analysis: {resumeAnalysis.recommendation}
                </div>

                <div className="space-y-2.5">
                  {resumeAnalysis.claimedSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 border-[1.5px] rounded-sm text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        sk.verified
                          ? "bg-[#F0FDF4] border-[#16A34A]"
                          : "bg-[#FEF2F2] border-[#DC2626]"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[#0A2858] text-sm mb-0.5">
                          {sk.name}
                        </div>
                        <div className="text-[#55729D]">
                          Claimed: <strong>{sk.claimed}</strong> | Verified Platform Mastery:{" "}
                          <strong>{sk.demonstratedMastery}</strong>
                        </div>
                        <div className="text-[11px] text-[#8298BA] mt-1">{sk.evidence}</div>
                      </div>

                      <NeoBadge variant={sk.verified ? "success" : "critical"}>
                        {sk.verified ? "Evidence Verified" : "Gap Detected"}
                      </NeoBadge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </NeoCard>
        </div>
      )}

      {/* ================= TAB 4: CAREER PROJECT RECOMMENDER ================= */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-1">
              Employability Project Recommender
            </h3>
            <p className="font-body text-xs text-[#55729D] mb-4">
              Recommended projects specifically targeted at proving demonstrated skill to recruiters and closing resume gaps.
            </p>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-base text-[#0A2858]">
                        {proj.title}
                      </span>
                      <NeoBadge
                        variant={
                          proj.status === "completed"
                            ? "success"
                            : proj.status === "in_progress"
                            ? "accent"
                            : "default"
                        }
                      >
                        {proj.status.replace("_", " ")}
                      </NeoBadge>
                    </div>

                    <button
                      onClick={() => handleToggleProject(proj.id)}
                      className="btn btn-secondary text-xs px-2.5 py-1"
                    >
                      Mark{" "}
                      {proj.status === "completed"
                        ? "Recommended"
                        : proj.status === "in_progress"
                        ? "Completed"
                        : "In Progress"}
                    </button>
                  </div>

                  <p className="font-body text-xs text-[#55729D] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#DDE7F5] text-xs font-mono">
                    <span className="text-[#DC2626] font-bold">Target Gap: {proj.targetGap}</span>
                    <span className="text-[#16A34A] font-bold">• {proj.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </NeoCard>
        </div>
      )}

      {/* ================= TAB 5: AI VIVA SIMULATOR ================= */}
      {activeTab === "viva" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-2">
              AI Technical Viva & Interview Simulator
            </h3>
            <p className="font-body text-xs text-[#55729D] mb-4">
              Oral question simulation that dynamically adjusts technical depth based on your explanations.
            </p>

            {!vivaReport ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#EAF2FF] border-[2px] border-[#0A2858] rounded-sm font-mono text-xs space-y-1">
                  <div className="font-bold uppercase text-[#1867E8]">
                    Viva Examiner Question #{vivaStep}:
                  </div>
                  <p className="text-sm font-heading font-bold text-[#0A2858]">
                    {vivaStep === 1
                      ? "Explain why recursion without a properly configured base case leads to stack overflow in JVM or V8 runtimes. Walk me through the call stack frames."
                      : "Now suppose you are traversing a binary search tree. Why does in-order traversal (Left, Root, Right) always yield nodes in non-decreasing order?"}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold text-[#0A2858] uppercase">
                    Your Verbal/Written Response:
                  </label>
                  <textarea
                    rows={4}
                    value={vivaAnswer}
                    onChange={(e) => setVivaAnswer(e.target.value)}
                    placeholder="Articulate your thought process clearly, referencing memory stack frames or traversal order..."
                    className="w-full p-3 font-mono text-xs text-[#0A2858] bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1867E8]"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() =>
                      setVivaAnswer(
                        vivaStep === 1
                          ? "Every recursive invocation pushes a stack frame containing local variables and return address onto the runtime call stack. Without a terminating base case, frames accumulate until exceeding thread stack memory."
                          : "Because a BST guarantees all keys in the left subtree are strictly smaller than the root, and all keys in the right subtree are greater. Visiting left first, then root, then right guarantees strictly ascending order."
                      )
                    }
                    className="text-xs font-mono text-[#1867E8] underline hover:text-[#0A2858]"
                  >
                    Load Sample Explanation
                  </button>

                  <NeoButton
                    variant="primary"
                    size="md"
                    disabled={!vivaAnswer.trim()}
                    onClick={handleVivaSubmit}
                  >
                    <span>{vivaStep === 1 ? "Submit & Next Question →" : "Finish Viva & Get Evaluation"}</span>
                  </NeoButton>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#DDE7F5] pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                    <h4 className="font-heading font-extrabold text-base text-[#0A2858]">
                      Viva Simulation Evaluation
                    </h4>
                  </div>
                  <NeoBadge variant="success">Completed</NeoBadge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white border border-[#0A2858] rounded-xs font-mono text-xs">
                    <span className="text-[#55729D] uppercase block mb-1">Articulation Clarity:</span>
                    <span className="font-bold text-[#1867E8] text-sm">{vivaReport.clarity}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#0A2858] rounded-xs font-mono text-xs">
                    <span className="text-[#55729D] uppercase block mb-1">Technical Depth:</span>
                    <span className="font-bold text-[#0A2858] text-sm">{vivaReport.technicalDepth}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#0A2858] rounded-xs font-mono text-xs">
                    <span className="text-[#55729D] uppercase block mb-1">Next Practice Area:</span>
                    <span className="font-bold text-[#DC2626] text-sm">Tree Recursion Unwinding</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#0A2858] rounded-xs text-xs font-body text-[#0A2858]">
                  <strong>Evaluator Recommendation:</strong> {vivaReport.recommendedPractice}
                </div>

                <NeoButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setVivaReport(null);
                    setVivaStep(1);
                    setVivaAnswer("");
                  }}
                >
                  Retake Viva Simulation
                </NeoButton>
              </div>
            )}
          </NeoCard>
        </div>
      )}
        </div>
      )}
    </div>
  );
}
