"use client";

import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brain,
  Layers,
  GraduationCap,
  Briefcase,
  Target,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import NeoButton from "./NeoButton";
import NeoBadge from "./NeoBadge";

const TOUR_STEPS = [
  {
    step: 1,
    title: "The Problem & The Closed Loop",
    badge: "P01, P04 • Architecture",
    badgeVariant: "accent",
    icon: Target,
    summary:
      "Traditional exams give a single flat percentage (e.g. 62%) that hides foundational gaps. EduRaahi replaces one-shot testing with a continuous closed-loop learning engine.",
    howItWorks: [
      "Every attempt updates a 6-skill dependency graph (DAG) in real time.",
      "Scoring and mastery calculations are 100% deterministic code — zero AI grading hallucination.",
      "Google Gemini provides pedagogical reasoning, misconception diagnosis, and personalized next actions.",
    ],
    tryItAction: {
      label: "Open Learner Cockpit",
      section: "student_dashboard",
      role: "student",
    },
  },
  {
    step: 2,
    title: "Dependency DAG & Misconception Engine",
    badge: "P02, P03 • Core Intelligence",
    badgeVariant: "info",
    icon: Layers,
    summary:
      "Students don't just see wrong answers — they uncover root conceptual misconceptions and prerequisite blockers.",
    howItWorks: [
      "Interactive graph maps skill dependencies (Complexity → Arrays → Recursion → Trees → Graphs).",
      "Notice that Rahul's Tree Traversal weakness (38%) is directly caused by an unmastered Recursion prerequisite (41%).",
      "AI detects mental model flaws: 'Confusing pre-order root-first processing with in-order BST sorting'.",
    ],
    tryItAction: {
      label: "Explore Skill Graph & Gaps",
      section: "learning_intelligence",
      role: "student",
    },
  },
  {
    step: 3,
    title: "Adaptive Assessment & The +34% Leap",
    badge: "P05, P10 • Measurable Mastery",
    badgeVariant: "success",
    icon: CheckCircle,
    summary:
      "Witness a concrete, measurable jump in student competency through targeted practice.",
    howItWorks: [
      "Student Rahul begins with a 58% baseline on the 10-Question Diagnostic.",
      "Take the 5-Question Tree Traversal targeted practice (use the 1-click simulation pre-fill).",
      "Submit to watch Trees mastery deterministically surge from 38% → 72% (+34 points!).",
    ],
    tryItAction: {
      label: "Try Targeted Assessment",
      section: "assess_improve",
      role: "student",
    },
  },
  {
    step: 4,
    title: "Guided Socratic AI Mentor (Hint Ladder)",
    badge: "P08 • Pedagogical Guardrail",
    badgeVariant: "warning",
    icon: Sparkles,
    summary:
      "Generic chatbots ruin learning by immediately giving away the complete code. EduRaahi enforces a strict 5-stage hint ladder.",
    howItWorks: [
      "Stage 1: Conceptual Nudge (pinpoints the invariant without giving code).",
      "Stage 2: Algorithmic Strategy (recursive breakdown).",
      "Stages 3–5: Pseudocode, syntax trace, and final solution with reflection.",
      "Includes an automated comprehension verification test before unlocking code.",
    ],
    tryItAction: {
      label: "Launch Socratic AI Tutor",
      section: "ai_tutor",
      role: "student",
    },
  },
  {
    step: 5,
    title: "Teacher Console & Human-in-the-Loop Interventions",
    badge: "P19, P20, P21 • Educator Power",
    badgeVariant: "accent",
    icon: GraduationCap,
    summary:
      "Empowers instructors with instant cohort diagnostic heatmaps and human-reviewed intervention governance.",
    howItWorks: [
      "Class Heatmap exposes cohort-wide bottlenecks (Trees at 44% avg) and spotlights Rahul's +34% improvement.",
      "Intervention Queue flags at-risk students (Aman, Sneha) with drafted pedagogical action plans.",
      "Teachers retain full authority: edit AI recommendations, adjust deadlines, and click 'Approve & Dispatch'.",
    ],
    tryItAction: {
      label: "Open Teacher Heatmap & Queue",
      section: "teacher_dashboard",
      role: "teacher",
    },
  },
  {
    step: 6,
    title: "Career Matching & Resume Reality Check",
    badge: "P14, P16, P17 • Employability",
    badgeVariant: "danger",
    icon: Briefcase,
    summary:
      "Bridges the college-to-career gap by aligning coursework with industry placement requirements.",
    howItWorks: [
      "Career Match Navigator calculates objective readiness for target roles (e.g. Backend Engineer: 58%).",
      "Resume Skill Gap Analyzer compares buzzwords claimed on student resumes against empirically demonstrated test scores.",
      "Interactive Technical Viva Simulator provides real-time oral interview practice.",
    ],
    tryItAction: {
      label: "Inspect Career & Resume Audit",
      section: "career_skills",
      role: "student",
    },
  },
];

export default function ProductTourModal({ isOpen, onClose, onNavigate, onRoleChange }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const Icon = currentStep.icon;

  const handleActionJump = () => {
    if (onRoleChange && currentStep.tryItAction.role) {
      onRoleChange(currentStep.tryItAction.role === "teacher");
    }
    if (onNavigate) {
      onNavigate(currentStep.tryItAction.section);
    }
    onClose();
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2858]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border-[3px] border-[#0A2858] rounded-md shadow-[6px_6px_0px_#0A2858] max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-[#F4F8FF] border-b-[2px] border-[#0A2858] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-white p-1 border-[1.5px] border-[#0A2858] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0A2858]">
              <img src="/logo.png" alt="EduRaahi" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-[#0A2858] uppercase tracking-tight">
                  Platform Tour & Architecture Guide
                </h3>
              </div>
              <p className="text-xs font-mono text-[#55729D]">
                Step {currentStepIndex + 1} of {TOUR_STEPS.length} • EduRaahi Closed-Loop Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm border-[1.5px] border-[#0A2858] bg-white hover:bg-[#FEE2E2] flex items-center justify-center text-[#0A2858] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Segment Bar */}
        <div className="grid grid-cols-6 border-b-[2px] border-[#0A2858] bg-white">
          {TOUR_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(idx)}
              className={`py-1.5 px-2 text-center font-mono text-[11px] font-bold transition-all border-r border-[#0A2858] last:border-r-0 ${
                idx === currentStepIndex
                  ? "bg-[#1867E8] text-white"
                  : idx < currentStepIndex
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : "bg-white text-[#8298BA] hover:bg-[#F4F8FF]"
              }`}
            >
              0{s.step}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#EAF2FF] border-[2px] border-[#0A2858] flex items-center justify-center text-[#1867E8] shadow-[2px_2px_0px_#0A2858] shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <NeoBadge variant={currentStep.badgeVariant}>{currentStep.badge}</NeoBadge>
                <h2 className="font-heading font-extrabold text-xl text-[#0A2858] tracking-tight mt-1">
                  {currentStep.title}
                </h2>
              </div>
            </div>
          </div>

          <p className="font-body text-sm text-[#0A2858] leading-relaxed bg-[#F4F8FF] p-3 rounded-sm border-[1.5px] border-[#0A2858]">
            {currentStep.summary}
          </p>

          <div className="space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#55729D]">
              How it works & What to observe:
            </h4>
            <ul className="space-y-2 font-body text-xs text-[#0A2858]">
              {currentStep.howItWorks.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#1867E8] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Jump Action Banner */}
          <div className="p-3.5 bg-white border-[2px] border-[#0A2858] rounded-sm shadow-[3px_3px_0px_#0A2858] flex items-center justify-between">
            <div className="text-xs font-mono text-[#55729D]">
              Target View: <strong className="text-[#0A2858]">{currentStep.tryItAction.label}</strong>
            </div>
            <button
              onClick={handleActionJump}
              className="btn btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              <span>Jump to this Feature</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#F4F8FF] border-t-[2px] border-[#0A2858] p-4 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-1 ${
              currentStepIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`w-2.5 h-2.5 rounded-full border border-[#0A2858] transition-all ${
                  i === currentStepIndex ? "bg-[#1867E8] w-6" : "bg-white"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="btn btn-primary text-xs px-4 py-1.5 flex items-center gap-1"
          >
            <span>{currentStepIndex === TOUR_STEPS.length - 1 ? "Finish Tour" : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
