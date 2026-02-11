import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const StudentDashboardPage = () => {
  const { accessToken, user } = useAuthStore();

  const { data: grades = [] } = useQuery({
    queryKey: ["grades"],
    queryFn: async () => (await api.get("/grades")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: attendance = [] } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => (await api.get("/attendance")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => (await api.get("/notifications")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const attendanceRate = useMemo(() => {
    if (!attendance.length) return 95;
    const presentCount = attendance.filter((item) => item.status === "Present").length;
    return Math.round((presentCount / attendance.length) * 100);
  }, [attendance]);

  return (
    <div className="flex h-screen overflow-hidden bg-sjcs-gray text-sjcs-textPrimary">
      <aside className="hidden h-full w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-xl bg-sjcs-blue text-xl font-bold text-white shadow-sjcs-soft" />
            <div className="flex flex-col">
              <span className="font-bold text-sjcs-textPrimary">Saint Joseph</span>
              <span className="text-xs text-sjcs-textSecondary">Catholic School</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {["Dashboard", "Courses", "Assignments", "Schedule", "Grades", "Resources"].map((item) => (
            <button
              key={item}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                item === "Dashboard"
                  ? "bg-sjcs-blue/10 text-sjcs-blue"
                  : "text-sjcs-textSecondary hover:bg-slate-50 hover:text-sjcs-textPrimary"
              }`}
              type="button"
            >
              <span className="material-icons text-xl">{item === "Dashboard" ? "dashboard" : "book"}</span>
              {item}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <button
            className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sjcs-textSecondary hover:bg-slate-50 hover:text-sjcs-textPrimary"
            type="button"
          >
            <span className="material-icons text-xl">settings</span>
            Settings
          </button>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <img
              alt="Student profile"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYmxVD407b2c6Q5kW3r13Ye2IXMGmbsUeLGr3xr3qG-WLhU-76SkpJ33DMBUvKMPcWDMQluNbFkGMRw48oZ5CmUSb8mLSEG7yNBXQiXUQlXGsWFyBiW0WYYKgRb2T0sR2Efrb0S4hn108L7-Aim_COTgxgWk7oG3Er3bDDJjT0moDJIOobuRm5IpbIZw3tq6q_HQwRle_xYKnuEoa8dNlGfDcsbFkfulFvyWaozDdOX2WXtHKCsvtUD3XiYeC55Xicq7mBtCWG-J4c"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.firstName || "Alex Johnson"}</p>
              <p className="truncate text-xs text-sjcs-textSecondary">Grade 11 • SJCS</p>
            </div>
            <button className="text-slate-400 hover:text-sjcs-blue" type="button">
              <span className="material-icons text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
          <div className="lg:hidden">
            <button className="text-slate-500" type="button">
              <span className="material-icons">menu</span>
            </button>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName || "Alex"}! 👋</h1>
            <p className="text-sm text-sjcs-textSecondary">Here’s what’s happening in your classes today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden w-64 md:block">
              <span className="material-icons absolute left-3 top-2.5 text-lg text-slate-400">search</span>
              <input
                className="w-full rounded-xl border-none bg-slate-100 py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-sjcs-blue/40"
                placeholder="Search courses, docs..."
                type="text"
              />
            </div>
            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" type="button">
              <span className="material-icons">notifications_none</span>
              {notifications.length ? (
                <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border-2 border-white bg-sjcs-red" />
              ) : null}
            </button>
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" type="button">
              <span className="material-icons">chat_bubble_outline</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue">
                    <span className="material-icons">class</span>
                  </div>
                  <span className="rounded-md bg-sjcs-blue/10 px-2 py-1 text-xs font-bold text-sjcs-blue">Today</span>
                </div>
                <h3 className="mb-1 text-3xl font-bold text-sjcs-textPrimary">4</h3>
                <p className="mb-3 text-sm text-sjcs-textSecondary">Classes Remaining</p>
                <button className="flex items-center gap-1 text-sm font-semibold text-sjcs-blue" type="button">
                  View Schedule
                  <span className="material-icons text-xs">arrow_forward</span>
                </button>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-success/10 text-sjcs-success">
                    <span className="material-icons">check_circle</span>
                  </div>
                  <span className="text-xs font-bold text-sjcs-success">+2%</span>
                </div>
                <h3 className="mb-1 text-3xl font-bold">{attendanceRate}%</h3>
                <p className="mb-3 text-sm text-sjcs-textSecondary">Overall Attendance</p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sjcs-success" style={{ width: `${attendanceRate}%` }} />
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <span className="material-icons">school</span>
                  </div>
                  <span className="text-xs font-bold text-purple-600">+0.2</span>
                </div>
                <h3 className="mb-1 text-3xl font-bold">3.8</h3>
                <p className="mb-3 text-sm text-sjcs-textSecondary">Current GPA</p>
                <p className="text-xs text-sjcs-textSecondary">Top 10% of class</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <span className="material-icons">access_time</span>
                  </div>
                  <span className="text-xs text-sjcs-textSecondary">This Week</span>
                </div>
                <div className="mb-1 flex items-end justify-between">
                  <h3 className="text-3xl font-bold">12h</h3>
                  <span className="text-sm text-sjcs-textSecondary">/ 15h Goal</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: "80%" }} />
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Academic Trends</h2>
                      <p className="text-sm text-sjcs-textSecondary">Semester performance overview</p>
                    </div>
                    <select className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-sjcs-textSecondary focus:ring-2 focus:ring-sjcs-blue/40">
                      <option>This Semester</option>
                      <option>Last Semester</option>
                    </select>
                  </div>
                  <div className="relative flex h-64 items-end justify-between gap-2">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="h-px w-full bg-slate-100" />
                      ))}
                    </div>
                    {[
                      { label: "Sep", height: "40%" },
                      { label: "Oct", height: "55%" },
                      { label: "Nov", height: "65%" },
                      { label: "Dec", height: "50%" },
                      { label: "Jan", height: "75%" },
                      { label: "Feb", height: "85%", active: true }
                    ].map((item) => (
                      <div key={item.label} className="relative z-10 flex w-full flex-col items-center gap-2">
                        <div
                          className={`w-full rounded-t-lg ${
                            item.active
                              ? "bg-sjcs-blue/60 shadow-sjcs-soft"
                              : "bg-sjcs-blue/10"
                          } flex items-end justify-center pb-1`}
                          style={{ height: item.height }}
                        >
                          <div className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-white" : "bg-sjcs-blue"}`} />
                        </div>
                        <span className={`text-xs ${item.active ? "font-bold text-sjcs-blue" : "text-sjcs-textSecondary"}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Upcoming Classes</h2>
                    <button className="text-sm font-semibold text-sjcs-blue" type="button">
                      See full schedule
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-xl border border-sjcs-blue/20 bg-sjcs-blue/5 p-4">
                      <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-sjcs-blue/20 bg-white text-sjcs-blue">
                        <span className="text-xs font-bold uppercase">Now</span>
                        <span className="text-lg font-bold">10:00</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Advanced Mathematics</h4>
                        <p className="text-sm text-sjcs-textSecondary">Room 304 • Mr. Anderson</p>
                      </div>
                      <button className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white">
                        Join Class
                      </button>
                    </div>
                    {[
                      { time: "11:30", title: "World History", meta: "Room 102 • Mrs. Davis", eta: "In 1.5 hrs" },
                      { time: "13:00", title: "Physics Lab", meta: "Lab 4 • Dr. Lee" }
                    ].map((item) => (
                      <div
                        key={item.time}
                        className="flex items-center gap-4 rounded-xl border border-transparent bg-slate-50 p-4 transition-colors hover:border-slate-200"
                      >
                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
                          <span className="text-lg font-bold">{item.time}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">{item.title}</h4>
                          <p className="text-sm text-sjcs-textSecondary">{item.meta}</p>
                        </div>
                        {item.eta ? <div className="text-sm text-slate-400">{item.eta}</div> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Notifications</h2>
                    <button className="text-slate-400 hover:text-sjcs-blue" type="button">
                      <span className="material-icons">done_all</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {notifications.length === 0 ? (
                      <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-sjcs-textSecondary">
                        No new notifications.
                      </div>
                    ) : (
                      notifications.slice(0, 4).map((note) => (
                        <div key={note._id} className="flex gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sjcs-blue/10 text-sjcs-blue">
                            <span className="material-icons text-sm">campaign</span>
                          </div>
                          <div className="flex-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                            <p className="text-sm font-semibold">{note.title}</p>
                            <p className="mt-1 text-xs text-sjcs-textSecondary">{note.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-sjcs-gradient p-6 text-white shadow-sjcs-soft">
                  <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
                  <h3 className="relative z-10 mb-2 text-lg font-bold">Study Group Session</h3>
                  <p className="relative z-10 mb-4 text-sm text-blue-100">
                    Join your peers for a collaborative study session in the library.
                  </p>
                  <button className="relative z-10 w-full rounded-lg bg-white py-2 text-sm font-bold text-sjcs-blue">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-sjcs-textSecondary">Quick Stats</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-sjcs-textSecondary">Grades Logged</p>
                  <p className="text-2xl font-bold text-sjcs-textPrimary">{grades.length}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-sjcs-textSecondary">Attendance Records</p>
                  <p className="text-2xl font-bold text-sjcs-textPrimary">{attendance.length}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-sjcs-textSecondary">Notifications</p>
                  <p className="text-2xl font-bold text-sjcs-textPrimary">{notifications.length}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
