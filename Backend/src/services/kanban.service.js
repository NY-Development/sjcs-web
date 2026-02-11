const board = {
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

export const getKanbanBoard = async () => board;
