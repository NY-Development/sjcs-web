import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from "date-fns";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const statusStyles = {
  Present: "bg-sjcs-success/10 text-sjcs-success border-sjcs-success/20",
  Absent: "bg-sjcs-danger/10 text-sjcs-danger border-sjcs-danger/20",
  Late: "bg-sjcs-warning/10 text-sjcs-warning border-sjcs-warning/20",
  Pending: "bg-slate-100 text-slate-400 border-slate-200"
};

const AttendanceCalendarPage = () => {
  const { accessToken, user } = useAuthStore();
  const [activeMonth] = useState(new Date());

  const { data: attendance = [] } = useQuery({
    queryKey: ["attendance", format(activeMonth, "yyyy-MM")],
    queryFn: async () => (await api.get("/attendance")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(activeMonth));
    const end = endOfWeek(endOfMonth(activeMonth));
    return eachDayOfInterval({ start, end });
  }, [activeMonth]);

  const attendanceMap = useMemo(() => {
    const map = new Map();
    attendance.forEach((record) => {
      const key = record.date ? format(new Date(record.date), "yyyy-MM-dd") : null;
      if (key) {
        map.set(key, record.status || "Present");
      }
    });
    return map;
  }, [attendance]);

  const summary = useMemo(() => {
    const counts = { Present: 0, Absent: 0, Late: 0 };
    attendance.forEach((record) => {
      if (counts[record.status] !== undefined) {
        counts[record.status] += 1;
      }
    });
    return counts;
  }, [attendance]);

  return (
    <div className="min-h-screen bg-sjcs-gray font-display text-sjcs-textPrimary">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue" />
            <div>
              <h1 className="text-lg font-bold">SJCS Portal</h1>
              <p className="text-xs text-sjcs-textSecondary">Saint Joseph Catholic School</p>
            </div>
          </div>
          <nav className="hidden gap-8 md:flex">
            {["Dashboard", "Attendance", "Grades", "Schedule"].map((item) => (
              <button
                key={item}
                className={`text-sm font-medium ${
                  item === "Attendance" ? "text-sjcs-blue" : "text-sjcs-textSecondary"
                }`}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user?.firstName || "Alex Johnson"}</p>
              <p className="text-xs text-sjcs-textSecondary">Grade 10 - Class B</p>
            </div>
            <button className="h-10 w-10 overflow-hidden rounded-full border-2 border-slate-100" type="button">
              <img
                alt="Student profile"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7lxDqjFmyhAKsQfnasqFQM2kNsSL-6Flx1rtR5yVxkr2bcPLmojq91eOe9tViELSVCLwWFcZZNb-SrySgJJ3S7v5YBvjL6a_CWCcKVA1PHVaFOJkiL2Iw10Lm7qjjmw7FRtfW7ex47W27v8Sk5ubg8GCMnwBECjvicHnCg00jTqgZcahztYEa6J293FvLlRT_cZ4dig32ymVndWTiVfhihZKdbV1Gqqyntzlhr0f_MF3HlcilwKnU2v1yKVgmfOKFZNDi0IwzGEgw"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Attendance Record</h2>
            <p className="mt-1 text-sjcs-textSecondary">Track daily attendance status and history.</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-sjcs-textPrimary">
              <option>Fall Semester 2023</option>
              <option>Spring Semester 2024</option>
            </select>
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-sjcs-textPrimary shadow-sm" type="button">
              <span className="material-icons text-sm">print</span>
              Print
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" type="button">
                <span className="material-icons">chevron_left</span>
              </button>
              <h3 className="text-lg font-bold text-sjcs-textPrimary">{format(activeMonth, "MMMM yyyy")}</h3>
              <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" type="button">
                <span className="material-icons">chevron_right</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-3 text-center text-xs font-semibold uppercase text-slate-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-[1px] bg-slate-200">
                {days.map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  const status = attendanceMap.get(key) || "Present";
                  const style = statusStyles[status] || statusStyles.Present;
                  const isCurrentMonth = isSameMonth(day, activeMonth);

                  return (
                    <div
                      key={key}
                      className={`flex min-h-[100px] flex-col justify-between p-2 sm:p-3 ${
                        isCurrentMonth ? "bg-white" : "bg-slate-50 opacity-60"
                      }`}
                    >
                      <span className="self-end text-sm font-semibold text-slate-700">
                        {format(day, "d")}
                      </span>
                      <span
                        className={`block w-full truncate rounded border px-2 py-1 text-center text-xs font-bold ${style}`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 px-2 text-sm text-sjcs-textSecondary">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-sjcs-success" /> Present
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-sjcs-danger" /> Absent
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-sjcs-warning" /> Late
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold">{format(activeMonth, "MMMM")} Summary</h3>
              <div className="flex items-center justify-center">
                <div className="flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-slate-100">
                  <div className="text-center">
                    <span className="block text-4xl font-bold text-sjcs-textPrimary">92%</span>
                    <span className="text-xs font-medium uppercase tracking-wide text-sjcs-textSecondary">
                      Attendance
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  {
                    label: "Days Present",
                    value: summary.Present,
                    icon: "check_circle",
                    className: "bg-sjcs-success/10 text-sjcs-success"
                  },
                  {
                    label: "Days Absent",
                    value: summary.Absent,
                    icon: "cancel",
                    className: "bg-sjcs-danger/10 text-sjcs-danger"
                  },
                  {
                    label: "Late Arrivals",
                    value: summary.Late,
                    icon: "schedule",
                    className: "bg-sjcs-warning/10 text-sjcs-warning"
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.className}`}>
                        <span className="material-icons text-xl">{item.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-sjcs-textSecondary">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold text-sjcs-textPrimary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-sjcs-blue/20 bg-sjcs-blue/5 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sjcs-blue/20 text-sjcs-blue">
                <span className="material-icons">download</span>
              </div>
              <h4 className="mb-2 text-base font-bold text-sjcs-textPrimary">Need a formal report?</h4>
              <p className="mb-5 text-sm text-sjcs-textSecondary">
                Download a PDF version of the attendance record for this semester.
              </p>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-sjcs-blue py-3 text-sm font-medium text-white">
                Export Report
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceCalendarPage;
