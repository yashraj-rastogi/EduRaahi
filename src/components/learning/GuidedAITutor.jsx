"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Send,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import { guidedTutorStep } from "../../lib/aiService";

export default function GuidedAITutor({ onNavigate }) {
  const [topic, setTopic] = useState("Tree Traversal & BST");
  const [ladderPosition, setLadderPosition] = useState(1);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "tutor",
      text: "Hello Rahul! I'm your Socratic Coding Mentor. Instead of simply handing you solutions, I guide you through problems step by step. What concept or problem are you working through right now?",
      verificationQuestion: "Are you ready to explore how recursive In-Order tree traversal works?",
      ladder: 1,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const ladderLabels = {
    1: "1: Conceptual Hint",
    2: "2: Structural Cue",
    3: "3: Logic & Approach",
    4: "4: Pseudocode",
    5: "5: Working Code",
  };

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

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Cockpit Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
              Screen S09 • Socratic Mentor
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              Guided AI Tutor
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Strict Hint Ladder: Progressive assistance designed to build genuine conceptual mastery, not answers.
          </p>
        </div>

        {/* Current Ladder Position Indicator */}
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold bg-[#EAF2FF] border-[1.5px] border-[#0A2858] px-3 py-1.5 rounded-sm">
          <span>Ladder:</span>
          <span className="text-[#1867E8]">{ladderLabels[ladderPosition]}</span>
        </div>
      </div>

      {/* Main Chat Cockpit */}
      <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858] p-0 overflow-hidden">
        {/* Topic Selector & Safeguard Notice */}
        <div className="bg-[#EAF2FF] border-b-2 border-[#0A2858] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1867E8]" />
            <span className="font-mono text-xs font-bold uppercase text-[#0A2858]">
              Active Topic: {topic}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#55729D]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#1867E8]" />
            <span className="hidden sm:inline">Anti-Cheat Ladder Active</span>
          </div>
        </div>

        {/* Chat Messages Log */}
        <div className="p-4 md:p-6 space-y-4 max-h-[500px] overflow-y-auto bg-[#F4F8FF]">
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
                      🔍 <strong>Understanding Check:</strong> {m.verificationQuestion}
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
            Quick Prompts:
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
            placeholder="Type your explanation or ask a question..."
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
  );
}
