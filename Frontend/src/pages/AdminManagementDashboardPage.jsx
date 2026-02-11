import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const fallbackDashboard = {
  dateLabel: "Oct 24, 2023 - Fall Semester",
  kpis: {
    students: { total: 1240, delta: "+12" },
    teachers: { total: 85, delta: "0" },
    collection: { collected: 450000, target: 510000 },
    attendanceRate: 94.2
  },
  financeByMonth: [
    { month: "May", income: 60, expenses: 45 },
    { month: "Jun", income: 75, expenses: 50 },
    { month: "Jul", income: 40, expenses: 45 },
    { month: "Aug", income: 90, expenses: 55 },
    { month: "Sep", income: 85, expenses: 60 },
    { month: "Oct", income: 65, expenses: 55 }
  ],
  attendanceTrend: [35, 32, 25, 15, 20, 10],
  recentActivity: [
    {
      id: "activity-1",
      icon: "attach_money",
      title: "Tuition Payment",
      detail: "Student Michael B. paid $1,200",
      time: "2 mins ago",
      tone: "emerald"
    },
    {
      id: "activity-2",
      icon: "assignment_ind",
      title: "New Registration",
      detail: "New student Sarah J. added to Grade 5",
      time: "1 hour ago",
      tone: "blue"
    },
    {
      id: "activity-3",
      icon: "notifications_active",
      title: "Broadcast Sent",
      detail: "School closed on Friday alert sent",
      time: "3 hours ago",
      tone: "amber"
    },
    {
      id: "activity-4",
      icon: "grade",
      title: "Grades Updated",
      detail: "Mr. Anderson updated Math 101",
      time: "5 hours ago",
      tone: "purple"
    }
  ]
};

const activityTone = {
  emerald: "bg-emerald-100 text-emerald-600",
  blue: "bg-blue-100 text-sjcs-blue",
  amber: "bg-amber-100 text-amber-600",
  purple: "bg-purple-100 text-purple-600"
};

const AdminManagementDashboardPage = () => {
  const { accessToken } = useAuthStore();

  const { data: dashboardData } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => (await api.get("/admin/dashboard")).data.data,
    enabled: Boolean(accessToken)
  });

  const dashboard = dashboardData || fallbackDashboard;
  const collectionPercent = useMemo(() => {
    const { collected, target } = dashboard.kpis.collection;
    if (!target) return 0;
    return Math.round((collected / target) * 100);
  }, [dashboard]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-20 items-center border-b border-slate-100 px-8">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-xl font-bold text-white shadow-lg shadow-blue-500/30" />
            <div>
              <h1 className="font-bold text-slate-900">SJCS</h1>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Main Menu</p>
          {["Dashboard", "Students", "Teachers", "Classes"].map((item) => (
            <button
              key={item}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                item === "Dashboard"
                  ? "bg-sjcs-blue/10 text-sjcs-blue"
                  : "text-slate-600 hover:bg-slate-50 hover:text-sjcs-blue"
              }`}
              type="button"
            >
              <span className="material-icons text-xl">{item === "Dashboard" ? "dashboard" : "school"}</span>
              {item}
            </button>
          ))}
          <p className="mb-2 mt-6 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Finance & Ops
          </p>
          {["Finance", "Attendance", "Reports"].map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-sjcs-blue"
              type="button"
            >
              <span className="material-icons text-xl">{item === "Finance" ? "payments" : "analytics"}</span>
              {item}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600" type="button">
            <span className="material-icons text-xl">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" type="button">
            <span className="material-icons">menu</span>
          </button>
          <div className="relative hidden w-96 md:flex">
            <span className="material-icons absolute left-3 text-slate-400">search</span>
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sjcs-blue/50"
              placeholder="Search students, teachers, or invoices..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-sjcs-blue/10 hover:text-sjcs-blue" type="button">
              <span className="material-icons">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-900">Sr. Administrator</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <img
                alt="Admin profile"
                className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfyLSsiO8rBo_GyApEM1UunVox6CcAOOyL5hl35NEqfJptX2qkCBm6RKO4xFIT4GUn6AHAJiAXfEX5KVp9BcdQbu-NGE1VUIezJjcGb-uPbgcPXqkHLZwl4L5brE6VZXoZegC2qxCuT_hspyDKKsQNIKAhFwW0W-P1P_czAG3ThEntyYBMD5itaWS-cwz5BIeeNq_yrArRpCY4Qed_SHRJL3oANr1wf5wLt9UAal4qXoeEPQxdGHazgF-rTfw55bv8ieyd_7DPdrjj"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                <p className="mt-1 text-slate-500">Welcome back to Saint Joseph Catholic School Admin Portal.</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <span className="material-icons text-lg text-sjcs-blue">calendar_today</span>
                <span>{dashboard.dateLabel}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-sjcs-blue">
                    <span className="material-icons">school</span>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                    {dashboard.kpis.students.delta}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Total Students</h3>
                <p className="mt-1 text-3xl font-bold text-slate-900">{dashboard.kpis.students.total.toLocaleString()}</p>
                <p className="mt-2 text-xs text-slate-400">Active enrollment</p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <span className="material-icons">people</span>
                  </div>
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">
                    {dashboard.kpis.teachers.delta}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Total Teachers</h3>
                <p className="mt-1 text-3xl font-bold text-slate-900">{dashboard.kpis.teachers.total}</p>
                <p className="mt-2 text-xs text-slate-400">Full-time & Adjunct</p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <span className="material-icons">attach_money</span>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                    {collectionPercent}%
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Collection (YTD)</h3>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  ${Math.round(dashboard.kpis.collection.collected / 1000)}k
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Of ${Math.round(dashboard.kpis.collection.target / 1000)}k projected
                </p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <span className="material-icons">fact_check</span>
                  </div>
                  <span className="rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-500">-2%</span>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Attendance Rate</h3>
                <p className="mt-1 text-3xl font-bold text-slate-900">{dashboard.kpis.attendanceRate}%</p>
                <p className="mt-2 text-xs text-slate-400">Avg daily attendance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Financial Overview</h3>
                      <p className="text-sm text-slate-500">Tuition collection vs Expenses (2023-2024)</p>
                    </div>
                    <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      <option>Last 6 Months</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="flex h-64 items-end justify-between gap-2 px-2">
                    {dashboard.financeByMonth.map((item) => (
                      <div key={item.month} className="flex w-full flex-col items-center gap-2">
                        <div className="flex h-full w-full items-end gap-1">
                          <div className="w-1/2 rounded-t-sm bg-sjcs-blue/80" style={{ height: `${item.income}%` }} />
                          <div className="w-1/2 rounded-t-sm bg-slate-200" style={{ height: `${item.expenses}%` }} />
                        </div>
                        <span className="text-xs font-medium text-slate-400">{item.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-sjcs-blue" />
                      Income
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-200" />
                      Expenses
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Weekly Attendance Trends</h3>
                  <div className="relative h-48 overflow-hidden rounded-lg bg-slate-50 p-4">
                    <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path
                        d="M0,35 Q10,30 20,32 T40,25 T60,15 T80,20 T100,10 V40 H0 Z"
                        fill="rgba(19, 91, 236, 0.15)"
                        stroke="none"
                      />
                      <path
                        d="M0,35 Q10,30 20,32 T40,25 T60,15 T80,20 T100,10"
                        fill="none"
                        stroke="#135bec"
                        strokeWidth="0.8"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    {dashboard.attendanceTrend.map((_, index) => (
                      <span key={`week-${index}`}>Week {index + 1}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Add User", icon: "person_add" },
                      { label: "Reports", icon: "summarize" },
                      { label: "Notify", icon: "campaign" },
                      { label: "Calendar", icon: "event" }
                    ].map((item, index) => (
                      <button
                        key={item.label}
                        className={`flex flex-col items-center justify-center gap-3 rounded-xl p-4 text-sm font-medium transition-all ${
                          index === 0
                            ? "bg-sjcs-blue/10 text-sjcs-blue hover:bg-sjcs-blue hover:text-white"
                            : "bg-slate-50 text-slate-600 hover:bg-sjcs-blue hover:text-white"
                        }`}
                        type="button"
                      >
                        <span className="material-icons text-3xl">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                    <button className="text-xs font-medium text-sjcs-blue" type="button">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {dashboard.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activityTone[activity.tone]}`}>
                          <span className="material-icons text-sm">{activity.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                          <p className="text-xs text-slate-500">{activity.detail}</p>
                          <p className="mt-1 text-[10px] text-slate-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminManagementDashboardPage;
