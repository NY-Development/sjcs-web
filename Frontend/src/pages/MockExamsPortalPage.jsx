import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const examSeed = [
  {
    id: "calc-midterm",
    name: "Calculus I Midterm",
    subject: "Mathematics",
    difficulty: "Hard",
    timeLimit: "90 mins",
    status: "Available",
    subtitle: "Section B • Due in 2 days",
    icon: "functions",
    accent: "blue"
  },
  {
    id: "org-chem",
    name: "Organic Chemistry 101",
    subject: "Science",
    difficulty: "Medium",
    timeLimit: "60 mins",
    status: "In Progress",
    subtitle: "Unit 3 Test • Started 15m ago",
    icon: "science",
    accent: "purple"
  },
  {
    id: "modern-history",
    name: "Modern European History",
    subject: "History",
    difficulty: "Easy",
    timeLimit: "45 mins",
    status: "Completed",
    subtitle: "Chapter 5 • Score: 92/100",
    icon: "auto_stories",
    accent: "rose"
  },
  {
    id: "french-grammar",
    name: "French Grammar II",
    subject: "Language",
    difficulty: "Medium",
    timeLimit: "40 mins",
    status: "Available",
    subtitle: "Verb Conjugation • Due tomorrow",
    icon: "translate",
    accent: "teal"
  },
  {
    id: "physics-fundamentals",
    name: "Physics Fundamentals",
    subject: "Physics",
    difficulty: "Hard",
    timeLimit: "120 mins",
    status: "Completed",
    subtitle: "Mechanics • Score: 88/100",
    icon: "psychology",
    accent: "indigo"
  }
];

const difficultyDots = {
  Easy: ["bg-green-500", "bg-slate-300", "bg-slate-300"],
  Medium: ["bg-orange-400", "bg-orange-400", "bg-slate-300"],
  Hard: ["bg-red-500", "bg-red-500", "bg-red-500"]
};

const statusStyles = {
  Available: "bg-green-100 text-green-800",
  "In Progress": "bg-amber-100 text-amber-800",
  Completed: "bg-blue-100 text-blue-800",
  Missed: "bg-red-100 text-red-700"
};

const actionStyles = {
  Available: "bg-gradient-to-r from-red-500 to-sjcs-blue text-white",
  "In Progress": "bg-sjcs-blue text-white",
  Completed: "border border-sjcs-blue text-sjcs-blue",
  Missed: "border border-red-200 text-red-600"
};

const accentStyles = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  rose: "bg-rose-100 text-rose-600",
  teal: "bg-teal-100 text-teal-600",
  indigo: "bg-indigo-100 text-indigo-600"
};

const MockExamsPortalPage = () => {
  const { accessToken, user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("Any Status");

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => (await api.get("/subjects")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const subjectOptions = useMemo(() => {
    const apiSubjects = subjects.map((item) => item.name).filter(Boolean);
    const defaults = ["Mathematics", "Physics", "Chemistry", "English Lit", "History", "Language"];
    return ["All Subjects", ...Array.from(new Set([...apiSubjects, ...defaults]))];
  }, [subjects]);

  const filteredExams = useMemo(() => {
    return examSeed.filter((exam) => {
      const matchesSearch = [exam.name, exam.subject, exam.subtitle]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSubject =
        subjectFilter === "All Subjects" || exam.subject === subjectFilter;
      const matchesStatus = statusFilter === "Any Status" || exam.status === statusFilter;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [search, subjectFilter, statusFilter]);

  const upcomingCount = filteredExams.filter((exam) => exam.status === "Available").length;
  const completedCount = filteredExams.filter((exam) => exam.status === "Completed").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue">
              <span className="material-icons">school</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">SJCS</h1>
              <p className="text-xs font-medium text-slate-500">Saint Joseph Catholic School</p>
            </div>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <button className="text-sm font-medium text-slate-500 hover:text-sjcs-blue" type="button">
              Dashboard
            </button>
            <button className="border-b-2 border-sjcs-blue px-3 py-2 text-sm font-medium text-sjcs-blue" type="button">
              Mock Exams
            </button>
            <button className="text-sm font-medium text-slate-500 hover:text-sjcs-blue" type="button">
              Resources
            </button>
            <button className="text-sm font-medium text-slate-500 hover:text-sjcs-blue" type="button">
              Schedule
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 text-slate-400 hover:text-slate-600" type="button">
              <span className="material-icons">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.firstName || "Alex"} Johnson</p>
                <p className="text-xs text-slate-500">Grade 11</p>
              </div>
              <img
                alt="Student profile"
                className="h-9 w-9 rounded-full border-2 border-sjcs-blue/20 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw7lyliBKOoVS8Fugj3y5t682j6kjAzanwMWDey8bqH6UIfdWdfSLjJGL01tVofFvb0t7mu53SxFCP0FmRExk9IHWoAxcyjVExQ8-J6ZCj94fGbIglndBc5Icqfp1ZzYR6Tmktc9LXOYFomFHNmBcNn1GGosL90FPH1II40cxv3rY8LPK2rA9Dktza00W39yIsWRuQf3FfRIUekxwcp6qY1A2miKHX81i35trM-OPcyKp-12P7lh3ryizgLmdPZn4CXenbdmlFmdGg"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Mock Exams Portal</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Access upcoming practice tests and review past performance. Good luck, {user?.firstName || "Alex"}!
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-32 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase text-slate-500">Upcoming</p>
              <p className="text-2xl font-bold text-sjcs-blue">{upcomingCount}</p>
            </div>
            <div className="w-32 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-emerald-500">{completedCount}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:w-96">
              <span className="material-icons absolute left-3 top-2.5 text-xl text-slate-400">search</span>
              <input
                className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                placeholder="Search exams by name or subject..."
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="flex w-full gap-3 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
              <select
                className="min-w-[140px] rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                value={subjectFilter}
                onChange={(event) => setSubjectFilter(event.target.value)}
              >
                {subjectOptions.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
              <select
                className="min-w-[140px] rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                {["Any Status", "Available", "In Progress", "Completed", "Missed"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <button
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                type="button"
              >
                <span className="material-icons mr-2 text-base">filter_list</span>
                More Filters
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Exam Name",
                    "Subject",
                    "Difficulty",
                    "Time Limit",
                    "Status",
                    "Action"
                  ].map((label, index) => (
                    <th
                      key={label}
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 ${
                        index === 5 ? "text-right" : ""
                      }`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            accentStyles[exam.accent]
                          }`}
                        >
                          <span className="material-icons text-xl">{exam.icon}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-900">{exam.name}</div>
                          <div className="text-xs text-slate-500">{exam.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                        {exam.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {difficultyDots[exam.difficulty].map((dotClass, index) => (
                          <span key={`${exam.id}-dot-${index}`} className={`h-2 w-2 rounded-full ${dotClass}`} />
                        ))}
                        <span className="ml-1 text-sm text-slate-600">{exam.difficulty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{exam.timeLimit}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[exam.status]
                        }`}
                      >
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        className={`rounded-lg px-5 py-2 text-sm font-semibold shadow-sm ${
                          actionStyles[exam.status]
                        }`}
                        type="button"
                      >
                        {exam.status === "Available"
                          ? "Start Exam"
                          : exam.status === "In Progress"
                            ? "Resume"
                            : exam.status === "Completed"
                              ? "Review"
                              : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredExams.length}</span> of{" "}
                <span className="font-medium">24</span> exams
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
                type="button"
              >
                <span className="material-icons text-base">chevron_left</span>
              </button>
              <button className="rounded-lg border border-sjcs-blue bg-sjcs-blue/10 px-4 py-2 text-sm font-medium text-sjcs-blue" type="button">
                1
              </button>
              <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-500 hover:bg-slate-50" type="button">
                2
              </button>
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50" type="button">
                <span className="material-icons text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-sjcs-blue to-blue-700 p-8 text-white shadow-lg">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold">Need extra practice?</h3>
              <p className="mt-2 max-w-lg text-blue-100">
                Check out the new comprehensive study guide for the upcoming Physics Finals. It covers all 5 major units.
              </p>
            </div>
            <button className="rounded-lg bg-white px-6 py-3 font-bold text-sjcs-blue shadow-md hover:bg-blue-50" type="button">
              Download Study Guide
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MockExamsPortalPage;
