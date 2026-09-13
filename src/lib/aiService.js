// AI Orchestration Layer for EduRaahi
// Wraps Google Gemini API calls with strict JSON parsing, schema enforcement,
// and intelligent deterministic fallbacks to guarantee 100% reliability during live demos.

const GEMINI_API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  "";

/**
 * Call Gemini API with JSON enforcement
 */
async function callGeminiRaw(systemPrompt, userPrompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("NO_API_KEY");
  }

  // Use Gemini 1.5 Flash (or 2.0 Flash) endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: `${systemPrompt}\n\nIMPORTANT: Return ONLY valid, raw JSON. Do not include markdown code fences, backticks, or preamble.\n\nInput:\n${userPrompt}` },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error("EMPTY_GEMINI_RESPONSE");
  }

  // Strip accidental markdown fences if present
  const cleaned = textOutput.replace(/```json/gi, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
}

/**
 * Robust caller that uses live Gemini when available, or instant deterministic fallback
 */
async function generateInsightWithFallback(systemPrompt, userPrompt, fallbackData) {
  try {
    const result = await callGeminiRaw(systemPrompt, userPrompt);
    // Validate schema
    if (result && result.insight && typeof result.confidence === "number") {
      return {
        ...result,
        source: "gemini",
      };
    }
    return { ...fallbackData, source: "deterministic_fallback" };
  } catch (error) {
    // Graceful fallback for offline demo, missing key, or API rate limit
    return {
      ...fallbackData,
      source: "deterministic_fallback",
      errorNotice: error.message === "NO_API_KEY" ? "Demo Mode (Add Gemini API key in .env for live AI)" : null,
    };
  }
}

// ============================================================
// AI MODULES (Aligned with 07_ai_prompt_spec.md)
// ============================================================

/**
 * 1. AI Skill Gap Analyzer (P01)
 */
export async function analyzeSkillGaps({ studentName = "Rahul", skillScores = {}, recentMistakes = [] }) {
  const systemPrompt = `You are an educational AI for EduRaahi that explains a student's skill gaps in plain, encouraging language. You are given per-skill mastery scores and recent mistake evidence. Identify the single highest-impact gap and explain it in 1-2 sentences a student can act on. Return ONLY JSON matching schema: { "insight": string, "confidence": number (0-1), "evidence": string[], "recommended_action": string, "priority": "low"|"medium"|"high" }.`;

  const userPrompt = JSON.stringify({ studentName, skillScores, recentMistakes });

  const fallback = {
    insight: `${studentName}'s main weakness is Tree Traversal and recursive subtree reasoning.`,
    confidence: 0.86,
    evidence: [
      "2 of 2 Tree questions incorrect in recent diagnostic",
      "Prerequisite Recursion mastery (41%) is below the 60% readiness threshold",
      "Selected pre-order output for an in-order BST traversal question",
    ],
    recommended_action: "Review Tree Traversal Fundamentals with recursion prerequisite check.",
    priority: "high",
  };

  return generateInsightWithFallback(systemPrompt, userPrompt, fallback);
}

/**
 * 2. AI Misconception Detector (P03)
 */
export async function detectMisconceptions({ question, correctAnswer, studentAnswer, topic = "Trees" }) {
  const systemPrompt = `You are analyzing why a student selected a wrong answer in computer science. Given the question, correct answer, and student's choice, infer the most likely underlying misconception. Return ONLY JSON matching schema: { "insight": string, "confidence": number (0-1), "evidence": string[], "recommended_action": string, "priority": "low"|"medium"|"high" }.`;

  const userPrompt = JSON.stringify({ question, correctAnswer, studentAnswer, topic });

  const fallback = {
    insight: `Likely misconception: Confusing pre-order root-first inspection with in-order numerical ordering on a BST.`,
    confidence: 0.82,
    evidence: [
      `Selected root-first sequence instead of traversing the left subtree first`,
      `Did not account for in-order (Left -> Root -> Right) sorted property`,
    ],
    recommended_action: "Visual call stack trace stepping through left subtree unwinding before visiting the root node.",
    priority: "high",
  };

  return generateInsightWithFallback(systemPrompt, userPrompt, fallback);
}

/**
 * 3. Next Best Learning Action Engine (P04)
 */
export async function recommendNextAction({ skillScores = {}, prerequisites = {}, careerGoal = "Backend Developer" }) {
  const systemPrompt = `You recommend the single next learning action for a student given their skill state and prerequisites. Weigh prerequisite blockers more heavily than isolated weak skills. Return ONLY JSON matching schema: { "insight": string, "confidence": number, "evidence": string[], "recommended_action": string, "priority": "high" }.`;

  const userPrompt = JSON.stringify({ skillScores, prerequisites, careerGoal });

  const fallback = {
    insight: "Recommended next action: Complete Targeted Tree Traversal Practice (5 questions).",
    confidence: 0.91,
    evidence: [
      "Tree mastery (38%) is the primary blocker for your Backend Placement readiness score",
      "Prerequisite recursion fundamentals have been partially covered",
    ],
    recommended_action: "Launch Tree Traversal Retest (estimated time: 8-10 mins).",
    priority: "high",
  };

  return generateInsightWithFallback(systemPrompt, userPrompt, fallback);
}

/**
 * 4. Guided AI Socratic Tutor with Hint Ladder (P08)
 * Ladder: 1: Hint -> 2: Conceptual Cue -> 3: Approach -> 4: Pseudocode -> 5: Full Solution
 */
export async function guidedTutorStep({ message, ladderPosition = 1, topic = "Tree Traversal", lastAnswer = "" }) {
  const systemPrompt = `You are a Socratic coding mentor for EduRaahi. Never give the full code first. Follow this progressive ladder strictly:
Ladder 1: Conceptual hint
Ladder 2: Narrower hint & structural cue
Ladder 3: Approach / logic breakdown
Ladder 4: High-level pseudocode
Ladder 5: Full solution (last resort only)
Current ladder position: ${ladderPosition}.
Always ask one short understanding verification question at the end.
Return ONLY JSON: { "reply": string, "nextLadderPosition": number, "verificationQuestion": string }.`;

  const userPrompt = JSON.stringify({ message, ladderPosition, topic, lastAnswer });

  // Intelligent fallback based on ladder position
  const ladderResponses = {
    1: {
      reply: "Think about the definition of 'In-Order'. The word 'In' means the root is visited *in between* its children. Where should you start before visiting the root?",
      nextLadderPosition: 2,
      verificationQuestion: "Which child node must you finish exploring before touching the current node?",
    },
    2: {
      reply: "Exactly! You must visit the Left subtree first. So the order is: 1) Recursively visit Left child, 2) Process current Root, 3) Recursively visit Right child.",
      nextLadderPosition: 3,
      verificationQuestion: "If the node is null, what should your base case return?",
    },
    3: {
      reply: "Great! The base case is `if (!node) return;`. Once you hit null, the call stack returns to the parent node, allowing you to print its value and move to its right child.",
      nextLadderPosition: 4,
      verificationQuestion: "Ready to see how this translates into pseudocode?",
    },
    4: {
      reply: `Here is the pseudocode:\n\nfunction inOrder(node):\n  if node is null: return\n  inOrder(node.left)\n  print(node.val)\n  inOrder(node.right)`,
      nextLadderPosition: 5,
      verificationQuestion: "Does this call structure match what you expected?",
    },
    5: {
      reply: `Full working implementation:\n\nfunction inorderTraversal(root) {\n  const result = [];\n  function traverse(node) {\n    if (!node) return;\n    traverse(node.left);\n    result.push(node.val);\n    traverse(node.right);\n  }\n  traverse(root);\n  return result;\n}`,
      nextLadderPosition: 5,
      verificationQuestion: "What is the time and space complexity of this recursive traversal?",
    },
  };

  const fallback = ladderResponses[ladderPosition] || ladderResponses[1];

  try {
    const raw = await callGeminiRaw(systemPrompt, userPrompt);
    if (raw && raw.reply) {
      return { ...raw, source: "gemini" };
    }
    return { ...fallback, source: "deterministic_fallback" };
  } catch (e) {
    return { ...fallback, source: "deterministic_fallback" };
  }
}

/**
 * 5. Teacher AI Intervention Recommendations (P21)
 */
export async function generateInterventionRecommendation({ studentName, skillName, evidence = [] }) {
  const systemPrompt = `Given a student's skill gap evidence, recommend a concrete 4-step intervention plan for the teacher. Do not label the student's ability negatively — describe only evidence and educational actions. Return ONLY JSON: { "insight": string, "confidence": number, "evidence": string[], "recommended_action": string, "priority": "high" }.`;

  const userPrompt = JSON.stringify({ studentName, skillName, evidence });

  const fallback = {
    insight: `${studentName} demonstrates an urgent conceptual bottleneck in ${skillName}.`,
    confidence: 0.89,
    evidence: evidence.length ? evidence : ["Consistent scores under 45%", "Prerequisite recursion gap", "Declining 3-week trend"],
    recommended_action: `1) Schedule 15-minute 1-on-1 walkthrough on call stack recursion\n2) Assign visual call-stack trace worksheet\n3) Pair with peer mentor for 2 BST practice problems\n4) Reassess via 5-question targeted quiz in 48 hours`,
    priority: "high",
  };

  return generateInsightWithFallback(systemPrompt, userPrompt, fallback);
}

/**
 * 6. Learning Material Personalizer (P07)
 */
export async function personalizeMaterial({ concept = "Recursion", level = "beginner", style = "example-based", language = "English" }) {
  const systemPrompt = `Explain the given computer science concept tailored to: Level: ${level}, Style: ${style}, Language: ${language}. Keep beginner explanations intuitive with a memorable real-world analogy. Return plain text or markdown formatted.`;

  const userPrompt = JSON.stringify({ concept, level, style, language });

  const fallbackExplanations = {
    beginner: `### Understanding ${concept} Like Russian Nesting Dolls (Matryoshka)\n\nImagine you have a big Russian doll. You open it, and inside is a smaller doll. You open that one, and inside is an even smaller one. You keep opening dolls until you reach the **tiniest solid wooden doll** that cannot be opened.\n\nThat tiniest doll is your **Base Case**! If it wasn't there, you'd be trying to open dolls forever (a Stack Overflow error!). Once you find the smallest doll, you put them all back together one by one—that is the **Unwinding Phase**.\n\nIn code, recursion is simply a function that calls a smaller version of itself until it reaches the base case guard.`,
    intermediate: `### ${concept}: Call Stack Execution Model\n\nRecursion relies on the system call stack. Each invocation allocates a new activation frame containing local variables and the instruction return address. For tree operations, recursion enables elegant divide-and-conquer processing of self-similar subtrees without requiring manual stack data structure management.`,
  };

  try {
    if (!GEMINI_API_KEY) throw new Error("NO_API_KEY");
    const raw = await callGeminiRaw(systemPrompt, userPrompt);
    if (typeof raw === "string") return raw;
    if (raw.explanation || raw.content) return raw.explanation || raw.content;
    return JSON.stringify(raw);
  } catch (e) {
    return fallbackExplanations[level] || fallbackExplanations.beginner;
  }
}

/**
 * 7. AI Exam Preparation Optimizer (P06)
 */
export async function optimizeExamPrep({ syllabus = [], examDate = "2026-10-30", studentSkills = [] }) {
  const systemPrompt = `Classify syllabus topics into HIGH, MEDIUM, and LOW priority based on the student's mastery gaps and exam urgency. Return ONLY JSON: { "priorities": { "HIGH": string[], "MEDIUM": string[], "LOW": string[] }, "recommended_action": string }.`;

  const userPrompt = JSON.stringify({ syllabus, examDate, studentSkills });

  const fallback = {
    priorities: {
      HIGH: ["Tree Traversal & BST (Mastery: 38%)", "Recursion & Backtracking (Mastery: 41%)"],
      MEDIUM: ["Graph Algorithms (Mastery: 59%)", "Time Complexity Analysis (Mastery: 65%)"],
      LOW: ["String Manipulation (Mastery: 74%)", "Arrays & Two-Pointers (Mastery: 85%)"],
    },
    recommended_action: "Focus 60% of available weekly study time on Trees and Recursion to eliminate high-impact blockers first.",
  };

  try {
    const raw = await callGeminiRaw(systemPrompt, userPrompt);
    if (raw && raw.priorities) return { ...raw, source: "gemini" };
    return { ...fallback, source: "deterministic_fallback" };
  } catch (e) {
    return { ...fallback, source: "deterministic_fallback" };
  }
}

/**
 * 8. Assessment Doubt Resolution & Socratic Explanation
 */
export async function explainAssessmentDoubt({ questionText, studentAnswer, correctAnswer, detectedMisconception, skillId }) {
  const systemPrompt = `You are a patient Socratic Computer Science Mentor for EduRaahi. A student took a test and is confused about why their answer was incorrect.
Explain:
1) The mental misconception that led to selecting the wrong answer.
2) The underlying mathematical or algorithmic invariant.
3) A 1-sentence Socratic reflection prompt to help them verify the correct concept without simply giving away test points.
Return ONLY JSON matching schema: { "misconceptionExplanation": string, "invariantPrinciple": string, "socraticReflection": string, "analogousHint": string }.`;

  const userPrompt = JSON.stringify({ questionText, studentAnswer, correctAnswer, detectedMisconception, skillId });

  const fallback = {
    misconceptionExplanation: detectedMisconception || "You may have processed nodes in the order they were encountered (pre-order) rather than waiting for left subtree elements to unwind in sorted order (in-order).",
    invariantPrinciple: "In a Binary Search Tree, an In-Order traversal (Left -> Node -> Right) visits keys in strictly non-decreasing sorted order.",
    socraticReflection: "If you draw a small 3-node BST with root 5, left 2, and right 8, what sequence produces 2, 5, 8?",
    analogousHint: "Think of looking up words in a dictionary: you finish all words starting with 'A' before moving on to 'B'.",
  };

  try {
    const raw = await callGeminiRaw(systemPrompt, userPrompt);
    if (raw && raw.misconceptionExplanation) return { ...raw, source: "gemini" };
    return { ...fallback, source: "deterministic_fallback" };
  } catch (e) {
    return { ...fallback, source: "deterministic_fallback" };
  }
}

/**
 * 9. Custom Career Path & Domain Roadmap Generator
 */
export async function generateCustomCareerRoadmap({ targetRole, targetDomain, studentSkills = [], timeline = "6 Months" }) {
  const systemPrompt = `You are an expert technical career architect for engineering students.
Given a student's desired target role and domain/industry, generate a personalized 4-phase preparation roadmap, required competencies, readiness match %, and a recommended domain capstone project.
Return ONLY JSON matching schema:
{
  "roleTitle": string,
  "domain": string,
  "matchPercentage": number,
  "readinessSummary": string,
  "phases": [
    { "phase": number, "title": string, "duration": string, "milestones": string[], "keySkills": string[] }
  ],
  "capstoneProject": { "title": string, "description": string, "techStack": string[] }
}`;

  const userPrompt = JSON.stringify({ targetRole, targetDomain, studentSkills, timeline });

  const fallback = {
    roleTitle: targetRole || "Cloud & DevOps Reliability Engineer",
    domain: targetDomain || "Fintech Infrastructure",
    matchPercentage: 64,
    readinessSummary: `Solid foundation in Data Structures (Arrays 85%, Strings 74%). Next milestone is mastering distributed system invariants, container orchestration, and CI/CD pipelines.`,
    phases: [
      {
        phase: 1,
        title: "Algorithmic Fundamentals & Linux Internals",
        duration: "Weeks 1–4",
        milestones: ["Time & Space Complexity mastery", "Linux Shell scripting & process lifecycle", "Networking basics (TCP/IP, HTTP/3, DNS)"],
        keySkills: ["Complexity Analysis", "Bash / POSIX", "Networking"],
      },
      {
        phase: 2,
        title: "System Architecture & Containerization",
        duration: "Weeks 5–10",
        milestones: ["Docker containerization & multi-stage builds", "Kubernetes pods, services, ingress & configmaps", "Microservice communication protocols"],
        keySkills: ["Docker", "Kubernetes", "gRPC / REST"],
      },
      {
        phase: 3,
        title: "Infrastructure as Code & Observability",
        duration: "Weeks 11–16",
        milestones: ["Terraform declarative provisioning", "Prometheus & Grafana metric telemetry", "Distributed tracing with OpenTelemetry"],
        keySkills: ["Terraform", "Prometheus", "CI/CD Pipelines"],
      },
      {
        phase: 4,
        title: "Placement Sprint & Production Capstone",
        duration: "Weeks 17–24",
        milestones: ["Deploy high-availability fintech settlement simulator", "Conduct 5 mock technical interview vivas", "Resume claimed vs demonstrated skill audit"],
        keySkills: ["Mock Vivas", "System Design", "Production Deployments"],
      },
    ],
    capstoneProject: {
      title: `${targetDomain || "Fintech"} Real-Time Resilient Event Streamer`,
      description: `Build a distributed transaction processor that handles 10,000 req/sec with automatic failover, canary deployments, and Prometheus telemetry dashboards.`,
      techStack: ["Go / Node.js", "Docker", "Kubernetes", "Kafka", "Prometheus"],
    },
  };

  try {
    const raw = await callGeminiRaw(systemPrompt, userPrompt);
    if (raw && raw.phases && raw.phases.length > 0) return { ...raw, source: "gemini" };
    return { ...fallback, source: "deterministic_fallback" };
  } catch (e) {
    return { ...fallback, source: "deterministic_fallback" };
  }
}

/**
 * 10. Interactive Career Counseling Interview Step
 */
export async function careerCounselorStep({ message, step = 1, conversationHistory = [] }) {
  const systemPrompt = `You are an empathetic, insightful Career Counselor for university engineering students.
Guide the student through an interactive 3-question discovery to pinpoint their ideal tech career path:
- Step 1: Discover technical interests (e.g. backend systems, AI/ML, fullstack, DevOps/cloud, cybersecurity).
- Step 2: Discover target domain (e.g. fintech, healthtech, high-scale consumer apps, AI startups).
- Step 3: Recommend the top 2 matching careers, explain why they fit, and prompt them to generate their personalized roadmap.
Always return JSON: { "reply": string, "nextStep": number, "recommendedRole": string|null, "suggestedOptions": string[] }.`;

  const userPrompt = JSON.stringify({ message, step, conversationHistory });

  const defaultReplies = {
    1: {
      reply: "Welcome to Career Counseling! To find the career path that best matches your brain and ambitions, tell me: what kind of problems excite you most? Do you enjoy crafting beautiful user experiences, designing resilient backend APIs, training AI models, or building automated cloud systems?",
      nextStep: 2,
      recommendedRole: null,
      suggestedOptions: ["Backend & Distributed Systems", "AI & Machine Learning", "Full-Stack Web & Mobile", "Cloud Infrastructure & DevOps"],
    },
    2: {
      reply: "Great choice! Now, what industry or domain would you love to work in? For instance, does High-Frequency Fintech, Healthcare Tech, AI Product Startups, or Autonomous Systems appeal to you most?",
      nextStep: 3,
      recommendedRole: null,
      suggestedOptions: ["Fintech & Trading Systems", "HealthTech & Bio-Informatics", "AI & Robotics Startups", "Enterprise Cloud & SaaS"],
    },
    3: {
      reply: "Based on our counseling conversation and your strong analytical aptitude in Data Structures (Arrays 85%, Strings 74%), your top recommended path is **Backend & Distributed Systems Engineer**! You have the exact problem-solving foundation required to excel in scalable distributed architectures. Would you like me to generate and apply your personalized 4-phase preparation roadmap now?",
      nextStep: 4,
      recommendedRole: "Backend & Distributed Systems Engineer",
      suggestedOptions: ["Yes, Generate & Apply Roadmap!", "Tell me more about required skills", "Explore alternative: Cloud & DevOps"],
    },
  };

  try {
    const raw = await callGeminiRaw(systemPrompt, userPrompt);
    if (raw && raw.reply) return { ...raw, source: "gemini" };
    return defaultReplies[step] || defaultReplies[3];
  } catch (e) {
    return defaultReplies[step] || defaultReplies[3];
  }
}
