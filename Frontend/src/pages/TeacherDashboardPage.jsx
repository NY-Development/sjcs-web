import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const TeacherDashboardPage = () => {
  const { accessToken, user } = useAuthStore();

  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: grades = [] } = useQuery({
    queryKey: ["grades"],
    queryFn: async () => (await api.get("/grades")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const pendingGrading = grades.filter((grade) => grade.score === null || grade.score === undefined).length;

  return (
    <div className="flex min-h-screen overflow-hidden bg-sjcs-gray text-sjcs-textPrimary">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div className="flex items-center gap-2">
            <RotatingLogo className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-white font-bold" />
            <span className="text-lg font-bold">SJCS Portal</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {[
              "Dashboard",
              "My Classes",
              "Students",
              "Question Bank",
              "Gradebook",
              "Schedule",
              "Messages"
            ].map((item, index) => (
              <button
                key={item}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-sjcs-blue/10 text-sjcs-blue"
                    : "text-sjcs-textSecondary hover:bg-slate-50 hover:text-sjcs-blue"
                }`}
                type="button"
              >
                <span className="material-icons text-[20px]">dashboard</span>
                {item}
              </button>
            ))}
          </nav>
          <div className="mt-4 px-6 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Settings</p>
            <nav className="space-y-1">
              {["Preferences", "Help & Support"].map((item) => (
                <button
                  key={item}
                  className="flex items-center gap-3 py-2 text-sm text-sjcs-textSecondary hover:text-sjcs-blue"
                  type="button"
                >
                  <span className="material-icons text-[18px]">settings</span>
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <img
              alt="Teacher profile"
              className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW0T-8suJXG3oGKX0JtrFHyc5pwzWvOeAi5Gx7BKlq9oB2spL_uMla_sUcDvxDoZ38Ip1VH_ukY4QANMwN2gIE-lhn8Pb_rbuTZRal4p7PgrqhSxVpL9GBe4cq6vR56rf3pDcByiUBKxtSMZyTzFYvvoSDl_ZphqKXKoNbE9_4JlOHlTCzJJ9RWeKc5gn-L7D2uui4GuH12Hb9gXOc2_0zfawqSqpVXdnHOkM6VttOE1jk5f1w_awodHnuzRoa1FzVszi9du6XcQYd"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.firstName || "Mr. Anderson"}</p>
              <p className="truncate text-xs text-sjcs-textSecondary">Math Dept.</p>
            </div>
            <button className="text-slate-400 hover:text-sjcs-blue" type="button">
              <span className="material-icons text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden" type="button">
              <span className="material-icons">menu</span>
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative hidden sm:block">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-sjcs-blue/40"
                placeholder="Search students, classes..."
                type="text"
              />
            </div>
            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" type="button">
              <span className="material-icons">notifications_none</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-sjcs-red" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, {user?.firstName || "Mr. Anderson"} 👋</h2>
                <p className="mt-1 text-sm text-sjcs-textSecondary">
                  Here's what's happening with your classes today.
                </p>
              </div>
              <div className="hidden text-right text-sm sm:block">
                <p className="font-medium">Wednesday, Oct 24</p>
                <p className="text-xs text-sjcs-textSecondary">Fall Semester 2023</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-sjcs-blue/10 p-3 text-sjcs-blue">
                    <span className="material-icons">class</span>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Active</span>
                </div>
                <h3 className="mb-1 text-sm font-medium text-sjcs-textSecondary">Assigned Classes</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">5</span>
                  <span className="text-sm text-sjcs-textSecondary">Total</span>
                </div>
                <p className="mt-2 text-xs text-sjcs-textSecondary">Mathematics, Physics (Grades 9-11)</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                    <span className="material-icons">assignment_late</span>
                  </div>
                  <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                    Needs Action
                  </span>
                </div>
                <h3 className="mb-1 text-sm font-medium text-sjcs-textSecondary">Pending Grading</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{pendingGrading || 24}</span>
                  <span className="text-sm text-sjcs-textSecondary">Submissions</span>
                </div>
                <p className="mt-2 text-xs text-sjcs-textSecondary">3 Assignments due for review</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-blue-100 p-3 text-sjcs-blue">
                    <span className="material-icons">groups</span>
                  </div>
                  <span className="text-xs text-sjcs-textSecondary">vs Yesterday +2%</span>
                </div>
                <h3 className="mb-1 text-sm font-medium text-sjcs-textSecondary">Today's Attendance</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">92%</span>
                  <span className="text-sm text-sjcs-textSecondary">Present</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-sjcs-blue" style={{ width: "92%" }} />
                </div>
                <p className="mt-2 text-xs text-sjcs-textSecondary">4 Students absent today</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Class Performance</h3>
                    <p className="text-sm text-sjcs-textSecondary">
                      Average grades across recent assessments
                    </p>
                  </div>
                  <select className="rounded-lg bg-slate-50 px-3 py-1.5 text-sm text-sjcs-textSecondary focus:ring-1 focus:ring-sjcs-blue/40">
                    <option>Last 30 Days</option>
                    <option>This Semester</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="flex h-64 items-end justify-between gap-2 px-2">
                  {["9A", "9B", "10A", "10B", "11A"].map((label) => (
                    <div key={label} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-full w-full items-end justify-center gap-1">
                        <div className="w-3 rounded-t-sm bg-sjcs-blue" style={{ height: "80%" }} />
                        <div className="w-3 rounded-t-sm bg-sjcs-blue/30" style={{ height: "65%" }} />
                      </div>
                      <span className="text-xs font-medium text-sjcs-textSecondary">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center gap-6 text-xs text-sjcs-textSecondary">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-sjcs-blue" />
                    Mathematics
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-sjcs-blue/30" />
                    Physics
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-between rounded-lg bg-sjcs-blue px-4 py-4 text-white shadow-sjcs-soft" type="button">
                      <div className="flex items-center gap-3">
                        <div className="rounded bg-white/20 p-1.5">
                          <span className="material-icons text-[20px]">upload_file</span>
                        </div>
                        <span className="font-medium">Upload Material</span>
                      </div>
                      <span className="material-icons text-[18px] opacity-70">arrow_forward</span>
                    </button>
                    <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-4 text-sjcs-textPrimary" type="button">
                      <div className="flex items-center gap-3">
                        <div className="rounded bg-slate-100 p-1.5 text-slate-500">
                          <span className="material-icons text-[20px]">fact_check</span>
                        </div>
                        <span className="font-medium">Take Attendance</span>
                      </div>
                      <span className="material-icons text-[18px] text-slate-400">arrow_forward</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wide">Recent Submissions</h3>
                    <button className="text-xs font-medium text-sjcs-blue" type="button">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {["Sarah Connor", "John Smith", "Emily Martinez"].map((name) => (
                      <div key={name} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-200" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{name}</p>
                          <p className="truncate text-xs text-sjcs-textSecondary">Physics Homework - Module 4</p>
                        </div>
                        <span className="text-xs text-slate-400">2m ago</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-sjcs-gradient p-6 text-white shadow-sjcs-soft">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-white/20 p-3">
                    <span className="material-icons">schedule</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-100">Up Next</p>
                    <h3 className="text-xl font-bold">Physics 101 - Class 10A</h3>
                    <p className="text-sm text-blue-100">Room 302 • 10:30 AM - 11:30 AM</p>
                  </div>
                </div>
                <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-sjcs-blue" type="button">
                  View Lesson Plan
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-sjcs-textSecondary">Quick Stats</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-sjcs-textSecondary">Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-sjcs-textSecondary">Grades Logged</p>
                  <p className="text-2xl font-bold">{grades.length}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-sjcs-textSecondary">Pending Reviews</p>
                  <p className="text-2xl font-bold">{pendingGrading || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboardPage;
