# ⚡ EduRaahi — AI Learning Intelligence & Skill Diagnostics Platform

> **"Know what you know. Discover what you don't. Learn what matters next."**

<div align="center">
  <img src="public/logo.png" alt="EduRaahi Logo" width="140" height="140" />
  <h3>Continuous Competency Mapping, Socratic Mentorship & Pedagogical Intelligence for Higher Education</h3>
  <p><strong>Theme:</strong> AI in Education & Skilling / Smart Education</p>
  <p><strong>Live Stack:</strong> Next.js 16 (App Router) • React 19 • Tailwind CSS • Google Gemini 1.5/2.0 • Firebase Firestore & Local Reactive Engine</p>
</div>

---

## 📌 Table of Contents
1. [The Problem: What is Broken in Higher Education & Skilling Today?](#1-the-problem-what-is-broken-in-higher-education--skilling-today)
2. [The Solution: EduRaahi's Closed-Loop Learning Intelligence](#2-the-solution-eduraahis-closed-loop-learning-intelligence)
3. [Target Stakeholders & Dual-Loop Architecture](#3-target-stakeholders--dual-loop-architecture)
4. [How We Solved It: Technical Architecture & Core Pillars](#4-how-we-solved-it-technical-architecture--core-pillars)
5. [How EduRaahi Differs from Legacy Tools](#5-how-eduraahi-differs-from-legacy-tools)
6. [Comprehensive Problem & Feature Coverage (All 22 Core Challenges)](#6-comprehensive-problem--feature-coverage-all-22-core-challenges)
7. [Neo-Brutalist Cockpit Design System](#7-neo-brutalist-cockpit-design-system)
8. [The Golden Path Demo Script (3-Minute Live Showcase Flow)](#8-the-golden-path-demo-script-3-minute-live-showcase-flow)
9. [Local Setup & Configuration](#9-local-setup--configuration)
10. [Evaluation & Judging Alignment](#10-evaluation--judging-alignment)

---

## 1. The Problem: What is Broken in Higher Education & Skilling Today?

Higher education, computer science curricula, and technical skilling institutions face a structural crisis characterized by the **"Illusion of Competence"**:

```
Traditional Testing                       Student Reality
┌─────────────────────────┐               ┌─────────────────────────────────────────────────┐
│ "Student Scored 62%     │   Conceals   │ • Which specific sub-skill failed?              │
│  on Data Structures"    │ ────────────► │ • Why did the misconception happen?             │
│                         │               │ • What prerequisite blocker caused the error?   │
└─────────────────────────┘               └─────────────────────────────────────────────────┘
```

### 🚨 Core Failures in the Current Ecosystem:

1. **Superficial Aggregate Marks (Lack of Granular Diagnostics):**
   - Traditional exams, LMS platforms (Canvas, Moodle), and quizzes evaluate students through one-off numerical marks (e.g., *"62/100"*).
   - This single aggregate figure conceals *which* specific concepts failed, *why* the student erred, and *which underlying foundational prerequisite* caused the misunderstanding.

2. **Metacognitive Blindness & Hidden Prerequisite Blockers:**
   - **Lack of Skill Awareness:** Students don't know what they don't know. A student failing *Binary Tree Traversal* or *Graph DFS* often does not realize their true conceptual bottleneck is actually weak *Recursion* or misunderstood *Stack Memory Frames*.
   - **Non-Adaptive Study Habits:** Because learners lack structured dependency graphs, they resort to generic, non-adaptive routines—re-reading familiar topics they have already mastered while continually avoiding critical prerequisite blockers.

3. **The AI Chatbot Paradox (Generative Answer-Dumping Stunts Learning):**
   - When students turn to conventional LLM chatbots (ChatGPT, Copilot), the models immediately output complete, ready-to-run code and final answers.
   - This encourages **passive copy-pasting**, destroys algorithmic reasoning, bypasses the cognitive struggle required for neuroplastic retention, and fosters false confidence.

4. **Instructor Overload & Blindness to Class Micro-Gaps:**
   - A professor or teaching assistant managing 60–120+ students cannot manually inspect every line of homework or quiz response to identify class-wide conceptual trends.
   - Consequently, educators only discover that a cohort is struggling *after* high-stakes midterms or semester dropouts, when the window for corrective intervention has already closed.

5. **The College-to-Career Employability & Verified Proof Gap:**
   - Engineering students populate resumes with unverified claims (e.g., *"Proficient in Advanced Tree Algorithms & Dynamic Programming"*).
   - Placement officers and technical recruiters have no objective, empirical mechanism to cross-reference *Claimed Skills* against *Demonstrated Mastery*, leading to interview rejections and placement mismatches.

---

## 2. The Solution: EduRaahi's Closed-Loop Learning Intelligence

**EduRaahi** (*"Raahi"* = *The Pathfinder / Guide* in Hindi) is a next-generation **AI Learning Intelligence & Skill Diagnostics Engine**. Rather than functioning as a passive video archive or an answer-generating chatbot, EduRaahi continuously maps student attempts into structured competency graphs, diagnoses root misconceptions, prescribes targeted next actions, and keeps teachers at the helm with actionable early-warning alerts.

### 🔄 The Continuous Closed-Loop Feedback Engine

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        1. Diagnostic Assessment                        │
│       (Multi-Skill Diagnostic & Targeted Tests with Real Multilingual) │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 2. Deterministic State & Scoring Engine                │
│       (Zero Hallucination: Mathematical Rubric & Weight Calculation)   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│             3. Grounded AI Reasoning Layer (Gemini 1.5/2.0)            │
│  (Diagnoses Root Misconceptions + Cites Grounded Evidence + Confidence)│
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│               4. Dynamic Prerequisite DAG & Adaptive Plan              │
│     (Graph-based mapping: Identifies Root Preconditions, e.g. Recursion)│
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
                                   └───► ↺ Continuous Closed-Loop Repeats
```

### 💡 The 8 Pillars of the EduRaahi Architecture:

1. **Diagnostic Competency Graphing:** Students start with a multi-skill diagnostic that builds an evolving skill tree rather than a flat grade.
2. **Deterministic-First Foundation:** Grades, prerequisite locks, decay formulas, and deadlines are computed 100% mathematically in pure JavaScript. AI never fabricates scores.
3. **Evidence-Grounded AI Diagnostics:** AI acts strictly as an analytical copilot, extracting exact misconception patterns, citing quoted code/answer evidence, and providing calibrated confidence scores.
4. **Prerequisite Dependency Traversal:** Visualizes the Directed Acyclic Graph (DAG) of computer science topics, exposing how weaknesses in upstream nodes block downstream understanding.
5. **Strict Socratic Pedagogical Ladder:** A 5-tier hint architecture (Conceptual Nudge → Algorithmic Strategy → Pseudocode Outline → Syntax Trace → Full Solution) that preserves cognitive friction.
6. **Empirically Proven Mastery Gains:** Reassessments explicitly measure and highlight before/after skill deltas (e.g., student jumping from 38% to 72% mastery).
7. **Human-in-the-Loop Teacher Console:** Cohort-wide heatmap matrices, prioritized at-risk student queues, and 1-click teacher review & approval before any AI intervention reaches a student.
8. **Placement & Career Readiness Auditor:** Objective audit cross-referencing claimed resume keywords with empirically demonstrated skill scores for real-world hiring readiness.

---

## 3. Target Stakeholders & Dual-Loop Architecture

EduRaahi bridges the communication and data gap between learners, educators, and institutional career cells:

### 👤 1. The Engineering Student (Learner Persona: *Rahul Sharma*)
- **Context:** 3rd-year Computer Science undergraduate preparing for campus placement drives.
- **Pain Points:** Unsure where his Data Structures & Algorithms (DSA) preparation breaks down; gets stuck on recursion-heavy topics; relies on chatbots that spoil solutions; lacks confidence in interview readiness.
- **Value Realized:** Real-time visibility into his competence DAG, guided Socratic practice that builds problem-solving intuition, and a verified climb in skill scores.

### 👨‍🏫 2. The College Professor & Instructor (Educator Persona: *Prof. Sharma*)
- **Context:** Faculty member teaching 60–120 undergraduate students in Algorithms and Systems.
- **Pain Points:** Zero time to manually audit individual assignments; inability to spot at-risk students before semester exams; overwhelming manual effort creating rubrics and lesson packages.
- **Value Realized:** Instant bird's-eye view via cohort heatmaps, automated early-warning alerts for struggling students, and AI-drafted intervention plans that the teacher can edit and approve with a single click.

### 🏢 3. Training & Placement Officers (Institutional Stakeholder)
- **Context:** Campus placement cell evaluating students for competitive company recruitment drives.
- **Pain Points:** Resume inflation, difficulty distinguishing genuine algorithmic problem-solvers from passive copy-pasters.
- **Value Realized:** Objective, empirical readiness percentage matching verified test performance against real industry job descriptions.

---

## 4. How We Solved It: Technical Architecture & Core Pillars

### 🧠 Architectural Invariants: Decoupling Determinism from AI Reasoning

EduRaahi eliminates the primary liability of generative AI in education—**unreliable grading and hallucinated scores**—by strictly enforcing architectural separation:

```text
┌──────────────────────────────────────────────────────────┐
│             DETERMINISTIC STATE ENGINE                   │
│   • Mathematical Scoring & Percentage Calculation        │
│   • Exponential Mastery Decay & Skill Weighting Formulas │
│   • Prerequisite DAG Edge Locking / Unlocking            │
│   • Teacher Authorization & Dispatch States              │
└────────────────────────────┬─────────────────────────────┘
                             │ Validated State Data
                             ▼
┌──────────────────────────────────────────────────────────┐
│             GROUNDED AI REASONING COPILOT                │
│   • Gemini 1.5/2.0 Structured JSON Schema Responses      │
│   • Misconception Classification & Cited Mistake Evidence│
│   • 5-Stage Socratic Hint Generation                     │
│   • Draft Intervention Proposals & Rubric Suggestions    │
└──────────────────────────────────────────────────────────┘
```

1. **Deterministic State Invariants:**
   - Attempt grading, percentage marks, mastery formulas (`src/lib/scoringEngine.js`, `src/lib/masteryEngine.js`), and DAG dependency unlocks run completely through deterministic logic.
   - **Rule:** AI is never allowed to calculate a student's grade, modify mastery points, or bypass teacher authorization.
2. **Grounded AI Reasoning (Google Gemini 1.5/2.0):**
   - AI is used exclusively for semantic analysis, diagnostic explanation, and socratic scaffolding (`src/lib/aiService.js`).
   - Every prompt enforces strict JSON output schemas requiring `evidence[]` citations of user mistakes, `pedagogicalRationale`, and a calibrated `confidence` rating (0.0 to 1.0).
3. **Dual-Mode Resilient Data Layer:**
   - Integrated with **Firebase Firestore SDK** for multi-device cloud synchronization, backed by a high-speed **Local Reactive Engine** (`src/lib/storage.js`).
   - Operates 100% reliably in local/offline demo mode with rich fallback fixtures—guaranteeing zero broken screens even without an active internet connection or API keys.

---

### 🚀 Core Feature Modules:

#### 1. Learner Intelligence Cockpit (`S01`, `S02`, `S03`)
- **6-Question Learner Model:** Answers in seconds: *Where do I stand? What are my weak spots? Why am I wrong? What should I do next? How does my plan adapt? How prepared am I for placements?*
- **Interactive Prerequisite DAG:** Visualizes skill dependencies (*Time Complexity → Arrays → Recursion → Trees → Graph Algorithms*).
- **Misconception Detection:** Identifies deep mental model errors (e.g., *"Confusing Pre-order root-first processing with In-order BST sorting"*).

#### 2. Assessment Engine with Measurable Before/After Jump (`S04`, `S05`, `S06`)
- Full 10-Question Diagnostic Assessment with immediate multi-skill evaluation.
- Demonstrates a **concrete, measurable leap**: Student Rahul completes targeted Tree Traversal practice and leaps from **38% → 72% mastery (+34 point gain)**, visually highlighted across student and instructor views.

#### 3. Guided Socratic AI Tutor (`S09`)
- Enforces a strict **5-Stage Hint Ladder**:
  1. *Conceptual Nudge* (identifies the core invariant without giving code).
  2. *Algorithmic Strategy* (suggests high-level strategy e.g. recursion base case).
  3. *Pseudocode Outline* (structure and invariant logic).
  4. *Targeted Syntax / Trace* (edge case walkthrough).
  5. *Full Solution with Reflection* (unlocked only after student attempts).
- Includes an automated **Verification Check** to ensure active comprehension before advancing.

#### 4. Multilingual & Adaptive Personalization (`S07`, `S08`, `S10`, `S11`)
- **Language Switcher:** Instant translation between English, Hinglish (Hindi-English mix), and Hindi for conceptual clarity.
- **Adaptive Study Planner:** Dynamically increases weekly hour allocations for lagging topics.
- **Exam Optimizer & Project Scaffolding:** Transforms abstract algorithms into full-stack project blueprints.

#### 5. Teacher Console & Human-in-the-Loop Interventions (`T01`–`T08`)
- **Cohort Heatmap (`T01`):** Color-coded matrix showing class cohorts across 6 DSA skills, highlighting that Trees (44% cohort average) is the primary bottleneck.
- **Prioritized Intervention Queue (`T03`):** AI flags at-risk students and drafts targeted intervention tasks.
- **Teacher Review & Edit Modal (`T05`):** Instructors edit the AI's action plan, adjust deadlines, and formally approve it before dispatch.
- **Teacher Assist Tools (`T06`–`T08`): 1-click AI Assessment Builder, Rubric Assignment Evaluator with manual overrides, and complete Lesson Package Generator.

#### 6. Career & Placement Alignment (`S14`–`S17`)
- **Career Match Navigator:** Calculates objective readiness percentages for target roles (e.g., *Backend Software Engineer: 58%*).
- **Claimed vs. Demonstrated Skill Audit:** Compares keywords on uploaded student resumes against empirical assessment scores to eliminate resume inflation.
- **Technical Viva / Interview Simulator:** Real-time AI technical oral practice with instant constructive feedback.

---

## 5. How EduRaahi Differs from Legacy Tools

| Dimension / Capability | Traditional LMS (Canvas, Moodle) | Standard EdTech (Coursera, Udemy) | Generic AI Chatbots (ChatGPT, Copilot) | ⚡ EduRaahi AI Platform |
|---|---|---|---|---|
| **Assessment Model** | Static aggregate grades (e.g. "62%") | Passive video watching & simple quizzes | Single unstructured conversation | **Closed-Loop Intelligence (Diagnose → Socratic Guidance → Re-assess → Leap)** |
| **Prerequisite Awareness** | ❌ None | ❌ Linear module ordering | ❌ No persistent dependency graph | **✅ Interactive Prerequisite DAG exposing foundational root blockers** |
| **AI Reliability & Scoring** | ❌ None | ❌ None | ⚠️ Hallucinates marks and numbers | **✅ 100% Deterministic State Engine; AI strictly used for grounded reasoning** |
| **Pedagogical Guardrails** | ❌ None | ❌ None | ❌ Dumps complete code & answers immediately | **✅ 5-Stage Socratic Hint Ladder; preserves cognitive friction** |
| **Teacher Governance** | ⚠️ Manual, time-consuming grading | ❌ Disconnected from teachers | ❌ Zero teacher oversight | **✅ Human-in-the-Loop Intervention Queue with review, edit & approval** |
| **Cohort Diagnostic Heatmap** | ❌ Only raw grade spreadsheets | ❌ Aggregate completion rates | ❌ None | **✅ Live Skill-by-Cohort Heatmap isolating class-wide conceptual gaps** |
| **Resume & Placement Link** | ❌ Completely decoupled | ❌ Generic completion certificates | ❌ Generic resume bullet advice | **✅ Claimed vs. Demonstrated Skill Audit with verified placement match %** |
| **UI Experience & Design** | ⚠️ Outdated, cluttered tables | ⚠️ Generic corporate cards | ⚠️ Plain message bubble thread | **✅ Tactile Neo-Brutalist Cockpit with engineering blueprint grid** |

---

## 6. Comprehensive Problem & Feature Coverage (All 22 Core Challenges)

EduRaahi addresses the comprehensive spectrum of 22 core pedagogical, analytical, and employability challenges in modern higher education and skilling:

| ID | Challenge / Problem Area | EduRaahi Solution Component | Screen ID |
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

EduRaahi adopts an intentional, high-contrast **engineering cockpit aesthetic**:
- **Tailored Palette:** EduRaahi Navy (`#0A2858`), EduRaahi Blue (`#1867E8`), Surface White (`#FFFFFF`), Blueprint Grid Tint (`#F4F8FF`), Slate Steel (`#55729D`), Success Mint (`#16A34A`), Alert Amber (`#FBBF24`).
- **Tactile Physics:** 2px/3px high-contrast structural borders, solid offset box shadows (`2px 2px 0px`, `4px 4px 0px`, `6px 6px 0px #0A2858`), and mechanical click depression (`:active translate(2px, 2px)`).
- **Typography Hierarchy:**
  - `Space Grotesk`: High-energy structural headings and control buttons.
  - `DM Sans`: Crisp, readable body typography and pedagogical explanations.
  - `JetBrains Mono`: Telemetry data, percentages, code blocks, and rubric metrics.
- **Blueprint Texture:** High-precision graph paper engineering grid background (`.bg-grid`).

---

## 8. The Golden Path Demo Script (3-Minute Live Showcase Flow)

When demonstrating EduRaahi to evaluators, judges, or peers, follow this **3-minute showcase sequence**:

1. **The Diagnostic Baseline (`S01` → `S04`):**
   - Log in as **Rahul Sharma** (3rd-year CS student).
   - Click **"Take Diagnostic (10 Qs)"**. Click *"Pre-fill Diagnostic Simulation"* and hit **Submit**.
   - View baseline score: **58%**.
2. **The Discovery & Dependency DAG (`S02`):**
   - Navigate to **Learning Intelligence**.
   - Inspect the DAG: Arrays (85%) and Strings (74%) are strong, but **Tree Traversal is critical at 38%**.
   - Click on the *Trees* node: EduRaahi highlights that the root foundational blocker is weak **Recursion (41%)**.
   - Read the AI Misconception alert: *"Confusing pre-order root-first processing with in-order BST sorting"*.
3. **The Guided Socratic Mentor (`S09`):**
   - Open **Guided AI Tutor**. Ask for assistance on Binary Tree In-Order traversal.
   - Watch the AI provide a **Conceptual Nudge (Stage 1)** instead of dumping code. Request Stage 2 to see the recursive invariant.
4. **The Measurable Mastery Jump (`S04` → `S06`):**
   - Return to **Assess & Improve**, select the 5-Question *Tree Traversal Practice Test*.
   - Submit the test: **Trees mastery surges from 38% → 72% (+34 points!)**.
   - The top banner flashes the verified improvement badge.
5. **The Teacher's Control Console (`T01` → `T05`):**
   - Toggle the header role switcher from **Student** to **Teacher: Prof. Sharma**.
   - Inspect the **Class Heatmap**: Notice Trees highlighted as the lowest skill across Section 3A (44% avg), with Rahul's +34% leap spotlighted in green!
   - Open the **Intervention Queue**: See at-risk students (Aman, Sneha). Click **"Review & Approve"** on Aman's intervention: edit the assignment instructions, and click **"Approve & Dispatch"**.
6. **Career & Resume Validation (`S14` → `S16`):**
   - Switch back to Rahul. Open **Career & Skills**.
   - Click **Resume Gap Analyzer**: View the audit exposing that while Rahul claimed "Advanced Binary Search Trees", his demonstrated mastery is now verified and aligned.

---

## 9. Local Setup & Configuration

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

Open **`http://localhost:3000`** in your browser to launch the platform.

### Environment Configuration (Optional)
EduRaahi includes deterministic fallback mock engines and pre-seeded database fixtures, running completely out-of-the-box without keys. To connect live Gemini AI and Firebase cloud persistence, configure `.env.local`:
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

## 10. Evaluation & Judging Alignment

| Evaluation Pillar | How EduRaahi Delivers & Excels |
|---|---|
| **Problem Relevance & Impact** | Directly tackles the core failure of modern education: the illusion of competence. Shifts education from superficial 1-shot grades to continuous, prerequisite-aware mastery. |
| **Technical Architecture & Logic** | Solves the LLM hallucination danger via strict architectural decoupling: 100% deterministic state machines & mastery calculations, paired with grounded, schema-validated AI explanations. |
| **Innovation & Completeness** | All 22 canonical problem scenarios implemented and verified across 7 distinct phases within a cohesive, single-source-of-truth application. |
| **Responsible AI & Governance** | Transparent confidence ratings, grounded mistake citations, human-in-the-loop teacher authorization, and refusal to provide lazy shortcut answers. |
| **User Experience & Execution** | Distinctive, tactile Neo-Brutalist engineering cockpit design with fluid animations, zero broken states, and instant interactive persona switching. |

---

<div align="center">
  <sub>Built with 💙 by Yashraj Rastogi & Team EduRaahi • Smart Education & AI Skilling.</sub>
</div>
