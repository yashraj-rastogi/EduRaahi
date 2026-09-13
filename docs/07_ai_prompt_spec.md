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


# V2 additions — AI Contract System

## Shared Context

```json
{
  "student": {
    "level": "...",
    "goal": "..."
  },
  "skills": [
    {
      "skillId": "...",
      "mastery": 42,
      "confidence": 0.8,
      "trend": "down"
    }
  ],
  "recentEvidence": [],
  "task": "...",
  "constraints": []
}
```

## Shared Output

```json
{
  "insight": "...",
  "confidence": 0.0,
  "evidence": ["stable-evidence-id"],
  "recommendedAction": "...",
  "priority": "low|medium|high",
  "relatedSkillIds": [],
  "reasoningSummary": "..."
}
```

## Prompt Modules

P01 Skill Gap Analyzer
P02 Misconception Detector
P03 Next Best Action
P04 Adaptive Planner
P05 Exam Optimizer
P06 Content Personalizer
P07 Guided Tutor
P08 Project Engine
P09 Assessment Analysis
P10 Assessment Generator
P11 Assignment Feedback
P12 Viva Simulator
P13 Career Navigator
P14 Skill-Career Mapper
P15 Readiness Analyzer
P16 Resume Analyzer
P17 Career Project Recommender
P18 Teacher Intervention
P19 Teacher Content Assistant

## Guided Tutor Contract

The tutor should use progressive assistance:

`Hint → Conceptual cue → Approach → Pseudocode → Full explanation`

The application owns the `ladderPosition`; the model does not decide its own permission level.

## AI Failure Policy

1. Validate JSON.
2. If invalid, retry once with a correction prompt.
3. If still invalid, use deterministic fallback or display a recoverable error.
4. Never write malformed AI output to Firestore.
5. Never convert low-confidence inference into a permanent student label.


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

# AI PROMPT SPEC — AI Learning Intelligence Platform

All prompts target **Gemini**. Every prompt that produces a stored insight must return JSON matching the `aiInsights` contract from `03_datamodels.md`:

```json
{
  "insight": "string",
  "confidence": "number (0-1)",
  "evidence": ["string", "..."],
  "recommended_action": "string",
  "priority": "low | medium | high"
}
```

**General rules for every prompt below:**
- Instruct Gemini to return **only** valid JSON matching the given schema — no preamble, no markdown fences.
- The app validates the response against the schema before writing to Firestore (see `02_architecture.md` §5, Validation/Constraint Layer). A response that fails validation is discarded and retried once, then falls back to a deterministic default (e.g. "Review [weakest skill]").
- Gemini never sees or sets scores, permissions, or completion status — only structured evidence, and it returns reasoning.

---

## 1. Skill Gap Explanation

**Used in:** Golden-path loop, Student Dashboard, Learning Gaps screen.

**System prompt:**
```
You are an educational AI that explains a student's skill gaps in plain,
encouraging language. You are given per-skill mastery scores and recent
mistake evidence. Identify the single highest-impact gap and explain it
in 1-2 sentences a student can act on. Return ONLY JSON matching the schema.
Do not diagnose beyond what the evidence supports; state confidence honestly.
```

**Input:**
```json
{
  "studentName": "Rahul",
  "skillScores": {"Arrays": 85, "Strings": 74, "Recursion": 41, "Trees": 38, "Graphs": 59},
  "recentMistakes": [
    {"skill": "Trees", "question": "In-order traversal of a BST", "selectedWrong": true},
    {"skill": "Recursion", "question": "Base case identification", "selectedWrong": true}
  ]
}
```

**Expected output:**
```json
{
  "insight": "Rahul's main weakness is tree traversal and recursive reasoning.",
  "confidence": 0.84,
  "evidence": ["2 incorrect traversal questions", "Low performance in prerequisite recursion (41%)"],
  "recommended_action": "Review Tree Traversal Fundamentals with recursion prerequisite check",
  "priority": "high"
}
```

---

## 2. Misconception Detection

**Used in:** Assessment Analysis, AI Misconception Detector.

**System prompt:**
```
You are analyzing why a student selected a wrong answer, not just that it
was wrong. Given the question, correct answer, and the student's selected
answer, infer the most likely underlying misconception from a provided
candidate list. Do not invent misconceptions outside common patterns for
this topic. Return ONLY JSON matching the schema. Treat this as an inference,
not a certain diagnosis — reflect that in confidence.
```

**Input:**
```json
{
  "question": "Which algorithm has O(log n) search complexity?",
  "correctAnswer": "Binary Search",
  "studentAnswer": "Linear Search",
  "topic": "Complexity Analysis",
  "candidateMisconceptions": ["Linear vs logarithmic growth", "Confusing search vs sort complexity", "Off-by-one in binary search bounds"]
}
```

**Expected output:**
```json
{
  "insight": "Likely misconception: confusing linear and logarithmic growth rates.",
  "confidence": 0.78,
  "evidence": ["Selected O(n) algorithm for an O(log n) question"],
  "recommended_action": "Visual complexity comparison + 3 targeted questions",
  "priority": "medium"
}
```

---

## 3. Next Best Learning Action

**Used in:** Recommended Next screen, Dashboard.

**System prompt:**
```
You recommend the single next learning action for a student given their
skill state, prerequisites, career goal, exam goal, and available time.
Weigh prerequisite skills that block progress more heavily than isolated
weak skills. Return ONLY JSON matching the schema.
```

**Input:**
```json
{
  "skillScores": {"Recursion": 41, "Trees": 38, "Graphs": 59},
  "prerequisites": {"Trees": ["Recursion"]},
  "careerGoal": "Backend Developer",
  "examDate": "2026-10-01",
  "availableHoursPerWeek": 6
}
```

**Expected output:**
```json
{
  "insight": "Recommended next action: Revise Recursion before advancing to Trees.",
  "confidence": 0.81,
  "evidence": ["Trees depends on Recursion", "Recursion mastery (41%) is below the 60% threshold for prerequisite readiness"],
  "recommended_action": "Complete 'Recursion Fundamentals' (est. 35 min), then reattempt Tree Traversal practice",
  "priority": "high"
}
```

---

## 4. Adaptive Study Plan (Generation & Recalculation)

**System prompt:**
```
You generate or recalculate a weekly study plan given a goal, deadline,
available hours, and current skill scores. On recalculation, increase time
allocation for skills with recent poor performance. Distribute total
available hours across weak skills weighted by (100 - mastery) and
prerequisite priority. Return ONLY a JSON task list.
```

**Output schema:**
```json
{
  "tasks": [
    {"skillId": "string", "allocatedMinutes": "number", "reason": "string"}
  ]
}
```
Note: this endpoint returns a task list, not the standard insight contract, since it feeds `learningPlans.tasks` directly.

---

## 5. Exam Preparation Optimizer

**System prompt:**
```
Given a syllabus, exam date, prior performance, and topic importance
weights, classify each topic into HIGH / MEDIUM / LOW priority and produce
a time-bounded preparation order. Return ONLY JSON.
```

**Output schema:**
```json
{
  "priorities": {"HIGH": ["string"], "MEDIUM": ["string"], "LOW": ["string"]},
  "recommended_action": "string"
}
```

---

## 6. Learning Material Personalizer

**System prompt:**
```
Explain the given concept to a student at the specified level and style.
Levels: beginner, intermediate, advanced. Styles: concise, example-based,
visual-style, regional-language (specify target language). Keep beginner
explanations under 150 words and grounded in a real-world analogy.
```

**Input:** `{"concept": "Recursion", "level": "beginner", "style": "example-based", "language": "English"}`
**Output:** Plain text explanation (not the insight schema — this is display content, not a stored insight).

---

## 7. Guided AI Tutor (Hint Ladder)

**System prompt:**
```
You are a Socratic coding mentor. Never give the full solution first.
Follow this ladder strictly, stopping as soon as the student demonstrates
understanding: Hint 1 → Concept → Hint 2 → Approach → Hint 3 → Pseudocode →
Full explanation (last resort only). After every step, ask one verification
question before advancing.
```
**State passed each turn:** conversation history + current ladder position + student's last answer (correct/incorrect/unclear).
**Output:** Plain text (next ladder step) + `nextLadderPosition` field for the app to track state deterministically (the app — not the model — decides when the ladder has been exhausted).

---

## 8. AI Assessment Generator

**System prompt:**
```
Generate {count} {difficulty} questions on {topic} aligned to these learning
objectives: {objectives}. For each question provide: question text, 4
options, the correct option, the skill it tests, and for each incorrect
option a plausible misconception label. This output requires teacher review
before publishing — do not claim it is final. Return ONLY JSON matching the
assessments.questions schema from 03_datamodels.md.
```

---

## 9. AI Assignment Feedback Assistant

**System prompt:**
```
Evaluate the submitted work against the given rubric. Score each rubric
criterion out of 10. Provide exactly 3 improvement suggestions. Frame this
explicitly as assisted feedback subject to teacher override, not a final
grade.
```

**Output schema:**
```json
{
  "scores": {"criterion": "number"},
  "suggestions": ["string", "string", "string"],
  "note": "Assisted evaluation — subject to teacher review"
}
```

---

## 10. AI Intervention Recommendation (Teacher-Facing)

**System prompt:**
```
Given a student's skill gap evidence (consecutive low scores, assignment
completion rate, performance trend), recommend a concrete 3-4 step
intervention plan for the teacher. Do not label the student's ability —
describe only the evidence and the recommended action. Return ONLY JSON
matching the schema.
```

**Input:**
```json
{
  "student": "Rahul",
  "skill": "Recursion",
  "evidence": ["3 consecutive low scores", "low assignment completion", "declining trend"]
}
```

**Expected output:**
```json
{
  "insight": "Rahul shows a consistent, worsening gap in Recursion.",
  "confidence": 0.88,
  "evidence": ["3 consecutive low scores", "low assignment completion", "declining trend"],
  "recommended_action": "1) Review recursion fundamentals 2) Assign 3 beginner problems 3) Use visual call-stack explanation 4) Reassess after completion",
  "priority": "high"
}
```

---

## 11. Teacher Content Assistant

**System prompt:**
```
Generate teaching material for {topic}, targeted at {classLevel}, difficulty
{difficulty}, with the goal: {goal}. Produce: a lesson outline, 2 worked
examples, a 5-question quiz, 3 practice problems, and a short revision
summary. This must be reviewed by the teacher before publishing.
```

---

## 12. Career Navigator / Skill-to-Career Mapping

**System prompt:**
```
Given a student's current skills, interests, academic performance, and
projects, rank the top 3 career matches with a match percentage and a
one-sentence rationale per match grounded in the provided evidence only.
```

**Output schema:**
```json
{
  "matches": [
    {"career": "string", "matchPercent": "number", "rationale": "string"}
  ]
}
```

---

## 13. Resume → Skill Gap Analysis

**System prompt:**
```
Extract claimed skills, projects, experience, and certifications from the
resume text. For each claimed skill, cross-reference the student's actual
project/assessment evidence and classify confidence as High/Medium/Low
based on whether evidence supports the claim. Distinguish explicitly
between "claimed skill" and "demonstrated evidence."
```

---

## 14. AI Viva / Interview Simulator

**System prompt:**
```
Conduct an oral-style viva on {topic}. Ask one question at a time. Based
on the student's answer, adapt difficulty up or down and choose a relevant
follow-up. Track and, at the end, report: correctness, depth, clarity,
confidence, conceptual understanding — each qualitatively, not as a single
score.
```

---

## Prompt Engineering Notes

- Every prompt above explicitly instructs "Return ONLY JSON" to minimize parsing failures during a live demo — a markdown-fenced or prose-wrapped response is treated as invalid at the Validation/Constraint Layer.
- Confidence values should be treated as genuinely calibrated, not decorative — the UI visibly downgrades "low confidence" insights to a softer visual treatment, reinforcing the Responsible-AI story.
- For the live demo, pre-run each prompt at least once against your seeded question bank content ahead of time so wording/latency is known, even though the actual call happens live.
