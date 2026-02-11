import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const fallbackOverview = {
  totalRevenue: 1245000,
  pendingInvoices: 45200,
  collectionRate: 92,
  overdueAmount: 12450
};

const fallbackTransactions = [
  {
    id: "txn-1",
    studentName: "Liam Smith",
    studentId: "#2023-089",
    grade: "Grade 5",
    feeType: "Tuition Fee - Term 2",
    date: "Oct 24, 2023",
    amount: 500,
    status: "Paid"
  },
  {
    id: "txn-2",
    studentName: "Olivia Davis",
    studentId: "#2023-102",
    grade: "Grade 10",
    feeType: "Bus Fee (Annual)",
    date: "Oct 22, 2023",
    amount: 150,
    status: "Overdue"
  },
  {
    id: "txn-3",
    studentName: "Noah Wilson",
    studentId: "#2023-156",
    grade: "Grade 3",
    feeType: "Uniform Set",
    date: "Oct 20, 2023",
    amount: 85,
    status: "Processing"
  }
];

const statusBadge = {
  Paid: "bg-emerald-100 text-emerald-800",
  Overdue: "bg-rose-100 text-rose-800",
  Processing: "bg-sjcs-blue/10 text-sjcs-blue"
};

const AdminPaymentCollectionPage = () => {
  const { accessToken } = useAuthStore();

  const { data: overview } = useQuery({
    queryKey: ["finance-overview"],
    queryFn: async () => (await api.get("/finance/overview")).data.data,
    enabled: Boolean(accessToken)
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["finance-transactions"],
    queryFn: async () => (await api.get("/finance/transactions")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const summary = overview || fallbackOverview;
  const tableRows = transactions.length ? transactions : fallbackTransactions;

  const formattedRevenue = useMemo(() => summary.totalRevenue.toLocaleString(), [summary]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-lg font-bold text-white" />
            <span className="text-lg font-bold">SJCS Admin</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {["Dashboard", "Students", "Staff", "Academics"].map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              type="button"
            >
              <span className="material-icons text-xl">dashboard</span>
              {item}
            </button>
          ))}
          <p className="px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Management</p>
          <button className="flex w-full items-center gap-3 rounded-lg bg-sjcs-blue/10 px-3 py-2.5 text-sm font-medium text-sjcs-blue" type="button">
            <span className="material-icons text-xl">payments</span>
            Finance & Fees
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50" type="button">
            <span className="material-icons text-xl">summarize</span>
            Reports
          </button>
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <img
              alt="Admin profile"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5Pny2C59xGC1hYaZVJ_XGjf_EOrYm3NNwGZPyF2Ff94jdULiz_Jn-6d5Fi34m9rdo_547qpGAUM8lVqY6Y7iFMRo3vLBdlfVEzA57xMQc9BTKmoHTjzQvza8NNdCEVYdGfn0VjnQILBthKdOa8M-9TYAFU_CqQh0qhGYvq5pVAQqJJC458jKG7yZnl55YqXw0Z7wtHBs4AskZUXqm6grLcGyh3ddG4ZFcuNWNAtnDVYju2ONEz0I1Fe82e8Q6GmXIIqlFQdh1FC8"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Marcus Johnson</p>
              <p className="text-xs text-slate-500">Finance Director</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Payment Collection</h1>
            <p className="text-xs text-slate-500">Academic Year 2023-2024</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-lg bg-slate-100 px-3 py-1.5 sm:flex">
              <span className="material-icons text-lg text-slate-400">search</span>
              <input className="ml-2 w-48 bg-transparent text-sm text-slate-700 placeholder-slate-400" placeholder="Search invoices..." />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-500/30" type="button">
              <span className="material-icons text-sm">add</span>
              Create Invoice
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-sjcs-blue/10 p-2 text-sjcs-blue">
                  <span className="material-icons text-xl">account_balance_wallet</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">+12%</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">${formattedRevenue}</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                  <span className="material-icons text-xl">pending_actions</span>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Pending Invoices</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">${summary.pendingInvoices.toLocaleString()}</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                  <span className="material-icons text-xl">donut_large</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">On Track</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Collection Rate</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">{summary.collectionRate}%</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-rose-500/10 p-2 text-rose-500">
                  <span className="material-icons text-xl">warning</span>
                </div>
                <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">Needs Action</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Overdue Amount</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">${summary.overdueAmount.toLocaleString()}</h3>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
              <div className="flex flex-wrap items-center gap-3">
                <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <option>All Grades</option>
                  <option>Grade 1</option>
                  <option>Grade 2</option>
                  <option>Grade 3</option>
                </select>
                <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <option>All Fee Types</option>
                  <option>Tuition</option>
                  <option>Bus Fee</option>
                </select>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700" type="button">
                  <span className="material-icons text-base text-slate-500">calendar_today</span>
                  This Month
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Student / ID</th>
                    <th className="px-6 py-4">Fee Type</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tableRows.map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sjcs-blue/10 text-xs font-bold text-sjcs-blue">
                            {row.studentName
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{row.studentName}</div>
                            <div className="text-xs text-slate-500">
                              ID: {row.studentId} • {row.grade}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{row.feeType}</td>
                      <td className="px-6 py-4 text-slate-500">{row.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">${row.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-sjcs-blue" type="button">
                          <span className="material-icons text-xl">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm text-slate-500">
              <span>
                Showing <span className="font-medium text-slate-900">1</span> to{" "}
                <span className="font-medium text-slate-900">{tableRows.length}</span> of{" "}
                <span className="font-medium text-slate-900">128</span> results
              </span>
              <div className="flex gap-2">
                <button className="rounded-md border border-slate-200 px-3 py-1" type="button" disabled>
                  Previous
                </button>
                <button className="rounded-md border border-slate-200 px-3 py-1" type="button">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPaymentCollectionPage;
