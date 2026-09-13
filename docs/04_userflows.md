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


# V2 additions — Canonical User-Flow Contracts

## Student Golden Path

```text
Role Entry
 → Student Dashboard
 → DSA Assessment
 → Submit Attempt
 → Deterministic Score
 → Per-Skill Breakdown
 → Skill Model Update
 → Gap Analysis
 → Misconception Analysis
 → Next Best Action
 → Adaptive Plan Update
 → Targeted Practice
 → Reassessment
 → Before/After Mastery
```

## Teacher Golden Path

```text
Teacher Dashboard
 → Class Skill Heatmap
 → Select Weak Skill
 → Affected Students
 → Intervention Queue
 → Student Intelligence Profile
 → AI Intervention Recommendation
 → Teacher Review
 → Accept/Edit/Reject
 → Assign Intervention
 → Student Completes
 → Reassessment
 → Updated Analytics
```

## Permission Matrix

| Capability | Student | Teacher |
|---|---|---|
| View own skills | Full | — |
| View own attempts | Full | — |
| Attempt assessment | Full | — |
| AI tutor | Full | Optional |
| View class analytics | — | Full |
| View assigned student evidence | — | Full |
| Generate assessment | — | Full |
| Generate content | — | Full |
| Approve intervention | — | Full |
| Edit AI recommendation | — | Full |


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

# USER FLOWS — AI Learning Intelligence Platform

---

## Part A — Student Flows

### Flow A — Onboarding
```text
Student → Sign Up / Login (demo account) → Basic Profile → Academic Level →
Subjects / Skills → Career Goal → Available Study Time → Initial Assessment →
AI Learner Profile → Student Dashboard
```

### Flow B — Initial Skill Analysis
```text
Student starts assessment → Questions served → Student answers →
System records (correctness, topic, difficulty, time) → AI analyzes mistakes →
Skill scores generated → Weak areas identified → Skill Graph updated
```

### Flow C — Personalized Learning
```text
Student opens dashboard → Sees top learning gaps → Clicks recommended action →
AI provides lesson / resource → Student practices → Mini assessment →
Performance recorded → Skill score updated → Next recommendation generated
```

### Flow D — Adaptive Study Plan
```text
Student sets goal (exam / career / skill) → Sets deadline → Sets available hours →
AI generates plan → Student completes tasks → Performance changes →
AI recalculates plan → Student receives updated schedule
```

### Flow E — Career Planning
```text
Student selects career goal → AI analyzes current skills → Maps required skills →
Calculates skill gaps → Creates roadmap → Recommends projects → Tracks readiness
```

### Flow F — AI Tutor
```text
Student asks question → System checks learner context → AI explains at appropriate level →
Student receives guided explanation → AI asks verification question →
Student answers → Knowledge state updated
```

---

## Part B — Teacher Flows

### Flow A — Teacher Onboarding
```text
Teacher → Login → Create / Join Class → Add Subject → Define Topics / Skills → Dashboard
```

### Flow B — Create Assessment
```text
Teacher selects topic → Selects difficulty → Selects question count →
AI generates questions → Teacher reviews → Teacher edits if required →
Publish → Students attempt
```

### Flow C — Analyze Class Performance
```text
Students complete assessment → System aggregates results →
AI identifies class-level weaknesses → Teacher sees skill heatmap →
Teacher selects weak topic → System shows affected students →
AI suggests intervention → Teacher approves / edits → Intervention assigned
```

### Flow D — Individual Student Intervention
```text
Teacher opens student → Views skill profile → Views performance trend →
Views repeated mistakes → AI suggests intervention → Teacher reviews →
Assigns intervention → Student completes intervention → Reassessment →
Teacher sees improvement
```

---

## Part C — The Golden-Path Demo Flow (Primary Demo Script)

**Rahul wants to become a software engineer.**

| Step | Action | Result |
|---|---|---|
| 1 | Assessment | Rahul takes a 10-question DSA assessment → Score: 58% |
| 2 | AI Analysis | System identifies per-skill scores: Arrays 85%, Strings 74%, Recursion 41%, Trees 38%, Graphs 59% |
| 3 | AI Finds the Gap | System explains: "Rahul's main weakness is tree traversal and recursive reasoning." |
| 4 | Personalized Recommendation | "Tree Traversal Fundamentals" — with explanation, example, 5 questions, estimated time |
| 5 | Adaptive Plan | Existing plan changes: Trees 20min → 45min, Recursion added at 30min |
| 6 | Reassessment | Rahul takes 5 targeted questions → Trees: 38% → 72% |
| 7 | Teacher View | Class weakness: Trees; 8 students need support; Rahul improved 38% → 72% |
| 8 | AI Intervention | Teacher receives: "Recommended intervention: assign advanced tree traversal practice to Rahul and 5 similar students." Teacher approves. |
| 9 | Feedback Loop | Next student activity updates the learner model — loop continues |

This exact sequence is the **Definition of Done** for the hackathon build (see `09_task_plan_roadmap.md`) — if this runs live without manual database manipulation, the MVP is demo-ready.

---

## Part D — Role Permission Matrix

| Feature | Student | Teacher |
|---|:---:|:---:|
| Personal Dashboard | ✅ | ❌ |
| Skill Graph | ✅ | View |
| Personal Skill Gaps | ✅ | View |
| AI Tutor | ✅ | Optional |
| Adaptive Study Plan | ✅ | View |
| Assessments | Attempt | Create |
| AI Assessment Generation | ❌ | ✅ |
| Assignment Submission | ✅ | View |
| AI Assignment Feedback | View | Review/Override |
| Class Analytics | ❌ | ✅ |
| Student Analytics | Own | Assigned students |
| Intervention Queue | ❌ | ✅ |
| Career Navigator | ✅ | Optional |
| Resume Skill Analysis | ✅ | ❌ |
| Project Recommendations | ✅ | Optional |
| AI Viva | ✅ | Optional |
| Content Generation | ❌ | ✅ |
| Intervention Assignment | ❌ | ✅ |
