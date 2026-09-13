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
  Eye,
  X,
  History,
  AlertOctagon,
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
  const [selectedStudent, setSelectedStudent] = useState(null); // Student Profile drill-down

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

  // Roster of students
  const studentRoster = Object.values(users).filter((u) => u.role === "student");

  const handleOpenStudentProfile = (student) => {
    const studentSkills = storageService.getStudentSkills(student.uid);
    const studentAttempts = storageService.getAttempts(student.uid);
    const studentInsights = storageService.getInsights(student.uid);
    setSelectedStudent({
      ...student,
      skills: studentSkills,
      attempts: studentAttempts,
      insights: studentInsights,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Teacher Top Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#0A2858] text-white px-2 py-0.5 rounded-xs">
              Faculty Command Console
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
        {/* Col 1 & 2: Class Skill Analytics Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#1867E8]" />
                <h3 className="font-heading font-bold text-base text-[#0A2858] uppercase tracking-wide">
                  Class Skill Mastery Heatmap
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

                  {/* Student Chip Breakdown with Click to Inspect */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DDE7F5] text-xs font-mono">
                    <span className="text-[#8298BA] font-bold">Students (Click to Inspect):</span>
                    {item.students.map((st) => (
                      <button
                        key={st.uid}
                        onClick={() => handleOpenStudentProfile(users[st.uid] || { uid: st.uid, name: st.name })}
                        className={`px-2 py-0.5 rounded-xs border text-[11px] font-bold cursor-pointer transition-transform active:scale-95 ${
                          st.mastery < 50
                            ? "bg-[#FEF2F2] text-[#DC2626] border-[#DC2626] hover:bg-[#FEE2E2]"
                            : "bg-white text-[#0A2858] border-[#0A2858] hover:bg-[#EAF2FF]"
                        }`}
                      >
                        {st.name.split(" ")[0]}: {st.mastery}% 🔍
                      </button>
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

        {/* Col 3: Student Roster & Pending Interventions Preview */}
        <div className="space-y-4">
          {/* Student Roster Card */}
          <NeoCard variant="default" shadow="sm">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wide text-[#0A2858] mb-3">
              Student Intelligence Roster
            </h4>
            <div className="space-y-2">
              {studentRoster.map((st) => (
                <div
                  key={st.uid}
                  onClick={() => handleOpenStudentProfile(st)}
                  className="p-2.5 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm flex items-center justify-between cursor-pointer hover:bg-[#EAF2FF] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-sm bg-[#0A2858] text-white flex items-center justify-center font-mono font-bold text-xs">
                      {st.avatar || "ST"}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-[#0A2858]">
                        {st.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#55729D]">
                        {st.careerGoal || "Placement"}
                      </div>
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-[#1867E8]" />
                </div>
              ))}
            </div>
          </NeoCard>

          {/* Pending Interventions Preview */}
          <NeoCard variant="default" shadow="md" className="border-[3px] border-[#0A2858]">
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#0A2858] pb-2">
              <span className="font-mono text-xs font-bold uppercase text-[#1867E8]">
                Intervention Priority Queue
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

      {/* Student Intelligence Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-[#0A2858]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <NeoCard
            variant="default"
            shadow="lg"
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-[3px] border-[#0A2858] p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b-2 border-[#0A2858] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#0A2858] text-white flex items-center justify-center font-bold text-base">
                  {selectedStudent.avatar || "ST"}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#1867E8]">
                    Student Profile Overview
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-[#0A2858]">
                    {selectedStudent.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="btn-icon w-8 h-8"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-[#EAF2FF] border-[1.5px] border-[#0A2858] rounded-sm text-xs font-mono text-[#0A2858] flex justify-between">
              <div>
                <strong>Academic Level:</strong> {selectedStudent.academicLevel || "B.Tech Year 3"}
              </div>
              <div>
                <strong>Target Role:</strong> {selectedStudent.careerGoal || "Software Engineer"}
              </div>
            </div>

            {/* Skill Mastery Breakdown */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase text-[#0A2858] mb-2">
                Demonstrated Skill Breakdown:
              </h4>
              <div className="space-y-2">
                {selectedStudent.skills?.map((sk) => (
                  <div key={sk.id} className="p-2.5 bg-[#F4F8FF] border border-[#0A2858] rounded-xs">
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span>{sk.name}</span>
                      <span>{sk.mastery}% ({sk.trend === "up" ? "↑" : sk.trend === "down" ? "↓" : "→"})</span>
                    </div>
                    <NeoProgressBar value={sk.mastery} color="dynamic" height="h-2" showPercentage={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Attempt History */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase text-[#0A2858] mb-2">
                Recent Diagnostic & Practice Attempts:
              </h4>
              <div className="space-y-1.5 font-mono text-xs">
                {selectedStudent.attempts && selectedStudent.attempts.length > 0 ? (
                  selectedStudent.attempts.map((att, i) => (
                    <div key={i} className="p-2 bg-white border border-[#0A2858] rounded-xs flex justify-between">
                      <span>{att.assessmentTitle || "Assessment"}</span>
                      <span className="font-bold text-[#1867E8]">Score: {att.score}/{att.totalQuestions} ({att.percentage}%)</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-[#8298BA] border border-dashed border-[#8298BA] rounded-xs">
                    Initial diagnostic pending or completed in previous term.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-[#0A2858] flex justify-between items-center">
              <NeoButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedStudent(null)}
              >
                Close Profile
              </NeoButton>
              <NeoButton
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedStudent(null);
                  onNavigate("intervention_queue");
                }}
              >
                Create Intervention for Student →
              </NeoButton>
            </div>
          </NeoCard>
        </div>
      )}
    </div>
  );
}
