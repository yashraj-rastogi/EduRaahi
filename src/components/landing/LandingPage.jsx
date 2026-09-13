"use client";

import React, { useState } from "react";
import {
  Brain,
  Zap,
  Target,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Code2,
  BookOpen,
  FileCheck,
  Flame,
  HelpCircle,
} from "lucide-react";
import NeoButton from "../common/NeoButton";
import NeoCard from "../common/NeoCard";
import NeoBadge from "../common/NeoBadge";

export default function LandingPage({ onNavigate, onRoleChange, onOpenTour }) {
  const [activeTab, setActiveTab] = useState("learner");

  const handleLaunchStudent = () => {
    if (onRoleChange) onRoleChange(false);
    if (onNavigate) onNavigate("student_dashboard");
  };

  const handleLaunchTeacher = () => {
    if (onRoleChange) onRoleChange(true);
    if (onNavigate) onNavigate("teacher_dashboard");
  };

  const features = {
    learner: {
      title: "Learner Intelligence Cockpit",
      badge: "Core Learner Model",
      description:
        "Answers the 6 core questions every student needs: Where do I stand? What are my weak spots? Why am I wrong? What should I learn next? How does my study plan adapt? How prepared am I for technical placements?",
      bullets: [
        "Interactive 6-skill dependency DAG graph with real-time prerequisite tracing.",
        "Deep misconception diagnosis identifying mental model flaws with cited evidence.",
        "Dynamic 7-day adaptive study planner that reallocates time to critical gaps.",
      ],
      targetScreen: "student_dashboard",
      targetRole: false,
    },
    assessment: {
      title: "Diagnostic Assessment & The +34% Leap",
      badge: "Measurable Proof of Learning",
      description:
        "Say goodbye to meaningless multiple-choice percentages. EduRaahi breaks test performance down by granular sub-skills and demonstrates a verifiable mastery climb.",
      bullets: [
        "10-Question Diagnostic Assessment establishing baseline profile (58%).",
        "Targeted 5-Question Tree Traversal practice test with 1-click simulation pre-fills.",
        "Deterministic mastery leap: Trees surges from 38% → 72% (+34 points!), recognized across student and teacher dashboards.",
      ],
      targetScreen: "assess_improve",
      targetRole: false,
    },
    socratic: {
      title: "Guided Socratic AI Tutor",
      badge: "Pedagogical Guardrail",
      description:
        "Generic chatbots immediately dump the final code, destroying genuine problem-solving ability. EduRaahi enforces a strict 5-stage hint ladder with comprehension checks.",
      bullets: [
        "Stage 1 Conceptual Nudge → Stage 2 Strategy → Stage 3 Pseudocode → Stage 4 Syntax → Stage 5 Solution.",
        "Automated verification test requires the student to explain the invariant before unlocking full code.",
        "Instant code execution sandbox with real-time test case feedback.",
      ],
      targetScreen: "ai_tutor",
      targetRole: false,
    },
    teacher: {
      title: "Teacher Cohort Heatmap & Interventions",
      badge: "Human-in-the-Loop Governance",
      description:
        "Gives instructors super-human visibility across 60–120 students, highlighting class-wide bottlenecks and automating personalized intervention proposals.",
      bullets: [
        "Real-time Cohort Heatmap exposing that Trees (44% avg) is the class bottleneck, while celebrating Rahul's +34% jump.",
        "Prioritized Intervention Queue flagging at-risk students (Aman, Sneha).",
        "Human Review & Edit Modal: teachers review, modify, and authorize all pedagogical actions before delivery.",
        "AI Assessment Builder, Rubric Evaluator, and Lesson Assistant.",
      ],
      targetScreen: "teacher_dashboard",
      targetRole: true,
    },
    career: {
      title: "Placement Navigator & Resume Audit",
      badge: "Employability Alignment",
      description:
        "Directly connects classroom algorithms to campus placements, eradicating the gap between resume buzzwords and proven technical competency.",
      bullets: [
        "Career Match Navigator computing objective readiness % for Backend, Fullstack, and AI roles.",
        "Resume Claimed vs. Demonstrated Skill Analyzer exposing unverified claims.",
        "AI Technical Viva / Oral Interview Simulator with real-time feedback.",
      ],
      targetScreen: "career_skills",
      targetRole: false,
    },
  };

  const currentFeature = features[activeTab];

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. Hero Section */}
      <section className="bg-white border-[3px] border-[#0A2858] rounded-md p-6 md:p-10 shadow-[6px_6px_0px_#0A2858] relative overflow-hidden">
        <div className="max-w-4xl space-y-6">
          {/* Hackathon Track Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-[#EAF2FF] text-[#1867E8] border-[1.5px] border-[#0A2858] rounded-sm uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-[#1867E8]" />
              Lenovo LEAP Hackathon 2026 • AI in Education & Skilling Track
            </span>
            {/* <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold bg-[#DCFCE7] text-[#16A34A] border-[1.5px] border-[#0A2858] rounded-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All 22 Problems Implemented
            </span> */}
          </div>

          {/* Headline & Logo */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md bg-white p-2 border-[3px] border-[#0A2858] shadow-[4px_4px_0px_#0A2858] shrink-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="EduRaahi Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0A2858] tracking-tight leading-tight">
                EduRaahi
              </h1>
              <p className="font-heading font-bold text-lg sm:text-xl text-[#1867E8] tracking-tight">
                Continuous Competency Intelligence & Pedagogical Mentorship
              </p>
            </div>
          </div>

          {/* Value Proposition */}
          <blockquote className="border-l-[4px] border-[#1867E8] pl-4 py-1 text-base sm:text-lg font-mono font-bold text-[#0A2858] italic bg-[#F4F8FF] rounded-r-sm">
            “Know what you know. Discover what you don't. Learn what matters next.”
          </blockquote>

          <p className="font-body text-sm sm:text-base text-[#55729D] leading-relaxed max-w-3xl">
            Higher education tests give one flat percentage (e.g. 62%) that conceals foundational prerequisite gaps.
            Generic chatbots spoil learning by giving away answers. <strong>EduRaahi</strong> solves this with a{" "}
            <strong className="text-[#0A2858]">continuous closed-loop learning engine</strong>: mapping competencies onto a prerequisite DAG,
            diagnosing conceptual misconceptions with grounded Gemini AI reasoning, guiding through a 5-stage Socratic hint ladder,
            and empowering instructors with live cohort heatmaps and human-approved interventions.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleLaunchStudent}
              className="btn btn-primary text-sm px-5 py-3 flex items-center gap-2 shadow-[3px_3px_0px_#0A2858]"
            >
              <span>Launch Learner Cockpit (Rahul)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleLaunchTeacher}
              className="btn bg-[#0A2858] text-white hover:bg-[#123A7A] border-[2px] border-[#0A2858] shadow-[3px_3px_0px_#0A2858] text-sm px-5 py-3 flex items-center gap-2 font-heading font-bold uppercase tracking-wider"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Launch Instructor Console (Prof. Sharma)</span>
            </button>

            <button
              onClick={onOpenTour}
              className="btn btn-secondary text-sm px-4 py-3 flex items-center gap-2 shadow-[2px_2px_0px_#0A2858]"
            >
              <Sparkles className="w-4 h-4 text-[#1867E8]" />
              <span>How It Works (Interactive Tour)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Live System Telemetry Strip */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white border-[2px] border-[#0A2858] p-4 rounded-sm shadow-[3px_3px_0px_#0A2858]">
          <div className="text-[10px] font-mono font-bold uppercase text-[#8298BA]">Competition Scope</div>
          <div className="font-mono text-2xl font-extrabold text-[#0A2858] mt-1">22 / 22</div>
          <div className="text-xs font-mono text-[#1867E8]">Problems Solved</div>
        </div>

        <div className="bg-white border-[2px] border-[#0A2858] p-4 rounded-sm shadow-[3px_3px_0px_#0A2858]">
          <div className="text-[10px] font-mono font-bold uppercase text-[#8298BA]">State Engine</div>
          <div className="font-mono text-2xl font-extrabold text-[#0A2858] mt-1">100%</div>
          <div className="text-xs font-mono text-[#16A34A]">Deterministic Scoring</div>
        </div>

        <div className="bg-white border-[2px] border-[#0A2858] p-4 rounded-sm shadow-[3px_3px_0px_#0A2858]">
          <div className="text-[10px] font-mono font-bold uppercase text-[#8298BA]">Skill Dependency</div>
          <div className="font-mono text-2xl font-extrabold text-[#0A2858] mt-1">6 Nodes</div>
          <div className="text-xs font-mono text-[#1867E8]">Dynamic Prereq DAG</div>
        </div>

        <div className="bg-white border-[2px] border-[#0A2858] p-4 rounded-sm shadow-[3px_3px_0px_#0A2858]">
          <div className="text-[10px] font-mono font-bold uppercase text-[#8298BA]">Socratic Mentor</div>
          <div className="font-mono text-2xl font-extrabold text-[#0A2858] mt-1">5 Stages</div>
          <div className="text-xs font-mono text-[#D97706]">Hint Ladder Guardrail</div>
        </div>

        <div className="bg-white border-[2px] border-[#0A2858] p-4 rounded-sm shadow-[3px_3px_0px_#0A2858] col-span-2 md:col-span-1">
          <div className="text-[10px] font-mono font-bold uppercase text-[#8298BA]">Verifiable Jump</div>
          <div className="font-mono text-2xl font-extrabold text-[#16A34A] mt-1">+34%</div>
          <div className="text-xs font-mono text-[#0A2858]">Trees: 38% → 72%</div>
        </div>
      </section>

      {/* 3. The 3 System Breakdowns & How EduRaahi Solves Them */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <NeoBadge variant="dark">Why We Built EduRaahi</NeoBadge>
          <h2 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
            The 3 Failures of Modern Tech Education vs. Our Solution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border-[2px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#FEE2E2] border-[1.5px] border-[#DC2626] flex items-center justify-center text-[#DC2626] font-bold">
                ✕
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2858]">
                1. Flat Percentages Conceal Prerequisite Root Blockers
              </h3>
              <p className="font-body text-xs text-[#55729D] leading-relaxed">
                Traditional exams give a student "62% on Midterm". The student doesn't know that failing Binary Trees is actually rooted in a 41% deficiency in foundational Recursion.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-[1.5px] border-[#DDE7F5] bg-[#F4F8FF] p-3 rounded-sm">
              <div className="text-[11px] font-mono font-bold text-[#1867E8] uppercase">EduRaahi Fix:</div>
              <p className="font-body text-xs text-[#0A2858] mt-1">
                <strong>Prerequisite DAG Graph:</strong> Traces dependencies backward to expose and repair the root bottleneck before advancing.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-[2px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#FEF3C7] border-[1.5px] border-[#D97706] flex items-center justify-center text-[#D97706] font-bold">
                ⚠️
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2858]">
                2. Generic LLMs Spoil Thinking by Giving Full Code
              </h3>
              <p className="font-body text-xs text-[#55729D] leading-relaxed">
                When students query ChatGPT, the bot gives the full code solution in 3 seconds. Students copy-paste, gain an illusion of competence, but fail technical interviews.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-[1.5px] border-[#DDE7F5] bg-[#F4F8FF] p-3 rounded-sm">
              <div className="text-[11px] font-mono font-bold text-[#1867E8] uppercase">EduRaahi Fix:</div>
              <p className="font-body text-xs text-[#0A2858] mt-1">
                <strong>5-Stage Hint Ladder:</strong> Concept → Strategy → Pseudocode → Syntax → Solution, gated by automated verification questions.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-[2px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#E0E7FF] border-[1.5px] border-[#0A2858] flex items-center justify-center text-[#0A2858] font-bold">
                ⚡
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2858]">
                3. Teachers are Blind to Class Bottlenecks Until Exams
              </h3>
              <p className="font-body text-xs text-[#55729D] leading-relaxed">
                Faculty managing 100+ students cannot spot concept misconceptions until the final exam results come out. Interventions arrive weeks too late.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-[1.5px] border-[#DDE7F5] bg-[#F4F8FF] p-3 rounded-sm">
              <div className="text-[11px] font-mono font-bold text-[#1867E8] uppercase">EduRaahi Fix:</div>
              <p className="font-body text-xs text-[#0A2858] mt-1">
                <strong>Cohort Heatmaps & Human-in-the-Loop Queue:</strong> AI flags at-risk students and drafts actions; teachers review, edit, and dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Closed Intelligence Loop Interactive Diagram */}
      <section className="bg-white border-[3px] border-[#0A2858] p-6 md:p-8 rounded-md shadow-[5px_5px_0px_#0A2858]">
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <NeoBadge variant="accent">Core Architectural Innovation</NeoBadge>
            <span className="font-mono text-xs text-[#8298BA]">Continuous Feedback Engine</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
            The Continuous Closed Intelligence Loop
          </h2>
          <p className="font-body text-sm text-[#55729D]">
            How data flows from a student's first keystroke through AI reasoning, targeted remediation, and human teacher governance:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="bg-[#F4F8FF] border-[2px] border-[#0A2858] p-4 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#1867E8]">PHASE 01</span>
              <span className="w-5 h-5 rounded-full bg-[#1867E8] text-white font-mono text-xs font-bold flex items-center justify-center">1</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-[#0A2858]">Student Diagnostic</h4>
            <p className="font-body text-xs text-[#55729D]">
              Student completes multi-topic diagnostic. Deterministic engine computes exact per-skill breakdown (Trees 38%, Arrays 85%).
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F4F8FF] border-[2px] border-[#0A2858] p-4 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#1867E8]">PHASE 02</span>
              <span className="w-5 h-5 rounded-full bg-[#1867E8] text-white font-mono text-xs font-bold flex items-center justify-center">2</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-[#0A2858]">Grounded AI Reasoning</h4>
            <p className="font-body text-xs text-[#55729D]">
              Gemini diagnoses exact misconception: "Confused root-first pre-order with sorted in-order traversal", citing error evidence.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F4F8FF] border-[2px] border-[#0A2858] p-4 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#1867E8]">PHASE 03</span>
              <span className="w-5 h-5 rounded-full bg-[#1867E8] text-white font-mono text-xs font-bold flex items-center justify-center">3</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-[#0A2858]">Targeted Remediation</h4>
            <p className="font-body text-xs text-[#55729D]">
              Socratic hint ladder guides practice. Rahul takes targeted test and achieves measurable +34% leap (38% → 72%).
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#F4F8FF] border-[2px] border-[#0A2858] p-4 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#1867E8]">PHASE 04</span>
              <span className="w-5 h-5 rounded-full bg-[#1867E8] text-white font-mono text-xs font-bold flex items-center justify-center">4</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-[#0A2858]">Teacher Closed-Loop</h4>
            <p className="font-body text-xs text-[#55729D]">
              Cohort heatmap highlights class weakness. Teacher reviews AI-drafted intervention, edits notes, and approves dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Interactive Feature Deep Dive Showcase */}
      <section className="bg-white border-[3px] border-[#0A2858] p-6 md:p-8 rounded-md shadow-[5px_5px_0px_#0A2858] space-y-6">
        <div>
          <NeoBadge variant="accent">Complete Functional Coverage</NeoBadge>
          <h2 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight mt-1">
            Explore EduRaahi Feature Consoles
          </h2>
          <p className="font-body text-sm text-[#55729D]">
            Select an operational module to see how it solves core education & skilling challenges:
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b-[2px] border-[#0A2858] pb-3">
          {[
            { id: "learner", label: "Learner Cockpit", icon: Brain },
            { id: "assessment", label: "Diagnostic & Practice", icon: Target },
            { id: "socratic", label: "Socratic AI Tutor", icon: Sparkles },
            { id: "teacher", label: "Teacher Console", icon: GraduationCap },
            { id: "career", label: "Career & Resume Audit", icon: Briefcase },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-sm border-[2px] transition-all ${
                  isActive
                    ? "bg-[#1867E8] text-white border-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
                    : "bg-white text-[#0A2858] border-transparent hover:border-[#0A2858] hover:bg-[#F4F8FF]"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Detail Panel */}
        <div className="bg-[#F4F8FF] border-[2px] border-[#0A2858] p-6 rounded-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <NeoBadge variant="info">{currentFeature.badge}</NeoBadge>
              <h3 className="font-heading font-extrabold text-xl text-[#0A2858] mt-1">
                {currentFeature.title}
              </h3>
            </div>
            <button
              onClick={() => {
                if (onRoleChange) onRoleChange(currentFeature.targetRole);
                if (onNavigate) onNavigate(currentFeature.targetScreen);
              }}
              className="btn btn-primary text-xs px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Launch This Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="font-body text-sm text-[#0A2858] leading-relaxed">
            {currentFeature.description}
          </p>

          <div className="space-y-2 pt-2">
            <h5 className="font-mono text-xs font-bold uppercase text-[#55729D]">
              Key Functional Capabilities:
            </h5>
            <ul className="space-y-1.5">
              {currentFeature.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-xs text-[#0A2858]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Demo Personas: One-Click Launch */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <NeoBadge variant="dark">Instant Role Switching</NeoBadge>
          <h2 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
            Meet the Demo Personas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Persona 1: Rahul */}
          <div className="bg-white border-[2px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#1867E8] text-white flex items-center justify-center font-heading font-bold text-xl border-[2px] border-[#0A2858] shadow-[2px_2px_0px_#0A2858]">
                RS
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                  Rahul Sharma (Student)
                </h3>
                <p className="font-mono text-xs text-[#55729D]">
                  3rd-Year B.Tech CS • Target: Backend Software Engineer
                </p>
              </div>
            </div>

            <p className="font-body text-xs text-[#55729D] leading-relaxed">
              Takes the 10-Question Diagnostic (58% baseline), identifies a critical Tree Traversal gap (38%) stemming from Recursion (41%), uses the Socratic Hint Ladder, and achieves a +34% jump to 72%!
            </p>

            <button
              onClick={handleLaunchStudent}
              className="w-full btn btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <span>Enter Cockpit as Rahul (Student)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Persona 2: Prof. Sharma */}
          <div className="bg-white border-[2px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#0A2858] text-white flex items-center justify-center font-heading font-bold text-xl border-[2px] border-[#0A2858] shadow-[2px_2px_0px_#0A2858]">
                PS
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                  Prof. Sharma (Instructor)
                </h3>
                <p className="font-mono text-xs text-[#55729D]">
                  Head of Algorithms Course • Managing 60 Undergrads
                </p>
              </div>
            </div>

            <p className="font-body text-xs text-[#55729D] leading-relaxed">
              Monitors the Class 3A Heatmap (discovers Trees at 44% avg), views Rahul's +34% improvement in green, reviews AI-drafted intervention plans for at-risk peers, and edits & approves assignments.
            </p>

            <button
              onClick={handleLaunchTeacher}
              className="w-full btn bg-[#0A2858] text-white hover:bg-[#123A7A] border-[2px] border-[#0A2858] shadow-[2px_2px_0px_#0A2858] text-xs py-2.5 flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enter Console as Prof. Sharma (Teacher)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Quick 3-Minute Rehearsal Guide */}
      <section className="bg-[#0A2858] text-white border-[3px] border-[#0A2858] p-6 md:p-8 rounded-md shadow-[6px_6px_0px_#1867E8] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FBBF24]" />
            <h3 className="font-heading font-extrabold text-xl tracking-tight text-white">
              The 3-Minute Winning Demo Flow for Hackathon Judges
            </h3>
          </div>
          <button
            onClick={onOpenTour}
            className="hidden sm:flex items-center gap-1 text-xs font-mono text-[#F4F8FF] hover:underline"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Open Interactive Tour</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-white/10 p-3 rounded-sm border border-white/20 space-y-1">
            <span className="text-[#FBBF24] font-bold">01. Baseline Diagnostic</span>
            <p className="text-white/80 font-body text-xs">
              Log in as Rahul → Click "Take Diagnostic (10 Qs)" → Click "Pre-fill Simulation" → Baseline score 58%.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-sm border border-white/20 space-y-1">
            <span className="text-[#FBBF24] font-bold">02. Inspect DAG & Gap</span>
            <p className="text-white/80 font-body text-xs">
              Open Learning Intelligence → Click Tree node (38%) → Notice Recursion blocker (41%) & AI misconception alert.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-sm border border-white/20 space-y-1">
            <span className="text-[#FBBF24] font-bold">03. Socratic Mentor</span>
            <p className="text-white/80 font-body text-xs">
              Open Guided AI Tutor → Observe 5-stage hint ladder refusing to give code before concept verification.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-sm border border-white/20 space-y-1">
            <span className="text-[#FBBF24] font-bold">04. The +34% Leap!</span>
            <p className="text-white/80 font-body text-xs">
              Take Tree Traversal practice test → Submit → Trees jumps 38% → 72% (+34 points!) in green.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-sm border border-white/20 space-y-1">
            <span className="text-[#FBBF24] font-bold">05. Teacher Cohort Heatmap</span>
            <p className="text-white/80 font-body text-xs">
              Switch role to Prof. Sharma → Inspect Class Heatmap (Trees 44% avg) & Rahul's green leap.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-sm border border-white/20 space-y-1">
            <span className="text-[#FBBF24] font-bold">06. Human-in-the-Loop</span>
            <p className="text-white/80 font-body text-xs">
              Open Intervention Queue → Click "Review & Approve" on Aman → Edit notes → "Approve & Dispatch".
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
