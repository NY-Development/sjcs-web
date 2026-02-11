import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const topicBreakdown = [
  { label: "Algebra & Functions", value: 92, tone: "primary" },
  { label: "Geometry & Trigonometry", value: 68, tone: "warning" },
  { label: "Statistics & Probability", value: 85, tone: "primary" }
];

const questionsSeed = [
  {
    id: 1,
    prompt: "Solve for x: 2x + 5 = 15",
    difficulty: "Easy",
    status: "Correct",
    answer: "x = 5",
    correctAnswer: null,
    explanation: null
  },
  {
    id: 2,
    prompt: "Calculate the area of a circle with radius 4cm (Use pi = 3.14)",
    difficulty: "Medium",
    status: "Incorrect",
    answer: "25.12 cm2",
    correctAnswer: "50.24 cm2",
    explanation:
      "The formula for the area of a circle is A = pi r^2. Here r = 4, so A = 3.14 x 16 = 50.24 cm2."
  },
  {
    id: 3,
    prompt: "Identify the slope in the equation y = -3x + 7",
    difficulty: "Easy",
    status: "Correct",
    answer: "-3",
    correctAnswer: null,
    explanation: null
  },
  {
    id: 4,
    prompt: "What is the probability of rolling a sum of 7 with two dice?",
    difficulty: "Hard",
    status: "Flagged",
    answer: "1/6",
    correctAnswer: null,
    explanation: null
  }
];

const MockExamResultsPage = () => {
  const { accessToken, user } = useAuthStore();
  const [filter, setFilter] = useState("All");

  const { data: grades = [] } = useQuery({
    queryKey: ["grades"],
    queryFn: async () => (await api.get("/grades")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const performance = useMemo(() => {
    const grade = grades[0];
    if (!grade) {
      return {
        title: "Year 10 Mathematics Mock",
        scorePercent: 82,
        scoreText: "82%",
        scoreLabel: "PASSED",
        correctAnswers: 41,
        totalQuestions: 50,
        timeTaken: "45m 12s"
      };
    }
    const maxScore = grade.maxScore || 100;
    const score = grade.score ?? 82;
    const scorePercent = Math.round((score / maxScore) * 100);
    return {
      title: grade.title || "Year 10 Mathematics Mock",
      scorePercent,
      scoreText: `${scorePercent}%`,
      scoreLabel: scorePercent >= 75 ? "PASSED" : "NEEDS REVIEW",
      correctAnswers: Math.round((scorePercent / 100) * 50),
      totalQuestions: 50,
      timeTaken: "45m 12s"
    };
  }, [grades]);

  const filteredQuestions = useMemo(() => {
    if (filter === "All") return questionsSeed;
    if (filter === "Incorrect") return questionsSeed.filter((item) => item.status === "Incorrect");
    if (filter === "Correct") return questionsSeed.filter((item) => item.status === "Correct");
    return questionsSeed.filter((item) => item.status === "Flagged");
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sjcs-blue/10 p-2">
              <span className="material-icons text-sjcs-blue text-2xl">school</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-slate-900">SJCS</span>
              <span className="text-xs font-medium text-slate-500">Student Portal</span>
            </div>
          </div>
          <div className="hidden items-center space-x-8 sm:flex">
            <button className="text-sm font-medium text-slate-500 hover:text-slate-700" type="button">
              Dashboard
            </button>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-700" type="button">
              My Courses
            </button>
            <button className="border-b-2 border-sjcs-blue text-sm font-medium text-slate-900" type="button">
              Exam Results
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="rounded-full bg-slate-100 p-2 text-slate-500 hover:text-sjcs-blue" type="button">
              <span className="material-icons text-xl">notifications</span>
            </button>
            <div className="flex items-center">
              <img
                alt="Student profile"
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVR0lZ_r4JDBCO6K0IHLTtNOd68sLIlRDZtUZh5KGa8pxDZiUrjfcemfvsIfpvMiaQVhg27GI4Jfe3pKmH24hgZBb7aFCpbPnG1tCplHWkF6z_UlyHoXUiSkwX41bK8Jxjp7nGwQ55lJDY0NLC9fb6WmMgmjbUoA4KWDKXE59zKquDBAZqwPrm4IKBWBPnQVAZLbIJlBDEk3oeesxRNhThr_sBpP4b4CyUDL1j1Pq9MP2yxYBUJYT7A9wgkteiDLgfE0kVhvTisZO"
              />
              <span className="ml-2 hidden text-sm font-medium text-slate-700 md:block">
                {user?.firstName || "Sarah"} Connor
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="mb-4 flex text-sm text-slate-500">
            <span className="hover:text-sjcs-blue">Exams</span>
            <span className="material-icons mx-1 text-base">chevron_right</span>
            <span className="hover:text-sjcs-blue">Mathematics</span>
            <span className="material-icons mx-1 text-base">chevron_right</span>
            <span className="font-medium text-slate-900">Results</span>
          </nav>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{performance.title}</h2>
              <p className="mt-2 flex items-center text-sm text-slate-500">
                <span className="material-icons mr-1 text-base">calendar_today</span>
                Completed on October 24, 2023 at 10:30 AM
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50" type="button">
                <span className="material-icons mr-2 text-base">download</span>
                Download PDF
              </button>
              <button className="inline-flex items-center rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600" type="button">
                <span className="material-icons mr-2 text-base">refresh</span>
                Retake Exam
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className="material-icons text-9xl text-sjcs-blue">emoji_events</span>
            </div>
            <h3 className="mb-4 w-full text-left text-lg font-semibold text-slate-700">Overall Score</h3>
            <div
              className="relative mb-4 flex h-[180px] w-[180px] items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#135bec 0% ${performance.scorePercent}%, #e2e8f0 ${performance.scorePercent}% 100%)`
              }}
            >
              <div className="absolute h-[140px] w-[140px] rounded-full bg-white" />
              <div className="relative z-10 text-center">
                <span className="block text-4xl font-bold text-slate-900">{performance.scoreText}</span>
                <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-600">
                  {performance.scoreLabel}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Great job! You scored higher than <span className="font-bold text-sjcs-blue">76%</span> of your classmates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-start justify-between">
                <div className="rounded-lg bg-sjcs-blue/10 p-2 text-sjcs-blue">
                  <span className="material-icons">timer</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Metrics</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Time Taken</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{performance.timeTaken}</p>
                <p className="mt-1 text-xs text-slate-500">vs 60m allowed</p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-start justify-between">
                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <span className="material-icons">check_circle</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Accuracy</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Correct Answers</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {performance.correctAnswers}
                  <span className="text-lg font-normal text-slate-400"> / {performance.totalQuestions}</span>
                </p>
                <p className="mt-1 flex items-center text-xs text-green-600">
                  <span className="material-icons mr-0.5 text-xs">trending_up</span>
                  +5% vs last mock
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-start justify-between">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                  <span className="material-icons">leaderboard</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Ranking</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Class Rank</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">Top 15%</p>
                <p className="mt-1 text-xs text-slate-500">Out of 124 students</p>
              </div>
            </div>
            <div className="sm:col-span-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Performance by Topic</h3>
              <div className="space-y-4">
                {topicBreakdown.map((topic) => (
                  <div key={topic.label}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm font-medium text-slate-700">{topic.label}</span>
                      <span
                        className={`text-sm font-bold ${
                          topic.tone === "warning" ? "text-yellow-500" : "text-sjcs-blue"
                        }`}
                      >
                        {topic.value}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-2.5 rounded-full ${
                          topic.tone === "warning" ? "bg-yellow-500" : "bg-sjcs-blue"
                        }`}
                        style={{ width: `${topic.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-lg border border-sjcs-blue/20 bg-sjcs-blue/5 p-4">
                <span className="material-icons text-sjcs-blue">lightbulb</span>
                <div>
                  <h4 className="text-sm font-semibold text-sjcs-blue">Instructor's Note</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Excellent work on Algebra! Your understanding of quadratic equations is solid. However, try to
                    revisit the <span className="font-medium text-slate-900">Geometry</span> section, specifically
                    circle theorems, as you missed a few key questions there.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-bold text-slate-900">Question Review</h3>
            <div className="flex self-start rounded-lg bg-slate-100 p-1 sm:self-auto">
              {[
                { key: "All", label: "All" },
                { key: "Incorrect", label: "Incorrect" },
                { key: "Correct", label: "Correct" },
                { key: "Flagged", label: "Flagged" }
              ].map((item) => (
                <button
                  key={item.key}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    filter === item.key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  type="button"
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className={`p-6 transition-colors hover:bg-slate-50 ${
                  question.status === "Incorrect" ? "bg-red-50/30" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      question.status === "Incorrect"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {question.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-base font-medium text-slate-900">{question.prompt}</h4>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div
                        className={`rounded-lg border p-3 ${
                          question.status === "Incorrect"
                            ? "border-red-200 bg-red-50"
                            : "border-green-200 bg-green-50"
                        }`}
                      >
                        <span
                          className={`mb-1 block text-xs font-semibold uppercase ${
                            question.status === "Incorrect" ? "text-red-700" : "text-green-700"
                          }`}
                        >
                          Your Answer
                        </span>
                        <span className="font-medium text-slate-900">{question.answer}</span>
                        <span
                          className={`material-icons ml-2 text-sm align-middle ${
                            question.status === "Incorrect" ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {question.status === "Incorrect" ? "cancel" : "check_circle"}
                        </span>
                      </div>
                      {question.correctAnswer ? (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                          <span className="mb-1 block text-xs font-semibold uppercase text-green-700">
                            Correct Answer
                          </span>
                          <span className="font-medium text-slate-900">{question.correctAnswer}</span>
                        </div>
                      ) : null}
                    </div>
                    {question.explanation ? (
                      <div className="mt-4 border-t border-slate-200 pt-4">
                        <p className="mb-1 text-sm font-semibold text-slate-900">Explanation:</p>
                        <p className="text-sm text-slate-600">{question.explanation}</p>
                      </div>
                    ) : null}
                  </div>
                  <button className="text-slate-400 hover:text-sjcs-blue" type="button">
                    <span className="material-icons">expand_more</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button className="text-sm font-medium text-sjcs-blue hover:text-blue-700" type="button">
              View all 50 questions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MockExamResultsPage;
