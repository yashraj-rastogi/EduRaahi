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
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";

export default function CareerSkillsView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("navigator"); // 'navigator' | 'map' | 'resume' | 'projects' | 'viva'
  const [careerGoal, setCareerGoal] = useState(storageService.getCareerGoal("uid_rahul"));
  const [skills, setSkills] = useState(storageService.getStudentSkills("uid_rahul"));

  // Resume State
  const [resumeText, setResumeText] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState(null);

  // Projects State (P18)
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

  // Viva State (P13)
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
          const nextStatus = p.status === "recommended" ? "in_progress" : p.status === "in_progress" ? "completed" : "recommended";
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
              Category 4 • Career & Employability
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              Career Navigator & Employability Intelligence
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Connect verified platform competencies directly to target placement roles, resume verification, and interview prep.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "navigator", label: "Navigator (S14)", icon: Compass },
            { id: "map", label: "Skill Map (S15)", icon: Target },
            { id: "resume", label: "Resume (S16)", icon: FileText },
            { id: "projects", label: "Projects (S17)", icon: FolderGit2 },
            { id: "viva", label: "Viva (S13)", icon: Mic },
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

      {/* TAB 1: S14 AI CAREER NAVIGATOR (P14) */}
      {activeTab === "navigator" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-1">
              Screen S14 • AI Career Match Navigator
            </h3>
            <p className="font-body text-xs text-[#55729D] mb-4">
              Ranked career matches grounded strictly in your verified platform skill scores.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  role: "Backend Software Engineer",
                  match: careerGoal?.readinessScore || 58,
                  status: "Primary Goal",
                  rationale: "Strong in Arrays (85%) & Strings (74%). Tree Traversal and Recursion are key advancement priorities.",
                  badge: "accent",
                },
                {
                  role: "Full Stack Developer",
                  match: 72,
                  status: "High Match",
                  rationale: "Good algorithmic fundamentals combined with API structuring skills. Lowest gap friction.",
                  badge: "default",
                },
                {
                  role: "Data Systems Engineer",
                  match: 51,
                  status: "Emerging Match",
                  rationale: "Requires advanced Graph algorithms and complexity optimization before interview readiness.",
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
                    <h4 className="font-heading font-bold text-base text-[#0A2858] mb-2">
                      {c.role}
                    </h4>
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
                    View Role Skill Map
                  </NeoButton>
                </div>
              ))}
            </div>
          </NeoCard>
        </div>
      )}

      {/* TAB 2: S15 SKILL-TO-CAREER MAPPING */}
      {activeTab === "map" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#DDE7F5] pb-4 mb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#55729D]">
                  Role Benchmark
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#0A2858]">
                  {careerGoal?.targetRole}
                </h3>
              </div>
              <div className="text-right">
                <div className="font-mono text-3xl font-extrabold text-[#1867E8]">
                  {careerGoal?.readinessScore}%
                </div>
                <div className="font-mono text-xs text-[#55729D]">Job Readiness Index</div>
              </div>
            </div>

            <div className="space-y-3">
              {careerGoal?.requiredSkills?.map((req) => {
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

      {/* TAB 3: S16 RESUME SKILL GAP ANALYZER */}
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

      {/* TAB 4: S17 CAREER PROJECT RECOMMENDER (P18) */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-1">
              Screen S17 • Employability Project Recommender
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
                      <NeoBadge variant={proj.status === "completed" ? "success" : proj.status === "in_progress" ? "accent" : "default"}>
                        {proj.status.replace("_", " ")}
                      </NeoBadge>
                    </div>

                    <button
                      onClick={() => handleToggleProject(proj.id)}
                      className="btn btn-secondary text-xs px-2.5 py-1"
                    >
                      Mark {proj.status === "completed" ? "Recommended" : proj.status === "in_progress" ? "Completed" : "In Progress"}
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

      {/* TAB 5: S13 AI VIVA SIMULATOR */}
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
                    Viva Examiner Question {vivaStep} of 2:
                  </div>
                  <p className="font-body text-sm font-bold text-[#0A2858]">
                    {vivaStep === 1
                      ? "Explain why recursive functions require a base case. What physically happens to the runtime process if a base case is omitted?"
                      : "Good explanation. Now, for a Binary Search Tree, how does In-Order traversal guarantee that elements are visited in ascending sorted order?"}
                  </p>
                </div>

                <textarea
                  rows={4}
                  value={vivaAnswer}
                  onChange={(e) => setVivaAnswer(e.target.value)}
                  placeholder="Speak or type your explanation here..."
                  className="w-full p-3 font-body text-sm text-[#0A2858] bg-white border-[2px] border-[#0A2858] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1867E8]"
                />

                <NeoButton
                  variant="primary"
                  size="md"
                  disabled={!vivaAnswer.trim()}
                  onClick={handleVivaSubmit}
                >
                  <span>{vivaStep === 1 ? "Submit Answer & Proceed" : "Finish Viva Simulation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </NeoButton>
              </div>
            ) : (
              <div className="p-5 bg-[#F0FDF4] border-[2px] border-[#16A34A] rounded-sm space-y-3 font-mono text-xs">
                <div className="font-heading font-bold text-base text-[#14532D]">
                  ✓ Viva Simulation Evaluation Completed
                </div>
                <div>• <strong>Conceptual Understanding:</strong> {vivaReport.conceptualUnderstanding}</div>
                <div>• <strong>Clarity of Explanation:</strong> {vivaReport.clarity}</div>
                <div>• <strong>Technical Depth:</strong> {vivaReport.technicalDepth}</div>
                <div>• <strong>Recommended Action:</strong> {vivaReport.recommendedPractice}</div>

                <NeoButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setVivaReport(null);
                    setVivaStep(1);
                    setVivaAnswer("");
                  }}
                  className="mt-3"
                >
                  Start New Session
                </NeoButton>
              </div>
            )}
          </NeoCard>
        </div>
      )}
    </div>
  );
}
