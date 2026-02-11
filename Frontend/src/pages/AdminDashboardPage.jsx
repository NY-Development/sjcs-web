import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const AdminDashboardPage = () => {
  const { accessToken, user } = useAuthStore();

  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => (await api.get("/teachers")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await api.get("/payments")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: attendance = [] } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => (await api.get("/attendance")).data.data || [],
    enabled: Boolean(accessToken)
  });

  return (
    <div className="flex h-screen overflow-hidden bg-sjcs-gray text-sjcs-textPrimary">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-20 items-center border-b border-slate-100 px-8">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-xl font-bold text-white shadow-sjcs-soft" />
            <div>
              <h1 className="font-bold">SJCS</h1>
              <p className="text-[10px] font-medium uppercase tracking-wider text-sjcs-textSecondary">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Main Menu</p>
          {[
            "Dashboard",
            "Students",
            "Teachers",
            "Classes",
            "Finance",
            "Attendance",
            "Reports"
          ].map((item, index) => (
            <button
              key={item}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-sjcs-blue/10 text-sjcs-blue"
                  : "text-sjcs-textSecondary hover:bg-slate-50 hover:text-sjcs-blue"
              }`}
              type="button"
            >
              <span className="material-icons text-xl">dashboard</span>
              {item}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sjcs-textSecondary hover:bg-red-50 hover:text-sjcs-red" type="button">
            <span className="material-icons text-xl">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <button className="md:hidden" type="button">
            <span className="material-icons">menu</span>
          </button>
          <div className="hidden items-center md:flex md:w-96">
            <span className="material-icons absolute text-slate-400">search</span>
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-sjcs-blue/40"
              placeholder="Search students, teachers, or invoices..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-sjcs-blue/10 hover:text-sjcs-blue" type="button">
              <span className="material-icons">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-sjcs-red" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{user?.firstName || "Sr. Administrator"}</p>
                <p className="text-xs text-sjcs-textSecondary">Super Admin</p>
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
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <p className="mt-1 text-sjcs-textSecondary">
                  Welcome back to Saint Joseph Catholic School Admin Portal.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-sjcs-textSecondary shadow-sm">
                <span className="material-icons text-lg text-sjcs-blue">calendar_today</span>
                Oct 24, 2023 - Fall Semester
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-sjcs-blue">
                    <span className="material-icons">school</span>
                  </div>
                  <span className="flex items-center rounded text-xs font-bold text-emerald-600">
                    +12 <span className="material-icons ml-1 text-[14px]">trending_up</span>
                  </span>
                </div>
                <h3 className="text-sm font-medium text-sjcs-textSecondary">Total Students</h3>
                <p className="mt-1 text-3xl font-bold">{students.length || 1240}</p>
                <p className="mt-2 text-xs text-sjcs-textSecondary">Active enrollment</p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <span className="material-icons">people</span>
                  </div>
                  <span className="flex items-center rounded text-xs font-bold text-slate-500">0</span>
                </div>
                <h3 className="text-sm font-medium text-sjcs-textSecondary">Total Teachers</h3>
                <p className="mt-1 text-3xl font-bold">{teachers.length || 85}</p>
                <p className="mt-2 text-xs text-sjcs-textSecondary">Full-time & Adjunct</p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <span className="material-icons">attach_money</span>
                  </div>
                  <span className="flex items-center rounded text-xs font-bold text-emerald-600">88%</span>
                </div>
                <h3 className="text-sm font-medium text-sjcs-textSecondary">Collection (YTD)</h3>
                <p className="mt-1 text-3xl font-bold">${payments.length ? payments.length * 450 : 450}k</p>
                <p className="mt-2 text-xs text-sjcs-textSecondary">Of $510k projected</p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <span className="material-icons">fact_check</span>
                  </div>
                  <span className="flex items-center rounded text-xs font-bold text-red-500">-2%</span>
                </div>
                <h3 className="text-sm font-medium text-sjcs-textSecondary">Attendance Rate</h3>
                <p className="mt-1 text-3xl font-bold">94.2%</p>
                <p className="mt-2 text-xs text-sjcs-textSecondary">Avg daily attendance</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">Financial Overview</h3>
                      <p className="text-sm text-sjcs-textSecondary">Tuition collection vs Expenses</p>
                    </div>
                    <select className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-sjcs-textSecondary">
                      <option>Last 6 Months</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="flex h-64 items-end justify-between gap-2 px-2">
                    {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((label) => (
                      <div key={label} className="flex w-full flex-col items-center gap-2">
                        <div className="flex h-full w-full items-end gap-1">
                          <div className="h-[70%] w-1/2 rounded-t-sm bg-sjcs-blue/80" />
                          <div className="h-[45%] w-1/2 rounded-t-sm bg-slate-200" />
                        </div>
                        <span className="text-xs text-sjcs-textSecondary">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center gap-6 text-xs text-sjcs-textSecondary">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-sjcs-blue" /> Income
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-200" /> Expenses
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold">Weekly Attendance Trends</h3>
                  <div className="h-48 rounded-lg bg-slate-50 p-4">
                    <div className="h-full w-full rounded-lg border border-dashed border-slate-200" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-sjcs-textSecondary">
                    {["Week 1", "Week 2", "Week 3", "Week 4"].map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Add User", icon: "person_add" },
                      { label: "Reports", icon: "summarize" },
                      { label: "Notify", icon: "campaign" },
                      { label: "Calendar", icon: "event" }
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-sjcs-blue/5 p-4 text-sjcs-blue transition-all hover:bg-sjcs-blue hover:text-white"
                        type="button"
                      >
                        <span className="material-icons text-3xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Activity</h3>
                    <button className="text-xs font-medium text-sjcs-blue" type="button">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {["Tuition Payment", "New Registration", "Broadcast Sent", "Grades Updated"].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100" />
                        <div>
                          <p className="text-sm font-medium">{item}</p>
                          <p className="text-xs text-sjcs-textSecondary">Just now</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-sjcs-blue/10 bg-sjcs-blue/5 p-6">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sjcs-blue/10 text-sjcs-blue">
                    <span className="material-icons">help_outline</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Need help with something?</h3>
                    <p className="text-sm text-sjcs-textSecondary">Quickly access common admin resources.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Contact Teacher", "Add Lunch Money", "Bus Schedule"].map((label) => (
                    <button
                      key={label}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-sjcs-textPrimary"
                      type="button"
                    >
                      <span className="material-icons text-lg text-sjcs-blue">email</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border-t border-slate-200 py-8 text-center text-sm text-sjcs-textSecondary">
              © 2023 Saint Joseph Catholic School. All rights reserved.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
