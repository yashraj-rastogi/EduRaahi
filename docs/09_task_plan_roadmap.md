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


# V2 additions — Execution Plan

## Phase 1 — Foundation

- React structure
- Firebase/Firestore
- canonical collections
- seed data
- hardcoded demo users
- subject/topic/skill taxonomy
- deterministic scoring/progress utilities
- AI service abstraction
- DSA question bank: **15–20 questions**
- difficulty/topic tags
- correct answers
- wrong-answer → misconception mappings

**Exit criterion:** clean seed reset and deterministic assessment scoring work without AI.

## Phase 2 — Golden Path

- assessment list/player
- submission/idempotency
- score + skill breakdown
- learner model update
- gap analysis
- misconception analysis
- next action
- adaptive task
- mini reassessment
- before/after visualization

**Exit criterion:** Rahul story works end-to-end from assessment to improved mastery.

## Phase 3 — Teacher Intelligence

- class aggregation
- skill heatmap
- intervention queue
- student drill-down
- AI intervention recommendation
- teacher accept/edit/reject
- assign intervention
- completion/reassessment

**Exit criterion:** teacher can move from weak class skill to a reviewed intervention.

## Phase 4 — Student Personalization

- adaptive planner
- exam optimizer
- personalized material
- guided tutor
- project learning

## Phase 5 — Teacher Tools

- assessment generator
- assignment feedback
- teacher content assistant

## Phase 6 — Career + Showcase

- career navigator
- skill-career mapping
- readiness
- resume analysis
- career projects
- viva/interview

## Phase 7 — Hardening / Submission

- run full Definition of Done
- reset seeded data
- test all golden paths
- validate loading/error/empty states
- Firebase security rules
- remove secrets
- README + architecture
- screenshots
- 10-slide PPT
- rehearse
- record a 60–90 second backup demo

## Parallelization Rule

For a two-person team, parallelize only after shared data contracts and service boundaries are stable. Time available changes the split and polish level; it does not silently remove the 22-problem traceability.


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

# TASK PLAN / ROADMAP — AI Learning Intelligence Platform

**Locked scope:** all 22 problems in scope. Risk is managed through **sequencing and shared infrastructure**, not feature removal. Build depth-first through the golden-path loop, then expand outward using the same learner/skill data layer — never build 22 disconnected mini-apps.

**Open planning variable:** actual hours remaining before submission. This determines how aggressively Phase 5–6 are parallelized between the two team members; it does not reduce the locked 22-problem scope.

---

## Phase 1 — Data Foundation + Demo Accounts

- [ ] Set up Firebase project + Firestore collections (see `03_datamodels.md`)
- [ ] Seed subject/topic/skill taxonomy (DSA, ~6 skills)
- [ ] Create hardcoded student + teacher demo accounts (skip polished auth UI)
- [ ] Seed demo data: Class 3A, Rahul + 2-3 synthetic classmates
- [ ] Build deterministic scoring/progress utilities (skill mastery formula, attempt scoring)
- [ ] Build the shared `generateInsight()` AI-service abstraction (wraps Gemini call + schema validation)
- [ ] **Critical manual dependency:** prepare the DSA question bank — 15-20 questions, topic/difficulty tags, correct answers, wrong-answer → misconception mappings

**Exit criteria:** demo accounts can log in, seed data is queryable, one dummy `generateInsight()` call round-trips successfully.

---

## Phase 2 — Golden-Path Intelligence Loop (Highest Priority)

- [ ] Assessment attempt flow (serve questions → record answers → score)
- [ ] Skill scoring → `studentSkills` update
- [ ] Skill graph/table UI (student-facing)
- [ ] Gap detection (AI Prompt Spec §1) wired to real skill data
- [ ] Misconception detection (AI Prompt Spec §2) wired to wrong answers
- [ ] Next-best-action recommendation (AI Prompt Spec §3)
- [ ] Adaptive plan update on new evidence (AI Prompt Spec §4)
- [ ] Targeted reassessment flow (3-5 questions on the weak skill)
- [ ] Confirm skill graph updates after reassessment

**Exit criteria:** the full Rahul journey (58% → gap found → recommendation → reassessment → 72%) runs live, start to finish, without touching the database manually.

---

## Phase 3 — Teacher Intelligence Layer

- [ ] Class skill heatmap (aggregates `studentSkills` across the class)
- [ ] Weak-area aggregation logic
- [ ] Intervention queue (evidence-based, framed as signals not labels)
- [ ] Student drill-down (individual skill profile, teacher view)
- [ ] AI intervention recommendation (AI Prompt Spec §10)
- [ ] Teacher accept/edit/reject flow
- [ ] Intervention status tracking

**Exit criteria:** Rahul's improvement (38%→72%) is visible on the teacher dashboard, and the teacher receives + approves an AI intervention suggestion for at least one other student.

---

## Phase 4 — Deepen Student Intelligence & Personalization

- [ ] Misconception detector depth (broader candidate-misconception library)
- [ ] Guided AI Tutor with hint-ladder (AI Prompt Spec §7)
- [ ] Adaptive planner depth (multi-week, exam-date aware)
- [ ] Exam Preparation Optimizer (AI Prompt Spec §5)
- [ ] Learning Material Personalizer (beginner/advanced/regional-language toggle, AI Prompt Spec §6)
- [ ] Project-Based Learning Engine (skill → project mapping)

---

## Phase 5 — Teacher Content & Assessment Tools

- [ ] AI Assessment Generator (AI Prompt Spec §8) with teacher review gate
- [ ] AI Assignment Feedback Assistant (AI Prompt Spec §9)
- [ ] Teacher Content Assistant (AI Prompt Spec §11)

*Parallelizable once Phase 1-2 data contracts are stable — good candidate for Teammate B while Teammate A continues Phase 3/4.*

---

## Phase 6 — Career & Skills + Remaining Showcase Features

- [ ] Career Navigator (AI Prompt Spec §12)
- [ ] Skill-to-Career Mapping (✓/△/✗ view)
- [ ] Job Readiness / Skill Gap Analyzer
- [ ] Resume → Skill Gap Analysis (AI Prompt Spec §13)
- [ ] Career Project Recommender
- [ ] AI Viva / Interview Simulator (AI Prompt Spec §14)

*Fully parallelizable across both team members once shared data contracts and service boundaries are stable.*

---

## Phase 7 — Definition-of-Done Run + Stabilization

- [ ] Run the complete Definition-of-Done scenario live (below), fix any broken flow before cosmetic polish
- [ ] Validate: exact demo path, Firestore persistence, AI output reliability, teacher intervention loop, fallback behavior on AI-call failure
- [ ] Record a 60-90 second backup demo video (insurance against live-demo/API flakiness)
- [ ] Finalize GitHub repo README (problem, architecture diagram, stack, setup, screenshots/GIF)
- [ ] Finalize 10-slide PPT against the judging rubric

---

## Suggested Two-Person Split

| Phase | Person A (Backend/AI) | Person B (Frontend/Content) |
|---|---|---|
| 1 | Firestore schema + scoring utilities + `generateInsight()` | DSA question bank + demo account UI |
| 2 | Gap/misconception/recommendation logic | Assessment + skill graph UI, reassessment flow |
| 3 | Intervention backend + heatmap aggregation | Teacher dashboard UI |
| 4 | Tutor hint-ladder logic, planner recalculation | Content personalizer UI, exam optimizer UI |
| 5-6 | Split remaining features by whoever finishes first — reuse Phase 1 service abstractions | Same |
| 7 | Live run + fixes | README + PPT |

---

## Definition of Done

The MVP is successful when this entire scenario runs live, without manually manipulating the database:

```text
Student signs in → Takes assessment → System evaluates performance →
Skill graph updates → AI identifies learning gap → AI explains the gap →
Personalized action is generated → Student completes intervention →
Student takes reassessment → Score improves → Skill graph updates →
Teacher dashboard reflects the change → Teacher receives an intervention insight
```

If this loop works reliably, the MVP is strong enough for the hackathon. Everything else — the remaining 15+ showcase features — strengthens Innovation, Impact, and Presentation scoring, but does not substitute for this loop working.

---

## Team Implementation Principle

Don't ask "how many AI features can we add?" Ask: **"Can our system prove that it understands a learner and improves the next learning decision?"** That remains the central product test throughout development, regardless of how many of the 22 features are live at any given moment.
