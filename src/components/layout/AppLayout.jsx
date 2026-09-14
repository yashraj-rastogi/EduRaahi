"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  Compass,
  FileCheck,
  Briefcase,
  Users,
  GraduationCap,
  Sparkles,
  RotateCcw,
  UserCheck,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Menu,
  X,
  Layers,
  Terminal,
} from "lucide-react";
import { storageService } from "../../lib/storage";

export default function AppLayout({ activeSection, onSectionChange, onOpenTour, children }) {
  const [currentUser, setCurrentUser] = useState({ id: "uid_rahul", role: "student", name: "Rahul Sharma" });
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentUser(storageService.getCurrentUser());
    const unsubscribe = storageService.subscribe(() => {
      setCurrentUser(storageService.getCurrentUser());
    });
    return unsubscribe;
  }, []);

  const handleRoleToggle = () => {
    if (currentUser.role === "student") {
      storageService.setCurrentUser("uid_sharma");
      onSectionChange("teacher_dashboard");
    } else {
      storageService.setCurrentUser("uid_rahul");
      onSectionChange("student_dashboard");
    }
  };

  const handleResetDemo = () => {
    storageService.resetToBaseline();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2500);
    onSectionChange("student_dashboard");
  };

  const isTeacher = currentUser.role === "teacher";

  // Student Navigation Items
  const studentNavItems = [
    { id: "student_dashboard", label: "Dashboard", icon: Brain },
    { id: "learning_intelligence", label: "Learning Intelligence", icon: Layers },
    { id: "assess_improve", label: "Assess & Improve", icon: FileCheck },
    { id: "personalized_learning", label: "Personalized Learning", icon: Compass },
    { id: "ai_tutor", label: "Guided AI Tutor", icon: Sparkles },
    { id: "career_skills", label: "Career & Skills", icon: Briefcase },
  ];

  // Teacher Navigation Items
  const teacherNavItems = [
    { id: "teacher_dashboard", label: "Teacher Command", icon: Users },
    { id: "class_heatmap", label: "Class Analytics", icon: Layers },
    { id: "intervention_queue", label: "Intervention Queue", icon: UserCheck },
    { id: "assessment_builder", label: "Assessment Tools", icon: FileCheck },
    { id: "content_assistant", label: "Content Assistant", icon: BookOpen },
  ];

  const currentNav = isTeacher ? teacherNavItems : studentNavItems;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FF] text-[#0A2858]">
      {/* Top Universal Cockpit Header */}
      <header className="sticky top-0 z-40 bg-white border-b-[3px] border-[#0A2858] shadow-[0_2px_0px_#0A2858] px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Brand & Tagline (Clickable to Home / Landing) */}
        <button
          onClick={() => onSectionChange("landing_page")}
          className="flex items-center gap-3 text-left group transition-transform active:translate-x-0.5"
          title="Go to Product Overview / Landing Page"
        >
          <div className="w-10 h-10 rounded-sm bg-white p-1 flex items-center justify-center border-[2px] border-[#0A2858] shadow-[2px_2px_0px_#0A2858] overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="EduRaahi Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl tracking-tight text-[#0A2858] group-hover:text-[#1867E8] transition-colors">
                EduRaahi
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold tracking-wide uppercase bg-[#EAF2FF] text-[#1867E8] border-[1.5px] border-[#0A2858] rounded-sm">
                Intelligence Engine
              </span>
            </div>
            <p className="text-xs font-mono text-[#55729D] hidden md:block">
              Know what you know. Discover what you don't. Learn what matters next.
            </p>
          </div>
        </button>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Interactive Tour / Tutorial Button */}
          <button
            onClick={() => onOpenTour && onOpenTour()}
            className="btn btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5 shadow-[2px_2px_0px_#0A2858]"
            title="Open Interactive Walkthrough & Architecture Tour"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline font-mono">How It Works</span>
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={handleResetDemo}
            className="btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#DDE7F5]"
            title="Reset demo data to initial diagnostic state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#1867E8]" />
            <span className="hidden sm:inline font-mono">Reset Demo</span>
          </button>

          {/* Role Toggle Switcher */}
          <button
            onClick={handleRoleToggle}
            className={`btn px-3 py-1.5 text-xs flex items-center gap-2 ${
              mounted && isTeacher
                ? "bg-[#0A2858] text-white border-[2px] border-[#0A2858]"
                : "bg-[#1867E8] text-white border-[2px] border-[#0A2858]"
            }`}
          >
            {mounted && isTeacher ? (
              <>
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="font-mono">Teacher: Prof. Sharma</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span className="font-mono">Student: Rahul (B.Tech)</span>
              </>
            )}
            <span className="text-[10px] opacity-75 font-mono underline ml-1">Switch</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-icon w-9 h-9"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Reset Notification Banner */}
      {resetNotice && (
        <div className="bg-[#16A34A] text-white text-xs font-mono font-bold py-1.5 text-center border-b-[2px] border-[#0A2858] animate-fade-in">
          ✓ Baseline demo state restored! Initial diagnostic ready.
        </div>
      )}

      {/* Main Layout Body */}
      {activeSection === "landing_page" ? (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
          {children}
        </main>
      ) : (
        <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
          {/* Desktop Fixed Side Rail Navigation */}
          <aside className="hidden md:flex flex-col w-64 bg-white border-r-[3px] border-[#0A2858] shrink-0 p-4 justify-between">
            <div className="space-y-4">
              {/* Active User Persona Card */}
              <div className="p-3 bg-[#EAF2FF] border-[2px] border-[#0A2858] rounded-md shadow-[2px_2px_0px_#0A2858]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-[#0A2858] text-white flex items-center justify-center font-mono font-bold text-sm">
                    {currentUser.avatar || "ED"}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-heading font-bold text-sm text-[#0A2858] truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#55729D] uppercase tracking-wide">
                      {currentUser.role === "teacher" ? "Instructor • Class 3A" : "Student • Placements"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Jump: Platform Overview / Landing */}
              <button
                onClick={() => onSectionChange("landing_page")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-sm border-[2px] border-[#0A2858] bg-[#F4F8FF] hover:bg-[#DDE7F5] transition-all font-heading text-xs font-bold uppercase tracking-wide text-[#0A2858] shadow-[2px_2px_0px_#0A2858]"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#1867E8]" />
                  <span>Platform Overview</span>
                </div>
                <span className="font-mono text-[10px] text-[#55729D]">HOME</span>
              </button>

              {/* Navigation Menu */}
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8298BA] px-2 mb-2">
                  {isTeacher ? "Instructor Console" : "Learner Cockpit"}
                </div>
                <nav className="space-y-1.5">
                {currentNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm border-[2px] transition-all font-heading text-xs font-semibold uppercase tracking-wide ${
                        isActive
                          ? "bg-[#1867E8] text-white border-[#0A2858] shadow-[3px_3px_0px_#0A2858] translate-x-1"
                          : "bg-white text-[#0A2858] border-transparent hover:border-[#0A2858] hover:bg-[#F4F8FF]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#1867E8]"}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#8298BA]"}`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom Footprint */}
          <div className="pt-4 border-t-[2px] border-[#DDE7F5] text-[11px] font-mono text-[#8298BA] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-xs bg-white p-0.5 border border-[#0A2858] flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="EduRaahi" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-bold text-xs text-[#0A2858]">EduRaahi Engine</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Loop Status:</span>
              <span className="text-[#16A34A] font-bold">● ONLINE</span>
            </div>
            <div>Continuous Skill Mapping V2</div>
          </div>
        </aside>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[62px] bg-white border-b-[3px] border-[#0A2858] p-4 z-30 shadow-[0_4px_0px_#0A2858] animate-fade-in">
            <div className="space-y-1.5">
              {currentNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-sm border-[2px] font-heading text-xs font-bold uppercase ${
                      isActive
                        ? "bg-[#1867E8] text-white border-[#0A2858]"
                        : "bg-[#F4F8FF] text-[#0A2858] border-[#0A2858]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Routed Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
          {children}
        </main>
      </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      {activeSection !== "landing_page" && (
        <nav className="md:hidden sticky bottom-0 bg-white border-t-[3px] border-[#0A2858] px-2 py-1.5 flex items-center justify-around z-30 shadow-[0_-2px_0px_#0A2858]">
          {currentNav.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex flex-col items-center py-1 px-2 rounded-sm text-[10px] font-heading font-bold uppercase ${
                  isActive ? "text-[#1867E8]" : "text-[#55729D]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="mt-0.5 truncate max-w-[56px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
