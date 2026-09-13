// Unified Reactive Storage Engine for EduRaahi
// Provides instant offline/localStorage state seeded from canonical data,
// with graceful background Firebase Firestore synchronization when configured.

import {
  SEED_SKILLS,
  SEED_USERS,
  SEED_CLASSES,
  INITIAL_STUDENT_SKILLS,
  SEED_ASSESSMENT_DIAGNOSTIC,
  SEED_ASSESSMENT_RETEST,
  INITIAL_LEARNING_PLAN,
  INITIAL_CAREER_GOAL,
  INITIAL_AI_INSIGHTS,
  INITIAL_INTERVENTIONS,
} from "../data/seedData";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const STORAGE_KEY = "eduraahi_app_state_v1";

// Helper to construct clean initial state
function getInitialState() {
  return {
    currentUser: "uid_rahul",
    users: { ...SEED_USERS },
    classes: { ...SEED_CLASSES },
    skills: [...SEED_SKILLS],
    studentSkills: { ...INITIAL_STUDENT_SKILLS },
    assessments: {
      assess_dsa_diagnostic: SEED_ASSESSMENT_DIAGNOSTIC,
      assess_trees_retest: SEED_ASSESSMENT_RETEST,
    },
    attempts: [],
    aiInsights: [...INITIAL_AI_INSIGHTS],
    learningPlans: {
      uid_rahul: { ...INITIAL_LEARNING_PLAN },
    },
    careerGoals: {
      uid_rahul: { ...INITIAL_CAREER_GOAL },
    },
    interventions: [...INITIAL_INTERVENTIONS],
    theme: "light",
  };
}

class StorageService {
  constructor() {
    this.state = getInitialState();
    this.listeners = new Set();
    this.isClient = typeof window !== "undefined";

    if (this.isClient) {
      this.loadFromStorage();
    }
  }

  loadFromStorage() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized) {
        const parsed = JSON.parse(serialized);
        // Merge with initial state to guarantee all keys exist
        this.state = {
          ...getInitialState(),
          ...parsed,
        };
      } else {
        this.saveToStorage();
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using initial seed state:", e);
      this.state = getInitialState();
    }
  }

  saveToStorage() {
    if (this.isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn("Could not persist to localStorage:", e);
      }
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (e) {
        console.error("Storage listener error:", e);
      }
    });
  }

  resetToBaseline() {
    this.state = getInitialState();
    this.saveToStorage();
    if (this.isClient) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return this.state;
  }

  // --- Current User ---
  getCurrentUser() {
    return this.state.users[this.state.currentUser] || this.state.users.uid_rahul;
  }

  setCurrentUser(uid) {
    if (this.state.users[uid]) {
      this.state.currentUser = uid;
      this.saveToStorage();
    }
  }

  // --- Student Skills ---
  getStudentSkills(uid = "uid_rahul") {
    const list = [];
    const skills = this.state.skills || [];
    skills.forEach((skill) => {
      const key = `${uid}_${skill.id}`;
      const record = this.state.studentSkills[key] || {
        uid,
        skillId: skill.id,
        mastery: 50,
        confidence: 0.5,
        trend: "stable",
        evidence: [],
      };
      list.push({
        ...skill,
        ...record,
      });
    });
    return list;
  }

  getStudentSkill(uid, skillId) {
    const key = `${uid}_${skillId}`;
    return this.state.studentSkills[key] || null;
  }

  saveStudentSkill(uid, skillId, skillData) {
    const key = `${uid}_${skillId}`;
    this.state.studentSkills[key] = {
      ...this.state.studentSkills[key],
      ...skillData,
      uid,
      skillId,
    };
    this.saveToStorage();

    // Background Firebase Firestore sync if connected
    if (db) {
      try {
        setDoc(doc(db, "studentSkills", key), this.state.studentSkills[key], { merge: true }).catch((err) =>
          console.warn("Firestore sync error:", err)
        );
      } catch (err) {
        // ignore offline errors
      }
    }
  }

  // --- Assessments & Attempts ---
  getAssessments() {
    return Object.values(this.state.assessments);
  }

  getAssessmentById(id) {
    return this.state.assessments[id] || null;
  }

  saveAttempt(attempt) {
    this.state.attempts.push(attempt);
    this.saveToStorage();

    // Firestore background sync
    if (db && attempt.id) {
      try {
        setDoc(doc(db, "attempts", attempt.id), attempt).catch((err) =>
          console.warn("Firestore attempt sync error:", err)
        );
      } catch (err) {
        // ignore offline
      }
    }
    return attempt;
  }

  getAttempts(uid = "uid_rahul") {
    return this.state.attempts.filter((att) => att.uid === uid);
  }

  // --- AI Insights ---
  getInsights(uid = "uid_rahul") {
    return (this.state.aiInsights || []).filter((ins) => ins.uid === uid && ins.status !== "dismissed");
  }

  addInsight(insight) {
    const newInsight = {
      id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      status: "active",
      ...insight,
    };
    this.state.aiInsights.unshift(newInsight);
    this.saveToStorage();
    return newInsight;
  }

  updateInsightStatus(id, status) {
    const item = this.state.aiInsights.find((i) => i.id === id);
    if (item) {
      item.status = status;
      this.saveToStorage();
    }
  }

  // --- Learning Plans ---
  getLearningPlan(uid = "uid_rahul") {
    return this.state.learningPlans[uid] || null;
  }

  saveLearningPlan(uid, plan) {
    this.state.learningPlans[uid] = {
      ...this.state.learningPlans[uid],
      ...plan,
      lastRecalculated: new Date().toISOString(),
    };
    this.saveToStorage();
  }

  // --- Career Goals ---
  getCareerGoal(uid = "uid_rahul") {
    return this.state.careerGoals[uid] || null;
  }

  saveCareerGoal(uid, goal) {
    this.state.careerGoals[uid] = {
      ...this.state.careerGoals[uid],
      ...goal,
    };
    this.saveToStorage();
  }

  // --- Teacher Interventions ---
  getInterventions() {
    return this.state.interventions || [];
  }

  addIntervention(intervention) {
    const newInt = {
      id: `int_${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...intervention,
    };
    this.state.interventions.unshift(newInt);
    this.saveToStorage();
    return newInt;
  }

  updateIntervention(id, updates) {
    const item = this.state.interventions.find((i) => i.id === id);
    if (item) {
      Object.assign(item, updates);
      this.saveToStorage();
    }
  }

  // --- Class Analytics Aggregate ---
  getClassHeatmap(classId = "class_3a") {
    const cls = this.state.classes[classId];
    if (!cls) return [];

    const studentIds = cls.studentIds || [];
    const skills = this.state.skills || [];

    return skills.map((skill) => {
      let totalMastery = 0;
      let count = 0;
      const studentBreakdown = [];

      studentIds.forEach((uid) => {
        const key = `${uid}_${skill.id}`;
        const record = this.state.studentSkills[key];
        const mastery = record ? record.mastery : 50;
        totalMastery += mastery;
        count += 1;
        studentBreakdown.push({
          uid,
          name: (this.state.users[uid] && this.state.users[uid].name) || uid,
          mastery,
          trend: record?.trend || "stable",
        });
      });

      const avgMastery = count > 0 ? Math.round(totalMastery / count) : 0;
      return {
        skillId: skill.id,
        skillName: skill.name,
        avgMastery,
        studentCount: count,
        students: studentBreakdown,
        isCritical: avgMastery < 50,
      };
    });
  }
}

// Export singleton instance
export const storageService = new StorageService();
