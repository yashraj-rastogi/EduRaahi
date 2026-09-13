"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  Layers,
  Compass,
  Briefcase,
  Target,
  CheckCircle,
  X,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import { guidedTutorStep, careerCounselorStep } from "../../lib/aiService";
import { storageService } from "../../lib/storage";

export default function GuidedAITutor({ onNavigate }) {
  // Tutor Mode: "socratic" | "career"
  const [activeMode, setActiveMode] = useState("socratic");

  // --- SOCRATIC / DOUBT SOLVER STATE ---
  const [topic, setTopic] = useState("Tree Traversal & BST");
  const [ladderPosition, setLadderPosition] = useState(1);
  const [inputMessage, setInputMessage] = useState("");
  const [activeDoubt, setActiveDoubt] = useState(null);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "tutor",
      text: "Hello Rahul! I'm your Socratic Coding Mentor. Instead of simply handing you solutions, I guide you through problems step by step. What concept or problem are you working through right now?",
      verificationQuestion: "Are you ready to explore how recursive In-Order tree traversal works?",
      ladder: 1,
    },
  ]);

  // --- CAREER COUNSELOR STATE ---
  const [counselorStepIdx, setCounselorStepIdx] = useState(1);
  const [counselorInput, setCounselorInput] = useState("");
  const [counselorLoading, setCounselorLoading] = useState(false);
  const [careerRecommendation, setCareerRecommendation] = useState(null);
  const [counselorMessages, setCounselorMessages] = useState([
    {
      role: "counselor",
      text: "Welcome to AI Career Counseling! I help you discover the ideal technology trajectory tailored to your personal strengths, curiosities, and industry domain aspirations. Let's start: What type of engineering problems or domains excite you most (e.g. backend systems, AI/ML, cloud DevOps, security, or building mobile apps)?",
    },
  ]);

  // Load active doubt from storage on mount
  useEffect(() => {
    const doubt = storageService.getActiveDoubt();
    if (doubt) {
      setActiveDoubt(doubt);
      setActiveMode("socratic");
      setTopic(doubt.skillId ? doubt.skillId.replace("_", " ").toUpperCase() : "Assessment Review");
      setMessages([
        {
          role: "tutor",
          text: `I noticed you're reviewing a question from your recent assessment:\n\n📌 **Question:** "${doubt.questionText}"\n\nYour Answer: **${doubt.studentAnswer}**\nCorrect Answer: **${doubt.correctAnswer}**\n\n💡 **Diagnosed Misconception:** ${doubt.detectedMisconception || "Conceptual gap in algorithm execution ordering"}.\n\nLet's walk through this SOCRATICALLY so you master it for good! What do you think happened when the computer executed your chosen option?`,
          verificationQuestion: "Can you identify which line of logic diverged from the expected output?",
          ladder: 1,
        },
      ]);
    }
  }, []);

  const ladderLabels = {
    1: "1: Conceptual Hint",
    2: "2: Structural Cue",
    3: "3: Logic & Approach",
    4: "4: Pseudocode",
    5: "5: Working Code",
  };

  // --- Socratic Tutor Message Handler ---
  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || loading) return;

    const newMessages = [...messages, { role: "student", text: textToSend }];
    setMessages(newMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await guidedTutorStep({
        message: textToSend,
        ladderPosition,
        topic,
        lastAnswer: textToSend,
      });

      setMessages([
        ...newMessages,
        {
          role: "tutor",
          text: response.reply,
          verificationQuestion: response.verificationQuestion,
          ladder: ladderPosition,
        },
      ]);

      if (response.nextLadderPosition) {
        setLadderPosition(response.nextLadderPosition);
      }
    } catch (e) {
      console.error("Tutor error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestNextHint = () => {
    const nextPos = Math.min(5, ladderPosition + 1);
    setLadderPosition(nextPos);
    handleSendMessage(`I need the next step of guidance: ${ladderLabels[nextPos] || ""}`);
  };

  const handleClearDoubt = () => {
    storageService.clearActiveDoubt();
    setActiveDoubt(null);
    setTopic("Tree Traversal & BST");
    setLadderPosition(1);
    setMessages([
      {
        role: "tutor",
        text: "Doubt cleared! We're back to general Socratic mentorship. What coding concept, algorithm, or data structure would you like to master next?",
        verificationQuestion: "Would you like to practice recursion, dynamic programming, or graphs?",
        ladder: 1,
      },
    ]);
  };

  // --- Career Counselor Message Handler ---
  const handleSendCounselorMessage = async (customText = null) => {
    const textToSend = customText || counselorInput;
    if (!textToSend.trim() || counselorLoading) return;

    const newHistory = [...counselorMessages, { role: "student", text: textToSend }];
    setCounselorMessages(newHistory);
    setCounselorInput("");
    setCounselorLoading(true);

    try {
      const response = await careerCounselorStep({
        message: textToSend,
        step: counselorStepIdx,
        conversationHistory: newHistory,
      });

      setCounselorMessages([
        ...newHistory,
        {
          role: "counselor",
          text: response.reply,
        },
      ]);

      if (response.nextStep) {
        setCounselorStepIdx(response.nextStep);
      }

      if (response.recommendedProfile) {
        setCareerRecommendation(response.recommendedProfile);
      }
    } catch (err) {
      console.error("Counselor error:", err);
    } finally {
      setCounselorLoading(false);
    }
  };

  const handleApplyCareerRecommendation = (rec) => {
    if (!rec) return;
    const uid = storageService.getCurrentUser().id;

    // Save as active career goal
    storageService.saveCareerGoal(uid, {
      targetRole: rec.role,
      targetDomain: rec.domain,
      readinessScore: rec.matchScore || 75,
      timeline: rec.timeline || "6 months",
      benchmarks: [
        { skill: "Core Data Structures", current: 78, required: 85 },
        { skill: "System Architecture", current: 55, required: 80 },
        { skill: "Domain Tooling", current: 60, required: 85 },
        { skill: "Database Optimization", current: 65, required: 80 },
      ],
    });

    if (rec.roadmap) {
      storageService.saveCustomCareerRoadmap(uid, {
        targetRole: rec.role,
        targetDomain: rec.domain,
        timeline: rec.timeline || "6 months",
        ...rec.roadmap,
      });
    }

    if (onNavigate) {
      onNavigate("career_skills");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Cockpit Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
              AI Socratic & Career Guidance
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              Guided AI Mentor
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Solve test doubts with Socratic hint ladders, or discover tailored industry trajectories with interactive career counseling.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm">
          <button
            onClick={() => setActiveMode("socratic")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-heading text-xs font-bold transition-all ${
              activeMode === "socratic"
                ? "bg-[#1867E8] text-white shadow-[2px_2px_0px_#0A2858]"
                : "text-[#0A2858] hover:bg-white"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Code & Doubt Mentor</span>
          </button>
          <button
            onClick={() => setActiveMode("career")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-heading text-xs font-bold transition-all ${
              activeMode === "career"
                ? "bg-[#1867E8] text-white shadow-[2px_2px_0px_#0A2858]"
                : "text-[#0A2858] hover:bg-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Career Counselor</span>
          </button>
        </div>
      </div>

      {/* ================= MODE 1: SOCRATIC & DOUBT MENTOR ================= */}
      {activeMode === "socratic" && (
        <div className="space-y-4">
          {/* Active Doubt Banner (if routed from Assessment) */}
          {activeDoubt && (
            <div className="bg-[#FFF8E7] border-[2px] border-[#0A2858] p-4 rounded-md shadow-[3px_3px_0px_#0A2858] animate-fade-in">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase bg-[#FFD43B] text-[#0A2858] px-2 py-0.5 border border-[#0A2858] rounded-xs">
                      Active Test Doubt Under Review
                    </span>
                    <span className="text-xs font-mono text-[#55729D]">
                      Question #{activeDoubt.questionIndex}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#0A2858]">
                    {activeDoubt.questionText}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs pt-1">
                    <div className="p-2 bg-white border border-[#0A2858] rounded-xs">
                      <span className="text-[#DC2626] font-bold">Your Selection:</span>{" "}
                      <span className="text-[#0A2858]">{activeDoubt.studentAnswer}</span>
                    </div>
                    <div className="p-2 bg-white border border-[#0A2858] rounded-xs">
                      <span className="text-[#16A34A] font-bold">Correct Solution:</span>{" "}
                      <span className="text-[#0A2858]">{activeDoubt.correctAnswer}</span>
                    </div>
                  </div>
                  {activeDoubt.detectedMisconception && (
                    <div className="text-xs font-body text-[#0A2858] bg-white p-2 border border-[#0A2858] rounded-xs">
                      <strong>Diagnosed Misconception:</strong> {activeDoubt.detectedMisconception}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleClearDoubt}
                  title="Clear Doubt"
                  className="p-1.5 bg-white border border-[#0A2858] rounded-xs hover:bg-[#F4F8FF] text-[#55729D] hover:text-[#DC2626] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Main Chat Cockpit */}
          <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858] p-0 overflow-hidden">
            {/* Topic Selector & Safeguard Notice */}
            <div className="bg-[#EAF2FF] border-b-2 border-[#0A2858] px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1867E8]" />
                <span className="font-mono text-xs font-bold uppercase text-[#0A2858]">
                  Active Focus: {topic}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold bg-white border border-[#0A2858] px-2.5 py-1 rounded-xs">
                  <span>Ladder:</span>
                  <span className="text-[#1867E8]">{ladderLabels[ladderPosition]}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#55729D]">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#1867E8]" />
                  <span className="hidden sm:inline">Anti-Cheat Ladder Active</span>
                </div>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="p-4 md:p-6 space-y-4 max-h-[480px] overflow-y-auto bg-[#F4F8FF]">
              {messages.map((m, idx) => {
                const isTutor = m.role === "tutor";
                return (
                  <div
                    key={idx}
                    className={`flex gap-3 ${isTutor ? "justify-start" : "justify-end"}`}
                  >
                    {isTutor && (
                      <div className="w-8 h-8 rounded-sm bg-[#1867E8] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#0A2858]">
                        AI
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] md:max-w-[75%] p-4 rounded-md border-[2px] border-[#0A2858] ${
                        isTutor
                          ? "bg-white text-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
                          : "bg-[#1867E8] text-white shadow-[2px_2px_0px_#0A2858]"
                      }`}
                    >
                      <p className="font-body text-sm whitespace-pre-wrap leading-relaxed">
                        {m.text}
                      </p>

                      {/* Verification Question Callout */}
                      {m.verificationQuestion && (
                        <div className="mt-3 pt-3 border-t border-[#DDE7F5] bg-[#EAF2FF] p-2.5 rounded-xs border border-[#0A2858] text-[#0A2858] font-mono text-xs">
                          🔍 <strong>Mastery Verification:</strong> {m.verificationQuestion}
                        </div>
                      )}
                    </div>

                    {!isTutor && (
                      <div className="w-8 h-8 rounded-sm bg-[#0A2858] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-[#0A2858]">
                        RS
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#55729D] italic">
                  <Sparkles className="w-4 h-4 animate-spin text-[#1867E8]" />
                  <span>Socratic mentor reasoning...</span>
                </div>
              )}
            </div>

            {/* Suggested Quick Prompt Chips */}
            <div className="px-4 py-2.5 bg-white border-t-2 border-[#DDE7F5] flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8298BA]">
                Suggested Prompts:
              </span>
              <button
                onClick={() => handleSendMessage("Why do we explore the left subtree before visiting the root node?")}
                className="text-xs font-mono bg-[#F4F8FF] hover:bg-[#EAF2FF] text-[#0A2858] px-2.5 py-1 rounded-sm border border-[#0A2858]"
              >
                Why visit left before root?
              </button>
              <button
                onClick={() => handleSendMessage("How does call stack unwinding preserve variable values?")}
                className="text-xs font-mono bg-[#F4F8FF] hover:bg-[#EAF2FF] text-[#0A2858] px-2.5 py-1 rounded-sm border border-[#0A2858]"
              >
                How does call stack unwind?
              </button>
              <button
                onClick={handleRequestNextHint}
                className="text-xs font-mono bg-[#DCE9FF] text-[#1867E8] font-bold px-2.5 py-1 rounded-sm border border-[#0A2858] ml-auto hover:bg-[#1867E8] hover:text-white transition-colors"
              >
                + Next Ladder Hint →
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t-2 border-[#0A2858] flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={
                  activeDoubt
                    ? "Explain what you thought the code was doing..."
                    : "Type your explanation or ask a question..."
                }
                className="flex-1 p-2.5 bg-[#F4F8FF] text-[#0A2858] font-body text-sm border-[2px] border-[#0A2858] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1867E8]"
              />
              <NeoButton
                variant="primary"
                size="md"
                onClick={() => handleSendMessage()}
                disabled={loading || !inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </NeoButton>
            </div>
          </NeoCard>
        </div>
      )}

      {/* ================= MODE 2: CAREER COUNSELOR & DISCOVERY ================= */}
      {activeMode === "career" && (
        <div className="space-y-4">
          <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858] p-0 overflow-hidden">
            {/* Header / Counseling Stage */}
            <div className="bg-[#EAF2FF] border-b-2 border-[#0A2858] px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#1867E8]" />
                <span className="font-mono text-xs font-bold uppercase text-[#0A2858]">
                  Stage {counselorStepIdx} of 4 • Career Discovery Dialogue
                </span>
              </div>

              <span className="text-xs font-mono text-[#55729D]">
                Grounded in Verified Competency Profile
              </span>
            </div>

            {/* Chat Log */}
            <div className="p-4 md:p-6 space-y-4 max-h-[480px] overflow-y-auto bg-[#F4F8FF]">
              {counselorMessages.map((m, idx) => {
                const isCounselor = m.role === "counselor";
                return (
                  <div
                    key={idx}
                    className={`flex gap-3 ${isCounselor ? "justify-start" : "justify-end"}`}
                  >
                    {isCounselor && (
                      <div className="w-8 h-8 rounded-sm bg-[#1867E8] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#0A2858]">
                        <Compass className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] md:max-w-[75%] p-4 rounded-md border-[2px] border-[#0A2858] ${
                        isCounselor
                          ? "bg-white text-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
                          : "bg-[#1867E8] text-white shadow-[2px_2px_0px_#0A2858]"
                      }`}
                    >
                      <p className="font-body text-sm whitespace-pre-wrap leading-relaxed">
                        {m.text}
                      </p>
                    </div>

                    {!isCounselor && (
                      <div className="w-8 h-8 rounded-sm bg-[#0A2858] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-[#0A2858]">
                        RS
                      </div>
                    )}
                  </div>
                );
              })}

              {counselorLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#55729D] italic">
                  <Sparkles className="w-4 h-4 animate-spin text-[#1867E8]" />
                  <span>Counselor synthesizing industry trends & skill profile...</span>
                </div>
              )}
            </div>

            {/* Quick Answer Chips */}
            <div className="px-4 py-2.5 bg-white border-t-2 border-[#DDE7F5] flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8298BA]">
                Quick Responses:
              </span>
              <button
                onClick={() =>
                  handleSendCounselorMessage(
                    "I love scalable backend distributed systems in high-growth fintech environments."
                  )
                }
                className="text-xs font-mono bg-[#F4F8FF] hover:bg-[#EAF2FF] text-[#0A2858] px-2.5 py-1 rounded-sm border border-[#0A2858]"
              >
                Backend & Fintech Systems
              </button>
              <button
                onClick={() =>
                  handleSendCounselorMessage(
                    "I want to specialize in Cloud DevOps, Kubernetes orchestration, and CI/CD automation."
                  )
                }
                className="text-xs font-mono bg-[#F4F8FF] hover:bg-[#EAF2FF] text-[#0A2858] px-2.5 py-1 rounded-sm border border-[#0A2858]"
              >
                Cloud Infrastructure & DevOps
              </button>
              <button
                onClick={() =>
                  handleSendCounselorMessage(
                    "I want to build full-stack web products with modern frameworks and AI integrations."
                  )
                }
                className="text-xs font-mono bg-[#F4F8FF] hover:bg-[#EAF2FF] text-[#0A2858] px-2.5 py-1 rounded-sm border border-[#0A2858]"
              >
                Full-Stack AI Products
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t-2 border-[#0A2858] flex items-center gap-2">
              <input
                type="text"
                value={counselorInput}
                onChange={(e) => setCounselorInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCounselorMessage()}
                placeholder="Share your interests, preferred industries, or work style..."
                className="flex-1 p-2.5 bg-[#F4F8FF] text-[#0A2858] font-body text-sm border-[2px] border-[#0A2858] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1867E8]"
              />
              <NeoButton
                variant="primary"
                size="md"
                onClick={() => handleSendCounselorMessage()}
                disabled={counselorLoading || !counselorInput.trim()}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Reply</span>
              </NeoButton>
            </div>
          </NeoCard>

          {/* Recommended Career Profile Card (when generated) */}
          {careerRecommendation && (
            <div className="bg-white border-[3px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] animate-fade-in space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#DDE7F5] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
                      AI Recommended Pathway
                    </span>
                    <span className="font-mono text-xs font-bold text-[#16A34A]">
                      ★ {careerRecommendation.matchScore}% Platform Fit
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#0A2858] mt-1">
                    {careerRecommendation.role} • {careerRecommendation.domain}
                  </h3>
                </div>

                <NeoButton
                  variant="primary"
                  size="md"
                  onClick={() => handleApplyCareerRecommendation(careerRecommendation)}
                >
                  <Briefcase className="w-4 h-4 mr-1.5" />
                  <span>Apply Roadmap to Career & Skills 🚀</span>
                </NeoButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs">
                  <span className="font-mono text-xs font-bold text-[#55729D] uppercase block">
                    Recommended Timeline
                  </span>
                  <span className="font-heading font-extrabold text-lg text-[#0A2858]">
                    {careerRecommendation.timeline || "6 Months"}
                  </span>
                </div>
                <div className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs">
                  <span className="font-mono text-xs font-bold text-[#55729D] uppercase block">
                    Primary Strength
                  </span>
                  <span className="font-heading font-extrabold text-base text-[#16A34A]">
                    Arrays & Core Logic (85%)
                  </span>
                </div>
                <div className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-xs">
                  <span className="font-mono text-xs font-bold text-[#55729D] uppercase block">
                    Target Skill Gap
                  </span>
                  <span className="font-heading font-extrabold text-base text-[#DC2626]">
                    Distributed Caching & DB
                  </span>
                </div>
              </div>

              {/* 4 Phases Preview */}
              {careerRecommendation.roadmap?.phases && (
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs font-bold uppercase text-[#0A2858] block">
                    Personalized 4-Phase Roadmap Summary:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {careerRecommendation.roadmap.phases.map((ph, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#EAF2FF] border border-[#0A2858] rounded-xs text-xs"
                      >
                        <span className="font-mono font-bold text-[#1867E8] block">
                          Phase {idx + 1}: {ph.phase}
                        </span>
                        <p className="font-body text-[#0A2858] mt-1 line-clamp-2">
                          {ph.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
