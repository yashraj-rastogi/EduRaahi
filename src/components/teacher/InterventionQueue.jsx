"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  AlertOctagon,
  Sparkles,
  CheckCircle,
  XCircle,
  Edit3,
  ArrowRight,
  ShieldCheck,
  Eye,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import { storageService } from "../../lib/storage";

export default function InterventionQueue({ onNavigate }) {
  const [interventions, setInterventions] = useState([]);
  const [activeIntervention, setActiveIntervention] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    const update = () => {
      setInterventions(storageService.getInterventions());
    };
    update();
    const unsub = storageService.subscribe(update);
    return unsub;
  }, []);

  const handleOpenReview = (item) => {
    setActiveIntervention(item);
    setEditedText(item.suggestion);
    setActionSuccess("");
  };

  const handleApprove = () => {
    if (!activeIntervention) return;
    storageService.updateIntervention(activeIntervention.id, {
      suggestion: editedText,
      status: "approved",
      approvedAt: new Date().toISOString(),
    });
    setActionSuccess(`✓ Intervention approved and assigned to ${activeIntervention.studentName}!`);
    setTimeout(() => {
      setActiveIntervention(null);
      setActionSuccess("");
    }, 1500);
  };

  const handleReject = () => {
    if (!activeIntervention) return;
    storageService.updateIntervention(activeIntervention.id, {
      status: "rejected",
      rejectedAt: new Date().toISOString(),
    });
    setActionSuccess(`Intervention dismissed.`);
    setTimeout(() => {
      setActiveIntervention(null);
      setActionSuccess("");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white border-[2px] border-[#0A2858] p-5 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase bg-[#0A2858] text-white px-2 py-0.5 rounded-xs">
              Screen T03 • T05
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#0A2858] tracking-tight">
              At-Risk & Intervention Review Queue
            </h1>
          </div>
          <p className="font-body text-sm text-[#55729D] mt-1">
            Human-in-the-Loop Governance: Every AI pedagogical recommendation requires teacher review before taking effect.
          </p>
        </div>

        <NeoButton
          variant="secondary"
          size="md"
          onClick={() => onNavigate("teacher_dashboard")}
        >
          <span>Back to Class Heatmap</span>
        </NeoButton>
      </div>

      {/* Queue List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interventions.map((item) => (
          <NeoCard
            key={item.id}
            variant="default"
            shadow="md"
            className={`border-[2px] flex flex-col justify-between ${
              item.status === "approved"
                ? "border-[#16A34A] bg-[#F0FDF4]"
                : item.urgency === "critical"
                ? "border-[#DC2626] bg-white"
                : "border-[#0A2858] bg-white"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-base text-[#0A2858]">
                  {item.studentName}
                </span>
                <NeoBadge
                  variant={
                    item.status === "approved"
                      ? "success"
                      : item.urgency === "critical"
                      ? "critical"
                      : "warning"
                  }
                >
                  {item.status === "approved" ? "Approved" : item.urgency}
                </NeoBadge>
              </div>

              <div className="font-mono text-xs font-bold text-[#1867E8] mb-2">
                Topic: {item.skillName}
              </div>

              {/* Evidence Log */}
              <div className="bg-[#F4F8FF] border border-[#0A2858] p-2.5 rounded-xs mb-3">
                <div className="text-[10px] font-mono font-bold uppercase text-[#55729D] mb-1">
                  Trigger Evidence:
                </div>
                <ul className="text-xs font-mono space-y-0.5 text-[#0A2858]">
                  {item.evidence?.map((ev, idx) => (
                    <li key={idx}>• {ev}</li>
                  ))}
                </ul>
              </div>

              {/* AI Plan Preview */}
              <p className="font-body text-xs text-[#0A2858] leading-relaxed mb-4">
                <strong>Suggested Plan:</strong> {item.suggestion}
              </p>
            </div>

            <div className="pt-3 border-t border-[#DDE7F5] flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#8298BA] uppercase">
                Status: <strong className="text-[#0A2858]">{item.status}</strong>
              </span>

              <NeoButton
                variant={item.status === "pending" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleOpenReview(item)}
              >
                <span>{item.status === "pending" ? "Review & Edit" : "Inspect"}</span>
                <Eye className="w-3.5 h-3.5" />
              </NeoButton>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Screen T05: Review & Human-in-the-Loop Modal */}
      {activeIntervention && (
        <div className="fixed inset-0 z-50 bg-[#0A2858]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <NeoCard
            variant="default"
            shadow="lg"
            className="w-full max-w-2xl bg-white border-[3px] border-[#0A2858] p-6 space-y-5"
          >
            <div className="flex items-center justify-between border-b-2 border-[#0A2858] pb-3">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#1867E8]">
                  Screen T05 • Human-in-the-Loop Review
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#0A2858]">
                  Intervention Plan for {activeIntervention.studentName}
                </h3>
              </div>
              <button
                onClick={() => setActiveIntervention(null)}
                className="btn-icon w-8 h-8"
              >
                ✕
              </button>
            </div>

            {actionSuccess && (
              <div className="p-3 bg-[#DCFCE7] border-[2px] border-[#16A34A] rounded-sm text-xs font-mono font-bold text-[#16A34A]">
                {actionSuccess}
              </div>
            )}

            <div>
              <div className="text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                Evidence Summary (Why the system flagged this):
              </div>
              <div className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm text-xs font-mono text-[#0A2858] space-y-1">
                {activeIntervention.evidence?.map((e, idx) => (
                  <div key={idx}>• {e}</div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0A2858] mb-1.5">
                AI Suggested Intervention (Teacher Editable):
              </label>
              <textarea
                rows={5}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-3 font-body text-sm text-[#0A2858] bg-white border-[2px] border-[#0A2858] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1867E8] font-medium"
              />
              <span className="text-[11px] font-mono text-[#8298BA] mt-1 block">
                Feel free to modify the action steps or add customized instructions before assigning.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-[#0A2858]">
              <NeoButton
                variant="danger"
                size="sm"
                onClick={handleReject}
              >
                Reject / Dismiss
              </NeoButton>

              <div className="flex items-center gap-2">
                <NeoButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveIntervention(null)}
                >
                  Cancel
                </NeoButton>
                <NeoButton
                  variant="primary"
                  size="md"
                  onClick={handleApprove}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Assign</span>
                </NeoButton>
              </div>
            </div>
          </NeoCard>
        </div>
      )}
    </div>
  );
}
