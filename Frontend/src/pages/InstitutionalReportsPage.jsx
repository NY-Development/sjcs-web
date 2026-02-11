import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const fallbackSummary = {
  enrollment: 1240,
  enrollmentDelta: 5.2,
  averageGpa: 3.42,
  tuitionCollected: 4200000,
  tuitionProgress: 98,
  facultyAttendance: 96.5,
  facultyDelta: -1.2,
  enrollmentHistory: [
    { year: "2019", value: 1050 },
    { year: "2020", value: 1120 },
    { year: "2021", value: 980 },
    { year: "2022", value: 1180 },
    { year: "2023", value: 1240 }
  ],
  departmentDistribution: [
    { label: "Science & Math", value: 42, tone: "bg-sjcs-blue" },
    { label: "Humanities & Arts", value: 35, tone: "bg-indigo-400" },
    { label: "Physical Ed", value: 15, tone: "bg-emerald-400" },
    { label: "Other", value: 8, tone: "bg-amber-400" }
  ]
};

const fallbackReports = [
  {
    id: "rep-1",
    name: "Annual Financial Summary 2023",
    category: "Financial",
    generatedAt: "Oct 24, 2023",
    author: "Finance Dept",
    status: "Ready",
    icon: "picture_as_pdf",
    tone: "red"
  },
  {
    id: "rep-2",
    name: "Class Performance Ranking - Senior High",
    category: "Academic",
    generatedAt: "Oct 20, 2023",
    author: "Academic Office",
    status: "Ready",
    icon: "description",
    tone: "blue"
  },
  {
    id: "rep-3",
    name: "Faculty Attendance Review",
    category: "HR",
    generatedAt: "Oct 18, 2023",
    author: "HR Dept",
    status: "Pending",
    icon: "assignment",
    tone: "amber"
  }
];

const toneClass = {
  red: "bg-red-50 text-red-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600"
};

const InstitutionalReportsPage = () => {
  const { accessToken } = useAuthStore();

  const { data: summary } = useQuery({
    queryKey: ["reports-summary"],
    queryFn: async () => (await api.get("/reports/summary")).data.data,
    enabled: Boolean(accessToken)
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["reports-list"],
    queryFn: async () => (await api.get("/reports/list")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const reportSummary = summary || fallbackSummary;
  const reportRows = reports.length ? reports : fallbackReports;

  const tuitionFormatted = useMemo(
    () => `$${(reportSummary.tuitionCollected / 1000000).toFixed(1)}M`,
    [reportSummary]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-600">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-slate-100 px-6">
          <div className="flex items-center gap-2 text-sjcs-blue">
            <RotatingLogo className="h-6 w-6 text-sjcs-blue" />
            <span className="text-xl font-bold text-slate-900">SJCS Admin</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {["Dashboard", "Students", "Faculty"].map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-sjcs-blue/5 hover:text-sjcs-blue"
              type="button"
            >
              <span className="material-icons text-xl">dashboard</span>
              {item}
            </button>
          ))}
          <p className="px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Analytics</p>
          <button className="flex w-full items-center gap-3 rounded-lg bg-sjcs-blue px-3 py-2.5 text-sm font-medium text-white" type="button">
            <span className="material-icons text-xl">analytics</span>
            Reports & Data
          </button>
          {["Finance", "Settings"].map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-sjcs-blue/5 hover:text-sjcs-blue"
              type="button"
            >
              <span className="material-icons text-xl">attach_money</span>
              {item}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="h-9 w-9 rounded-full border border-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFAG88LzRqiaqCZk2tham7Y4wIddkdtUeKm4yHKbfOpiqBu5n3fExO9s_wizDI_jIEbraUp6mfADHYs5bguAL7-7JhW0HPJ8-7Fltth_Fhevh3GzIRz5gkSvvb4mUudJjZPYReJtosbvxKM8nnPp8xvtv5wlasrGXwzv8LrXaDI7kVA9YiC21uAcKagN-yJ9IlTMvMyIicdQbiZcxPNXQKC-6CjHuwb7SXw68xV4RG305fOgrR3eqPd-ZKMWX3V_SOY3_5I5_IAL_0"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">Sr. Mary Agnes</p>
              <p className="truncate text-xs text-slate-500">Principal Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
          <div>
            <nav className="mb-1 flex text-xs text-slate-500">
              <span className="hover:text-sjcs-blue">Home</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="hover:text-sjcs-blue">Analytics</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="font-medium text-sjcs-blue">Reports</span>
            </nav>
            <h1 className="text-lg font-bold text-slate-800">Institutional Reports & Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <option>Academic Year 2023-2024</option>
              <option>Fall Semester 2023</option>
              <option>Spring Semester 2024</option>
            </select>
            <button className="flex items-center gap-2 rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/20" type="button">
              <span className="material-icons text-lg">add_chart</span>
              Generate Custom Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Enrollment</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-800">{reportSummary.enrollment.toLocaleString()}</h3>
                </div>
                <div className="rounded-lg bg-sjcs-blue/10 p-2 text-sjcs-blue">
                  <span className="material-icons text-xl">groups</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2 inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-600">
                  <span className="material-icons mr-0.5 text-sm">trending_up</span>
                  {reportSummary.enrollmentDelta}%
                </span>
                <span className="text-slate-400">vs last year</span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Average GPA</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-800">{reportSummary.averageGpa}</h3>
                </div>
                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                  <span className="material-icons text-xl">school</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2 inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">
                  <span className="material-icons mr-0.5 text-sm">remove</span>
                  0.0%
                </span>
                <span className="text-slate-400">Stable</span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Tuition Collected</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-800">{tuitionFormatted}</h3>
                </div>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <span className="material-icons text-xl">payments</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2 inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-600">
                  <span className="material-icons mr-0.5 text-sm">check_circle</span>
                  {reportSummary.tuitionProgress}%
                </span>
                <span className="text-slate-400">of target</span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-emerald-500"
                  style={{ width: `${reportSummary.tuitionProgress}%` }}
                />
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Faculty Attendance</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-800">{reportSummary.facultyAttendance}%</h3>
                </div>
                <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                  <span className="material-icons text-xl">event_available</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2 inline-flex items-center rounded bg-rose-50 px-1.5 py-0.5 text-rose-600">
                  <span className="material-icons mr-0.5 text-sm">trending_down</span>
                  {Math.abs(reportSummary.facultyDelta)}%
                </span>
                <span className="text-slate-400">vs last month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-bold text-slate-800">5-Year Enrollment History</h2>
                <button className="text-sm font-medium text-sjcs-blue" type="button">
                  View Full Report
                </button>
              </div>
              <div className="relative flex h-64 items-end justify-between gap-4 px-4">
                {reportSummary.enrollmentHistory.map((item) => (
                  <div key={item.year} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`w-full max-w-[60px] rounded-t-md ${
                        item.year === "2023" ? "bg-sjcs-blue shadow-lg shadow-blue-500/30" : "bg-sjcs-blue/20"
                      }`}
                      style={{ height: `${item.value / 6}%` }}
                    />
                    <span className={`text-xs ${item.year === "2023" ? "font-bold text-sjcs-blue" : "text-slate-500"}`}>
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-bold text-slate-800">Department Dist.</h2>
              <div className="space-y-4">
                {reportSummary.departmentDistribution.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-slate-600">{item.label}</span>
                      <span className="font-bold text-slate-800">{item.value}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                <div className="flex gap-2">
                  <span className="material-icons text-base text-sjcs-blue">info</span>
                  <p>
                    STEM enrollment has increased by <span className="font-bold text-sjcs-blue">12%</span> over the last
                    2 years.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-800">Generated Reports</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <span className="material-icons absolute left-3 top-2.5 text-lg text-slate-400">search</span>
                  <input className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm" placeholder="Search reports..." />
                </div>
                <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <option>All Types</option>
                  <option>Academic</option>
                  <option>Financial</option>
                  <option>HR</option>
                </select>
                <button className="rounded-lg border border-slate-200 p-2 text-slate-500" type="button">
                  <span className="material-icons">filter_list</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Report Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Generated Date</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportRows.map((report) => (
                    <tr key={report.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-lg p-2 ${toneClass[report.tone]}`}>
                            <span className="material-icons text-lg">{report.icon}</span>
                          </div>
                          {report.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{report.generatedAt}</td>
                      <td className="px-6 py-4 text-slate-500">{report.author}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded p-1.5 text-slate-500 hover:bg-slate-100" type="button">
                            <span className="material-icons text-lg">visibility</span>
                          </button>
                          <button className="rounded p-1.5 text-slate-500 hover:bg-slate-100" type="button">
                            <span className="material-icons text-lg">download</span>
                          </button>
                          <button className="rounded p-1.5 text-slate-500 hover:bg-slate-100" type="button">
                            <span className="material-icons text-lg">share</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstitutionalReportsPage;
