"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Layers,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Award,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import NeoStat from "../common/NeoStat";
import NeoProgressBar from "../common/NeoProgressBar";
import { storageService } from "../../lib/storage";

export default function TeacherDashboard({ onNavigate }) {
  const [classHeatmap, setClassHeatmap] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const update = () => {
      setClassHeatmap(storageService.getClassHeatmap("class_3a"));
      setInterventions(storageService.getInterventions());
      setUsers(storageService.state.users);
    };
    update();
    const unsub = storageService.subscribe(update);
    return unsub;
  }, []);

  // Check Rahul's progress
  const rahulTreeSkill = storageService.getStudentSkill("uid_rahul", "skill_trees");
  const isRahulImproved = rahulTreeSkill && rahulTreeSkill.mastery >= 70;

  // Weakest skill in class
  const weakestSkill = [...classHeatmap].sort((a, b) => a.avgMastery - b.avgMastery)[0] || null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Teacher Top Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#0A2858] text-white px-2 py-0.5 rounded-xs">
              Screen T01 • Instructor Console
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              Class 3A — Learning Analytics & Intervention Command
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Prof. Rajesh Sharma • 4 Enrolled Students • Real-time skill aggregation active.
          </p>
        </div>

        <NeoButton
          variant="primary"
          size="md"
          onClick={() => onNavigate("intervention_queue")}
        >
          <span>Open Intervention Queue</span>
          <ArrowRight className="w-4 h-4" />
        </NeoButton>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <NeoStat
          label="Cohort Size"
          value="4 Students"
          subtext="Class 3A Placement Batch"
          icon={Users}
        />
        <NeoStat
          label="Class Weakest Topic"
          value={weakestSkill ? weakestSkill.skillName.split(" ")[0] : "Trees"}
          trend="down"
          trendValue={`${weakestSkill?.avgMastery || 44}% Avg`}
          subtext="Requires intervention"
          icon={AlertTriangle}
        />
        <NeoStat
          label="Pending Interventions"
          value={interventions.filter((i) => i.status === "pending").length}
          trend="up"
          trendValue="Awaiting Review"
          subtext="Human-in-the-loop gate"
          icon={UserCheck}
        />
        <NeoStat
          label="Recent Progress"
          value={isRahulImproved ? "+34% Leap" : "Steady"}
          trend={isRahulImproved ? "up" : "stable"}
          trendValue={isRahulImproved ? "Rahul Sharma" : "Diagnostic baseline"}
          subtext="Tree Traversal retest"
          icon={Award}
        />
      </div>

      {/* Main Teacher Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: Screen T02 Class Skill Analytics Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#1867E8]" />
                <h3 className="font-heading font-bold text-base text-[#0A2858] uppercase tracking-wide">
                  Screen T02 • Class Skill Mastery Heatmap
                </h3>
              </div>
              <NeoBadge variant="critical">Trees & Recursion Flagged</NeoBadge>
            </div>

            <div className="space-y-4">
              {classHeatmap.map((item) => (
                <div
                  key={item.skillId}
                  className="p-4 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm space-y-2.5"
                >
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-sm text-[#0A2858]">{item.skillName}</span>
                    <span
                      className={`px-2 py-0.5 rounded-xs border ${
                        item.avgMastery >= 75
                          ? "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]"
                          : item.avgMastery >= 50
                          ? "bg-[#EAF2FF] text-[#1867E8] border-[#0A2858]"
                          : "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]"
                      }`}
                    >
                      Class Average: {item.avgMastery}%
                    </span>
                  </div>

                  <NeoProgressBar
                    value={item.avgMastery}
                    color="dynamic"
                    height="h-3"
                    showPercentage={false}
                  />

                  {/* Student Chip Breakdown */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DDE7F5] text-xs font-mono">
                    <span className="text-[#8298BA] font-bold">Students:</span>
                    {item.students.map((st) => (
                      <span
                        key={st.uid}
                        className={`px-2 py-0.5 rounded-xs border text-[11px] font-bold ${
                          st.mastery < 50
                            ? "bg-[#FEF2F2] text-[#DC2626] border-[#DC2626]"
                            : "bg-white text-[#0A2858] border-[#0A2858]"
                        }`}
                      >
                        {st.name.split(" ")[0]}: {st.mastery}%
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NeoCard>

          {/* Student Success Highlight (Rahul's Golden Path Proof) */}
          {isRahulImproved && (
            <NeoCard variant="default" shadow="sm" className="bg-[#F0FDF4] border-[#16A34A]">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-[#16A34A] shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#14532D]">
                    Golden Path Verified: Rahul Sharma (+34% Improvement)
                  </h4>
                  <p className="font-body text-xs text-[#166534] mt-0.5">
                    Rahul's mastery in Tree Traversal increased from 38% to {rahulTreeSkill.mastery}% following targeted reassessment. Class-wide gap for Trees has shifted positively.
                  </p>
                </div>
              </div>
            </NeoCard>
          )}
        </div>

        {/* Col 3: Pending Interventions Preview */}
        <div className="space-y-4">
          <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858]">
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#0A2858] pb-2">
              <span className="font-mono text-xs font-bold uppercase text-[#1867E8]">
                Screen T03 • Priority Queue
              </span>
              <span className="font-mono text-xs font-bold text-[#DC2626]">
                Action Needed
              </span>
            </div>

            <div className="space-y-3 mb-4">
              {interventions.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm space-y-1.5"
                >
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-[#0A2858]">{item.studentName}</span>
                    <NeoBadge variant={item.urgency === "critical" ? "critical" : "warning"} size="sm">
                      {item.urgency}
                    </NeoBadge>
                  </div>
                  <div className="text-xs font-heading font-semibold text-[#1867E8]">
                    Topic: {item.skillName}
                  </div>
                  <p className="text-[11px] font-body text-[#55729D] line-clamp-2">
                    {item.suggestion}
                  </p>
                  <div className="text-[10px] font-mono text-[#8298BA]">
                    Status: <strong className="uppercase text-[#0A2858]">{item.status}</strong>
                  </div>
                </div>
              ))}
            </div>

            <NeoButton
              variant="primary"
              size="md"
              onClick={() => onNavigate("intervention_queue")}
              className="w-full"
            >
              <span>Review All Interventions</span>
              <ArrowRight className="w-4 h-4" />
            </NeoButton>
          </NeoCard>
        </div>
      </div>
    </div>
  );
}
