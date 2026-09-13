// Canonical Seed Data for EduRaahi (AI Learning Intelligence Platform)
// Aligned with 03_datamodels.md, 04_userflows.md, 06_prd_requirements.md, and 07_ai_prompt_spec.md

export const SEED_SKILLS = [
  {
    id: "skill_arrays",
    name: "Arrays & Contiguous Memory",
    topicId: "topic_arrays",
    subjectId: "subject_dsa",
    prerequisites: [],
    description: "Vector operations, dynamic sizing, two-pointer techniques, and memory indexing.",
  },
  {
    id: "skill_strings",
    name: "String Algorithms & Hashing",
    topicId: "topic_arrays",
    subjectId: "subject_dsa",
    prerequisites: ["skill_arrays"],
    description: "Pattern matching, character counting, anagram detection, and string builders.",
  },
  {
    id: "skill_complexity",
    name: "Time & Space Complexity",
    topicId: "topic_complexity",
    subjectId: "subject_dsa",
    prerequisites: [],
    description: "Asymptotic notation, Big-O analysis, recurrence relations, and space overhead.",
  },
  {
    id: "skill_recursion",
    name: "Recursive Reasoning & Base Cases",
    topicId: "topic_recursion",
    subjectId: "subject_dsa",
    prerequisites: ["skill_arrays"],
    description: "Call stack unwinding, mathematical induction, base case guards, and divide-and-conquer.",
  },
  {
    id: "skill_trees",
    name: "Tree Traversal & Binary Search Trees",
    topicId: "topic_trees",
    subjectId: "subject_dsa",
    prerequisites: ["skill_recursion"],
    description: "In-order, pre-order, post-order recursive traversals, BST search invariants, and height balancing.",
  },
  {
    id: "skill_graphs",
    name: "Graph Traversal (BFS & DFS)",
    topicId: "topic_graphs",
    subjectId: "subject_dsa",
    prerequisites: ["skill_trees", "skill_recursion"],
    description: "Adjacency representations, cycle detection, queue-based BFS, and stack/recursion DFS.",
  },
];

export const SEED_USERS = {
  uid_rahul: {
    uid: "uid_rahul",
    name: "Rahul Sharma",
    email: "rahul@eduraahi.edu",
    role: "student",
    classId: "class_3a",
    careerGoal: "Backend Software Engineer",
    avatar: "RS",
    academicLevel: "B.Tech Computer Science (3rd Year)",
    streak: 12,
    studyHoursWeek: 6,
  },
  uid_priya: {
    uid: "uid_priya",
    name: "Priya Patel",
    email: "priya@eduraahi.edu",
    role: "student",
    classId: "class_3a",
    careerGoal: "Full Stack Developer",
    avatar: "PP",
    academicLevel: "B.Tech Computer Science (3rd Year)",
    streak: 7,
    studyHoursWeek: 5,
  },
  uid_aman: {
    uid: "uid_aman",
    name: "Aman Verma",
    email: "aman@eduraahi.edu",
    role: "student",
    classId: "class_3a",
    careerGoal: "Data Analyst",
    avatar: "AV",
    academicLevel: "B.Tech Computer Science (3rd Year)",
    streak: 2,
    studyHoursWeek: 3,
  },
  uid_sneha: {
    uid: "uid_sneha",
    name: "Sneha Roy",
    email: "sneha@eduraahi.edu",
    role: "student",
    classId: "class_3a",
    careerGoal: "AI/ML Engineer",
    avatar: "SR",
    academicLevel: "B.Tech Computer Science (3rd Year)",
    streak: 19,
    studyHoursWeek: 8,
  },
  uid_sharma: {
    uid: "uid_sharma",
    name: "Prof. Rajesh Sharma",
    email: "sharma@eduraahi.edu",
    role: "teacher",
    classId: "class_3a",
    department: "Computer Science & Engineering",
    avatar: "PS",
  },
};

export const SEED_CLASSES = {
  class_3a: {
    id: "class_3a",
    name: "Class 3A — Algorithms & Placement Prep",
    teacherId: "uid_sharma",
    subject: "Data Structures & Algorithms",
    studentIds: ["uid_rahul", "uid_priya", "uid_aman", "uid_sneha"],
  },
};

// Initial student skills state for Rahul before reassessment
export const INITIAL_STUDENT_SKILLS = {
  uid_rahul_skill_arrays: {
    uid: "uid_rahul",
    skillId: "skill_arrays",
    mastery: 85,
    confidence: 0.88,
    trend: "stable",
    evidence: ["4/4 array sliding window correct in Diagnostic", "Optimal two-pointer approach applied"],
    lastUpdated: new Date(Date.now() - 3600000 * 24).toISOString(),
    attemptsCount: 8,
    correctCount: 7,
  },
  uid_rahul_skill_strings: {
    uid: "uid_rahul",
    skillId: "skill_strings",
    mastery: 74,
    confidence: 0.82,
    trend: "stable",
    evidence: ["Demonstrated frequency map hashing", "Slight inefficiency in string concatenation"],
    lastUpdated: new Date(Date.now() - 3600000 * 20).toISOString(),
    attemptsCount: 7,
    correctCount: 5,
  },
  uid_rahul_skill_complexity: {
    uid: "uid_rahul",
    skillId: "skill_complexity",
    mastery: 65,
    confidence: 0.79,
    trend: "down",
    evidence: ["Confused linear search O(n) with logarithmic O(log n) on sorted structure"],
    lastUpdated: new Date(Date.now() - 3600000 * 18).toISOString(),
    attemptsCount: 6,
    correctCount: 4,
  },
  uid_rahul_skill_recursion: {
    uid: "uid_rahul",
    skillId: "skill_recursion",
    mastery: 41,
    confidence: 0.84,
    trend: "down",
    evidence: [
      "Failed base case guard on recursive tree depth",
      "Struggles with stack unwinding return values",
      "Prerequisite bottleneck for Tree Traversal",
    ],
    lastUpdated: new Date(Date.now() - 3600000 * 12).toISOString(),
    attemptsCount: 6,
    correctCount: 2,
  },
  uid_rahul_skill_trees: {
    uid: "uid_rahul",
    skillId: "skill_trees",
    mastery: 38,
    confidence: 0.86,
    trend: "down",
    evidence: [
      "Selected pre-order output for an in-order BST traversal question",
      "Failed recursive left-right subtree accumulation",
      "Misconception: confusing traversal visit order with tree structural depth",
    ],
    lastUpdated: new Date(Date.now() - 3600000 * 6).toISOString(),
    attemptsCount: 7,
    correctCount: 2,
  },
  uid_rahul_skill_graphs: {
    uid: "uid_rahul",
    skillId: "skill_graphs",
    mastery: 59,
    confidence: 0.72,
    trend: "stable",
    evidence: ["Understands BFS queue structure", "Missed visited-set cycle prevention"],
    lastUpdated: new Date(Date.now() - 3600000 * 10).toISOString(),
    attemptsCount: 5,
    correctCount: 3,
  },

  // Classmate Skills for Class Heatmap
  uid_priya_skill_trees: { uid: "uid_priya", skillId: "skill_trees", mastery: 48, trend: "down" },
  uid_priya_skill_recursion: { uid: "uid_priya", skillId: "skill_recursion", mastery: 52, trend: "stable" },
  uid_priya_skill_arrays: { uid: "uid_priya", skillId: "skill_arrays", mastery: 82, trend: "up" },

  uid_aman_skill_trees: { uid: "uid_aman", skillId: "skill_trees", mastery: 32, trend: "down" },
  uid_aman_skill_recursion: { uid: "uid_aman", skillId: "skill_recursion", mastery: 35, trend: "down" },
  uid_aman_skill_arrays: { uid: "uid_aman", skillId: "skill_arrays", mastery: 58, trend: "down" },

  uid_sneha_skill_trees: { uid: "uid_sneha", skillId: "skill_trees", mastery: 88, trend: "up" },
  uid_sneha_skill_recursion: { uid: "uid_sneha", skillId: "skill_recursion", mastery: 91, trend: "up" },
  uid_sneha_skill_arrays: { uid: "uid_sneha", skillId: "skill_arrays", mastery: 94, trend: "up" },
};

// Canonical 10-Question Diagnostic Assessment (Golden Path Step 1)
export const SEED_ASSESSMENT_DIAGNOSTIC = {
  id: "assess_dsa_diagnostic",
  title: "Placement Readiness Diagnostic (DSA)",
  topic: "Core Data Structures & Algorithms",
  difficulty: "intermediate",
  durationMinutes: 20,
  questions: [
    {
      id: "q1",
      skillId: "skill_arrays",
      text: "Given an array of integers, what is the optimal time complexity to find the maximum contiguous subarray sum using Kadane's Algorithm?",
      options: [
        { id: "opt_a", text: "O(n²)" },
        { id: "opt_b", text: "O(n)" },
        { id: "opt_c", text: "O(n log n)" },
        { id: "opt_d", text: "O(1)" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Assuming nested iteration is necessary to evaluate all subarray ranges",
        opt_c: "Confusing divide-and-conquer with dynamic cumulative accumulation",
      },
    },
    {
      id: "q2",
      skillId: "skill_arrays",
      text: "Which two-pointer approach is most appropriate to find if a sorted array contains two numbers that sum up to target K?",
      options: [
        { id: "opt_a", text: "Start both pointers at index 0 and move forward together" },
        { id: "opt_b", text: "Pointers at index 0 and index N-1, moving inward based on sum comparison" },
        { id: "opt_c", text: "Move one pointer by 1 and the other by 2 (tortoise and hare)" },
        { id: "opt_d", text: "Randomly pick two indices until sum equals K" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Failing to exploit the sorted invariant of the array",
        opt_c: "Confusing two-sum with linked-list cycle detection",
      },
    },
    {
      id: "q3",
      skillId: "skill_strings",
      text: "What is the time complexity to verify whether string A is an anagram of string B (length N) using a fixed-size 26-element integer frequency array?",
      options: [
        { id: "opt_a", text: "O(N log N)" },
        { id: "opt_b", text: "O(N)" },
        { id: "opt_c", text: "O(N²)" },
        { id: "opt_d", text: "O(26^N)" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Believing that sorting the characters is required to count occurrences",
        opt_c: "Assuming character lookup requires scanning the entire target string per letter",
      },
    },
    {
      id: "q4",
      skillId: "skill_strings",
      text: "Why is repeated string concatenation (`s += c`) inside an N-iteration loop considered an antipattern in languages with immutable strings?",
      options: [
        { id: "opt_a", text: "It causes stack overflow" },
        { id: "opt_b", text: "Each concatenation creates a new copy, leading to O(N²) overall time" },
        { id: "opt_c", text: "It loses character encoding" },
        { id: "opt_d", text: "It converts characters into pointers" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Confusing heap allocation memory reallocation with call stack overflow",
        opt_c: "Misunderstanding string immutability semantics",
      },
    },
    {
      id: "q5",
      skillId: "skill_complexity",
      text: "Which algorithm guarantees O(log n) time complexity to locate an element in a strictly sorted array of size n?",
      options: [
        { id: "opt_a", text: "Linear Search" },
        { id: "opt_b", text: "Binary Search" },
        { id: "opt_c", text: "Quick Sort" },
        { id: "opt_d", text: "Breadth-First Search" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Confusing linear O(n) scan with logarithmic search space bisection",
        opt_c: "Confusing searching an array with sorting an array",
      },
    },
    {
      id: "q6",
      skillId: "skill_complexity",
      text: "What is the worst-case space complexity of recursive Depth-First Search on an unbalanced degenerate (skewed) binary tree of N nodes?",
      options: [
        { id: "opt_a", text: "O(1)" },
        { id: "opt_b", text: "O(log N)" },
        { id: "opt_c", text: "O(N)" },
        { id: "opt_d", text: "O(N²)" },
      ],
      correctOptionId: "opt_c",
      misconceptionMap: {
        opt_b: "Assuming the tree is always balanced when evaluating recursive call stack depth",
        opt_a: "Ignoring recursive activation records placed on the call stack",
      },
    },
    {
      id: "q7",
      skillId: "skill_recursion",
      text: "In a recursive function calculating the Fibonacci number `fib(n)`, what occurs if the base case `if (n <= 1) return n;` is completely omitted?",
      options: [
        { id: "opt_a", text: "The function immediately returns 0" },
        { id: "opt_b", text: "The recursion continues infinitely until the call stack overflows" },
        { id: "opt_c", text: "The compiler optimizes it to an iterative loop" },
        { id: "opt_d", text: "It returns garbage memory" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Believing unhandled recursion defaults to identity or zero",
        opt_c: "Assuming compilers automatically synthesize missing termination guards",
      },
    },
    {
      id: "q8",
      skillId: "skill_recursion",
      text: "When implementing a divide-and-conquer algorithm like Merge Sort, at what point does the actual sorting and merging of subproblems take place?",
      options: [
        { id: "opt_a", text: "Before making the recursive calls" },
        { id: "opt_b", text: "During the post-recursive unwinding phase as call frames return" },
        { id: "opt_c", text: "In the initial base case check" },
        { id: "opt_d", text: "During memory allocation" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Confusing pre-order divide actions (like QuickSort partition) with post-order merge unwinding",
        opt_c: "Misunderstanding how recursive subproblem results are synthesized",
      },
    },
    {
      id: "q9",
      skillId: "skill_trees",
      text: "Given a Binary Search Tree (BST), which traversal order is mathematically guaranteed to visit and print node keys in strictly ascending numerical order?",
      options: [
        { id: "opt_a", text: "Pre-order Traversal (Root → Left → Right)" },
        { id: "opt_b", text: "In-order Traversal (Left → Root → Right)" },
        { id: "opt_c", text: "Post-order Traversal (Left → Right → Root)" },
        { id: "opt_d", text: "Level-order Traversal" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Confusing Pre-order root-first inspection with BST In-order sorted property",
        opt_c: "Assuming leaf nodes must be processed first to sort values",
        opt_d: "Believing breadth-first horizontal order corresponds to sorted values",
      },
    },
    {
      id: "q10",
      skillId: "skill_trees",
      text: "In a binary tree, how do you recursively compute the maximum depth (height) of a node given its `left` and `right` subtrees?",
      options: [
        { id: "opt_a", text: "depth = leftDepth + rightDepth" },
        { id: "opt_b", text: "depth = 1 + max(leftDepth, rightDepth)" },
        { id: "opt_c", text: "depth = min(leftDepth, rightDepth) - 1" },
        { id: "opt_d", text: "depth = 2 * leftDepth" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Summing subtree heights instead of tracking the longest critical branch path",
        opt_c: "Confusing maximum tree depth with minimum leaf depth",
      },
    },
  ],
};

// Targeted Reassessment: 5-Question Tree Traversal & Recursion Practice (Golden Path Step 6)
export const SEED_ASSESSMENT_RETEST = {
  id: "assess_trees_retest",
  title: "Targeted Mastery Practice: Tree Traversal & Recursion",
  topic: "Trees & Binary Search Trees",
  difficulty: "intermediate",
  durationMinutes: 10,
  questions: [
    {
      id: "re_q1",
      skillId: "skill_trees",
      text: "For a BST with root node 10, left child 5, and right child 15, what is the exact output sequence of an In-Order traversal?",
      options: [
        { id: "opt_a", text: "10, 5, 15" },
        { id: "opt_b", text: "5, 10, 15" },
        { id: "opt_c", text: "15, 10, 5" },
        { id: "opt_d", text: "5, 15, 10" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Pre-order sequence (root first)",
        opt_c: "Reverse in-order sequence",
      },
    },
    {
      id: "re_q2",
      skillId: "skill_trees",
      text: "What is the base case condition when recursively traversing a binary tree using pointer or reference based nodes?",
      options: [
        { id: "opt_a", text: "if (node.value == 0) return;" },
        { id: "opt_b", text: "if (node == null) return;" },
        { id: "opt_c", text: "if (node.left == null) return;" },
        { id: "opt_d", text: "if (node.right != null) return;" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Confusing null reference boundary with zero numerical value",
        opt_c: "Prematurely terminating before inspecting leaf nodes or right subtrees",
      },
    },
    {
      id: "re_q3",
      skillId: "skill_trees",
      text: "Which tree traversal order is required to delete or deallocate a tree from leaf nodes upward without memory leaks in manual memory systems?",
      options: [
        { id: "opt_a", text: "Pre-order (delete root before children)" },
        { id: "opt_b", text: "Post-order (delete children before root)" },
        { id: "opt_c", text: "In-order" },
        { id: "opt_d", text: "Breadth-first" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Deleting root node leaves orphaned pointers to children",
        opt_c: "Deleting root midway through leaves the right subtree inaccessible",
      },
    },
    {
      id: "re_q4",
      skillId: "skill_trees",
      text: "If a BST has height H and contains N nodes, what is the best-case time complexity to search for a key in a balanced BST?",
      options: [
        { id: "opt_a", text: "O(N)" },
        { id: "opt_b", text: "O(log N)" },
        { id: "opt_c", text: "O(N²)" },
        { id: "opt_d", text: "O(1)" },
      ],
      correctOptionId: "opt_b",
      misconceptionMap: {
        opt_a: "Assuming degenerate linear search is always required",
        opt_d: "Confusing hash table constant time with tree branch navigation",
      },
    },
    {
      id: "re_q5",
      skillId: "skill_trees",
      text: "In recursive tree operations, what does each return statement from a child call represent?",
      options: [
        { id: "opt_a", text: "The synthesized solution of that sub-tree passed back to the parent" },
        { id: "opt_b", text: "A signal to terminate the entire program" },
        { id: "opt_c", text: "A reset of all global variables" },
        { id: "opt_d", text: "An error condition" },
      ],
      correctOptionId: "opt_a",
      misconceptionMap: {
        opt_b: "Failing to understand the recursive stack unwinding contract",
      },
    },
  ],
};

// Initial Learning Plan for Rahul
export const INITIAL_LEARNING_PLAN = {
  uid: "uid_rahul",
  goal: "Software Engineer Placement Prep",
  deadline: "2026-10-30",
  availableHoursPerWeek: 6,
  tasks: [
    {
      id: "task_1",
      skillId: "skill_arrays",
      title: "Arrays Two-Pointer Practice",
      allocatedMinutes: 30,
      status: "done",
      priority: "medium",
    },
    {
      id: "task_2",
      skillId: "skill_recursion",
      title: "Recursion Stack & Base Case Diagnostics",
      allocatedMinutes: 30,
      status: "pending",
      priority: "high",
    },
    {
      id: "task_3",
      skillId: "skill_trees",
      title: "Tree Traversal Fundamentals",
      allocatedMinutes: 20, // Will be dynamically adapted to 45m upon gap detection!
      status: "pending",
      priority: "high",
    },
    {
      id: "task_4",
      skillId: "skill_graphs",
      title: "BFS Queue Exploration",
      allocatedMinutes: 30,
      status: "pending",
      priority: "medium",
    },
  ],
  lastRecalculated: new Date(Date.now() - 3600000 * 24).toISOString(),
};

// Initial Career Goal & Mapping for Rahul
export const INITIAL_CAREER_GOAL = {
  uid: "uid_rahul",
  targetRole: "Backend Software Engineer",
  readinessScore: 58,
  requiredSkills: [
    { skillId: "skill_arrays", name: "Arrays & Data Structures", requiredLevel: 75, currentLevel: 85, status: "mastered" },
    { skillId: "skill_strings", name: "String Manipulation", requiredLevel: 70, currentLevel: 74, status: "mastered" },
    { skillId: "skill_complexity", name: "Complexity Analysis", requiredLevel: 70, currentLevel: 65, status: "needs_work" },
    { skillId: "skill_recursion", name: "Recursive Thinking", requiredLevel: 75, currentLevel: 41, status: "needs_work" },
    { skillId: "skill_trees", name: "Trees & BST Algorithms", requiredLevel: 80, currentLevel: 38, status: "missing" },
    { skillId: "skill_graphs", name: "Graph Search (BFS/DFS)", requiredLevel: 70, currentLevel: 59, status: "needs_work" },
  ],
};

// Initial AI Insights for Rahul (pre-assessment baseline)
export const INITIAL_AI_INSIGHTS = [
  {
    id: "insight_gap_tree",
    uid: "uid_rahul",
    type: "gap",
    insight: "Tree Traversal and recursive subtree reasoning is currently your highest-impact skill gap.",
    confidence: 0.86,
    evidence: [
      "2 of 2 Tree questions incorrect in recent diagnostic",
      "Prerequisite Recursion mastery is below target threshold (41%)",
      "Selected pre-order instead of in-order on BST",
    ],
    recommendedAction: "Review Tree Traversal Fundamentals and complete 5 targeted practice exercises.",
    priority: "high",
    status: "active",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "insight_misconception_traversal",
    uid: "uid_rahul",
    type: "misconception",
    insight: "Confusing pre-order root-first processing with in-order numerical sorting on BSTs.",
    confidence: 0.82,
    evidence: ["Selected Option A (root first) for sorted BST output question"],
    recommendedAction: "Step through visual call stack simulation showing left subtree unwinding before root visit.",
    priority: "high",
    status: "active",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "insight_rec_next",
    uid: "uid_rahul",
    type: "recommendation",
    insight: "Recommended Next Action: Targeted 5-question Tree Traversal Practice.",
    confidence: 0.90,
    evidence: ["Closes the #1 blocker holding back your Backend Placement Readiness score"],
    recommendedAction: "Launch Tree Traversal Retest (estimated time: 8-10 minutes)",
    priority: "high",
    status: "active",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

// Initial Teacher Interventions
export const INITIAL_INTERVENTIONS = [
  {
    id: "int_001",
    teacherId: "uid_sharma",
    studentId: "uid_aman",
    studentName: "Aman Verma",
    skillId: "skill_trees",
    skillName: "Tree Traversal & BST",
    urgency: "critical",
    suggestion: "1) Assign 1-on-1 TA peer tutoring on tree recursion 2) Provide visual call-stack worksheet 3) Reassess in 48 hours",
    evidence: ["3 consecutive scores below 40%", "Low assignment completion", "Declining 3-week trend"],
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "int_002",
    teacherId: "uid_sharma",
    studentId: "uid_priya",
    studentName: "Priya Patel",
    skillId: "skill_recursion",
    skillName: "Recursive Reasoning",
    urgency: "high",
    suggestion: "1) Provide worked examples of stack unwinding 2) Assign 3 guided practice problems with base-case hints",
    evidence: ["Struggles with return value propagation", "Mastery dropped from 60% to 52%"],
    status: "approved",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
];
