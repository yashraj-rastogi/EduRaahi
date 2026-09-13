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


# V2 additions — Implementation Architecture

## Target Runtime Architecture

```text
React Web App
├── Student Experience
└── Teacher Experience
        ↓
Application / Domain Services
├── Assessment Service
├── Learner Model Service
├── Learning Plan Service
├── Career Service
├── Teacher Analytics Service
└── Intervention Service
        ↓
Firestore
        ↕
AI Orchestration Layer
├── Gemini/LLM adapter
├── prompt modules
├── structured context builder
├── JSON/schema validation
├── evidence/confidence validation
└── deterministic action constraints
```

## AI Request Pipeline

```text
Firestore/app state
      ↓
Deterministic feature logic
      ↓
Context builder
      ↓
Prompt contract
      ↓
LLM
      ↓
JSON parse + schema validation
      ↓
Evidence / permission / business-rule validation
      ↓
UI recommendation or Firestore write
```

## Cloud Functions Boundary

Privileged AI and multi-document operations should live behind a service boundary such as Firebase Cloud Functions. Client code calls typed service functions rather than embedding provider secrets.

Examples:

- `submitAssessment`
- `analyzeSkillGaps`
- `detectMisconceptions`
- `recommendNextAction`
- `adaptLearningPlan`
- `generateAssessment`
- `draftAssignmentFeedback`
- `generateTeacherIntervention`
- `analyzeResume`

## Non-Negotiable Invariants

1. AI never calculates official assessment scores.
2. AI never decides whether an attempt is submitted.
3. AI never grants permissions.
4. AI never directly changes teacher approval state.
5. Client never receives AI provider secrets.
6. Every persisted AI insight stores evidence and related IDs.
7. Multi-document learner-state updates use transactions/batched writes.
8. Attempt submission is idempotent.
9. Derived values are recomputable from source evidence.


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

# ARCHITECTURE — AI Learning Intelligence Platform

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React (Next.js) | Student + Teacher dashboards as separate route trees under shared auth/role state |
| Backend | Firebase Cloud Functions | Callable functions per feature area; keeps deterministic logic (scoring, permissions) outside the AI layer |
| Data store | Firebase Firestore | Denormalized document model — see `03_datamodels.md` |
| Auth | Firebase Auth (demo mode) | Hardcoded/demo accounts for Round 1; real auth UI is explicitly deprioritized |
| AI engine | Google Gemini | All reasoning/explanation/recommendation generation; never controls state directly |
| Hosting | Vercel (frontend) + Firebase (functions/data) | Matches existing preferred stack |

---

## 2. Core Product Architecture

```text
                         ┌──────────────┐
                         │   STUDENT    │
                         └──────┬───────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ React Frontend  │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   API / Backend │
                       └────────┬────────┘
                                │
             ┌──────────────────┼──────────────────┐
             ▼                  ▼                  ▼
       ┌───────────┐     ┌─────────────┐    ┌────────────┐
       │ Firestore │     │ AI Engine   │    │ Rules      │
       │           │     │ Gemini/LLM  │    │ Engine     │
       └─────┬─────┘     └──────┬──────┘    └─────┬──────┘
             │                  │                  │
             └──────────────────┼──────────────────┘
                                ▼
                      ┌───────────────────┐
                      │ Learner Intelligence│
                      │ / Skill Model     │
                      └─────────┬─────────┘
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
          Student Actions               Teacher Insights
```

---

## 3. AI Reasoning Layer (Not a Direct Call)

The AI layer is deliberately **not** a thin wrapper:

```text
User → Gemini → Answer     ❌ (too shallow — no data grounding, no explainability)
```

Instead:

```text
                    USER DATA
                       ↓
              ┌─────────────────┐
              │ Learning Engine │   (deterministic: scoring, aggregation)
              └────────┬────────┘
                       ↓
              ┌─────────────────┐
              │ Skill / Learner │
              │     Model       │
              └────────┬────────┘
                       ↓
             ┌──────────────────┐
             │ Rules + Analytics│   (thresholds, prerequisite checks)
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │   Gemini / LLM    │   (reasoning: explanation, recommendation)
             │ Reasoning Layer   │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │ Validation /      │   (schema check, confidence threshold)
             │ Constraint Layer  │
             └────────┬─────────┘
                      ↓
               Recommendation
```

**Why this matters for the pitch:** it demonstrates deliberate AI system design, not prompt-stuffing — this is one of the strongest Application & Logic talking points in the demo.

---

## 4. What AI Should Do

1. **Mistake classification** — identify likely conceptual errors
2. **Misconception analysis** — infer likely misunderstanding from answer + context
3. **Explanation generation** — adapt explanations to the student's level
4. **Recommendation generation** — recommend learning actions from structured learner data
5. **Content generation** — questions, explanations, practice material
6. **Intervention suggestions** — recommend teacher actions
7. **Career reasoning** — map student profile to career requirements

## 5. What AI Should NOT Control

The application deterministically controls:
- Authentication
- User roles
- Scores
- Progress records
- Database writes
- Assessment submission
- Permissions
- Teacher approval
- Completion status

AI provides **reasoning and recommendations only**. The application decides **what gets stored and what action is allowed**. Every LLM output is validated against a schema before it's trusted (see `05_ai_prompt_spec.md`).

---

## 6. The Central Product Loop

```text
                ┌────────────────────┐
                │ Student Performance│
                └──────────┬─────────┘
                           ↓
                 ┌──────────────────┐
                 │ Learner Model    │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Gap Detection    │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ AI Recommendation│
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Learning Action  │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Reassessment     │
                 └────────┬─────────┘
                          │
                          └───────────────→ UPDATED LEARNER MODEL
```

Teacher intelligence sits alongside this loop, reading the same underlying data:

```text
Learner Data → Class Analytics → Teacher Insight → Intervention → Student Learning
```

---

## 7. Scope Risk & Delivery Architecture Rules

Because all 22 problems are in scope (not the trimmed 19-item core), architecture decisions are made to control risk through **sequencing and shared infrastructure**, not feature removal:

1. **Golden path first.** Nothing endangers the assessment → gap → recommendation → learning → reassessment → teacher insight loop.
2. **Shared data, not isolated demos.** Every new feature reuses the established learner/skill model — no feature gets its own private data silo.
3. **Coverage with variable depth.** Every one of the 22 problems maps to a concrete feature, but not every feature needs equal UI complexity (see depth tiers in `07_prd_requirements.md`).
4. **AI is a reasoning layer** — reinforced at the architecture level, not just a policy statement.
5. **Demo-first stabilization.** The full Definition-of-Done run is fixed before cosmetic polish.
6. **Manual content is a dependency**, tracked as a Phase 1 blocking task, not an afterthought (see `09_task_plan_roadmap.md`).

---

## 8. Service Boundaries (Implementation Note)

To keep the "shared data, not isolated demos" rule enforceable in code, structure Cloud Functions around these service boundaries rather than one function per screen:

- `assessmentService` — submit attempt, score, per-skill breakdown
- `skillService` — read/update skill mastery, skill graph queries
- `insightService` — generates and stores `aiInsights` documents (gap explanations, misconceptions, recommendations)
- `planService` — adaptive study plan generation/recalculation
- `interventionService` — teacher-facing intervention creation, approval, status
- `careerService` — career mapping, readiness scoring, resume analysis
- `contentService` — AI-generated assessments, assignments, teaching material (all pass through a teacher-review gate before publish)

Every AI-driven service calls the same underlying `generateInsight()` utility so the confidence/evidence/recommendedAction contract (see `03_datamodels.md`) is enforced in exactly one place.
