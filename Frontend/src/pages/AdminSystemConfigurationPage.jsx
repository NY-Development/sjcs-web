import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const AdminSystemConfigurationPage = () => {
  const { accessToken } = useAuthStore();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [parentAccess, setParentAccess] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicRegistration, setPublicRegistration] = useState(false);

  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => (await api.get("/teachers")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const totalUsers = students.length + teachers.length + 1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue">
            <span className="material-icons text-xl">school</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">SJCS Admin Console</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100" type="button">
            <span className="material-icons">notifications</span>
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-300 bg-slate-200">
            <img
              alt="Admin profile"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYrFDax1gjSoiI6HNoaD-3pYLDO09Hg_QgH9lQY1SzFeTYUZaAzHYR-QjQ1SDogURphMgH92onxFAARK4hyexdh3ix3v8oh0TIRd7kggLxUQ7uxuaTu9jq4bOp39UXqfFg1tBfROrTTWq_StCQFNyAN-iMF2b4gIzr6mRHMQMeBXTOx6kb17GBdExcbPj2Kgn3rXffmaF9lDtmu5KTAYw4G3hftHF_a0-XhTFbiNJsm4Nyyt_qTQLfFaBa9VkwATRnCD9-OnIO2Zcf"
            />
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
          <div className="p-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Settings Menu</h3>
            <nav className="space-y-1">
              {[
                { label: "General", icon: "tune", active: true },
                { label: "Academic Years", icon: "calendar_today" },
                { label: "User Roles", icon: "people_alt" },
                { label: "API Integrations", icon: "integration_instructions" },
                { label: "System Logs", icon: "history" }
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                    item.active
                      ? "bg-sjcs-blue/10 text-sjcs-blue"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  type="button"
                >
                  <span className="material-icons text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-auto border-t border-slate-200 p-6">
            <div className="rounded-xl border border-sjcs-blue/10 bg-sjcs-blue/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-icons text-sm text-sjcs-blue">verified_user</span>
                <span className="text-sm font-semibold text-sjcs-blue">System Status</span>
              </div>
              <p className="text-xs text-slate-500">All services operational. Last backup: 2h ago.</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-10">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <nav className="mb-1 flex text-sm text-slate-500">
                  <span className="hover:text-sjcs-blue">Home</span>
                  <span className="mx-2 text-slate-300">/</span>
                  <span className="hover:text-sjcs-blue">Admin</span>
                  <span className="mx-2 text-slate-300">/</span>
                  <span className="font-medium text-slate-800">Configuration</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">System Configuration</h1>
                <p className="mt-1 text-sm text-slate-500">Manage global settings for Saint Joseph Catholic School portal.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button">
                  Discard
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/20" type="button">
                  <span className="material-icons text-sm">save</span>
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="space-y-6 xl:col-span-2">
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-800">School Identity</h2>
                    <span className="material-icons text-slate-300">badge</span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">School Name</label>
                      <input
                        className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 shadow-sm focus:border-sjcs-blue focus:ring-sjcs-blue sm:text-sm"
                        type="text"
                        defaultValue="Saint Joseph Catholic School"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">School Code</label>
                      <input
                        className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-slate-50 text-slate-400 shadow-sm sm:text-sm"
                        type="text"
                        defaultValue="SJCS-2024"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Administrator Contact</label>
                      <input
                        className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 shadow-sm focus:border-sjcs-blue focus:ring-sjcs-blue sm:text-sm"
                        type="email"
                        defaultValue="admin@sjcs.edu"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-3 block text-sm font-medium text-slate-700">School Logo</label>
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <img
                            alt="SJCS school logo"
                            className="h-16 w-16 object-contain opacity-80"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAejQfg9tt3doqwSniRG7iK5vGz7rW2vCHnkKJHAnWVz90ZV8l3_QTlYpuWYipThZM-13eNWNzV6ArKfr73tARoSNWIxYqYIUABBrB8w7o-Opi2fDnGFifWHLKYEJvgwQ5ZQciFx6XGby-7besr8Hex-b9R2bwYS1NW_jFKsuvIKfCoYh-w48MoO0a5of23l9J4Bf0ob9stmNGT4mH-3TC9SQVSDNp-Mp6lJFB2ynfU6BFDqxAojCPi6J21_MjyPm4233DH8-umZJPv"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/10">
                            <span className="material-icons text-white opacity-0 drop-shadow-md transition-opacity hover:opacity-100">edit</span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-sjcs-blue hover:bg-sjcs-blue/5">
                          <span className="material-icons mb-2 text-slate-400">cloud_upload</span>
                          <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                          <p className="mt-1 text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-800">Academic Calendar</h2>
                    <span className="material-icons text-slate-300">date_range</span>
                  </div>
                  <div className="space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Current Academic Year</label>
                        <select className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 shadow-sm focus:border-sjcs-blue focus:ring-sjcs-blue sm:text-sm">
                          <option>2023 - 2024</option>
                          <option>2024 - 2025</option>
                          <option>2022 - 2023 (Archived)</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Active Term</label>
                        <select className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 shadow-sm focus:border-sjcs-blue focus:ring-sjcs-blue sm:text-sm">
                          <option>Fall Semester</option>
                          <option>Spring Semester</option>
                          <option>Summer Session</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Upcoming Holiday</h4>
                        <p className="mt-1 text-xs text-slate-500">Easter Break starts in 14 days</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-mono text-slate-600">Mar 29 - Apr 5</span>
                        <button className="text-sm font-medium text-sjcs-blue hover:underline" type="button">
                          Edit Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6 xl:col-span-1">
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-800">System Controls</h2>
                    <span className="material-icons text-slate-300">settings_power</span>
                  </div>
                  <div>
                    {[
                      {
                        label: "Maintenance Mode",
                        desc: "Restrict access to admins only",
                        value: maintenanceMode,
                        setter: setMaintenanceMode
                      },
                      {
                        label: "Parent Portal Access",
                        desc: "Allow parents to view grades",
                        value: parentAccess,
                        setter: setParentAccess
                      },
                      {
                        label: "Email Notifications",
                        desc: "Send system alerts via SMTP",
                        value: emailNotifications,
                        setter: setEmailNotifications
                      },
                      {
                        label: "Public Registration",
                        desc: "Open enrollment for new students",
                        value: publicRegistration,
                        setter: setPublicRegistration
                      }
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between p-4 transition-colors ${
                          index < 3 ? "border-b border-slate-100" : ""
                        } hover:bg-slate-50`}
                      >
                        <div className="pr-4">
                          <p className="text-sm font-medium text-slate-900">{item.label}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button
                          className={`relative h-6 w-11 rounded-full transition-colors ${
                            item.value ? "bg-sjcs-blue" : "bg-slate-200"
                          }`}
                          type="button"
                          onClick={() => item.setter((prev) => !prev)}
                        >
                          <span
                            className={`absolute top-[2px] h-5 w-5 rounded-full bg-white transition-transform ${
                              item.value ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sjcs-blue to-blue-600 p-6 text-white shadow-lg">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                  <h3 className="relative z-10 mb-4 text-lg font-semibold">License Information</h3>
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2 text-sm">
                      <span className="text-blue-100">Plan</span>
                      <span className="font-medium">Enterprise EDU</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/20 pb-2 text-sm">
                      <span className="text-blue-100">Expires</span>
                      <span className="font-medium">Dec 31, 2024</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-100">Users</span>
                      <span className="font-medium">{totalUsers} / 500</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full rounded-lg bg-white py-2 text-sm font-semibold text-sjcs-blue hover:bg-blue-50" type="button">
                    Manage Subscription
                  </button>
                </section>
              </div>
            </div>

            <section className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="mb-2 font-semibold text-red-700">Danger Zone</h3>
              <p className="mb-4 text-sm text-red-600/80">Irreversible actions regarding the school system data.</p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50" type="button">
                  Reset All Configurations
                </button>
                <button className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50" type="button">
                  Archive Current Year Data
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSystemConfigurationPage;
