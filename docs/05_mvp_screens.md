# AI Education & Skilling Platform — V2 Coding-Agent Specification

## Canonical Product Position

**Positioning:** An AI-powered learning intelligence platform that continuously maps student skills, detects learning gaps and misconceptions, recommends the next best learning action, and gives teachers actionable intervention insights.

**Tagline:** Know what you know. Discover what you don't. Learn what matters next.

## Canonical Product Structure

1. 🧠 Learning Intelligence
2. 🎯 Personalized Learning
3. 📝 Assess & Improve
4. 🚀 Career & Skills
5. 👩‍🏫 Teacher Insights

## Roles

- **Student:** primary role and primary product experience.
- **Teacher:** secondary role focused on monitoring, intervention, assessment/content assistance.
- **Institution/Admin:** future scope; do not build in the current MVP.

## Canonical Intelligence Loop

`Input → Analysis → Recommendation → Action → Outcome → New Data → Updated Recommendation`

## Critical Engineering Boundary

AI is the reasoning/intelligence layer. Deterministic application logic controls:

- authentication and authorization
- permissions
- assessment correctness and scoring
- mastery/state updates
- attempt submission
- task completion state
- teacher approval
- intervention status
- database writes and invariants

AI outputs must be structured, schema-validated, evidence-grounded, and passed through application/rule validation before persistence.

## Implementation Target

- React + JavaScript + Tailwind CSS
- Firebase Authentication where needed; hardcoded demo accounts are acceptable for the hackathon demo
- Firestore
- Firebase Cloud Functions / callable service boundary for privileged AI operations
- Gemini/LLM through a server-side AI abstraction
- Synthetic but realistic seeded demo data
- No API secrets in the client

## Hackathon Scope Rule

All 22 canonical problems remain in scope. Depth varies by tier:

- **Core / Bulletproof:** golden-path intelligence loop and teacher intervention loop
- **Functional:** complete end-to-end feature with simpler UX/AI
- **Showcase:** credible working slice demonstrating breadth

Time constraints may change parallelization and polish, **not silently delete problem coverage**.


# V2 additions — Screen System

## Screen-ID Principle

Keep stable screen IDs for coding-agent task references, but prefer consolidated product views over unnecessary route proliferation.

## Student

| ID | Screen/View | Primary data |
|---|---|---|
| S01 | Student Dashboard | skills, insights, plan |
| S02 | Learning Intelligence Hub | skills, gaps, misconceptions |
| S03 | Skill Detail | studentSkill, evidence |
| S04 | Assessment List | assessments |
| S05 | Assessment Player | assessment/questions |
| S06 | Assessment Results | attempt, breakdown |
| S07 | Adaptive Study Plan | learningPlan |
| S08 | Personalized Lesson | AI content |
| S09 | Guided AI Tutor | tutor session |
| S10 | Project Learning | project/recommendation |
| S11 | Exam Preparation | syllabus, priorities |
| S12 | Assess & Improve Hub | feedback/progress |
| S13 | Viva/Interview Simulator | viva session |
| S14 | Career Dashboard | career goal/readiness |
| S15 | Career Skill Map | required vs current skills |
| S16 | Resume Skill Analysis | resume claims/evidence |
| S17 | Career Projects | recommendations |

## Teacher

| ID | Screen/View | Primary data |
|---|---|---|
| T01 | Teacher Dashboard | classes, alerts |
| T02 | Class Skill Heatmap | aggregated studentSkills |
| T03 | Intervention Queue | interventions |
| T04 | Student Intelligence Profile | student evidence/skills |
| T05 | Intervention Review | AI recommendation + teacher decision |
| T06 | Assessment Builder | assessment draft |
| T07 | Assignment Feedback Review | feedback draft |
| T08 | Teacher Content Assistant | generated content |

## Required UI States

Every AI-backed screen must support:
- loading / analyzing
- success
- empty
- invalid AI response
- AI unavailable / deterministic fallback
- permission denied
- stale data where relevant


## Canonical 22-Problem Traceability

| ID | Problem | Feature | Category | Tier |
|---|---|---|---|---|
| P01 | Students don't know learning gaps | AI Skill Gap Analyzer | Learning Intelligence | Core |
| P02 | No structured view of skills | Skill Graph / Knowledge Graph | Learning Intelligence | Core |
| P03 | Students don't know why they are wrong | AI Misconception Detector | Learning Intelligence | Core |
| P04 | Students don't know what to learn next | Next Best Learning Action Engine | Learning Intelligence | Core |
| P05 | Generic study plans don't adapt | Adaptive Study Planner | Personalized Learning | Core |
| P06 | Students struggle with exam preparation | AI Exam Preparation Optimizer | Personalized Learning | Functional |
| P07 | Same material doesn't work for every student | Learning Material Personalizer | Personalized Learning | Functional |
| P08 | Generic chatbots give complete answers | Guided AI Tutor / Coding Mentor | Personalized Learning | Core |
| P09 | Students learn better through projects | AI Project-Based Learning Engine | Personalized Learning | Showcase |
| P10 | Assessments don't provide useful feedback | AI Assessment Analysis | Assess & Improve | Core |
| P11 | Teachers spend too much time creating assessments | AI Assessment Generator | Assess & Improve | Functional |
| P12 | Manual assignment evaluation takes too much time | AI Assignment Feedback Assistant | Assess & Improve | Functional |
| P13 | Students need interactive oral practice | AI Viva / Interview Simulator | Assess & Improve | Showcase |
| P14 | Students lack personalized career guidance | AI Career Navigator | Career & Skills | Functional |
| P15 | Students don't know required skills for careers | Skill-to-Career Mapping | Career & Skills | Functional |
| P16 | Students don't know job readiness | Job Readiness Analyzer | Career & Skills | Functional |
| P17 | Resume skills may not match demonstrated skills | Resume → Skill Gap Analysis | Career & Skills | Showcase |
| P18 | Students don't know which projects improve employability | Career Project Recommender | Career & Skills | Showcase |
| P19 | Teachers can't identify class-wide weak areas | Class Learning Analytics Dashboard | Teacher Insights | Core |
| P20 | Teachers don't know who needs intervention | At-Risk / Intervention Queue | Teacher Insights | Core |
| P21 | Teachers don't know what intervention to give | AI Intervention Recommendations | Teacher Insights | Core |
| P22 | Teachers spend too much time creating personalized material | Teacher Content Assistant | Teacher Insights | Functional |


---

# Preserved Detailed Source Specification

# MVP SCREENS — AI Learning Intelligence Platform

---

## 1. Navigation Map

### Student
```text
Dashboard
│
├── 🧠 Learning Intelligence
│   ├── Skill Graph
│   ├── Learning Gaps
│   └── AI Insights
│
├── 🎯 Personalized Learning
│   ├── Study Plan
│   ├── Recommended Next
│   └── AI Tutor
│
├── 📝 Assess & Improve
│   ├── Assessments
│   ├── Practice
│   └── Progress
│
└── 🚀 Career & Skills
    ├── Career Goal
    ├── Skill Gap
    └── Projects
```

### Teacher
```text
Dashboard
│
├── 📊 Class Intelligence
│   ├── Skill Heatmap
│   ├── Performance
│   └── Trends
│
├── 👥 Students
│   ├── Student Profiles
│   ├── Skill Gaps
│   └── Intervention Queue
│
├── 📝 Assessments
│   ├── Create
│   ├── AI Generate
│   └── Results
│
└── 🧠 AI Teaching Assistant
    ├── Content Generator
    └── Intervention Planner
```

---

## 2. Student Screens

### 2.1 Main Dashboard
**Purpose:** Answer "where do I stand and what should I do right now?" in one glance.
**Key elements:**
- Greeting + overall skill score + learning streak + goal progress
- "Your Top Gaps" — 3 weakest skills with progress bars and color coding
- "AI Recommends" — 1–2 recommended actions with estimated time
- Quick nav into the four student categories

**Data source:** `studentSkills` (top N by lowest mastery), `aiInsights` (type: recommendation, status: active), `learningPlans`.

### 2.2 Skill Graph
**Purpose:** Structured view of knowledge, not just a percentage.
**Key elements:** Subject → Topic → Skill hierarchy; each node shows mastery %, trend arrow, and color (🟢🟡🔴).
**Data source:** `subjects/.../skills`, joined client-side with `studentSkills`.

### 2.3 Learning Gaps
**Purpose:** Ranked list of weak skills with the *why*.
**Key elements:** Skill name, mastery %, "why you're seeing this" (evidence from `aiInsights.evidence`), confidence indicator, CTA to start recommended action.

### 2.4 AI Insights (feed)
**Purpose:** Chronological feed of all AI-generated insights (gap, misconception, recommendation) for transparency.
**Key elements:** Insight text, type badge, confidence %, evidence list, status (active/acted-on/dismissed).

### 2.5 Study Plan
**Purpose:** Adaptive weekly plan.
**Key elements:** Goal + deadline header, task list with allocated time per skill, "plan changed because..." banner when recalculated after a reassessment.

### 2.6 Recommended Next
**Purpose:** Single most important next action (subset of Learning Gaps, surfaced standalone for the demo).
**Key elements:** One skill, one action, explanation, "Start" button.

### 2.7 AI Tutor
**Purpose:** Guided, hint-ladder chat — not an answer-dispensing chatbot.
**Key elements:** Chat interface; AI responses follow hint → concept → hint → approach → pseudocode → full explanation only if needed; a visible "understanding check" question after each explanation.

### 2.8 Assessments
**Purpose:** List of available/completed assessments.
**Key elements:** Assessment cards (topic, difficulty, question count, status); score once completed.

### 2.9 Practice
**Purpose:** Targeted micro-practice tied to a specific weak skill (used in the reassessment step of the golden path).
**Key elements:** 3–5 question set, immediate scoring, feeds back into `studentSkills`.

### 2.10 Progress
**Purpose:** Before/after visualization — the single strongest demo metric.
**Key elements:** Skill-level before → after bars (e.g. Tree Traversal 38% → 72%), overall trend line.

### 2.11 Career Goal
**Purpose:** Set/view target role.
**Key elements:** Role selector, match % against current profile, explanation of the match.

### 2.12 Skill Gap (career-framed)
**Purpose:** Required-skill checklist against the target role.
**Key elements:** ✓ / △ / ✗ per required skill, current vs. required level.

### 2.13 Projects
**Purpose:** Recommended projects that close the identified career skill gap.
**Key elements:** Project title, target skill gap it addresses, description, status.

---

## 3. Teacher Screens

### 3.1 Main Dashboard
**Purpose:** "Who needs help, with what, and why?" answered immediately.
**Key elements:** Class name, student count, avg score, engagement %; class skill health list (color-coded); AI intervention queue summary; `[View Students]` `[Generate Intervention Plan]` actions.

### 3.2 Skill Heatmap
**Purpose:** Class-wide weak-area visibility.
**Key elements:** Skill × mastery-% grid/list, color-coded, sortable by weakest first.

### 3.3 Performance / Trends
**Purpose:** Class performance over time.
**Key elements:** Score trend line, engagement trend, skill-level trend per topic.

### 3.4 Student Profiles
**Purpose:** Individual student's full skill state, from the teacher's side.
**Key elements:** Skill graph (same component as student-side, read-only), performance trend, repeated-mistake history.

### 3.5 Intervention Queue
**Purpose:** Prioritized list of students needing attention.
**Key elements:** Student, skill, urgency (🔴/🟠/🟡), evidence summary (e.g. "3 consecutive low scores + low completion"). Explicitly framed as *signals*, never a permanent "weak student" label.

### 3.6 AI Intervention Recommendation (drill-down)
**Purpose:** Teacher clicks a student+skill → sees a concrete AI-suggested action plan.
**Key elements:** Numbered suggested steps, `[Approve]` `[Edit]` `[Reject]` — every recommendation requires teacher action before it becomes an assigned intervention.

### 3.7 Assessments — Create / AI Generate / Results
**Purpose:** Assessment authoring and results review.
**Key elements:** Manual creation form; AI-generate form (topic, difficulty, objectives, count) → generated draft → review/edit → publish; results view per assessment with per-skill breakdown across the class.

### 3.8 AI Teaching Assistant — Content Generator
**Purpose:** Generate lesson material for a topic/class/difficulty/goal.
**Key elements:** Input form → generated lesson outline, examples, quiz, practice problems, revision material → review before publish.

### 3.9 AI Teaching Assistant — Intervention Planner
**Purpose:** Bulk view across all pending interventions for planning.
**Key elements:** Grouped-by-skill list of all pending interventions with one-click "approve all" per group where appropriate.

---

## 4. UI/UX Principles Governing Every Screen

1. **Action-first** — never show a bare score without "start here."
2. **Explain AI recommendations** — every recommendation has a visible "why am I seeing this?"
3. **Visualize progress** — skill bars, heatmaps, trends, completion rings over raw numbers.
4. **Keep dashboards calm** — avoid 20 cards; prioritize current state → what needs attention → what to do next.
5. **Teacher dashboard = decision support** — answers who/what/why/what-to-do, never raw analytics dumps.

(Full visual design system — colors, typography, spacing — is defined separately once UI inspiration is provided, in `10_ui_ux_guidelines.md`.)
