import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const statusBadge = (status) => {
  if (status === "Paid") {
    return "bg-sjcs-success/10 text-sjcs-success border-sjcs-success/30";
  }
  if (status === "Overdue") {
    return "bg-sjcs-danger/10 text-sjcs-danger border-sjcs-danger/30";
  }
  return "bg-sjcs-warning/10 text-sjcs-warning border-sjcs-warning/30";
};

const PaymentsFinancePage = () => {
  const { accessToken } = useAuthStore();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await api.get("/payments")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const outstanding = useMemo(
    () => payments.filter((item) => item.status !== "Paid"),
    [payments]
  );

  const paidTotal = useMemo(
    () => payments.filter((item) => item.status === "Paid").reduce((sum, item) => sum + item.amount, 0),
    [payments]
  );

  return (
    <div className="flex min-h-screen bg-sjcs-gray text-sjcs-textPrimary">
      <aside className="hidden h-full w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div className="flex items-center gap-2 text-xl font-bold">
            <RotatingLogo className="flex h-8 w-8 items-center justify-center rounded-lg bg-sjcs-blue text-white" />
            SJCS Portal
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {[
            "Dashboard",
            "Student Profile",
            "Academics",
            "Payments & Finance",
            "Calendar",
            "Settings"
          ].map((item) => (
            <button
              key={item}
              className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm ${
                item === "Payments & Finance"
                  ? "bg-sjcs-blue/10 text-sjcs-blue font-medium"
                  : "text-sjcs-textSecondary hover:bg-sjcs-blue/5 hover:text-sjcs-blue"
              }`}
              type="button"
            >
              <span className="material-icons mr-3">payments</span>
              {item}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <img
              alt="Profile picture of Sarah Miller"
              className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCl1rxbbc8vQClWgxUA08YWufK6ua4XXJOdJbiQda-lY2-PsodbeN1rV-gxmJD9B6NCeOmuyfgIbvjfEVyT48KnnisNe3tgs0HSNBf5oeSYxyToZz2udYtbW46sjeivQ2SZC5NvPH1Cbd0vWEn-D0CctSdcu1BO6Ktz6Qkxu4nRkvmIDuPYlmBskLO-jLz7XvYxSMYTX64Sg11Y_CVRpQQUJdK0BWmWFN05RSrHWw95-XCm6Y7s_w-8MdEoR5kqFwt2U1WmyOvoBDB"
            />
            <div>
              <p className="text-sm font-semibold">Sarah Miller</p>
              <p className="text-xs text-sjcs-textSecondary">Parent</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 lg:ml-64 lg:p-8">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold">Payments & Finance</h1>
            <p className="text-sjcs-textSecondary">
              Manage tuition fees, view history, and download receipts for
              <span className="font-medium text-sjcs-blue"> Lucas Miller (Grade 10)</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sjcs-textSecondary shadow-sm">
              <span className="material-icons text-sm">download</span>
              Statement
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-sjcs-gradient px-6 py-2 font-medium text-white shadow-sjcs-soft">
              <span className="material-icons text-sm">lock</span>
              Pay Outstanding
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-sjcs-textSecondary">
              <span className="rounded-lg bg-sjcs-danger/10 p-2 text-sjcs-danger">
                <span className="material-icons text-lg">warning</span>
              </span>
              Outstanding Balance
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">${outstanding.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
              <span className="rounded-full bg-sjcs-danger/10 px-2 py-0.5 text-xs font-medium text-sjcs-danger">
                Due soon
              </span>
            </div>
            <p className="mt-2 text-sm text-sjcs-textSecondary">Includes Tuition & Lab Fees</p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-sjcs-textSecondary">
              <span className="rounded-lg bg-sjcs-success/10 p-2 text-sjcs-success">
                <span className="material-icons text-lg">check_circle</span>
              </span>
              Paid YTD
            </div>
            <div className="mt-2 text-3xl font-bold">${paidTotal.toFixed(2)}</div>
            <p className="mt-2 text-sm text-sjcs-textSecondary">Academic Year 2023-2024</p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-sjcs-textSecondary">
              <span className="rounded-lg bg-sjcs-blue/10 p-2 text-sjcs-blue">
                <span className="material-icons text-lg">calendar_today</span>
              </span>
              Next Due Date
            </div>
            <div className="mt-2 text-3xl font-bold">Oct 15</div>
            <p className="mt-2 text-sm text-sjcs-textSecondary">October Tuition ($350.00)</p>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-3">
          <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Payment Trends</h3>
              <select className="rounded-lg bg-slate-50 px-3 py-1 text-sm text-sjcs-textSecondary">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="relative flex h-64 items-end gap-2 px-2">
              {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((month, index) => (
                <div
                  key={month}
                  className={`relative flex-1 rounded-t-lg ${
                    index === 2
                      ? "bg-sjcs-blue shadow-sjcs-soft"
                      : index < 3
                        ? "bg-sjcs-blue/10"
                        : "border border-dashed border-slate-300 bg-slate-100 opacity-50"
                  }`}
                  style={{ height: index === 0 ? "40%" : index === 1 ? "30%" : "30%" }}
                >
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs ${index === 2 ? "font-bold text-sjcs-blue" : "text-sjcs-textSecondary"}`}>
                    {month}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-slate-100 pt-4 text-sm text-sjcs-textSecondary">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-sjcs-blue" /> Paid
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-slate-200" /> Projected
                </span>
              </div>
            </div>
          </section>

          <section className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-bold">Transaction History</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    search
                  </span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-sjcs-textSecondary focus:ring-2 focus:ring-sjcs-blue/40"
                    placeholder="Search..."
                    type="text"
                  />
                </div>
                <button className="rounded-lg p-2 text-slate-500 hover:bg-sjcs-blue/5" type="button">
                  <span className="material-icons">filter_list</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="p-5">Fee Description</th>
                    <th className="p-5">Due Date</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.length === 0 ? (
                    <tr>
                      <td className="p-5 text-sjcs-textSecondary" colSpan={5}>
                        No payment records available.
                      </td>
                    </tr>
                  ) : (
                    payments.map((item) => (
                      <tr key={item._id} className="transition-colors hover:bg-slate-50">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue">
                              <span className="material-icons">school</span>
                            </div>
                            <div>
                              <p className="font-semibold text-sjcs-textPrimary">{item.description || "Tuition"}</p>
                              <p className="text-xs text-sjcs-textSecondary">Monthly Fee</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-sjcs-textSecondary">
                          {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "--"}
                        </td>
                        <td className="p-5 font-semibold">${item.amount?.toFixed?.(2) || item.amount}</td>
                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusBadge(item.status)}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                            {item.status || "Pending"}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          {item.status === "Paid" ? (
                            <button className="flex w-full items-center justify-end gap-1 text-slate-400 hover:text-sjcs-blue" type="button">
                              <span className="text-xs font-medium">Receipt</span>
                              <span className="material-icons text-xl">description</span>
                            </button>
                          ) : (
                            <button className="inline-flex items-center gap-1 rounded-lg bg-sjcs-blue px-4 py-2 text-xs font-medium text-white" type="button">
                              Pay Now
                              <span className="material-icons text-[14px]">arrow_forward</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 p-4 text-xs text-sjcs-textSecondary">
              Showing 1-{payments.length || 4} of {payments.length || 12} transactions
              <div className="flex gap-2">
                <button className="rounded p-1 text-slate-400 hover:bg-slate-100" type="button">
                  <span className="material-icons text-lg">chevron_left</span>
                </button>
                <button className="rounded p-1 text-slate-400 hover:bg-slate-100" type="button">
                  <span className="material-icons text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PaymentsFinancePage;
