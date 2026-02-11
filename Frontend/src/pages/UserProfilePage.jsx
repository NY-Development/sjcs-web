import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const fallbackProfile = {
  fullName: "Johnathan Doe",
  role: "Student",
  grade: "Grade 11",
  studentId: "2024-8892",
  attendance: "98%",
  gpa: "3.8",
  merits: "12",
  dateOfBirth: "March 12, 2007",
  email: "j.doe@sjcs.edu",
  phone: "(555) 123-4567",
  address: "123 Maple Ave, Springfield, IL 62704",
  academicStatus: {
    classYear: "Junior (2025)",
    homeroom: "Mrs. Robinson",
    room: "Room 304",
    termStatus: "Active"
  },
  house: {
    name: "St. Peter's House",
    motto: "Faith and Courage",
    points: 1240
  }
};

const UserProfilePage = () => {
  const { accessToken } = useAuthStore();

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await api.get("/profile/me")).data.data,
    enabled: Boolean(accessToken)
  });

  const profile = profileData || fallbackProfile;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue">
              <span className="material-icons">school</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">SJCS Portal</h1>
              <p className="text-xs font-medium text-slate-500">Saint Joseph Catholic School</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-icons absolute left-3 top-2.5 text-sm text-slate-400">search</span>
              <input className="w-64 rounded-full border-none bg-slate-100 py-2 pl-9 pr-4 text-sm" placeholder="Search resources..." />
            </div>
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" type="button">
              <span className="material-icons">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sjcs-blue text-sm font-semibold text-white">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex text-sm text-slate-500">
          <span className="hover:text-sjcs-blue">Dashboard</span>
          <span className="mx-2">/</span>
          <span className="hover:text-sjcs-blue">Students</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Profile</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="h-32 bg-gradient-to-r from-sjcs-blue to-blue-500" />
              <div className="relative px-6 pb-6">
                <div className="-mt-16 mb-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="Student profile"
                      className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUZ5psiWyCm1BLNZ3Wgr8Q1NujRTmy7rmU5-fGuPz9_cx6kWD7TPPtZgEOIsOWs9f80qLIratGP1Mb8Z5Z90o78nKVZivRsuFblN8RMfJCHFRxXNRqWHsI2tZbZglzQTWFQhNg_YUeFY1k1DLaJ5HlSWscGo0QsUmU3iF674_feGhZRlw_q7YSyF-GYdi6qkellkjKHIftsrFhEU3zNvrvA31PY5AOP6WgjfrdDUjtfewscm5AgwomhnxK3FebNhFcx26sQEu7ifTC"
                    />
                    <button className="absolute bottom-1 right-1 rounded-full border border-slate-200 bg-white p-1.5 text-slate-700" type="button">
                      <span className="material-icons text-sm">edit</span>
                    </button>
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-900">{profile.fullName}</h2>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="rounded-full border border-sjcs-blue/20 bg-sjcs-blue/10 px-2.5 py-0.5 text-xs font-semibold text-sjcs-blue">
                      {profile.role}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {profile.grade}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-mono text-slate-500">ID: {profile.studentId}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-6">
                  {[
                    { label: "Attendance", value: profile.attendance },
                    { label: "GPA", value: profile.gpa },
                    { label: "Merits", value: profile.merits }
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-lg font-bold text-slate-800">{item.value}</div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sjcs-blue py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20" type="button">
                  <span className="material-icons text-sm">edit_document</span>
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-lg">
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-300">
                  <span className="material-icons text-base">support_agent</span>
                  Support
                </div>
                <h3 className="mb-2 text-lg font-semibold">Need help updating your info?</h3>
                <p className="mb-4 text-sm text-slate-400">
                  Contact the administration office for sensitive data changes.
                </p>
                <button className="inline-flex items-center text-sm font-medium text-blue-300" type="button">
                  Contact Admin
                  <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-sjcs-blue opacity-20 blur-xl" />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <span className="material-icons text-sjcs-blue">person</span>
                  Personal Information
                </h3>
                <span className="text-xs italic text-slate-400">Last updated: 2 days ago</span>
              </div>
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5" readOnly value={profile.fullName} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-2.5 text-lg text-slate-400">calendar_today</span>
                    <input className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3" readOnly value={profile.dateOfBirth} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-2.5 text-lg text-slate-400">mail</span>
                    <input className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3" readOnly value={profile.email} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-2.5 text-lg text-slate-400">phone</span>
                    <input className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3" readOnly value={profile.phone} />
                  </div>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Home Address</label>
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-3 text-lg text-slate-400">home</span>
                    <textarea className="w-full rounded-lg border border-slate-300 bg-white pl-10 pt-2" readOnly rows="2" value={profile.address} />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100" type="button">
                    Cancel
                  </button>
                  <button className="rounded-lg bg-sjcs-blue px-5 py-2 text-sm font-medium text-white" type="button">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-sjcs-blue/10 p-2 text-sjcs-blue">
                    <span className="material-icons">school</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Academic Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <span className="text-sm font-medium text-slate-600">Class Year</span>
                    <span className="text-sm font-bold text-slate-900">{profile.academicStatus.classYear}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <span className="text-sm font-medium text-slate-600">Homeroom</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">{profile.academicStatus.homeroom}</div>
                      <div className="text-xs text-slate-500">{profile.academicStatus.room}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <span className="text-sm font-medium text-slate-600">Term Status</span>
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      {profile.academicStatus.termStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-red-600/5" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-red-50 p-2 text-red-600">
                    <span className="material-icons">shield</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">House Affiliation</h3>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span className="material-icons text-6xl text-red-600">shield</span>
                  <h4 className="mt-3 text-xl font-bold text-slate-900">{profile.house.name}</h4>
                  <p className="mt-1 text-sm italic text-slate-500">"{profile.house.motto}"</p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">House Points</span>
                    <span className="font-bold text-red-600">{profile.house.points} pts</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 rounded-full bg-red-600" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="material-icons text-slate-400">lock</span>
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <span className="material-icons text-slate-500">key</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Password</h4>
                      <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-sjcs-blue" type="button">
                    Reset
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <span className="material-icons text-green-600">phonelink_lock</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500">Enabled via SMS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © 2024 Saint Joseph Catholic School. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UserProfilePage;
