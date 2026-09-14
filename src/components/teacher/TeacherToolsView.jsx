"use client";

import React, { useState } from "react";
import {
  FileCheck,
  BookOpen,
  Sparkles,
  CheckCircle,
  Plus,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Award,
  FileQuestion,
  CheckSquare,
} from "lucide-react";
import NeoCard from "../common/NeoCard";
import NeoButton from "../common/NeoButton";
import NeoBadge from "../common/NeoBadge";
import { storageService } from "../../lib/storage";

export default function TeacherToolsView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'assessment' | 'feedback' | 'content'

  // Assessment Generator State (T06)
  const [topic, setTopic] = useState("Recursion & Dynamic Programming");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [count, setCount] = useState(3);
  const [draftQuestions, setDraftQuestions] = useState(null);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Assignment Feedback Assistant State (T07 / P12)
  const [studentName, setStudentName] = useState("Rahul Sharma");
  const [assignmentCode, setAssignmentCode] = useState(
    `function inorderTraversal(root) {\n  const result = [];\n  function traverse(node) {\n    if (node === null) return;\n    traverse(node.left);\n    result.push(node.val);\n    traverse(node.right);\n  }\n  traverse(root);\n  return result;\n}`
  );
  const [rubricScores, setRubricScores] = useState({
    correctness: 10,
    codeQuality: 9,
    edgeCases: 8,
    efficiency: 9,
  });
  const [suggestions, setSuggestions] = useState([
    "Add explicit TypeScript interfaces or JSDoc comments to document TreeNode types.",
    "Consider adding unit tests for skewed degenerate trees to verify call-stack limits.",
    "Well done on handling the base case with strict null equality checks.",
  ]);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Content Generator State (T08)
  const [contentTopic, setContentTopic] = useState("Binary Tree Traversals");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  const handleGenerateAssessment = () => {
    setLoadingGenerate(true);
    setTimeout(() => {
      setDraftQuestions([
        {
          id: `gen_q1`,
          skillId: "skill_recursion",
          text: "What is the primary role of a memoization table in top-down dynamic programming?",
          options: [
            { id: "opt_a", text: "To cache subproblem return values and prevent redundant exponential calls" },
            { id: "opt_b", text: "To eliminate the call stack entirely" },
            { id: "opt_c", text: "To convert recursion into a thread pool" },
            { id: "opt_d", text: "To sort the input values" },
          ],
          correctOptionId: "opt_a",
          misconceptionMap: {
            opt_b: "Confusing caching with iterative tabulation state-machine transformation",
          },
        },
        {
          id: `gen_q2`,
          skillId: "skill_trees",
          text: "In a balanced Binary Search Tree with N nodes, what is the height H?",
          options: [
            { id: "opt_a", text: "O(log N)" },
            { id: "opt_b", text: "O(N)" },
            { id: "opt_c", text: "O(N²)" },
            { id: "opt_d", text: "O(1)" },
          ],
          correctOptionId: "opt_a",
          misconceptionMap: {
            opt_b: "Assuming degenerate unbalanced tree worst case",
          },
        },
        {
          id: `gen_q3`,
          skillId: "skill_recursion",
          text: "Which of the following recursive algorithms exhibits O(2^N) time complexity without memoization?",
          options: [
            { id: "opt_a", text: "Naive Recursive Fibonacci" },
            { id: "opt_b", text: "Binary Search" },
            { id: "opt_c", text: "Merge Sort" },
            { id: "opt_d", text: "Euclidean GCD Algorithm" },
          ],
          correctOptionId: "opt_a",
          misconceptionMap: {
            opt_c: "Confusing divide-and-conquer logarithmic tree height with overlapping subproblems",
          },
        },
      ]);
      setLoadingGenerate(false);
      setPublishSuccess(false);
    }, 1000);
  };

  const handlePublish = () => {
    if (!draftQuestions) return;
    const newAssess = {
      id: `assess_custom_${Date.now()}`,
      title: `${topic} (${difficulty.toUpperCase()})`,
      topic,
      difficulty,
      durationMinutes: 15,
      questions: draftQuestions,
      createdBy: "uid_sharma",
      reviewStatus: "published",
    };
    storageService.state.assessments[newAssess.id] = newAssess;
    storageService.saveToStorage();
    setPublishSuccess(true);
  };

  const handleSendFeedback = () => {
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  const handleGenerateContent = () => {
    setLoadingContent(true);
    setTimeout(() => {
      setGeneratedContent({
        outline: [
          "1. Motivation: Why linear structures fail for hierarchical data",
          "2. Binary Tree anatomical definitions: Root, Child, Parent, Leaf, Height",
          "3. The Three Depth-First Orders: Pre-Order, In-Order, Post-Order",
          "4. Mathematical induction proof of BST In-Order sorted order",
        ],
        workedExamples: [
          "Worked Example 1: Hand-tracing call stack frames for 3-node tree [2, 1, 3]",
          "Worked Example 2: In-place tree deletion avoiding orphaned heap memory",
        ],
        popQuiz: "1. Which traversal visits leaves first? (Answer: Post-Order)",
        revisionSheet:
          "Key Takeaway: In-Order visits Left -> Node -> Right. In a BST, this yields strictly ascending values.",
      });
      setLoadingContent(false);
    }, 1000);
  };

  const tabsConfig = [
    {
      id: "assessment",
      label: "Assessment Builder",
      title: "Bloom's Assessment Builder",
      icon: FileQuestion,
      badge: "AI Generator",
      description:
        "Generate multi-format diagnostic quizzes and exam questions calibrated to Bloom's taxonomy levels with instant distractor logic.",
      meta: "Multiple Choice • Code Analysis • Bloom-Calibrated",
    },
    {
      id: "feedback",
      label: "Assignment Feedback",
      title: "Assignment Feedback Assistant",
      icon: CheckSquare,
      badge: "Rubric Evaluator",
      description:
        "Paste student code or essays for automated rubric scoring, constructive inline feedback, and diagnosed misconception notes.",
      meta: "Rubric Grounded • Misconception Detection",
    },
    {
      id: "content",
      label: "Content Assistant",
      title: "Faculty Content Assistant",
      icon: BookOpen,
      badge: "Curriculum Copilot",
      description:
        "Generate structured lecture outlines, real-world conceptual analogies, and active classroom discussion prompts in seconds.",
      meta: "Lesson Plans • Worked Examples • Discussion Guides",
    },
  ];

  const currentTabInfo = tabsConfig.find((t) => t.id === activeTab);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* ================= VIEW 1: FULL SCREEN FEATURE CARDS GRID ================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Executive Category Header (Clean, NO tab buttons inside) */}
          <div className="bg-white border-[3px] border-[#0A2858] p-6 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold uppercase bg-[#EAF2FF] text-[#1867E8] px-2.5 py-1 border border-[#0A2858] rounded-xs">
                  Category • Faculty Authoring & Tools
                </span>
                <span className="font-mono text-xs text-[#16A34A] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded-xs border border-[#16A34A]">
                  ● 3 Tools Available
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2858] tracking-tight">
                Teacher Authoring & Evaluation Suite
              </h1>
              <p className="font-body text-sm text-[#55729D] mt-1">
                Select any authoring tool below to open it in full-width workspace mode:
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <div className="font-mono text-xs text-[#55729D]">Instructor Access</div>
              <div className="font-heading font-bold text-sm text-[#0A2858]">Prof. S. Sharma (Faculty)</div>
            </div>
          </div>

          {/* Complete Screen Feature Cards (3-Col Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tabsConfig.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="group cursor-pointer bg-white border-[3px] border-[#0A2858] rounded-md p-6 md:p-8 shadow-[5px_5px_0px_#0A2858] hover:shadow-[8px_8px_0px_#1867E8] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-sm bg-[#EAF2FF] border-[2px] border-[#0A2858] flex items-center justify-center text-[#1867E8] group-hover:bg-[#1867E8] group-hover:text-white transition-colors shadow-[2px_2px_0px_#0A2858]">
                        <Icon className="w-7 h-7" />
                      </div>
                      <NeoBadge variant="accent">{item.badge}</NeoBadge>
                    </div>

                    <div>
                      <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#0A2858] group-hover:text-[#1867E8] transition-colors tracking-tight">
                        {item.title}
                      </h2>
                      <p className="font-body text-sm text-[#55729D] leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t-2 border-[#DDE7F5] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#55729D]">
                      {item.meta}
                    </span>
                    <button className="btn btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5 group-hover:bg-[#0A2858] group-hover:text-white transition-colors shadow-[2px_2px_0px_#0A2858]">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= VIEW 2: FULL-WIDTH OPEN FEATURE WORKSPACE ================= */}
      {activeTab !== "overview" && (
        <div className="w-full space-y-6">
          {/* Top Full-Width Return Bar */}
          <div className="bg-white border-[3px] border-[#0A2858] p-4 rounded-md shadow-[4px_4px_0px_#0A2858] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("overview")}
                className="btn btn-primary text-xs px-4 py-2 flex items-center gap-2 shadow-[2px_2px_0px_#0A2858]"
                title="Return to Feature Cards Grid"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Features</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
                <span className="text-[#8298BA]">Faculty Authoring</span>
                <span className="text-[#8298BA]">/</span>
                <span className="font-bold text-[#0A2858] text-sm">{currentTabInfo?.title}</span>
              </div>
            </div>

            <NeoBadge variant="accent">
              {currentTabInfo?.badge}
            </NeoBadge>
          </div>

          {/* TAB 1: ASSESSMENT BUILDER */}
          {activeTab === "assessment" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-4">
              AI Assessment Draft Generator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Topic:
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold text-[#0A2858]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Difficulty Level:
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold text-[#0A2858]"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                  Question Count:
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full p-2 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-xs font-bold text-[#0A2858]"
                />
              </div>
            </div>

            <NeoButton
              variant="primary"
              size="md"
              disabled={loadingGenerate}
              onClick={handleGenerateAssessment}
              className="mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingGenerate ? "Drafting Questions via AI..." : "Generate Draft Assessment"}</span>
            </NeoButton>

            {publishSuccess && (
              <div className="p-3 bg-[#DCFCE7] border-[2px] border-[#16A34A] rounded-sm text-xs font-mono font-bold text-[#16A34A] mb-4">
                ✓ Assessment published to Class 3A successfully! Students can now attempt it.
              </div>
            )}

            {draftQuestions && (
              <div className="space-y-4 pt-4 border-t-2 border-[#0A2858]">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm uppercase text-[#0A2858]">
                    Generated Draft Review ({draftQuestions.length} Questions)
                  </h4>
                  <NeoButton
                    variant="primary"
                    size="sm"
                    onClick={handlePublish}
                    className="bg-[#16A34A] hover:bg-[#15803D]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve & Publish to Class</span>
                  </NeoButton>
                </div>

                <div className="space-y-3">
                  {draftQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm text-xs font-mono space-y-2"
                    >
                      <div className="font-bold text-sm text-[#0A2858]">
                        Q{idx + 1}: {q.text}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-xs border ${
                              opt.id === q.correctOptionId
                                ? "bg-[#DCFCE7] text-[#166534] border-[#16A34A] font-bold"
                                : "bg-white text-[#0A2858] border-[#0A2858]"
                            }`}
                          >
                            {opt.id.replace("opt_", "")}: {opt.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </NeoCard>
        </div>
      )}

      {/* TAB 2: T07 AI ASSIGNMENT FEEDBACK ASSISTANT (P12) */}
      {activeTab === "feedback" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <div className="flex items-center justify-between border-b-2 border-[#DDE7F5] pb-3 mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#0A2858]">
                  AI Rubric Evaluation & Feedback Assistant
                </h3>
                <p className="font-body text-xs text-[#55729D]">
                  Assisted evaluation of student submissions against rubric with complete teacher override.
                </p>
              </div>
              <NeoBadge variant="accent">Student: {studentName}</NeoBadge>
            </div>

            {feedbackSent && (
              <div className="p-3 bg-[#DCFCE7] border-[2px] border-[#16A34A] rounded-sm text-xs font-mono font-bold text-[#16A34A] mb-4">
                ✓ Feedback and scores sent to {studentName} successfully!
              </div>
            )}

            {/* Submission Code */}
            <div className="mb-4">
              <label className="block text-xs font-mono font-bold uppercase text-[#55729D] mb-1">
                Student Submitted Code (Tree Traversal):
              </label>
              <pre className="p-3.5 bg-[#0A2858] text-[#F4F8FF] font-mono text-xs rounded-sm overflow-x-auto border-[2px] border-[#0A2858]">
                {assignmentCode}
              </pre>
            </div>

            {/* Rubric Criteria with Teacher Override */}
            <div className="mb-6">
              <h4 className="font-heading font-bold text-sm uppercase text-[#0A2858] mb-2">
                Rubric Criteria Evaluation (Teacher Overridable):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.keys(rubricScores).map((crit) => (
                  <div key={crit} className="p-3 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm">
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#55729D] mb-1">
                      {crit}
                    </label>
                    <div className="flex items-center gap-1 font-mono text-lg font-bold text-[#0A2858]">
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={rubricScores[crit]}
                        onChange={(e) =>
                          setRubricScores({ ...rubricScores, [crit]: Number(e.target.value) })
                        }
                        className="w-12 p-1 bg-white border border-[#0A2858] rounded-xs text-center text-sm font-bold"
                      />
                      <span>/ 10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated Improvement Suggestions */}
            <div className="mb-6">
              <h4 className="font-heading font-bold text-sm uppercase text-[#0A2858] mb-2">
                Teacher-Editable Suggestions for Student:
              </h4>
              <div className="space-y-2">
                {suggestions.map((sug, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1867E8]">#{i + 1}</span>
                    <input
                      type="text"
                      value={sug}
                      onChange={(e) => {
                        const updated = [...suggestions];
                        updated[i] = e.target.value;
                        setSuggestions(updated);
                      }}
                      className="flex-1 p-2 bg-white border border-[#0A2858] rounded-xs text-xs font-body text-[#0A2858]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#0A2858] flex justify-end">
              <NeoButton
                variant="primary"
                size="md"
                onClick={handleSendFeedback}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Approve & Send Feedback to Rahul</span>
              </NeoButton>
            </div>
          </NeoCard>
        </div>
      )}

      {/* TAB 3: T08 TEACHER CONTENT ASSISTANT */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <NeoCard variant="default" shadow="md">
            <h3 className="font-heading font-extrabold text-lg text-[#0A2858] mb-4">
              Teacher Lesson & Content Package Generator
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={contentTopic}
                onChange={(e) => setContentTopic(e.target.value)}
                placeholder="Topic name (e.g. Tree Traversal, Graph BFS)..."
                className="flex-1 p-2.5 bg-[#F4F8FF] border-[2px] border-[#0A2858] rounded-sm font-body text-sm font-bold text-[#0A2858]"
              />
              <NeoButton
                variant="primary"
                size="md"
                disabled={loadingContent}
                onClick={handleGenerateContent}
              >
                <Sparkles className="w-4 h-4" />
                <span>{loadingContent ? "Generating Package..." : "Generate Lesson Package"}</span>
              </NeoButton>
            </div>

            {generatedContent && (
              <div className="space-y-4 pt-4 border-t-2 border-[#0A2858]">
                <div className="p-4 bg-[#F4F8FF] border-[1.5px] border-[#0A2858] rounded-sm">
                  <div className="font-heading font-bold text-sm text-[#0A2858] mb-2 uppercase">
                    Lesson Outline
                  </div>
                  <ul className="text-xs font-mono space-y-1 text-[#0A2858]">
                    {generatedContent.outline.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#EAF2FF] border-[1.5px] border-[#0A2858] rounded-sm">
                  <div className="font-heading font-bold text-sm text-[#0A2858] mb-2 uppercase">
                    Worked Examples
                  </div>
                  <ul className="text-xs font-mono space-y-1 text-[#0A2858]">
                    {generatedContent.workedExamples.map((ex, i) => (
                      <li key={i}>• {ex}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#F0FDF4] border-[1.5px] border-[#16A34A] rounded-sm text-xs font-mono text-[#16A34A]">
                  <strong>Quick Revision Summary:</strong> {generatedContent.revisionSheet}
                </div>
              </div>
            )}
          </NeoCard>
        </div>
      )}
        </div>
      )}
    </div>
  );
}
