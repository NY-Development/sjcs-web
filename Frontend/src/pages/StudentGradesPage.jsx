import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const gradeToLetter = (score) => {
  if (score >= 97) return "A+";
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 60) return "D";
  return "F";
};

const statusForScore = (score) => {
  if (score >= 70) return { label: "Pass", tone: "bg-sjcs-success/10 text-sjcs-success" };
  if (score >= 60) return { label: "Warning", tone: "bg-sjcs-warning/15 text-sjcs-warning" };
  return { label: "Fail", tone: "bg-sjcs-danger/10 text-sjcs-danger" };
};

const StudentGradesPage = () => {
  const { accessToken, user } = useAuthStore();
  const [term, setTerm] = useState("Fall 2023");
  const [query, setQuery] = useState("");

  const { data: grades = [] } = useQuery({
    queryKey: ["grades", term],
    queryFn: async () => (await api.get("/grades")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const filteredGrades = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return grades.filter((grade) => {
      const subjectName = grade.subject?.name || "Subject";
      const matchesQuery = normalizedQuery
        ? subjectName.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesTerm = grade.term ? grade.term === term : true;
      return matchesQuery && matchesTerm;
    });
  }, [grades, query, term]);

  const gpa = useMemo(() => {
    if (!filteredGrades.length) return 3.85;
    const avg =
      filteredGrades.reduce((sum, grade) => sum + (grade.score || 0), 0) /
      filteredGrades.length;
    return Math.min(4, Number((avg / 25).toFixed(2)));
  }, [filteredGrades]);

  const bestSubject = useMemo(() => {
    if (!filteredGrades.length) return { name: "Physics", score: 98 };
    const sorted = [...filteredGrades].sort((a, b) => (b.score || 0) - (a.score || 0));
    return {
      name: sorted[0]?.subject?.name || "Top Subject",
      score: sorted[0]?.score || 0
    };
  }, [filteredGrades]);

  const attendanceRate = 96;

  return (
    <div className="min-h-screen bg-sjcs-gray font-display text-sjcs-textSecondary">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-xl font-bold text-white shadow-sjcs-soft" />
            <div className="hidden md:block">
              <h1 className="text-sm font-bold uppercase tracking-wider text-sjcs-textPrimary">
                Saint Joseph
              </h1>
              <p className="text-xs text-sjcs-textSecondary">Catholic School</p>
            </div>
          </div>
          <div className="hidden items-center gap-8 sm:flex">
            {["Dashboard", "Grades", "Schedule", "Library"].map((item) => (
              <button
                key={item}
                className={`border-b-2 px-1 pt-1 text-sm font-medium ${
                  item === "Grades"
                    ? "border-sjcs-blue text-sjcs-textPrimary"
                    : "border-transparent text-sjcs-textSecondary hover:text-sjcs-textPrimary"
                }`}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-400 hover:text-slate-500" type="button">
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-sjcs-red"></span>
              <span className="material-icons text-2xl">notifications</span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-sjcs-textPrimary">{user?.firstName || "Marcus Thorne"}</p>
                <p className="text-xs text-sjcs-textSecondary">Grade 11-B</p>
              </div>
              <img
                alt="Student Profile"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-sjcs-blue/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwl-e3v4nVVj9ZubNawE2ZynZ4o3F0iYZm90ws7zCc0vbMt2mALeBE3RwwSmynJe9vmFD_cufpHSNshjgaOBi5UNOU4o6UUDK4kh6B5WlQlocFIWCA9SLrsXiiJfwE12TjJAe6DU-fVQLk71GbXzPiwnHkFrl0WJmV_kLzL3DF_iosRtOG3Dkc-EB47c6l-0gYCcdAahgzgu8plcxbYtIAdwF321rQihmq6RGfdy-OqcFwd3riLjApcdxrJ6dpGcosAsj4xQOgUghK"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <span className="material-icons text-lg text-slate-400">home</span>
                  </li>
                  <li className="text-slate-300">/</li>
                  <li className="text-sm font-medium text-sjcs-textSecondary">Student Portal</li>
                  <li className="text-slate-300">/</li>
                  <li className="text-sm font-medium text-sjcs-blue">Academic Grades</li>
                </ol>
              </nav>
              <h2 className="mt-2 text-2xl font-bold text-sjcs-textPrimary sm:text-3xl">
                My Academic Performance
              </h2>
            </div>
            <button className="inline-flex items-center rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white shadow-sjcs-soft">
              <span className="material-icons mr-2 text-sm">download</span>
              Download Report Card (PDF)
            </button>
          </div>

          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="rounded-lg bg-sjcs-blue/10 p-3">
                    <span className="material-icons text-2xl text-sjcs-blue">school</span>
                  </div>
                  <div className="ml-5 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-sjcs-textSecondary">Current GPA</dt>
                      <dd className="text-2xl font-bold text-sjcs-textPrimary">{gpa}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-sjcs-blue/5 px-5 py-2 text-sm font-medium text-sjcs-blue">
                Top 5% of class
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
                    <span className="material-icons text-2xl">playlist_add_check</span>
                  </div>
                  <div className="ml-5 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-sjcs-textSecondary">Credits Earned</dt>
                      <dd className="text-2xl font-bold text-sjcs-textPrimary">18.5</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-600">
                On track for graduation
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
                    <span className="material-icons text-2xl">star</span>
                  </div>
                  <div className="ml-5 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-sjcs-textSecondary">Best Performance</dt>
                      <dd className="text-2xl font-bold text-sjcs-textPrimary">{bestSubject.name}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 px-5 py-2 text-sm font-medium text-amber-600">
                Score: {bestSubject.score} ({gradeToLetter(bestSubject.score)})
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                    <span className="material-icons text-2xl">event_available</span>
                  </div>
                  <div className="ml-5 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-sjcs-textSecondary">Attendance</dt>
                      <dd className="text-2xl font-bold text-sjcs-textPrimary">{attendanceRate}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 px-5 py-2 text-sm font-medium text-blue-600">Only 2 absences</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-t-xl border border-b-0 border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-sjcs-textPrimary shadow-sm focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              >
                <option>Fall 2023</option>
                <option>Spring 2023</option>
                <option>Fall 2022</option>
              </select>
              <div className="relative">
                <span className="material-icons absolute left-3 top-2.5 text-lg text-slate-400">search</span>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-sjcs-textPrimary shadow-sm focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                  placeholder="Filter by subject..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <button className="text-sm font-medium text-sjcs-blue" type="button" onClick={() => setQuery("")}> 
              Reset Filters
            </button>
          </div>

          <div className="overflow-hidden rounded-b-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Subject",
                      "Midterm",
                      "Final",
                      "Avg",
                      "Grade",
                      "Status",
                      "Teacher Remarks"
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredGrades.length === 0 ? (
                    <tr>
                      <td className="px-6 py-6 text-sm text-sjcs-textSecondary" colSpan={7}>
                        No grades found for this term.
                      </td>
                    </tr>
                  ) : (
                    filteredGrades.map((grade) => {
                      const avg = grade.score || 0;
                      const midterm = Math.max(0, avg - 4);
                      const final = Math.min(100, avg + 4);
                      const status = statusForScore(avg);
                      const letter = gradeToLetter(avg);

                      return (
                        <tr key={grade._id} className="transition-colors hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 font-bold text-sjcs-blue">
                                {(grade.subject?.code || grade.subject?.name || "SUB").slice(0, 3).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-sjcs-textPrimary">
                                  {grade.subject?.name || "Subject"}
                                </div>
                                <div className="text-xs text-sjcs-textSecondary">
                                  {grade.subject?.teacher?.name || "Instructor"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-sjcs-textSecondary">{midterm}</td>
                          <td className="px-6 py-4 text-center text-sm text-sjcs-textSecondary">{final}</td>
                          <td className="px-6 py-4 text-center text-sm font-medium text-sjcs-textPrimary">{avg}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sjcs-blue/10 text-sm font-bold text-sjcs-blue">
                              {letter}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-sjcs-textSecondary">
                            {grade.remark || "Keep up the great work."}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <p className="text-sm text-sjcs-textSecondary">
                Showing 1 to {Math.min(filteredGrades.length, 8)} of {filteredGrades.length} subjects
              </p>
              <div className="flex gap-2">
                <button className="rounded border border-slate-300 px-2 py-1 text-slate-500" type="button">
                  <span className="material-icons text-lg">chevron_left</span>
                </button>
                <button className="rounded border border-slate-300 px-2 py-1 text-slate-500" type="button">
                  <span className="material-icons text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentGradesPage;
