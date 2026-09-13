"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Brain,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Info,
  GitBranch,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";

export default function LearningIntelligenceHub({ onNavigate }) {
  const [skills, setSkills] = useState(storageService.getStudentSkills("uid_rahul"));
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [insights, setInsights] = useState(storageService.getInsights("uid_rahul"));

  useEffect(() => {
    const unsub = storageService.subscribe(() => {
      setSkills(storageService.getStudentSkills("uid_rahul"));
      setInsights(storageService.getInsights("uid_rahul"));
    });
    return unsub;
  }, []);

  // Set default selected skill to Trees if none selected
  const activeSkill = selectedSkill || skills.find((s) => s.skillId === "skill_trees") || skills[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2 py-0.5 border border-[#0A2858] rounded-xs">
              Screen S02 • S03
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              Learning Intelligence Hub
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Structured skill taxonomy, evidence-backed gap analysis, and misconception diagnostics.
          </p>
        </div>

        <NeoButton
          variant="primary"
          size="md"
          onClick={() => onNavigate("assess_improve")}
        >
          <span>Launch Reassessment Practice</span>
          <ArrowRight className="w-4 h-4" />
        </NeoButton>
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: Interactive Skill Graph / Taxonomy */}
        <div className="lg:col-span-2 space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#1867E8]" />
                <h3 className="font-heading font-bold text-base text-[#0A2858] uppercase tracking-wide">
                  Structured Skill Taxonomy & Graph
                </h3>
              </div>
              <span className="text-xs font-mono text-[#55729D]">
                Click node to inspect evidence
              </span>
            </div>

            {/* Skill Taxonomy Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skills.map((skill) => {
                const isSelected = activeSkill?.id === skill.id;
                const isWeak = skill.mastery < 50;

                return (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`p-4 rounded-md border-[2px] cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-[#EAF2FF] border-[#1867E8] shadow-[4px_4px_0px_#0A2858] -translate-y-1"
                        : "bg-white border-[#0A2858] shadow-[2px_2px_0px_#0A2858] hover:bg-[#F4F8FF]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-heading font-bold text-sm text-[#0A2858]">
                        {skill.name}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-xs border ${
                          skill.mastery >= 75
                            ? "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]"
                            : skill.mastery >= 50
                            ? "bg-[#EAF2FF] text-[#1867E8] border-[#0A2858]"
                            : "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]"
                        }`}
                      >
                        {skill.mastery}%
                      </span>
                    </div>

                    <p className="text-xs font-body text-[#55729D] line-clamp-2 mb-3">
                      {skill.description}
                    </p>

                    <NeoProgressBar
                      value={skill.mastery}
                      color="dynamic"
                      height="h-2"
                      showPercentage={false}
                    />

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DDE7F5] text-[11px] font-mono text-[#8298BA]">
                      <span>
                        Trend:{" "}
                        <strong className="text-[#0A2858]">
                          {skill.trend === "up" ? "↑ Rising" : skill.trend === "down" ? "↓ Declining" : "→ Steady"}
                        </strong>
                      </span>
                      {skill.prerequisites?.length > 0 && (
                        <span>Requires: {skill.prerequisites.length} prior</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </NeoCard>

          {/* AI Misconception Detector Feed */}
          <NeoCard variant="default" shadow="sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-[#DC2626]" />
                <h3 className="font-heading font-bold text-base text-[#0A2858] uppercase tracking-wide">
                  AI Misconception Diagnostics
                </h3>
              </div>
              <NeoBadge variant="critical">Inferred Patterns</NeoBadge>
            </div>

            <div className="space-y-3">
              {insights
                .filter((i) => i.type === "misconception")
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#FEF2F2] border-[1.5px] border-[#DC2626] rounded-sm text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-[#DC2626]">
                      <span>{item.insight}</span>
                      <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#0A2858]">
                      <strong>Evidence:</strong> {item.evidence?.join(", ")}
                    </div>
                    <div className="font-body text-[#0A2858] bg-white p-2 rounded-xs border border-[#DC2626]">
                      💡 <strong>Recommended Correction:</strong> {item.recommendedAction}
                    </div>
                  </div>
                ))}
            </div>
          </NeoCard>
        </div>

        {/* Col 3: Screen S03 Detailed Skill Inspector Drawer */}
        <div className="space-y-4">
          <NeoCard variant="default" shadow="md" className="sticky top-20 border-[3px] border-[#0A2858]">
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#0A2858] pb-2">
              <span className="font-mono text-xs font-bold uppercase text-[#1867E8]">
                Screen S03 • Skill Inspector
              </span>
              <span className="font-mono text-xs font-bold text-[#0A2858]">
                ID: {activeSkill?.id}
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-xl text-[#0A2858] mb-1">
              {activeSkill?.name}
            </h2>
            <p className="font-body text-xs text-[#55729D] leading-relaxed mb-4">
              {activeSkill?.description}
            </p>

            <div className="p-3 bg-[#EAF2FF] border-[1.5px] border-[#0A2858] rounded-sm mb-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span>Calculated Mastery:</span>
                <span className="text-base text-[#1867E8]">{activeSkill?.mastery}%</span>
              </div>
              <NeoProgressBar
                value={activeSkill?.mastery || 0}
                color="dynamic"
                height="h-3"
                showPercentage={false}
              />
              <div className="flex justify-between items-center text-[11px] font-mono text-[#55729D]">
                <span>Evidence Confidence:</span>
                <span>{Math.round((activeSkill?.confidence || 0.8) * 100)}%</span>
              </div>
            </div>

            {/* Evidence List */}
            <div className="mb-4">
              <h4 className="font-mono text-xs font-bold uppercase text-[#0A2858] mb-2">
                Demonstrated Evidence Log:
              </h4>
              <div className="space-y-1.5">
                {activeSkill?.evidence && activeSkill.evidence.length > 0 ? (
                  activeSkill.evidence.map((ev, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-[#F4F8FF] border border-[#0A2858] rounded-xs font-mono text-xs text-[#0A2858]"
                    >
                      • {ev}
                    </div>
                  ))
                ) : (
                  <div className="p-2 bg-[#F4F8FF] border border-[#0A2858] rounded-xs font-mono text-xs text-[#8298BA]">
                    No recorded mistakes. Verified standard proficiency.
                  </div>
                )}
              </div>
            </div>

            {/* Next Action for this skill */}
            <div className="space-y-2">
              <NeoButton
                variant="primary"
                size="md"
                onClick={() => onNavigate("assess_improve")}
                className="w-full"
              >
                <span>Targeted Practice</span>
                <ArrowRight className="w-4 h-4" />
              </NeoButton>
              <NeoButton
                variant="secondary"
                size="sm"
                onClick={() => onNavigate("ai_tutor")}
                className="w-full"
              >
                <span>Ask Socratic Tutor About This</span>
              </NeoButton>
            </div>
          </NeoCard>
        </div>
      </div>
    </div>
  );
}
