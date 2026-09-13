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


# V2 additions — Canonical Firestore Data Contract

## Collections

```text
users/{uid}
classes/{classId}
subjects/{subjectId}/topics/{topicId}/skills/{skillId}
studentSkills/{uid}_{skillId}
assessments/{assessmentId}
attempts/{attemptId}
aiInsights/{insightId}
interventions/{interventionId}
learningPlans/{uid}
careerGoals/{uid}
projectRecommendations/{uid}_{index}
vivaSessions/{sessionId}
```

## Load-Bearing Entities

### `studentSkills`

```text
uid: string
skillId: string
mastery: number        // 0..100
confidence: number     // 0..1
trend: "up"|"down"|"stable"
evidence: Evidence[]
lastUpdated: timestamp
attemptsCount: number
correctCount: number
```

### `attempts`

```text
uid: string
assessmentId: string
answers: Answer[]
score: number
perSkillBreakdown: SkillBreakdown[]
startedAt: timestamp
submittedAt: timestamp
durationSeconds: number
```

These two collections form the evidence/state backbone of the intelligence loop.

## Evidence Contract

AI-generated claims should reference stable evidence IDs, for example:

```json
{
  "evidence": [
    {
      "type": "attempt",
      "id": "attempt_123",
      "detail": "2 of 5 recursion questions incorrect"
    }
  ]
}
```

Never persist an AI statement as an unexplained fact.

## Derived vs Source Data

Source-of-truth data:
- answers
- assessment definitions
- skill taxonomy
- timestamps
- teacher decisions
- task completion events

Derived/recomputable data:
- mastery
- trend
- readiness score
- heatmaps
- risk priority
- AI insights
- recommendations


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

# DATA MODELS — AI Learning Intelligence Platform

Data store: **Firebase Firestore** (denormalized document model, no joins). Every feature reads/writes the same shared collections rather than maintaining its own storage.

---

## 1. Entity Overview

```text
User
 ├── StudentProfile
 └── TeacherProfile

Class
 ├── Teacher
 └── Students

Subject
 └── Topics
      └── Skills

Assessment
 ├── Questions
 └── Attempts

StudentSkill
 ├── Mastery
 ├── Confidence
 ├── Evidence
 └── Trend

LearningPlan
 └── LearningTasks

LearningActivity
 └── ActivityResult

AIInsight
 ├── Type
 ├── Confidence
 └── Evidence

Intervention
 ├── Teacher
 ├── Student
 └── Status

CareerGoal
 └── RequiredSkills

ProjectRecommendation
 └── Skills
```

---

## 2. Firestore Collection Design

### `users/{uid}`
```json
{
  "role": "student | teacher",
  "name": "string",
  "email": "string",
  "classId": "string (student only)",
  "careerGoal": "string (student only, optional)",
  "createdAt": "timestamp"
}
```

### `classes/{classId}`
```json
{
  "teacherId": "uid",
  "studentIds": ["uid", "..."],
  "subject": "string",
  "name": "string (e.g. 'Class 3A')"
}
```

### `subjects/{subjectId}/topics/{topicId}/skills/{skillId}`
```json
{
  "name": "string (e.g. 'Recursion')",
  "prerequisites": ["skillId", "..."]
}
```

### `studentSkills/{uid}_{skillId}`
Composite key avoids a query-by-two-fields index for the most frequently read collection.
```json
{
  "uid": "string",
  "skillId": "string",
  "mastery": "number (0-100)",
  "confidence": "number (0-1)",
  "trend": "improving | declining | stable",
  "evidence": ["string", "..."],
  "lastUpdated": "timestamp"
}
```

### `assessments/{assessmentId}`
```json
{
  "topic": "string",
  "difficulty": "beginner | intermediate | advanced",
  "questions": [
    {
      "id": "string",
      "text": "string",
      "options": ["string", "..."],
      "correctOptionId": "string",
      "skillId": "string",
      "difficulty": "string",
      "misconceptionMap": {
        "wrongOptionId": "likely misconception label"
      }
    }
  ],
  "createdBy": "uid | 'ai-generated'",
  "reviewStatus": "draft | approved | published"
}
```

### `attempts/{attemptId}`
```json
{
  "uid": "string",
  "assessmentId": "string",
  "answers": [
    { "questionId": "string", "selectedOptionId": "string", "correct": "boolean", "timeTakenSec": "number" }
  ],
  "score": "number",
  "perSkillBreakdown": { "skillId": "number (0-100)" },
  "submittedAt": "timestamp"
}
```

### `aiInsights/{insightId}` — the core AI data contract
```json
{
  "uid": "string",
  "type": "gap | misconception | recommendation | intervention_suggestion | career",
  "insight": "string",
  "confidence": "number (0-1)",
  "evidence": ["string", "..."],
  "recommendedAction": "string",
  "priority": "low | medium | high",
  "status": "active | acted_on | dismissed",
  "createdAt": "timestamp"
}
```
Every AI-generated feature in the product (gap detection, misconception detection, next-best-action, intervention recommendations, career reasoning) writes to this same collection shape. See `05_ai_prompt_spec.md` for the prompt-to-schema contract.

### `interventions/{interventionId}`
```json
{
  "teacherId": "string",
  "studentId": "string",
  "skillId": "string",
  "suggestion": "string",
  "evidence": ["string", "..."],
  "status": "pending | approved | edited | rejected | completed",
  "createdAt": "timestamp"
}
```

### `learningPlans/{uid}`
```json
{
  "goal": "string",
  "deadline": "timestamp",
  "availableHoursPerWeek": "number",
  "tasks": [
    { "skillId": "string", "allocatedMinutes": "number", "status": "pending | done" }
  ],
  "lastRecalculated": "timestamp"
}
```

### `careerGoals/{uid}`
```json
{
  "targetRole": "string",
  "requiredSkills": [
    { "skillId": "string", "requiredLevel": "number", "currentLevel": "number" }
  ],
  "readinessScore": "number (0-100)"
}
```

### `projectRecommendations/{uid}_{index}`
```json
{
  "uid": "string",
  "title": "string",
  "targetSkillGap": "string",
  "description": "string",
  "status": "recommended | in_progress | completed"
}
```

---

## 3. Why This Shape

- **`studentSkills` and `attempts` are the two load-bearing collections.** Nearly every feature from Phase 2 through Phase 6 (see `09_task_plan_roadmap.md`) reads from one or both. Their shape should be locked early — changing it later has the widest blast radius.
- **`aiInsights` and `interventions` share the same contract fields** (confidence, evidence, recommendedAction, priority) so a new AI feature never needs a new document shape — it reuses `generateInsight()` (see `02_architecture.md` §8).
- **No feature gets a private collection unless it's genuinely independent** (e.g. `careerGoals`, `projectRecommendations`) — everything else composes from the shared six collections above.

---

## 4. Relationships (Textual ER)

```text
User (student) 1───* Attempt
User (student) 1───* StudentSkill (one per skill)
User (student) 1───1 LearningPlan
User (student) 1───1 CareerGoal
User (student) 1───* AIInsight
User (student) 1───* ProjectRecommendation

Class 1───1 Teacher (User)
Class 1───* Student (User)

Subject 1───* Topic 1───* Skill

Assessment 1───* Question
Assessment 1───* Attempt

Skill 1───* StudentSkill (across students)
Skill 1───* AIInsight (referenced via evidence)

Teacher (User) 1───* Intervention
Student (User) 1───* Intervention
```
