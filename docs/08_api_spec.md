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


# V2 additions — Service/API Contract

## Recommended Service Boundary

Client → typed application service / Cloud Function → domain service → Firestore / AI adapter.

## Core Callable Operations

```text
submitAssessment
analyzeSkillGaps
detectMisconceptions
recommendNextAction
adaptLearningPlan
personalizeLearningMaterial
tutorRespond
recommendProjects
generateAssessment
draftAssignmentFeedback
generateTeacherIntervention
generateTeacherContent
analyzeCareer
mapCareerSkills
calculateReadiness
analyzeResume
startViva
submitVivaResponse
```

## Deterministic vs AI Ownership

| Operation | Deterministic | AI |
|---|---|---|
| score attempt | ✅ | ❌ |
| skill percentage | ✅ | ❌ |
| mastery update | ✅ | ❌ |
| identify likely misconception | — | ✅ |
| recommend next action | — | ✅ |
| validate allowed action | ✅ | ❌ |
| teacher approval | ✅ | ❌ |
| readiness calculation | base score | interpretation |
| resume extraction | — | ✅ |
| persist state | ✅ | ❌ |

## Response Envelope

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": { "requestId": "..." }
}
```

Error:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "..."
  }
}
```

## Events

```text
ATTEMPT_SUBMITTED
TASK_COMPLETED
INTERVENTION_ASSIGNED
REASSESSMENT_COMPLETED
```

Attempt submission must be idempotent.


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

# API SPEC — AI Learning Intelligence Platform

Implementation: **Firebase Cloud Functions**, callable-style (`httpsCallable`) rather than raw REST, grouped by the service boundaries defined in `02_architecture.md` §8. Paths below are written REST-style for clarity; map 1:1 to callable function names in code (e.g. `POST /assessments/submit` → `submitAssessment`).

All endpoints assume the caller's `uid` and `role` are available from Firebase Auth context (or the demo-account equivalent). Endpoints marked **[Teacher only]** verify role server-side, never client-side only.

---

## 1. Assessment Service

### `POST /assessments`  — create/publish an assessment **[Teacher only]**
Request:
```json
{ "topic": "string", "difficulty": "string", "questions": ["...see assessments.questions schema"] }
```
Response: `{ "assessmentId": "string", "reviewStatus": "draft" }`

### `POST /assessments/generate` — AI-draft an assessment **[Teacher only]**
Request: `{ "topic": "string", "difficulty": "string", "objectives": ["string"], "count": "number" }`
Response: `{ "assessmentId": "string", "questions": [...], "reviewStatus": "draft" }`
→ Internally calls AI Prompt Spec §8, then requires a separate `PATCH /assessments/{id}/publish` after teacher review.

### `PATCH /assessments/{id}/publish` **[Teacher only]**
Response: `{ "reviewStatus": "published" }`

### `GET /assessments?studentId={uid}`
Response: list of available/completed assessments for the student.

### `POST /assessments/{id}/submit`
Request: `{ "answers": [{ "questionId": "string", "selectedOptionId": "string", "timeTakenSec": "number" }] }`
Response:
```json
{
  "attemptId": "string",
  "score": "number",
  "perSkillBreakdown": { "skillId": "number" }
}
```
→ Triggers `skillService.updateFromAttempt()` server-side (deterministic scoring, never AI-controlled).

---

## 2. Skill Service

### `GET /skills/profile?studentId={uid}`
Response: full `studentSkills` list for the student, joined with skill names/hierarchy.

### `GET /skills/graph?subjectId={id}`
Response: subject → topic → skill tree structure.

### `GET /skills/class-heatmap?classId={id}` **[Teacher only]**
Response: `{ "skillId": { "avgMastery": "number", "studentCount": "number" } }` aggregated across the class.

---

## 3. Insight Service (AI-generated, `aiInsights` collection)

### `POST /insights/gap-analysis`
Request: `{ "studentId": "uid" }` (server pulls skill scores + recent mistakes internally)
Response: the standard insight object (see `03_datamodels.md` §2, `aiInsights`).
→ Uses AI Prompt Spec §1.

### `POST /insights/misconception`
Request: `{ "attemptId": "string", "questionId": "string" }`
Response: standard insight object. → AI Prompt Spec §2.

### `POST /insights/next-action`
Request: `{ "studentId": "uid" }`
Response: standard insight object. → AI Prompt Spec §3.

### `GET /insights?studentId={uid}&status=active`
Response: list of active insights for the student (feed view).

### `PATCH /insights/{id}/status`
Request: `{ "status": "acted_on | dismissed" }`

---

## 4. Learning Plan Service

### `POST /plans`
Request: `{ "goal": "string", "deadline": "timestamp", "availableHoursPerWeek": "number" }`
Response: generated plan (`learningPlans` shape). → AI Prompt Spec §4.

### `POST /plans/recalculate`
Request: `{ "studentId": "uid", "trigger": "reassessment | manual" }`
Response: updated plan with a `changeReason` field for the UI's "plan changed because..." banner.

---

## 5. Tutor Service

### `POST /tutor/message`
Request: `{ "studentId": "uid", "conversationId": "string", "message": "string", "ladderPosition": "number" }`
Response: `{ "reply": "string", "nextLadderPosition": "number", "verificationQuestion": "string | null" }`
→ AI Prompt Spec §7. `ladderPosition` is tracked and advanced by the app, not inferred by the model.

---

## 6. Intervention Service **[Teacher only except where noted]**

### `GET /interventions/queue?classId={id}`
Response: prioritized list — student, skill, urgency, evidence summary.

### `POST /interventions/suggest`
Request: `{ "studentId": "uid", "skillId": "string" }`
Response: standard insight object with a 3-4 step `recommended_action`. → AI Prompt Spec §10.

### `POST /interventions`
Request: `{ "studentId": "uid", "skillId": "string", "suggestion": "string" }`
Response: `{ "interventionId": "string", "status": "pending" }`

### `PATCH /interventions/{id}`
Request: `{ "status": "approved | edited | rejected | completed", "editedSuggestion": "string (optional)" }`

---

## 7. Career Service

### `POST /career/match`
Request: `{ "studentId": "uid" }`
Response: `{ "matches": [{ "career": "string", "matchPercent": "number", "rationale": "string" }] }` → AI Prompt Spec §12.

### `GET /career/skill-gap?studentId={uid}&targetRole={role}`
Response: per-required-skill status (✓/△/✗), readiness score.

### `POST /career/resume-analysis`
Request: `{ "studentId": "uid", "resumeText": "string" }`
Response: claimed vs. demonstrated skill breakdown. → AI Prompt Spec §13.

### `GET /career/project-recommendations?studentId={uid}`
Response: list of `projectRecommendations`.

---

## 8. Content Service **[Teacher only]**

### `POST /content/generate`
Request: `{ "topic": "string", "classLevel": "string", "difficulty": "string", "goal": "string" }`
Response: lesson outline, examples, quiz, practice problems, revision summary. → AI Prompt Spec §11.

### `POST /assignments/feedback`
Request: `{ "studentId": "uid", "submissionText": "string", "rubric": {...} }`
Response: `{ "scores": {...}, "suggestions": ["...", "...", "..."], "note": "string" }` → AI Prompt Spec §9.

---

## 9. Viva Service

### `POST /viva/session`
Request: `{ "studentId": "uid", "topic": "string" }`
Response: `{ "sessionId": "string", "firstQuestion": "string" }`

### `POST /viva/session/{id}/answer`
Request: `{ "answer": "string" }`
Response: `{ "followUp": "string", "difficultyAdjustment": "up | down | same" }`

### `GET /viva/session/{id}/report`
Response: qualitative report — correctness, depth, clarity, confidence, conceptual understanding.

---

## 10. Cross-Cutting Notes

- Every endpoint that produces a stored AI insight returns/writes the same `confidence / evidence / recommended_action / priority` shape — enforced by one shared `generateInsight()` utility referenced in `02_architecture.md`.
- Role checks (`[Teacher only]`) are enforced server-side in the Cloud Function, not just hidden in the UI.
- Deterministic writes (scores, statuses, permissions) never pass through the AI reasoning layer — see the What-AI-Should-NOT-Control boundary in `02_architecture.md` §5.
