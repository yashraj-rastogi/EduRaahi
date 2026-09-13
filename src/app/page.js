"use client";

import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import LearningIntelligenceHub from "../components/intelligence/LearningIntelligenceHub";
import AssessmentView from "../components/assessment/AssessmentView";
import PersonalizedLearningView from "../components/learning/PersonalizedLearningView";
import GuidedAITutor from "../components/learning/GuidedAITutor";
import CareerSkillsView from "../components/career/CareerSkillsView";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import InterventionQueue from "../components/teacher/InterventionQueue";
import TeacherToolsView from "../components/teacher/TeacherToolsView";

export default function Home() {
  const [activeSection, setActiveSection] = useState("student_dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "student_dashboard":
        return <StudentDashboard onNavigate={setActiveSection} />;
      case "learning_intelligence":
        return <LearningIntelligenceHub onNavigate={setActiveSection} />;
      case "assess_improve":
        return <AssessmentView onNavigate={setActiveSection} />;
      case "personalized_learning":
        return <PersonalizedLearningView onNavigate={setActiveSection} />;
      case "ai_tutor":
        return <GuidedAITutor onNavigate={setActiveSection} />;
      case "career_skills":
        return <CareerSkillsView onNavigate={setActiveSection} />;
      case "teacher_dashboard":
      case "class_heatmap":
        return <TeacherDashboard onNavigate={setActiveSection} />;
      case "intervention_queue":
        return <InterventionQueue onNavigate={setActiveSection} />;
      case "assessment_builder":
      case "content_assistant":
        return <TeacherToolsView onNavigate={setActiveSection} />;
      default:
        return <StudentDashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <AppLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AppLayout>
  );
}
