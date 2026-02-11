import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const ParentDashboardPage = () => {
  const { accessToken } = useAuthStore();

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

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await api.get("/payments")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => (await api.get("/notifications")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const paymentDue = payments.find((item) => item.status !== "Paid");

  return (
    <div className="min-h-screen bg-sjcs-gray text-sjcs-textPrimary">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue">
              <span className="material-icons">school</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">SJCS</h1>
              <p className="text-xs text-sjcs-textSecondary">Parent Portal</p>
            </div>
          </div>
          <div className="hidden items-center rounded-full border border-gray-200 bg-sjcs-gray p-1 md:flex">
            <div className="flex cursor-pointer items-center gap-3 rounded-full px-4 py-1.5 hover:bg-white">
              <img
                alt="Student"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr9ZGkms8pwaIgenZ1kL58R6FPstQ7Q6nUhpuIL8P8LWeQ8xB-HbgoEcOHTBVhAz6-8kz3LgGnRVH9XtWIEaw-sHXRoaAa4my1eMBwxnkS7qkFNWQSP40TvvdJgiRMmyJpcme8wnRFAWromW2Ff2TWMdGBuLLAd6dcv70rTayBL_8NFJkgY6F3yg_rkDSjs3ETguyT25nMuvbOtMcMdJrOquOY0bViEGSxgY1YoLkA_RVJ3Xzd5yWPLxM-6eVuiTX3KpMYymXU3Rj8"
              />
              <div>
                <span className="text-sm font-semibold">Leo Anderson</span>
                <span className="block text-[10px] text-sjcs-textSecondary">Grade 5 • Ms. Thompson</span>
              </div>
              <span className="material-icons text-lg text-slate-400">expand_more</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-sjcs-blue" type="button">
              <span className="material-icons">notifications_none</span>
              {notifications.length ? (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-sjcs-red" />
              ) : null}
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">Sarah Anderson</p>
                <p className="text-xs text-sjcs-textSecondary">Guardian</p>
              </div>
              <img
                alt="Parent profile"
                className="h-10 w-10 rounded-full border-2 border-gray-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiN4Mg3YRqElL6U6IhQVbY9LOBthNa3PJc3WiuC5R2iOVDBDuP2VkCyjEpALuUicvl-rKJC2t-E1hUORpl8hw3OtB4R7A-n-Ms6ZCWarbWakl_AZogMoYPUPhyFDJisLrHwCOuD4a6D_ZLeU1oZVQjC5Kx_Er9URmZuZJmBhVlrdUtlBcPCU7BtPZ3hWNC1T_v3ANHr9xem_LljOTjz1g96Y4-88nd0RnmDplTRMOMWVDILTxybQJYNcPsyBxyRmuZHRjws5XuAAxz"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className="material-icons text-6xl text-sjcs-blue">school</span>
            </div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-sjcs-textSecondary">
              Academic Progress
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold">3.8</span>
              <span className="flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                <span className="material-icons mr-1 text-xs">trending_up</span>GPA
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Mathematics", value: "A (96%)", width: "96%" },
                { label: "Science", value: "B+ (89%)", width: "89%" }
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-sjcs-textSecondary">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-sjcs-blue" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center text-sm font-medium text-sjcs-blue" type="button">
              View Full Report Card
              <span className="material-icons ml-1 text-base">arrow_forward</span>
            </button>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-sjcs-textSecondary">
              Attendance Rate
            </h3>
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 flex-shrink-0">
                <svg className="h-full w-full -rotate-90">
                  <circle
                    className="text-gray-100"
                    cx="48"
                    cy="48"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-sjcs-success"
                    cx="48"
                    cy="48"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeDasharray="251.2"
                    strokeDashoffset="12.5"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">95%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Good Standing
                </div>
                <p className="text-sm text-sjcs-textSecondary">
                  Only <span className="font-bold text-sjcs-textPrimary">2 absences</span> this semester.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center">
              <div>
                <span className="block text-xl font-bold">38</span>
                <span className="text-[10px] uppercase text-sjcs-textSecondary">Present</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-sjcs-red">2</span>
                <span className="text-[10px] uppercase text-sjcs-textSecondary">Absent</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-sjcs-warning">0</span>
                <span className="text-[10px] uppercase text-sjcs-textSecondary">Tardy</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium uppercase tracking-wide text-sjcs-textSecondary">Tuition & Fees</h3>
              <span className="rounded-md bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700">PAYMENT DUE</span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-sjcs-textSecondary">Total Outstanding Balance</p>
              <p className="mt-1 text-4xl font-bold">${paymentDue?.amount?.toFixed?.(2) || "450.00"}</p>
              <p className="mt-2 flex items-center text-xs font-medium text-sjcs-red">
                <span className="material-icons mr-1 text-sm">error_outline</span> Due by Oct 15, 2023
              </p>
            </div>
            <div className="mt-auto space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-sjcs-blue py-2.5 text-white shadow-sjcs-soft" type="button">
                <span className="material-icons text-sm">credit_card</span> Pay Now
              </button>
              <button className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-sjcs-textSecondary" type="button">
                View Payment History
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h3 className="text-lg font-bold">October 2023 Attendance</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sjcs-success" /> Present
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sjcs-red" /> Absent
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sjcs-warning" /> Tardy
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 grid grid-cols-7 gap-4 text-center text-xs font-semibold uppercase text-sjcs-textSecondary">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-4 text-center text-sm">
                {[29, 30, 1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div key={day} className="h-10 rounded-lg p-2 text-sjcs-textSecondary">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <span className="material-icons text-sjcs-blue">notifications_active</span> Alerts & Notices
              </h3>
              <span className="rounded-full bg-sjcs-blue px-2 py-1 text-xs font-bold text-white">3 New</span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {notifications.slice(0, 3).map((note) => (
                <div key={note._id} className="rounded-lg border border-gray-100 p-4">
                  <div className="mb-1 flex items-start justify-between">
                    <span className="text-xs font-bold uppercase text-sjcs-blue">Notice</span>
                    <span className="text-[10px] text-sjcs-textSecondary">Today</span>
                  </div>
                  <h4 className="mb-1 font-semibold">{note.title}</h4>
                  <p className="text-sm text-sjcs-textSecondary">{note.message}</p>
                </div>
              ))}
              {!notifications.length ? (
                <div className="rounded-lg border border-gray-100 bg-sjcs-gray p-4 text-sm text-sjcs-textSecondary">
                  No new notices.
                </div>
              ) : null}
            </div>
            <div className="border-t border-gray-100 p-4">
              <button className="w-full text-sm font-medium text-sjcs-blue" type="button">
                View All Notifications
              </button>
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
                <p className="text-sm text-sjcs-textSecondary">Quickly access common parent resources.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Contact Teacher', 'Add Lunch Money', 'Bus Schedule'].map((label) => (
                <button
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-sjcs-textPrimary"
                  type="button"
                >
                  <span className="material-icons text-lg text-sjcs-blue">email</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboardPage;
