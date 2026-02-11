import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const materialsSeed = [
  {
    id: "alg2",
    title: "Introduction to Algebra II",
    subject: "Mathematics",
    type: "E-Books",
    author: "Mr. J. Anderson",
    size: "2.4 MB",
    date: "Oct 24",
    format: "PDF",
    accent: "blue",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBQAhM4d2HrPuZNs-2CFtKvkVIKCJuvI8459jR0eXlgPTAeQsnnVsRdQAgG88lwSA-CqRyTsowuJbra4K2ShwcPwMsU087QJl0nXzTEtCUoj9X6sCkc3oHGllE69Er6QFJqgYPQO8Z2pdsvm5c8jjbfbcjaPp4zugTQpuK5XP08EjnN7Z3vMjEuwWYVC0uSEnJPz-YniLwasNpG8DN4IWbafBCBcp_xxKV8eCl1WWnauYDGtSuzRXt0Z0G2fxADZV33IV1u7GRLY14"
  },
  {
    id: "chem",
    title: "Periodic Table Worksheet",
    subject: "Science",
    type: "Worksheets",
    author: "Mrs. S. Connor",
    size: "145 KB",
    date: "Oct 22",
    format: "DOCX",
    accent: "green",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI85dab8jHVMRSv_SCNnkLxXfjntdCUGNmryRwaZMWKYjTl6_K94zBOHxi5xWJ8GUF9D7Dbcx5RHTiIRCzyclAkb4FdAoQZpyxMtCYpcPuxe-Sio7yzzB2KaDf36mSr1MUyP_pSa1quEJlOw8jTR3BoRTgTlzxWLYFm_poxWjcKgiNG5rCAjaKwP9QCtR-Gk7R0Psb2XtcvnP6Dcu3NSiqSRwgMitEmlFzSU0r9t3q_TLE1pm14umbb-1LCHrdJT8rnOKFhN6PJpgu"
  },
  {
    id: "history",
    title: "World War II Timeline",
    subject: "History",
    type: "E-Books",
    author: "Mr. D. Williams",
    size: "3.1 MB",
    date: "Oct 20",
    format: "PDF",
    accent: "purple",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN2CXtjQn9gTbdwq3EPM3KZMxrUmejj6k-tcIgRhl40q9FKQVv9JcRbZghNjy5UxOWD5JBMBNiC8kXfTdxSo4Fz3NaRlUu1wFeVygYWHzkwi6vgsy727kSAE-AFrwlyZJSgG-GiM09dVpCpLHfhAhXcw3CVMUBURgO-WejK7FZGgsOvhMrUC-TcsTHBpldZcFTcE6hYa1A5tdJbh49MPqeKdBpjVEEd8apqKjZEfisJ89izuoMLbMC4LaquDHv-83u6-VbzaQOMBGu"
  },
  {
    id: "hamlet",
    title: "Shakespeare: Hamlet Analysis",
    subject: "English",
    type: "E-Books",
    author: "Ms. K. Johnson",
    size: "1.2 MB",
    date: "Oct 18",
    format: "EPUB",
    accent: "orange",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrZlZN9oOn5QmcpiGEt5ux3xNWO57ltMrYQPacoZtcbTQsUbgCjI1SL0ZRf2zo2wb22vygL0hoThDqB1B5X-GCHAu3rLHiyL3tguHc17OHiZiXSm18AXKy2rddUPKPr9cAVYutGrRON6COa6qT77hcGyn-q8Z65acMFA35Oqz-xcPfQ2J2WGgoOQmgsJ5VeXq4cB_CKhOv4de-Ky_iYlKp6cE_P7UBGyNIAA49sQd-PciF6wTFsfmQlH7NvgBTBlNn9IZuaIoECspJ"
  },
  {
    id: "saint-joseph",
    title: "History of Saint Joseph",
    subject: "Religion",
    type: "E-Books",
    author: "Fr. M. Thompson",
    size: "890 KB",
    date: "Oct 15",
    format: "PDF",
    accent: "red",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZa4OGiR-Q9t-6VMfzSlte-BvAUASLZPjrGnDwH0KFrrA5cM3XGJjRJcgPgNVunFg179wBP1Wa5l9fFiOEaHp0XXVdpF0TmHZ4DOUQZPUm7UwBOUR-erVfxlj_IS3vgXSgt4oBUXDXSY0MnJy9sYLw1vCAR8yoqTPb8SVvlolETDAv6qHmtLv2reMG5Vga8GlVSOCBTOsIV_aO9PEziAlDYalN6xSF_Zt4iaaq24d0hYfoWHxrLYJlMpzoVvMfGhfuxJxaMwYWzOZz"
  },
  {
    id: "question-bank",
    title: "Grade 8 Final Exam Prep",
    subject: "Question Bank",
    type: "Question Bank",
    author: "Exam Committee",
    size: "5.6 MB",
    date: "Oct 10",
    format: "ZIP",
    accent: "indigo",
    cover: null
  }
];

const subjectBadge = {
  Mathematics: "bg-blue-100 text-blue-800",
  Science: "bg-green-100 text-green-800",
  History: "bg-purple-100 text-purple-800",
  English: "bg-orange-100 text-orange-800",
  Religion: "bg-red-100 text-red-800",
  "Question Bank": "bg-indigo-100 text-indigo-800"
};

const typeFilters = ["All Materials", "E-Books", "Worksheets", "Question Bank"];

const LearningMaterialsLibraryPage = () => {
  const { accessToken } = useAuthStore();
  const [viewMode, setViewMode] = useState("Grid");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Materials");

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => (await api.get("/subjects")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => (await api.get("/teachers")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const filteredMaterials = useMemo(() => {
    return materialsSeed.filter((material) => {
      const matchesSearch = [material.title, material.subject, material.author]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter === "All Materials" || material.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-white text-lg font-bold">
              SJ
            </div>
            <span className="hidden text-lg font-semibold tracking-tight md:block">SJCS Resource Hub</span>
          </div>
          <div className="flex-1 px-4 lg:px-12">
            <div className="relative">
              <span className="material-icons-outlined absolute left-3 top-2.5 text-slate-400">search</span>
              <input
                className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                placeholder="Search by title, author, or topic..."
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" type="button">
              <span className="material-icons-outlined">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden text-right sm:block">
                <div className="text-sm font-medium">Mrs. Sarah Connor</div>
                <div className="text-xs text-slate-500">Head of Science</div>
              </div>
              <img
                alt="Profile"
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdQOkmvDrbJqr5vREmhOVzdWOlnXFO8dYE8ab0bNjZjYK4ryxvEgUaJAU3sU4j1QHfhQgJ6x7qE3xTg02lJxj4mK_ppMuFDS6dTQOZaVlPyAspusdY7Z1nj08M5E6xDcsXzEUYbjc3UHXjJbUxAYhaHV-vygmJb_mh26Fdzoc6EihbqftVjuo7eSNKTpF3NXx-kmGuUdk1ZoyU8YFmm5Ap-HaHw7XJ1skXH-_At_grCy0ZxEewwix-_K-gtJdQBYgXv6n_DteuXZvy"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full space-y-8 lg:w-64">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Resource Type</h3>
            <div className="space-y-2">
              {typeFilters.map((type) => (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 ${
                    typeFilter === type ? "bg-sjcs-blue/10 text-sjcs-blue" : "hover:bg-slate-100"
                  }`}
                >
                  <input
                    className="h-4 w-4 text-sjcs-blue"
                    type="radio"
                    name="resource_type"
                    checked={typeFilter === type}
                    onChange={() => setTypeFilter(type)}
                  />
                  <span className="text-sm font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Grade Level</h3>
            <div className="space-y-2">
              {["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Senior High"].map((grade, index) => (
                <label key={grade} className="flex items-center gap-3 text-sm text-slate-600">
                  <input className="h-4 w-4 rounded border-slate-300 text-sjcs-blue" type="checkbox" defaultChecked={index === 1} />
                  <span>{grade}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</h3>
            <div className="space-y-2">
              {[
                { label: "Mathematics", count: 124, tone: "bg-blue-500" },
                { label: "Science", count: 85, tone: "bg-green-500" },
                { label: "English", count: 62, tone: "bg-orange-500" },
                { label: "History", count: 41, tone: "bg-purple-500" },
                { label: "Religion", count: 28, tone: "bg-red-500" }
              ].map((subject) => (
                <label
                  key={subject.label}
                  className="flex items-center justify-between rounded p-1 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${subject.tone}`} />
                    {subject.label}
                  </span>
                  <span className="text-xs text-slate-400">{subject.count}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-slate-900">Learning Materials</h1>
              <p className="text-sm text-slate-500">Browse and manage academic resources for your classes.</p>
            </div>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
              {["Grid", "List"].map((mode) => (
                <button
                  key={mode}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium ${
                    viewMode === mode ? "bg-sjcs-blue text-white" : "text-slate-600 hover:text-sjcs-blue"
                  }`}
                  type="button"
                  onClick={() => setViewMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-sjcs-blue/20 bg-sjcs-blue/10 px-3 py-1 text-xs font-medium text-sjcs-blue">
              Grade 8
              <button className="rounded-full p-0.5 hover:bg-sjcs-blue/20" type="button">
                <span className="material-icons-outlined text-[14px]">close</span>
              </button>
            </span>
            <button className="ml-2 text-xs text-slate-500 underline decoration-dotted underline-offset-2 hover:text-sjcs-blue" type="button">
              Clear all filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative flex h-32 items-center justify-center bg-slate-50 p-4">
                  <span className="absolute right-3 top-3 rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold uppercase text-slate-600">
                    {material.format}
                  </span>
                  {material.cover ? (
                    <img
                      alt="Material cover"
                      className="h-24 w-20 rounded object-cover shadow-md transition-transform duration-300 group-hover:-translate-y-1"
                      src={material.cover}
                    />
                  ) : (
                    <div className="flex h-24 w-20 items-center justify-center rounded bg-white/60 shadow-md">
                      <span className="material-icons-outlined text-4xl text-sjcs-blue opacity-80">quiz</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        subjectBadge[material.subject] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {material.subject}
                    </span>
                    <button className="text-slate-400 hover:text-sjcs-blue" type="button">
                      <span className="material-icons-outlined">bookmark_border</span>
                    </button>
                  </div>
                  <h3 className="mb-1 line-clamp-1 text-lg font-bold text-slate-900">{material.title}</h3>
                  <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                    <span className="material-icons-outlined text-[16px]">person</span>
                    <span>{material.author}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-xs text-slate-400">
                      {material.size} • {material.date}
                    </span>
                    <button className="flex items-center gap-2 rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-500/30 hover:bg-blue-700" type="button">
                      <span className="material-icons-outlined text-[18px]">download</span>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50" type="button">
              <span className="material-icons-outlined text-sm">arrow_back</span>
              Previous
            </button>
            <div className="hidden gap-2 sm:flex">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium ${
                    page === 1
                      ? "bg-sjcs-blue text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <span className="flex h-10 w-10 items-center justify-center text-slate-400">...</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100" type="button">
                12
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50" type="button">
              Next
              <span className="material-icons-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {subjects.length || teachers.length ? null : (
            <p className="mt-6 text-xs text-slate-400">
              Live data will appear here when the materials API is connected.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default LearningMaterialsLibraryPage;
