"use client";

import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import LandingPage from "../components/landing/LandingPage";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import LearningIntelligenceHub from "../components/intelligence/LearningIntelligenceHub";
import AssessmentView from "../components/assessment/AssessmentView";
import PersonalizedLearningView from "../components/learning/PersonalizedLearningView";
import GuidedAITutor from "../components/learning/GuidedAITutor";
import CareerSkillsView from "../components/career/CareerSkillsView";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import InterventionQueue from "../components/teacher/InterventionQueue";
import TeacherToolsView from "../components/teacher/TeacherToolsView";
import ProductTourModal from "../components/common/ProductTourModal";
import { storageService } from "../lib/storage";

export default function Home() {
  const [activeSection, setActiveSection] = useState("landing_page");
  const [tourOpen, setTourOpen] = useState(false);

  const handleRoleChange = (isTeacher) => {
    if (isTeacher) {
      storageService.setCurrentUser("uid_sharma");
    } else {
      storageService.setCurrentUser("uid_rahul");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "landing_page":
        return (
          <LandingPage
            onNavigate={setActiveSection}
            onRoleChange={handleRoleChange}
            onOpenTour={() => setTourOpen(true)}
          />
        );
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
    <AppLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onOpenTour={() => setTourOpen(true)}
    >
      {renderSection()}
      <ProductTourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
        onNavigate={setActiveSection}
        onRoleChange={handleRoleChange}
      />
    </AppLayout>
  );
}

