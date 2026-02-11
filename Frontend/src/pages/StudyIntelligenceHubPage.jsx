import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const fallbackOverview = {
  greeting: "Good afternoon, Michael",
  focusTime: "4.2h",
  streak: "5 Days",
  productivity: [40, 65, 80, 30, 20, 10, 5],
  tasks: [
    {
      id: "task-1",
      title: "Calculus Quiz Prep",
      meta: "Tomorrow, 9:00 AM • Math",
      priority: "red"
    },
    {
      id: "task-2",
      title: "Read The Great Gatsby Ch. 4",
      meta: "Friday • English",
      priority: "yellow"
    },
    {
      id: "task-3",
      title: "Theology Reflection Paper",
      meta: "Monday • Theology",
      priority: "blue"
    }
  ]
};

const priorityDot = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  blue: "bg-sjcs-blue"
};

const StudyIntelligenceHubPage = () => {
  const { accessToken } = useAuthStore();

  const { data: overview } = useQuery({
    queryKey: ["study-hub"],
    queryFn: async () => (await api.get("/study-hub/overview")).data.data,
    enabled: Boolean(accessToken)
  });

  const data = overview || fallbackOverview;

  const maxProductivity = useMemo(() => Math.max(...data.productivity), [data]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-50 text-slate-800">
      <aside className="fixed z-20 hidden h-screen w-20 flex-col border-r border-slate-200 bg-white lg:static lg:flex lg:w-64">
        <div className="flex h-20 items-center justify-center border-b border-slate-100 lg:justify-start lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-xl font-bold text-white shadow-lg shadow-blue-500/30">
              S
            </div>
            <div className="hidden lg:block">
              <h1 className="font-bold text-slate-900">SJCS</h1>
              <p className="text-xs text-slate-500">Study Hub</p>
            </div>
          </div>
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-3">
          {["Dashboard", "Schedule", "Courses", "Grades", "Messages"].map((item) => (
            <button
              key={item}
              className={`flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                item === "Dashboard"
                  ? "bg-sjcs-blue/10 text-sjcs-blue"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
              type="button"
            >
              <span className="material-icons text-2xl">dashboard</span>
              <span className="hidden lg:block">{item}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-100 p-4">
          <button className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-slate-500 hover:bg-slate-50 hover:text-red-500" type="button">
            <span className="material-icons text-2xl">logout</span>
            <span className="hidden lg:block">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{data.greeting}</h2>
            <p className="text-sm text-slate-500">Ready for a focused study session?</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative rounded-full p-2 text-slate-400 hover:text-sjcs-blue" type="button">
              <span className="material-icons">notifications_none</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <img
                alt="Student profile avatar"
                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa6cani9vz5RjaDg98H-iLTlyJty79-1TuwDSM2ScHcDpVqWaQD9N3Y1ZUGjoIXc5ARcPcGTxd5_qcMlYkFT_FEnH6ThxaG261ZRicbG_WTp7ioRX5-oQU9F4CN3w7p0Hcq4J0YsxjNuz_mR4IRNrO9Tz61XQ1hb3kl-xFmof5DHipmcfLcVhTv4sZ9cCuWbyUXXxQbrAg9azlU593Sj_7NZZCOtEucb_fqCwpjk-QQkza03XxHlSEIrA4y7uAWeMtXi8x18bZhBxG"
              />
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-slate-700">Michael Rivera</p>
                <p className="text-xs text-slate-500">Grade 11</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-8">
                <div className="mb-8">
                  <select className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                    <option>Mathematics</option>
                    <option>Theology IV</option>
                    <option>AP U.S. History</option>
                    <option>Physics</option>
                    <option>English Lit</option>
                  </select>
                </div>
                <div className="select-none text-[8rem] font-light leading-none tracking-tighter text-slate-800">25:00</div>
                <div className="mt-8 flex items-center justify-center gap-6">
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-sjcs-blue" type="button">
                    <span className="material-icons text-2xl">refresh</span>
                  </button>
                  <button className="flex items-center gap-3 rounded-full bg-sjcs-blue px-10 py-4 text-lg font-medium text-white shadow-lg shadow-blue-500/25" type="button">
                    <span className="material-icons text-3xl">play_arrow</span>
                    Start Focus
                  </button>
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-sjcs-blue" type="button">
                    <span className="material-icons text-2xl">settings</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <span className="material-icons text-xl">bolt</span>
                      </span>
                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">+12%</span>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800">{data.focusTime}</h4>
                    <p className="text-xs text-slate-500">Study Time Today</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-lg bg-orange-50 p-2 text-orange-600">
                        <span className="material-icons text-xl">local_fire_department</span>
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800">{data.streak}</h4>
                    <p className="text-xs text-slate-500">Current Streak</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 p-5">
                    <h3 className="font-semibold text-slate-800">Next Up</h3>
                    <button className="text-xs font-medium text-sjcs-blue" type="button">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3 p-4">
                    {data.tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3 rounded-lg border border-transparent p-3 hover:border-slate-100 hover:bg-slate-50">
                        <div className={`mt-1 h-2 w-2 rounded-full ${priorityDot[task.priority]}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{task.title}</p>
                          <p className="text-xs text-slate-500">{task.meta}</p>
                        </div>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-transparent hover:border-sjcs-blue hover:text-sjcs-blue">
                          <span className="material-icons text-sm">check</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Weekly Productivity</h3>
                  <p className="text-sm text-slate-500">Total hours focused per day vs. goal</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-1">
                  <button className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm" type="button">
                    This Week
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium text-slate-500" type="button">
                    Last Week
                  </button>
                </div>
              </div>
              <div className="flex h-48 items-end justify-between gap-2 px-2">
                {data.productivity.map((value, index) => (
                  <div key={`day-${index}`} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end justify-center">
                      <div
                        className={`w-full max-w-[3rem] rounded-t-lg ${
                          index === 2 ? "bg-sjcs-blue" : "bg-sjcs-blue/40"
                        }`}
                        style={{ height: `${(value / maxProductivity) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs ${index === 2 ? "font-bold text-slate-800" : "text-slate-400"}`}>
                      {"MTWTFSS"[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="material-icons text-lg">shield</span> Saint Joseph Catholic School
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyIntelligenceHubPage;
