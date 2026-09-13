# ⚡ EduRaahi — AI Learning Intelligence Platform

> **"Know what you know. Discover what you don't. Learn what matters next."**

<div align="center">
  <img src="public/logo.png" alt="EduRaahi Logo" width="140" height="140" />
  <h3>Continuous Competency Mapping & Pedagogical Intelligence for Higher Education</h3>
  <p><strong>Track:</strong> AI in Education & Skilling — Lenovo LEAP Hackathon</p>
  <p><strong>Live Stack:</strong> Next.js 16 (App Router) • React 19 • Tailwind CSS • Google Gemini 1.5/2.0 • Firebase Firestore / Local Reactive Engine</p>
</div>

---

## 📌 Table of Contents
1. [The Problem](#1-the-problem-what-is-broken-today)
2. [Our Idea: EduRaahi](#2-our-idea-the-continuous-intelligence-loop)
3. [Who is the Target User?](#3-who-is-the-target-user)
4. [How We Solved the Problem (Technical Architecture & Core Features)](#4-how-we-solved-the-problem)
5. [How EduRaahi is Unique from Others](#5-how-eduraahi-is-unique-from-others)
6. [Complete Coverage of All 22 Competition Problems](#6-all-22-canonical-problems-implemented)
7. [Design System & Neo-Brutalist UI](#7-neo-brutalist-cockpit-design-system)
8. [The Golden Path Demo Script (3-Minute Hackathon Winning Flow)](#8-the-golden-path-demo-narrative)
9. [Local Setup & Configuration](#9-setup--running-locally)
10. [Judging Criteria Alignment](#10-judging-criteria-alignment)

---

## 1. The Problem: What is Broken Today?

Higher education and engineering skilling face a systemic breakdown known as the **"Illusion of Competence"**:

1. **One-Shot Testing Produces Superficial Marks, Not True Diagnostics:**
   - Traditional exams and LMS quizzes give students a single aggregate percentage score (e.g., *"62% on Midterm"*).
   - This score conceals *which* specific sub-skills failed, *why* the student got it wrong, and *which underlying foundational prerequisite* caused the error.
2. **Students Lack Meta-Cognition & Self-Direction:**
   - **Problem P01 & P03:** Students don't know *what* their learning gaps are, and don't understand the conceptual misconceptions behind their mistakes.
   - **Problem P04 & P05:** Students don't know *what to study next* — resulting in generic, non-adaptive study routines that waste time re-reading material they already know while neglecting critical gaps.
3. **The AI Tutor Paradox (Generic Chatbots Spoil Learning):**
   - **Problem P08:** When students turn to standard LLMs (like ChatGPT), the chatbots immediately spit out the complete code and final answer. This encourages passive copy-pasting, destroys cognitive retention, and stunts algorithmic problem-solving ability.
4. **Instructors are Overwhelmed and Blind to Cohort Micro-Gaps:**
   - **Problem P19 & P20:** An instructor teaching 60–120 students cannot manually inspect individual submissions to pinpoint class-wide conceptual bottlenecks.
   - Teachers only discover students are falling behind *after* high-stakes midterms or final dropouts, when it is already too late to intervene.
5. **The College-to-Career Employability Disconnect:**
   - **Problem P14–P17:** Students fill resumes with buzzwords (e.g., *"Proficient in Data Structures & Tree Algorithms"*), but have no verified proof of mastery, leaving them unprepared for technical interviews and placement drives.

---

## 2. Our Idea: The Continuous Intelligence Loop

**EduRaahi** (*"Raahi"* = *The Pathfinder / Guide* in Hindi) is not another video platform or one-off quiz tool. It is an **AI Learning Intelligence Engine** that continuously converts student attempts into structured competency graphs, diagnoses deep misconceptions, prescribes targeted next actions, and keeps teachers in the loop for human-verified interventions.

### The Closed-Loop Feedback Architecture
```text
┌────────────────────────────────────────────────────────────────────────┐
│                        1. Student Assessment                           │
│     (Diagnostic / Targeted Practice with Real Multilingual Support)    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 2. Deterministic State & Scoring Engine                │
│    (Zero AI Hallucination: Mathematical Rubric & Weight Calculation)   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│             3. Grounded AI Reasoning Layer (Gemini 1.5/2.0)            │
│ (Diagnoses Concept Misconceptions + Cites Grounded Evidence + Confidence)│
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│               4. Dynamic Prerequisite DAG & Adaptive Plan              │
│    (Graph-based mapping: Identifies Root Preconditions, e.g. Recursion) │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│             5. Guided Socratic Mentorship & Targeted Practice          │
│       (5-Stage Hint Ladder: Never Gives Away Code; Verifies Logic)      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│               6. Measurable Mastery Leap & Class Heatmap               │
│   (Deterministically advances Tree Traversal: 38% → 72% [+34% Gain!])  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│            7. Teacher-in-the-Loop Human Review & Governance            │
│   (Cohort Heatmap + Prioritized Intervention Queue + Editable Actions)  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   └───► ↺ Continuous Loop Repeats
```

---

## 3. Who is the Target User?

EduRaahi is purposefully built for two synchronized stakeholder personas in higher-education and technical skilling:

### 👤 Primary Persona 1: The Engineering / Higher-Ed Student (Learner)
- **Profile:** 2nd, 3rd, or 4th-year engineering undergraduate (e.g., *Rahul Sharma*, targeting Software Engineering Campus Placements).
- **Core Needs:**
  - Accurate diagnostic of exactly where his programming and data-structure knowledge breaks down.
  - Step-by-step guidance without having answers spoiled.
  - Transparent translation of academic coursework into verified placement readiness and resume validation.
- **Value Realized:** Real-time visibility into his competence, targeted daily study tasks, and a proven, measurable climb in mastery.

### 👨‍🏫 Primary Persona 2: The College Professor & Instructor (Educator)
- **Profile:** Faculty member or teaching assistant (e.g., *Prof. Sharma*, managing 60–120 undergraduate students in Computer Science).
- **Core Needs:**
  - Instant visibility across the entire cohort without grading hundreds of papers line-by-line.
  - Early-warning detection of at-risk students before exams.
  - AI tools that draft tests, rubrics, and lesson packages while retaining full teacher authority and editorial control.
- **Value Realized:** Reduced administrative overhead by >70%, zero blindspots on cohort misconceptions, and meaningful, timely interventions.

### 🏢 Secondary Stakeholder: Placement & Training Cell (T&P Officers)
- Needs objective data comparing *Claimed Skills* on student resumes vs. *Demonstrated Mastery* on validated assessments, ensuring candidates are interview-ready.

---

## 4. How We Solved the Problem

### 🧠 A. Architectural Invariants (Separation of Determinism and AI)
EduRaahi resolves the critical liability of generative AI in education by strictly decoupling state from reasoning:
1. **100% Deterministic State Invariants:**
   - Attempt scoring, percentage marks, mastery formulas (weighted decay calculations), DAG prerequisite unlocking, and teacher approval states are executed entirely in deterministic JavaScript logic (`src/lib/scoringEngine.js`, `src/lib/masteryEngine.js`).
   - **AI is NEVER permitted to invent grades, alter test marks, or bypass teacher sign-off.**
2. **Grounded AI Reasoning (Gemini 1.5/2.0 API):**
   - AI is utilized exclusively as a reasoning, diagnosis, explanation, and synthesis copilot (`src/lib/aiService.js`).
   - Every AI response is bound to strict JSON schemas requiring explicit `evidence[]` citations of student mistakes, a calibrated `confidence` score (0.0 to 1.0), and pedagogical rationales.
3. **Dual-Mode Resilient Data Layer:**
   - Integrated with **Firebase Firestore SDK** for persistent multi-device synchronization, paired with a unified **Local Reactive Engine** (`src/lib/storage.js`).
   - The entire platform is 100% operational offline with zero broken screens, even without internet or API keys.

---

### 🚀 B. Core Feature Suite (Covering the 7 Core Phases)

#### 1. Real-time Learner Intelligence Cockpit (`S01`, `S02`, `S03`)
- **6-Question Learner Model:** Answers in seconds: *Where do I stand? What are my weak spots? Why am I wrong? What should I do next? How does my plan adapt? How prepared am I for placements?*
- **Interactive Prerequisite DAG:** Visualizes skill dependencies (e.g., *Time Complexity → Arrays → Recursion → Binary Trees → Graph Algorithms*).
- **Misconception Detection:** Pinpoints underlying mental model flaws (e.g., *"Confusing Pre-order root-first processing with In-order BST sorting"*).

#### 2. Assessment Engine with Measurable Before/After Jump (`S04`, `S05`, `S06`)
- Full 10-Question Diagnostic Assessment with immediate multi-skill evaluation.
- Demonstrates a **concrete, measurable leap**: Student Rahul completes targeted Tree Traversal practice and leaps from **38% → 72% mastery (+34 point gain)**, visually recognized by both student and instructor.

#### 3. Guided Socratic AI Tutor (`S09`)
- Enforces a strict **5-Stage Hint Ladder**:
  1. *Conceptual Nudge* (identifies the invariant without giving code).
  2. *Algorithmic Strategy* (suggests high-level strategy e.g. recursion base case).
  3. *Pseudocode Outline* (structure and invariant logic).
  4. *Targeted Syntax / Trace* (edge case walkthrough).
  5. *Full Solution with Reflection* (unlocked only after student attempts).
- Includes an automated **Verification Check** to ensure active understanding before moving forward.

#### 4. Multilingual & Adaptive Personalization (`S07`, `S08`, `S10`, `S11`)
- **Language Switcher:** Instant translation between English, Hinglish (Hindi-English colloquial mix), and Hindi for conceptual clarity.
- **Adaptive Study Planner:** Dynamically increases weekly hour allocations for lagging topics.
- **Exam Optimizer & Project-Based Scaffolding:** Transforms abstract algorithms into full-stack project blueprints.

#### 5. Teacher Console & Human-in-the-Loop Interventions (`T01`–`T08`)
- **Cohort Heatmap (`T01`):** Color-coded matrix showing 4 class cohorts across 6 DSA skills, instantly highlighting that Trees (44% cohort average) is the critical bottleneck.
- **Prioritized Intervention Queue (`T03`):** AI flags at-risk students (e.g., Aman at 44%, Sneha at 51%) and drafts personalized intervention tasks.
- **Teacher Review & Edit Modal (`T05`):** Instructors can edit the AI's action plan, change deadlines, and formally approve it before dispatch.
- **Teacher Assist Tools (`T06`–`T08`): 1-click AI Assessment Builder, Rubric Assignment Evaluator with manual overrides, and complete Lesson Package Generator.

#### 6. Career & Placement Alignment (`S14`–`S17`)
- **Career Match Navigator:** Calculates objective readiness percentage for target roles (e.g., *Backend Software Engineer: 58%*).
- **Claimed vs. Demonstrated Skill Audit:** Compares keywords on uploaded student resumes against empirical assessment scores to eradicate resume inflation.
- **Technical Viva / Interview Simulator:** Real-time AI technical oral practice with instant feedback.

---

## 5. How EduRaahi is Unique from Others

| Feature / Dimension | Traditional LMS (Moodle, Canvas) | Standard EdTech (Coursera, Udemy) | Generic AI Chatbots (ChatGPT, Claude) | ⚡ EduRaahi AI Platform |
|---|---|---|---|---|
| **Feedback Mechanism** | Static 1-shot grades (e.g. "65%") | Passive video watching & multiple-choice | Single unstructured conversation | **Closed-Loop Intelligence (Diagnose → Socratic Guidance → Re-assess → Leap)** |
| **Prerequisite Awareness** | ❌ No dependency tracking | ❌ Linear module progression | ❌ No persistent skill graph | **✅ Interactive Prerequisite DAG showing root foundational blockers** |
| **AI Reliability & Scoring** | ❌ None | ❌ None | ⚠️ Hallucinates marks & scores | **✅ 100% Deterministic Scoring Engine; AI used strictly for grounded reasoning** |
| **Pedagogical Guardrails** | ❌ None | ❌ None | ❌ Gives away full code & answers instantly | **✅ 5-Stage Socratic Hint Ladder; blocks cognitive laziness** |
| **Teacher Governance** | ⚠️ Manual, time-consuming grading | ❌ Disconnected from teachers | ❌ No teacher oversight | **✅ Human-in-the-Loop Intervention Queue with review, edit & approval** |
| **Cohort Diagnostic Heatmap** | ❌ Only raw grade sheets | ❌ Aggregate completion rates | ❌ None | **✅ Live Skill-by-Cohort Heatmap isolating class-wide conceptual gaps** |
| **Resume & Placement Link** | ❌ Completely decoupled | ❌ Generic completion certificates | ❌ Generic resume bullet advice | **✅ Claimed vs. Demonstrated Skill Audit with verified placement match %** |
| **User Interface Aesthetic** | ⚠️ Outdated, cluttered tables | ⚠️ Generic corporate cards | ⚠️ Plain message bubble thread | **✅ Tactile Neo-Brutalist Cockpit with engineering blueprint grid** |

---

## 6. All 22 Canonical Problems Implemented

EduRaahi comprehensively implements every single problem specified in the competition taxonomy:

| ID | Competition Problem | EduRaahi Solution Component | Screen ID |
|---|---|---|---|
| **P01** | Students don't know learning gaps | AI Skill Gap Analyzer with cited evidence | `S01`, `S02` |
| **P02** | No structured view of skills | Interactive Dependency DAG Skill Graph | `S02`, `S03` |
| **P03** | Students don't know why they are wrong | AI Misconception Detector & Error Diagnostics | `S02`, `S06` |
| **P04** | Students don't know what to learn next | Next Best Learning Action Recommendation Engine | `S01` |
| **P05** | Generic study plans don't adapt | Dynamic 7-Day Adaptive Study Planner | `S01`, `S07` |
| **P06** | Students struggle with exam preparation | AI Exam Preparation & Topic Prioritization Optimizer | `S11` |
| **P07** | Same material doesn't work for every student | Multilingual Learning Material Personalizer (English / Hinglish / Hindi) | `S08` |
| **P08** | Generic chatbots give away answers | Guided Socratic AI Mentor (5-Stage Hint Ladder) | `S09` |
| **P09** | Students learn better through projects | AI Project-Based Learning Architect & Milestones | `S10` |
| **P10** | Assessments don't provide useful feedback | Post-Assessment Multi-Skill Diagnostic Analysis | `S06` |
| **P11** | Teachers spend too much time creating tests | 1-Click AI Assessment & Test Generator | `T06` |
| **P12** | Manual assignment evaluation takes too long | AI Assignment Grading Assistant with Rubric & Teacher Overrides | `T07` |
| **P13** | Students need interactive oral practice | AI Technical Viva & Mock Interview Simulator | `S13` |
| **P14** | Students lack personalized career guidance | AI Career Match Navigator with target role readiness | `S14` |
| **P15** | Students don't know required career skills | Interactive Skill-to-Career Mapping Engine | `S15` |
| **P16** | Students don't know job readiness | Verified Job Readiness Percentage Breakdown | `S14`, `S15` |
| **P17** | Resume claims don't match demonstrated skill | Resume Claimed vs. Demonstrated Skill Gap Analyzer | `S16` |
| **P18** | Students don't know employability projects | Employability Career Project Recommender | `S17` |
| **P19** | Teachers can't identify class weak areas | Class Learning Analytics Cohort Heatmap | `T01`, `T02` |
| **P20** | Teachers don't know who needs intervention | At-Risk Student Prioritization Queue | `T01`, `T03` |
| **P21** | Teachers don't know what intervention to give | AI Intervention Recommendation & Review System | `T03`, `T05` |
| **P22** | Teachers spend too much time writing content | Teacher Lesson Package & Concept Assistant | `T08` |

---

## 7. Neo-Brutalist Cockpit Design System

EduRaahi rejects generic, uninspired UI frameworks in favor of an **engineering cockpit aesthetic**:
- **Tailored Palette:** EduRaahi Navy (`#0A2858`), EduRaahi Blue (`#1867E8`), Surface White (`#FFFFFF`), Blueprint Grid Tint (`#F4F8FF`), Slate Steel (`#55729D`).
- **Tactile Physics:** 2px/3px high-contrast structural borders, crisp solid offset box shadows (`2px 2px 0px`, `4px 4px 0px`, `6px 6px 0px #0A2858`), and mechanical click depression (`:active translate(2px, 2px)`).
- **Typography Hierarchy:**
  - `Space Grotesk`: High-energy structural headings and control buttons.
  - `DM Sans`: Crisp, readable body and pedagogical explanations.
  - `JetBrains Mono`: Telemetry data, percentages, code blocks, and rubric metrics.
- **Blueprint Texture:** High-precision graph paper engineering grid (`.bg-grid`).

---

## 8. The Golden Path Demo Narrative

When presenting EduRaahi to judges, follow this **3-minute winning demo sequence**:

1. **The Diagnostic (`S01` → `S04`):**
   - Log in as **Rahul Sharma** (3rd-year CS student).
   - Click **"Take Diagnostic (10 Qs)"**. Click *"Pre-fill Diagnostic Simulation"* and hit **Submit**.
   - View baseline score: **58%**.
2. **The Discovery (`S02`):**
   - Navigate to **Learning Intelligence**.
   - Inspect the DAG: Arrays (85%) and Strings (74%) are solid, but **Tree Traversal is critical at 38%**.
   - Click on the *Trees* node: EduRaahi highlights that the root blocker is weak **Recursion (41%)**.
   - Read the AI Misconception alert: *"Confusing pre-order root-first processing with in-order BST sorting"*.
3. **The Socratic Mentor (`S09`):**
   - Open **Guided AI Tutor**. Ask for help on Binary Tree In-Order traversal.
   - Watch the AI provide a **Conceptual Nudge (Stage 1)** instead of dumping code. Request Stage 2 to see the recursive invariant.
4. **The Measurable Leap (`S04` → `S06`):**
   - Return to **Assess & Improve**, select the 5-Question *Tree Traversal Practice Test*.
   - Submit the test: **Trees mastery surges from 38% → 72% (+34 points!)**.
   - The top banner flashes the verified improvement badge.
5. **The Teacher's Control Console (`T01` → `T05`):**
   - Toggle the header role switcher from **Student** to **Teacher: Prof. Sharma**.
   - Look at the **Class Heatmap**: Notice Trees highlighted as the lowest skill across Section 3A (44% avg), with Rahul's +34% leap spotlighted in green!
   - Open the **Intervention Queue**: See at-risk students (Aman, Sneha). Click **"Review & Approve"** on Aman's intervention: edit the assignment instructions, and click **"Approve & Dispatch"**.
6. **Career & Resume Validation (`S14` → `S16`):**
   - Switch back to Rahul. Open **Career & Skills**.
   - Click **Resume Gap Analyzer**: View the audit exposing that while Rahul claimed "Advanced Binary Search Trees", his demonstrated mastery is now verified and aligned.

---

## 9. Setup & Running Locally

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn

### Quickstart Installation
```bash
# 1. Clone the repository
git clone https://github.com/yashraj-rastogi/EduRaahi.git
cd EduRaahi

# 2. Install dependencies
npm install

# 3. Start the Next.js development server
npm run dev
```

Open **`http://localhost:3000`** in your browser to launch the live platform.

### Environment Keys (Optional)
EduRaahi includes deterministic fallback mock engines and pre-seeded database fixtures, so it runs completely out-of-the-box without keys. To connect real Gemini and Firebase endpoints, configure `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 10. Judging Criteria Alignment

| Hackathon Criterion | How EduRaahi Delivers & Wins |
|---|---|
| **Problem Relevance & Impact** | Directly tackles the core failure of modern education: the illusion of competence. Moves education from superficial 1-shot grades to continuous, prerequisite-aware mastery. |
| **Technical Architecture & Logic** | Solves the LLM hallucination danger via strict architectural decoupling: 100% deterministic state machines & mastery calculations, paired with grounded, schema-validated AI explanations. |
| **Innovation & Completeness** | All 22 canonical problem statements implemented and verified across 7 distinct phases within a cohesive, single-source-of-truth application. |
| **Responsible AI & Governance** | Transparent confidence ratings, grounded mistake citations, human-in-the-loop teacher authorization, and refusal to provide lazy shortcut answers. |
| **User Experience & Execution** | Distinctive, tactile Neo-Brutalist engineering cockpit design with fluid animations, zero broken states, and instant interactive persona switching. |

---

<div align="center">
  <sub>Built with 💙 for the Lenovo LEAP Hackathon by Yashraj Rastogi & Team EduRaahi.</sub>
</div>

