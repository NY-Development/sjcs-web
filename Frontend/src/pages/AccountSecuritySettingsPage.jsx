import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const fallbackSecurity = {
  twoFactorEnabled: false,
  passwordLastChanged: "30 days ago",
  sessions: [
    {
      id: "session-1",
      device: "Windows PC - Chrome",
      location: "San Francisco, CA",
      ip: "192.168.1.1",
      status: "Active now",
      isCurrent: true
    },
    {
      id: "session-2",
      device: "iPhone 13 - Safari",
      location: "San Francisco, CA",
      ip: "172.16.0.45",
      status: "Last active 2 days ago",
      isCurrent: false
    }
  ]
};

const AccountSecuritySettingsPage = () => {
  const { accessToken } = useAuthStore();

  const { data: securityData } = useQuery({
    queryKey: ["security-settings"],
    queryFn: async () => (await api.get("/settings/security")).data.data,
    enabled: Boolean(accessToken)
  });

  const security = securityData || fallbackSecurity;

  const sessionCount = useMemo(() => security.sessions.length, [security]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-white font-bold">SJ</div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">SJCS Portal</span>
            </div>
            <nav className="hidden h-8 items-center border-l border-slate-200 pl-6 text-sm text-slate-500 md:flex">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Settings</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-slate-800">Security</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" type="button">
              <span className="material-icons text-[20px]">notifications_none</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-200">
              <img
                alt="User avatar"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWbb8U4GwLPe1pLLge2Uu4TEc81pBa3Aj4dR_-M77uBbVgp78p2bB6BkCsP-GsmFOM2wnj52ynlAER8zkJTp9GtxxcKh7gEwYUmTsNNXEE7AsS5w6JNZuR1g9vv7zYWO5zlnfDe1ErvC8edlrwICr2ixNJ5i06MK3rmY_Be2urUiLZrqs7eUGw0I6WMu9TU_7M9HbIpQlEzVcuABqKnLgb-_Roon5Vdwy5rZkmRAk2AzrI819Qm6xDuabv0iMGoanIw1UVxbK6n6rA"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="mt-2 text-slate-500">
            Manage your profile, security preferences, and system notifications for the Saint Joseph Catholic School portal.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-64">
            <nav className="space-y-1">
              {["My Profile", "Notifications", "Security", "System Preferences", "Data & Privacy"].map((item) => (
                <button
                  key={item}
                  className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    item === "Security"
                      ? "border-l-4 border-sjcs-blue bg-sjcs-blue/10 text-sjcs-blue"
                      : "text-slate-600 hover:bg-sjcs-blue/5 hover:text-sjcs-blue"
                  }`}
                  type="button"
                >
                  <span className="material-icons mr-3 text-[20px]">lock_outline</span>
                  {item}
                </button>
              ))}
            </nav>
            <div className="mt-8 rounded-xl border border-sjcs-blue/10 bg-sjcs-blue/5 p-4">
              <div className="flex items-start gap-3">
                <span className="material-icons text-sm text-sjcs-blue">info</span>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-sjcs-blue">Need Help?</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Contact the IT Support desk at support@sjcs.edu for assistance with account lockouts.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-6">
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Password Management</h2>
                <p className="mt-1 text-sm text-slate-500">Update your password to keep your account secure.</p>
              </div>
              <div className="grid gap-6 p-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Current Password</label>
                  <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                    <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Password Requirements</h4>
                  <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                    {["Minimum 8 characters", "One uppercase character", "One number", "One special character"].map((item, index) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className={`material-icons text-[16px] ${index === 0 ? "text-green-500" : "text-slate-400"}`}>
                          {index === 0 ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end">
                  <button className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white" type="button">
                    Update Password
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Two-Factor Authentication (2FA)</h2>
                  <p className="mt-1 text-sm text-slate-500">Add an extra layer of security to your account.</p>
                </div>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  security.twoFactorEnabled ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}>
                  {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sjcs-blue/10 text-sjcs-blue">
                    <span className="material-icons text-xl">phonelink_lock</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-900">Authenticator App</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Use an app like Google Authenticator or Microsoft Authenticator to generate verification codes.
                    </p>
                    <button className="mt-3 text-sm font-medium text-slate-400" type="button" disabled>
                      Configure (Enable 2FA first)
                    </button>
                  </div>
                  <button className="rounded-full bg-slate-200 px-4 py-2 text-xs font-medium text-slate-600" type="button">
                    {security.twoFactorEnabled ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Active Sessions</h2>
                <p className="mt-1 text-sm text-slate-500">Devices currently logged into your account.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {security.sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <span className="material-icons text-2xl text-slate-400">
                        {session.isCurrent ? "desktop_windows" : "smartphone"}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-slate-900">{session.device}</p>
                          {session.isCurrent ? (
                            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              Current Device
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-slate-500">
                          {session.location} • IP: {session.ip}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      {session.isCurrent ? "Active now" : session.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 p-4 text-xs text-slate-500">
                {sessionCount} sessions connected
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">© 2023 Saint Joseph Catholic School. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <button className="hover:text-sjcs-blue" type="button">
              Privacy Policy
            </button>
            <button className="hover:text-sjcs-blue" type="button">
              Terms of Service
            </button>
            <button className="hover:text-sjcs-blue" type="button">
              Contact Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AccountSecuritySettingsPage;
