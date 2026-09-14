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


# V2 additions — Requirements Contract

## Requirement Tiers

**Core / Bulletproof:** FR-01, FR-02, FR-03, FR-04, FR-05, FR-08, FR-10, FR-19, FR-20, FR-21.

**Functional:** FR-06, FR-07, FR-11, FR-12, FR-14, FR-15, FR-16, FR-22.

**Showcase:** FR-09, FR-13, FR-17, FR-18.

## Standard Acceptance-Criteria Pattern

Every FR must define:
1. Trigger/input
2. Deterministic data required
3. AI reasoning, if any
4. Validated output
5. Persisted state
6. User-visible result
7. Failure/fallback state
8. Evidence/traceability

## Core Definition of Done

### FR-01–FR-05
A student can complete an assessment and receive a persisted, evidence-backed skill profile, gap diagnosis, misconception insight and next action.

### FR-19–FR-21
A teacher can inspect class-level weakness, identify affected students, receive an evidence-backed intervention recommendation, and accept/edit/reject it.

### Cross-Cutting
- AI output conforms to schema.
- Invalid AI output is rejected/retried/falls back.
- No fabricated evidence.
- Role-scoped data access.
- Deterministic state is testable without AI.
- Demo data can be reset to a known baseline.


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

# PRD / REQUIREMENTS — AI Learning Intelligence Platform

---

## 1. Overview

**Product:** AI-powered learning intelligence platform that continuously maps student skills, detects learning gaps and misconceptions, recommends the next best learning action, and gives teachers actionable intervention insights.

**Roles:** Student (primary), Teacher (secondary), Institution/Admin (future, out of scope).

**Scope decision:** All 22 core problems identified across the AI in Education & Skilling domain are in scope for the platform MVP. Depth of implementation varies by tier (see §4), but every problem maps to a real, working feature against the shared data model — no problem is silently dropped.

---

## 2. Goals & Objectives

- Prove a complete, closed AI-driven learning feedback loop (assessment → gap detection → recommendation → learning → reassessment → updated model).
- Demonstrate teacher augmentation, not replacement — every AI output is explainable and overridable.
- Show measurable before/after skill improvement using controlled/synthetic data.
- Present a coherent, non-fragmented product — 22 features on one shared learner/skill data layer, not 22 disconnected mini-apps.

---

## 3. Personas

| Persona | Description | Primary Need |
|---|---|---|
| Student (Rahul) | B.Tech student preparing for placements | Know exactly what's weak and what to do next |
| Teacher | Manages a class of 50+ students | Fast, explainable view of who needs help and why |

---

## 4. Functional Requirements

Depth tiers, per the locked scope decision:
- **Core / bulletproof** — required to prove the end-to-end loop
- **Functional** — works against the shared data model, narrower UI
- **Showcase** — demonstrates the concept without becoming a second product

| FR # | Requirement | Maps to Problem | Tier |
|---|---|---|---|
| FR-1 | AI Skill Gap Analyzer converts assessment results into topic-level mastery | Problem 1 | Core |
| FR-2 | Student Skill Graph / structured skill taxonomy view | Problem 2 | Core |
| FR-3 | AI Misconception Detector infers likely misunderstanding from wrong answers | Problem 3 | Core |
| FR-4 | Next Best Learning Action Engine outputs a recommended action with rationale | Problem 4 | Core |
| FR-5 | Adaptive Study Planner recalculates plan on new performance evidence | Problem 5 | Functional |
| FR-6 | AI Exam Preparation Optimizer prioritizes topics by importance/deadline | Problem 6 | Functional |
| FR-7 | Learning Material Personalizer adapts explanation level/style/language | Problem 7 | Functional |
| FR-8 | Guided AI Tutor uses a hint-ladder, not direct answers | Problem 8 | Functional |
| FR-9 | AI Project-Based Learning Engine recommends projects mapped to skills | Problem 9 | Showcase |
| FR-10 | AI Assessment Analysis gives strong/weak breakdown + recommended action | Problem 10 | Core |
| FR-11 | AI Assessment Generator drafts questions for teacher review | Problem 11 | Functional |
| FR-12 | AI Assignment Feedback Assistant scores against a rubric with teacher override | Problem 12 | Showcase |
| FR-13 | AI Viva / Interview Simulator adapts difficulty based on responses | Problem 13 | Showcase |
| FR-14 | AI Career Navigator outputs ranked career matches with rationale | Problem 14 | Functional |
| FR-15 | Skill-to-Career Mapping shows ✓/△/✗ against a target role | Problem 15 | Functional |
| FR-16 | Job Readiness / Skill Gap Analyzer computes a readiness score | Problem 16 | Functional |
| FR-17 | Resume → Skill Gap Analysis distinguishes claimed vs. demonstrated skill | Problem 17 | Showcase |
| FR-18 | Career Project Recommender suggests employability-boosting projects | Problem 18 | Showcase |
| FR-19 | Class Learning Analytics Dashboard (skill heatmap) | Problem 19 | Core |
| FR-20 | At-Risk / Intervention Queue with evidence, framed as signals not labels | Problem 20 | Core |
| FR-21 | AI Intervention Recommendations with teacher accept/edit/reject | Problem 21 | Core |
| FR-22 | Teacher Content Assistant generates lesson material for review | Problem 22 | Functional |

---

## 5. Non-Functional Requirements

- **Explainability:** every AI insight carries `confidence`, `evidence[]`, and `recommendedAction` — never a bare verdict.
- **Human oversight:** AI-generated assessments, grading, and interventions require teacher review/approval before taking effect.
- **Data protection:** student data scoped by role — a teacher sees only their assigned students; a student sees only their own profile.
- **Reliability for demo:** the golden-path loop (FR-1, FR-3, FR-4, FR-10, FR-19, FR-20, FR-21) must run live without manual database manipulation.
- **Responsiveness:** dashboards should load skill/insight data without visible lag during a live demo — prefer client-side caching of `studentSkills` reads over repeated queries.

---

## 6. Responsible AI Commitments

- AI does not replace teachers.
- AI recommendations are explainable.
- Teachers can override AI recommendations.
- Student data is protected and role-scoped.
- AI-generated assessments require teacher review before publishing.
- AI-generated grading is assisted feedback, not final judgment.
- Student "risk" predictions are presented as signals requiring human review, never a permanent label.

---

## 7. Success Metrics

**Student:** learning-gap detection accuracy, recommendation acceptance rate, assessment improvement, skill mastery improvement, study-plan completion, time-to-complete-task.
**Teacher:** time saved creating assessments, time saved analyzing class performance, intervention identification time, teacher override rate, intervention completion rate.
**Product-level (primary demo metric):** pre-intervention → post-intervention skill score (e.g. Tree Traversal: 38% → 72%, +34 points). For the hackathon, demonstrated using controlled/synthetic data, not claimed real-world efficacy.

---

## 8. Out of Scope (Explicitly Not Built)

Full LMS · full social network · attendance management · fee management · chat system · parent portal · complex admin system · complete job portal · real-time video classes · 50+ AI agents · complex microservices · blockchain certificates · hardware/IoT requirements · fully autonomous grading.

These are excluded because they distract from the central value proposition (the closed learning-intelligence loop) without contributing to the judging criteria.

---

## 9. Assumptions & Constraints

- Hackathon Round 1 timeline: single-day online build, submission = GitHub repo + 10-slide PPT.
- Team of 2 — architecture and task plan are designed for two-person parallelization from Phase 5 onward (see `09_task_plan_roadmap.md`).
- Firebase/Firestore as the data layer; Gemini as the AI reasoning layer.
- Demo uses hardcoded accounts and seeded/synthetic data — real authentication and real class rosters are out of scope for Round 1.
- The DSA question bank (15–20 questions, topic/difficulty tags, misconception mappings) is a manual content dependency that must exist before the golden-path loop can be tested.
