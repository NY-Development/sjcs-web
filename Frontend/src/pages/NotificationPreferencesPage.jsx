import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";

const defaultPrefs = {
  channels: {
    email: true,
    sms: true,
    push: true
  },
  categories: {
    academic: {
      enabled: true,
      options: {
        grades: true,
        assignments: true,
        absences: true,
        teacherMessages: false
      }
    },
    financial: {
      enabled: true,
      options: {
        invoice: true,
        paymentSuccess: true,
        paymentOverdue: true
      }
    },
    clubs: {
      enabled: false,
      options: {
        events: false,
        scheduleChanges: false
      }
    },
    system: {
      enabled: true,
      options: {
        maintenance: true,
        featureAnnouncements: false
      }
    }
  }
};

const NotificationPreferencesPage = () => {
  const { accessToken } = useAuthStore();
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [statusMessage, setStatusMessage] = useState("");

  const { data: prefData } = useQuery({
    queryKey: ["notification-preferences"],
    queryFn: async () => (await api.get("/notifications/preferences")).data.data,
    enabled: Boolean(accessToken)
  });

  useEffect(() => {
    if (prefData) {
      setPrefs(prefData);
    }
  }, [prefData]);

  const updateChannel = (key) => {
    setPrefs((prev) => ({
      ...prev,
      channels: { ...prev.channels, [key]: !prev.channels[key] }
    }));
  };

  const updateCategory = (category) => {
    setPrefs((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: { ...prev.categories[category], enabled: !prev.categories[category].enabled }
      }
    }));
  };

  const updateOption = (category, option) => {
    setPrefs((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          options: {
            ...prev.categories[category].options,
            [option]: !prev.categories[category].options[option]
          }
        }
      }
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    try {
      await api.put("/notifications/preferences", prefs);
      setStatusMessage("Settings saved successfully");
    } catch (error) {
      setStatusMessage("Failed to save preferences");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-white font-bold" />
            <div>
              <span className="block text-lg font-bold text-slate-900">SJCS</span>
              <span className="text-xs text-slate-500">Parent Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full p-1 text-slate-400 hover:text-slate-500" type="button">
              <span className="material-icons text-2xl">notifications</span>
            </button>
            <img
              alt="User avatar"
              className="h-8 w-8 rounded-full bg-slate-100"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEjYZ11e_aGsFZ1orVBcQNx55C381XwWPxdaFjSHhqaZbE9GEoctnQbTo4joBhYN99Xecu4nW_xdwszF_CHM55ihuJT0s_-KUeIXCGHFYuCho7BvRKeOnk2SVjC9n9HMcirVXIlkkSENRzz8LNMifC79StW5j4newMaxy63M9f7TrIpl2DaqXKoRbe2r3b65rGglUk5j8B3Yn9LfbOcBczDxejiAsF_K4t2ZhnjGx6O7TCwMHvYQPF-TCs6I2cgJS1vd_uM1aaBoxG"
            />
          </div>
        </div>
      </nav>

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-5 flex text-sm text-slate-500">
            <span className="hover:text-sjcs-blue">Settings</span>
            <span className="material-icons text-base">chevron_right</span>
            <span className="font-medium text-slate-800">Notification Preferences</span>
          </nav>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Notification Preferences</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage how and when you receive updates regarding your student's activities at Saint Joseph Catholic School.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex">
              <span className="material-icons text-sjcs-blue">info</span>
              <p className="ml-3 text-sm text-blue-700">
                Emergency alerts regarding school safety and closures cannot be disabled and will be sent to all verified contacts.
              </p>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSave}>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <h3 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                  <span className="material-icons text-sjcs-blue">devices</span>
                  Delivery Channels
                </h3>
                <p className="mt-1 text-sm text-slate-500">Where would you like to receive your notifications?</p>
              </div>
              <div className="space-y-6 px-6 py-6">
                {[
                  { key: "email", label: "Email Notifications", detail: "Sent to parent@example.com" },
                  { key: "sms", label: "SMS / Text Messages", detail: "Sent to +1 (555) 123-4567" },
                  { key: "push", label: "In-App Push Notifications", detail: "Received on your mobile device" }
                ].map((channel) => (
                  <div key={channel.key} className="flex items-start">
                    <input
                      className="mt-1 h-5 w-5 rounded border-slate-300 text-sjcs-blue"
                      type="checkbox"
                      checked={prefs.channels[channel.key]}
                      onChange={() => updateChannel(channel.key)}
                    />
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-slate-900">{channel.label}</label>
                      <p className="text-slate-500">{channel.detail}</p>
                    </div>
                    <button className="ml-auto text-sm font-medium text-sjcs-blue" type="button">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="px-1 text-lg font-medium text-slate-900">Notification Categories</h3>
              {[
                {
                  key: "academic",
                  title: "Academic Alerts",
                  icon: "school",
                  desc: "Grade updates, assignment deadlines, and attendance.",
                  options: [
                    { key: "grades", label: "New Grade Posted" },
                    { key: "assignments", label: "Assignment Due Tomorrow" },
                    { key: "absences", label: "Absence Notification" },
                    { key: "teacherMessages", label: "Teacher Messages" }
                  ]
                },
                {
                  key: "financial",
                  title: "Financial Reminders",
                  icon: "attach_money",
                  desc: "Tuition due dates, tax documents, and payment receipts.",
                  options: [
                    { key: "invoice", label: "Invoice Available" },
                    { key: "paymentSuccess", label: "Payment Success" },
                    { key: "paymentOverdue", label: "Payment Overdue Alert" }
                  ]
                },
                {
                  key: "clubs",
                  title: "Club & Sports Announcements",
                  icon: "sports_soccer",
                  desc: "Game schedules, practice changes, and event invites.",
                  options: [
                    { key: "events", label: "New Event Added" },
                    { key: "scheduleChanges", label: "Schedule Changes" }
                  ]
                },
                {
                  key: "system",
                  title: "System Updates",
                  icon: "settings_suggest",
                  desc: "Platform maintenance and school policy updates.",
                  options: [
                    { key: "maintenance", label: "Maintenance Alerts" },
                    { key: "featureAnnouncements", label: "Feature Announcements" }
                  ]
                }
              ].map((category) => (
                <div key={category.key} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-50 p-2 text-sjcs-blue">
                        <span className="material-icons">{category.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900">{category.title}</h4>
                        <p className="text-sm text-slate-500">{category.desc}</p>
                      </div>
                    </div>
                    <button
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        prefs.categories[category.key].enabled ? "bg-sjcs-blue" : "bg-slate-200"
                      }`}
                      type="button"
                      onClick={() => updateCategory(category.key)}
                    >
                      <span
                        className={`absolute top-[2px] h-5 w-5 rounded-full bg-white transition-transform ${
                          prefs.categories[category.key].enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <div
                    className={`grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 ${
                      prefs.categories[category.key].enabled ? "" : "opacity-50"
                    }`}
                  >
                    {category.options.map((option) => (
                      <label key={option.key} className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          className="h-4 w-4 rounded border-slate-300 text-sjcs-blue"
                          type="checkbox"
                          disabled={!prefs.categories[category.key].enabled}
                          checked={prefs.categories[category.key].options[option.key]}
                          onChange={() => updateOption(category.key, option.key)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600" type="button">
                Reset to Default
              </button>
              <button className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700" type="button">
                Cancel
              </button>
              <button className="rounded-lg bg-sjcs-blue px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/20" type="submit">
                Save Preferences
              </button>
            </div>
          </form>

          {statusMessage ? (
            <div className="mt-6 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white">{statusMessage}</div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default NotificationPreferencesPage;
