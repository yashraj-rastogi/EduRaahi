# ⚡ EduRaahi — AI Learning Intelligence Platform

> **"Know what you know. Discover what you don't. Learn what matters next."**

**Track:** AI in Education & Skilling — Lenovo LEAP Hackathon  
**Roles:** Student (primary) + Teacher (secondary)  
**Live Stack:** Next.js 16 (App Router) + React 19 + Tailwind CSS + Google Gemini 1.5/2.0 + Firebase Firestore / Local Reactive Engine

---

## 1. Executive Summary & Product Thesis

EduRaahi transforms raw student performance into an evolving, structured skill profile, detects high-impact conceptual gaps and misconceptions, creates adaptive learning actions, and empowers teachers with actionable intelligence for human-reviewed interventions.

### The Closed Intelligence Loop
```text
Student Assessment Attempt
           ↓
Deterministic Scoring & Skill Model
           ↓
AI Gap & Misconception Analysis (Gemini)
           ↓
Personalized Recommendation & Next Action
           ↓
Targeted Practice & Reassessment (Trees: 38% → 72%)
           ↓
Updated Learner Model & Class Analytics Heatmap
           ↓
Teacher-Reviewed Pedagogical Intervention
           ↺ (Loop Continues)
```

---

## 2. All 22 Canonical Problems Implemented

EduRaahi covers all 22 competition problems across 3 depth tiers against a shared data model:

| ID | Problem Solved | Feature | Screen ID | Tier |
|---|---|---|---|---|
| **P01** | Students don't know learning gaps | AI Skill Gap Analyzer | `S01`, `S02` | **Core** |
| **P02** | No structured view of skills | Skill Graph / Dependency DAG | `S02`, `S03` | **Core** |
| **P03** | Students don't know why they are wrong | AI Misconception Detector | `S02`, `S06` | **Core** |
| **P04** | Students don't know what to learn next | Next Best Learning Action Engine | `S01` | **Core** |
| **P05** | Generic study plans don't adapt | Adaptive Study Planner | `S01`, `S07` | **Core** |
| **P06** | Students struggle with exam preparation | AI Exam Preparation Optimizer | `S11` | Functional |
| **P07** | Same material doesn't work for every student | Learning Material Personalizer | `S08` | Functional |
| **P08** | Generic chatbots give away answers | Guided Socratic AI Tutor (Hint Ladder) | `S09` | **Core** |
| **P09** | Students learn better through projects | AI Project-Based Learning Engine | `S10` | Showcase |
| **P10** | Assessments don't provide useful feedback | AI Assessment Analysis | `S06` | **Core** |
| **P11** | Teachers spend too much time creating tests | AI Assessment Generator | `T06` | Functional |
| **P12** | Manual assignment evaluation takes too long | AI Assignment Feedback Assistant | `T07` | Functional |
| **P13** | Students need interactive oral practice | AI Technical Viva / Interview Simulator | `S13` | Showcase |
| **P14** | Students lack personalized career guidance | AI Career Match Navigator | `S14` | Functional |
| **P15** | Students don't know required career skills | Skill-to-Career Mapping | `S15` | Functional |
| **P16** | Students don't know job readiness | Job Readiness Analyzer | `S14`, `S15` | Functional |
| **P17** | Resume claims don't match demonstrated skill | Resume → Skill Gap Analyzer | `S16` | Showcase |
| **P18** | Students don't know employability projects | Career Project Recommender | `S17` | Showcase |
| **P19** | Teachers can't identify class weak areas | Class Learning Analytics Heatmap | `T01`, `T02` | **Core** |
| **P20** | Teachers don't know who needs intervention | At-Risk / Intervention Queue | `T01`, `T03` | **Core** |
| **P21** | Teachers don't know what intervention to give | AI Intervention Recommendations | `T03`, `T05` | **Core** |
| **P22** | Teachers spend too much time writing content | Teacher Content & Lesson Assistant | `T08` | Functional |

---

## 3. Core Architectural Boundaries & Governance

1. **Deterministic Logic Controls App State:**
   - Correctness scoring, mastery formulas, attempt submission, trend calculation, and teacher approval states are 100% deterministic code (`src/lib/scoringEngine.js`, `src/lib/masteryEngine.js`).
   - AI **never** calculates official test scores or bypasses teacher approval.
2. **AI Reasoning Layer (Gemini):**
   - AI acts as the reasoning, diagnosis, and explanation engine (`src/lib/aiService.js`).
   - Every AI response is validated against a strict JSON schema containing `insight`, `confidence`, `evidence[]`, and `recommended_action`.
3. **Dual-Mode Data Layer:**
   - Full Firebase Firestore SDK integration + instant local reactive storage engine (`src/lib/storage.js`).
   - 100% resilient offline fallback: zero broken screens if the internet or API keys are disconnected.

---

## 4. Neo-Brutalist Cockpit Design System

EduRaahi strictly adheres to the provided design guidelines:
- **Palette:** EduRaahi Navy (`#0A2858`), EduRaahi Blue (`#1867E8`), White (`#FFFFFF`), Parchment Tint (`#F4F8FF`), Slate Steel (`#55729D`).
- **Tactile Physics:** Solid high-contrast borders (`2px`/`3px`), hard solid offset drop shadows (`2px 2px 0px`, `4px 4px 0px`, `6px 6px 0px`), and mechanical press depression (`:active translate(2px, 2px)`).
- **Typography Trio:** `Space Grotesk` (Headings & Buttons), `DM Sans` (Readable Body), `JetBrains Mono` (Terminal stats, metrics, & code).
- **Textures:** Engineering graph paper blueprint grid (`.bg-grid`).

---

## 5. The Golden Path Demo Narrative (The Winning Pitch)

1. **Initial Assessment:** Student Rahul Sharma (preparing for Backend Placement) takes the 10-Question Diagnostic Assessment → Baseline Score: **58%**.
2. **Skill Model & Gap Analysis:** System identifies per-skill breakdown: Arrays 85%, Strings 74%, Complexity 65%, Graphs 59%, Recursion 41%, and **Trees 38%**.
3. **AI Gap & Misconception Insights:** Gemini explains: *"Rahul's main weakness is Tree Traversal and recursive subtree reasoning"* citing wrong answers on BST sorted order.
4. **Next Best Action & Adaptive Plan:** Dashboard recommends: *"Tree Traversal Fundamentals"*. Weekly plan dynamically allocates 45m for Trees and 30m for Recursion.
5. **Targeted Practice & Reassessment:** Rahul completes the 5-question Tree Traversal practice.
6. **Measurable Mastery Leap:** Trees mastery increases deterministically from **38% → 72% (+34 points)**!
7. **Teacher Class Analytics:** Prof. Sharma opens Class 3A dashboard → Skill Heatmap reveals Trees as lowest class-wide skill (44% avg across cohort), and highlights Rahul's +34% improvement!
8. **Human-in-the-Loop Intervention:** AI recommends a 4-step intervention for at-risk classmates. Teacher reviews, edits, and approves the intervention.

---

## 6. Setup & Running Locally

### Prerequisites
- Node.js 18+ installed

### Install & Run
```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### Configuration (Optional)
Add your keys to `.env` or `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```
*(Note: EduRaahi includes full pre-seeded data and deterministic fallbacks, so the entire demo runs out-of-the-box even without API keys!)*

---

## 7. Judging Criteria Alignment

- **Problem Relevance:** Solves the core AI in Education & Skilling challenge (learning gap identification, personalized paths, teacher augmentation).
- **Application & Logic:** Rigorous separation between deterministic state invariants and AI probabilistic reasoning; confidence and evidence attached to every insight.
- **Innovation:** Closed feedback loop (not a static study plan or one-shot chatbot).
- **Responsible AI:** Transparent confidence scores, evidence citations, human-in-the-loop teacher governance, and signals over labels.
