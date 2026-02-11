import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const fallbackBoard = {
  project: {
    name: "WWII Timeline Project",
    status: "Active",
    dueDate: "Nov 15, 2023",
    visibility: "Teacher Visibility: On",
    progress: 65
  },
  columns: [
    {
      id: "todo",
      title: "To Do",
      color: "bg-slate-400",
      tasks: [
        {
          id: "task-1",
          label: "Research",
          title: "Gather primary sources on Pearl Harbor",
          description:
            "Find at least 3 newspaper clippings and 2 official government documents from 1941.",
          dueDate: "Nov 10",
          assignees: ["Mia"]
        },
        {
          id: "task-2",
          label: "Writing",
          title: "Draft Introduction Section",
          description: "Outline the thesis statement and key points for the timeline narrative.",
          dueDate: "Nov 12",
          assignees: []
        }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-sjcs-blue",
      tasks: [
        {
          id: "task-3",
          label: "Media",
          title: "Create Presentation Slides",
          description: "Design slide deck with visuals and timeline milestones.",
          dueDate: "Nov 11",
          progress: 40,
          assignees: ["Sophia", "Liam"]
        }
      ]
    },
    {
      id: "review",
      title: "Review",
      color: "bg-amber-400",
      tasks: [
        {
          id: "task-4",
          label: "Review",
          title: "Compile citations",
          description: "Verify citations and bibliography formatting.",
          dueDate: "Nov 13",
          assignees: ["Mia"]
        }
      ]
    }
  ]
};

const GroupProjectsKanbanPage = () => {
  const { accessToken } = useAuthStore();

  const { data: boardData } = useQuery({
    queryKey: ["kanban-board"],
    queryFn: async () => (await api.get("/kanban/board")).data.data,
    enabled: Boolean(accessToken)
  });

  const board = boardData || fallbackBoard;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-white font-bold" />
            <span className="text-lg font-bold text-sjcs-blue">SJCS Portal</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 text-sm">
          {[
            { label: "Dashboard", icon: "dashboard" },
            { label: "My Classes", icon: "school" }
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-slate-100"
              type="button"
            >
              <span className="material-icons text-slate-400">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <p className="px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Workspace</p>
          <button className="flex w-full items-center gap-3 rounded-lg bg-sjcs-blue/10 px-3 py-2.5 text-sjcs-blue" type="button">
            <span className="material-icons">view_kanban</span>
            Projects Board
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-slate-100" type="button">
            <span className="material-icons text-slate-400">calendar_today</span>
            Calendar
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-slate-100" type="button">
            <span className="material-icons text-slate-400">chat_bubble_outline</span>
            Chat
            <span className="ml-auto rounded-full bg-sjcs-blue px-2 py-0.5 text-xs text-white">3</span>
          </button>
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <img
              alt="Student profile"
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOXqll0BBFqof7JgZYo8eckdfOWIfNyeh-qKl_oFeJ23JziemsGCqNEdiHt6Q7pQqQJqWq24yZFNUIuEMwYLi5vEvX7FAGEl_637PU8zINHaS3skwJK1TMPIq-H_KTw0dTXFKeIOdpqMOda3DiUr65z06mj9E1Pasia09YetNRT9aEDEg5qamdNSmuXreTIyPTjf6Punz9z6usclzRylgRF9D5XbCVzpkI2lT99ilFi9nfCza0_qwzWno7exBQfYBLUV6An8T3IzOV"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 truncate">Mia Wallace</p>
              <p className="text-xs text-slate-500 truncate">Grade 11 Student</p>
            </div>
            <button className="text-slate-400 hover:text-sjcs-blue" type="button">
              <span className="material-icons">settings</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500" type="button">
              <span className="material-icons">menu</span>
            </button>
            <div className="hidden sm:flex items-center text-sm text-slate-500">
              <span className="hover:text-sjcs-blue cursor-pointer">History 101</span>
              <span className="material-icons text-base mx-2">chevron_right</span>
              <span className="font-medium text-slate-900">{board.project.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-400 hover:text-sjcs-blue" type="button">
              <span className="material-icons">notifications_none</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <button className="hidden items-center gap-2 rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white sm:flex" type="button">
              <span className="material-icons text-lg">add</span>
              New Project
            </button>
          </div>
        </header>

        <section className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                {board.project.name}
                <span className="rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {board.project.status}
                </span>
              </h1>
              <p className="mt-1 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="material-icons text-base">calendar_today</span>Due: {board.project.dueDate}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-icons text-base">visibility</span>
                  {board.project.visibility}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIi4MT4KqotWvNuJuM5fvp_MtSDncfEExXkKuBDvu0HK69XBHmsygMq_JmZ6XnrPHK4SwGnFrT8X6tQAl579woNYm6Zk5YYqBZZ_oNGX8C8pTunD3uuqnAcf1BXPhmLHVAU6r8MFZS5OXILomsF_YKTqVWGgCjRur59B95L_0YsVwW2LuZ7oSYSM2INmAZAQU9Kt4OtcJ2XLiy6r5E-2d8SS4GqHXe6cDjRO8bfrIvUlpOJbRQZ1kzETpV1gblaR30wwINbp4cfYTw",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBI7wet4pdT5CPMl0zvFR79tsOdiwngXkHnwk-QgVZQhAoaQIKDUh7fqALUGVDeXL0dGa3T9xDJZ1B6cgdpkobeck8q1R4p3Sf9zmTspVqAEyGXho6_Lv30uJBSN4qTnI4_iunTxzRGyVrghn8czs16wzHJFtdyAq25pEgpS7Vw6fHb8z2NI_vKvmpItwptI5o-V9BLTRxGCwnY0QspijAZlWrmK87xwC3ZSX5O8xGnz__DbdrmFzA40eLpPnGuBZtQqvKS3_uRCaFg",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAF61hIFsthshGPVdjbB2kWqSErXP31FhRmnDIRKohVz3aLVD9R6pVnOW_qMM9RmlbwhnDv7CHrxLegScuyYe5QU4aO0uNMf7J_vbUxe4sS5i9TQm_iW3ptjj2MPF1MRstbio3LhQC6F_q85Qrhmz41Ic-pSgg_FStN0TUKYwaj5mqQ8DcvPU8dxZTfpMSARLVDWVWOmC7pz4pQGR6Q1RgxX4169oa2tTrGTgcNMp4Fp6Tp4Dwla1IhzD8YgM5q9Ki1KXj9wrGGHKQJ"
                ].map((src) => (
                  <img key={src} alt="Team member" className="h-8 w-8 rounded-full border-2 border-white" src={src} />
                ))}
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sjcs-blue/10 text-xs font-bold text-sjcs-blue">
                  +2
                </button>
              </div>
              <div className="hidden lg:block w-32">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-bold text-sjcs-blue">{board.project.progress}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-sjcs-blue" style={{ width: `${board.project.progress}%` }} />
                </div>
              </div>
              <button className="rounded-lg bg-sjcs-blue/10 p-2 text-sjcs-blue" type="button">
                <span className="material-icons">more_horiz</span>
              </button>
            </div>
          </div>
        </section>

        <section className="flex-1 overflow-x-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="flex min-w-[1000px] gap-6">
            {board.columns.map((column) => (
              <div key={column.id} className="flex min-w-[320px] flex-1 flex-col">
                <div className="mb-4 flex items-center justify-between px-1">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className={`h-3 w-3 rounded-full ${column.color}`} />
                    {column.title}
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
                      {column.tasks.length}
                    </span>
                  </h3>
                  <button className="text-slate-400 hover:text-sjcs-blue" type="button">
                    <span className="material-icons text-lg">add</span>
                  </button>
                </div>
                <div className="flex-1 space-y-3 rounded-xl border border-dashed border-slate-200 bg-white/60 p-3">
                  {column.tasks.map((task) => (
                    <div key={task.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                          {task.label}
                        </span>
                        <button className="text-slate-300 hover:text-slate-500" type="button">
                          <span className="material-icons text-base">more_horiz</span>
                        </button>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800">{task.title}</h4>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">{task.description}</p>
                      {task.progress ? (
                        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                          <div className="h-1.5 rounded-full bg-sjcs-blue" style={{ width: `${task.progress}%` }} />
                        </div>
                      ) : null}
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          {task.assignees.length ? (
                            <div className="flex -space-x-2">
                              {task.assignees.map((assignee) => (
                                <div
                                  key={assignee}
                                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white bg-slate-200 text-[10px] font-bold text-slate-600"
                                >
                                  {assignee[0]}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white bg-slate-100 text-[10px] font-bold text-slate-500">
                              ?
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-amber-600">
                          <span className="material-icons text-[14px]">schedule</span>
                          {task.dueDate}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 py-2 text-sm text-slate-400 hover:border-sjcs-blue hover:text-sjcs-blue" type="button">
                    <span className="material-icons text-lg">add</span>
                    Add Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GroupProjectsKanbanPage;
