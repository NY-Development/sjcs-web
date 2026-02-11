import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const statusBadge = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
  Suspended: "bg-red-50 text-red-700 border-red-200"
};

const roleBadge = {
  Teacher: "bg-blue-100 text-blue-800",
  Student: "bg-indigo-100 text-indigo-800",
  Parent: "bg-slate-100 text-slate-800",
  Admin: "bg-purple-100 text-purple-800"
};

const UserManagementPage = () => {
  const { accessToken } = useAuthStore();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

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

  const users = useMemo(() => {
    const studentUsers = students.map((student) => ({
      id: student._id,
      name: `${student.firstName || ""} ${student.lastName || ""}`.trim() || "Student",
      email: student.email || "student@sjcs.edu",
      role: "Student",
      status: student.isActive === false ? "Inactive" : "Active",
      lastLogin: student.lastLogin || "Oct 23, 2023",
      avatar: student.avatarUrl || null
    }));

    const teacherUsers = teachers.map((teacher) => ({
      id: teacher._id,
      name: `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim() || "Teacher",
      email: teacher.email || "teacher@sjcs.edu",
      role: "Teacher",
      status: teacher.isActive === false ? "Inactive" : "Active",
      lastLogin: teacher.lastLogin || "Oct 24, 2023",
      avatar: teacher.avatarUrl || null
    }));

    const adminUser = {
      id: "admin",
      name: "Admin User",
      email: "admin@sjcs.edu",
      role: "Admin",
      status: "Active",
      lastLogin: "Today",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAUZc_Qsz1u7LM9imaBWKc6z6dUtYpGyxMEKrxoVJecbEwTmK2Rs6bm1TvPd4J22simPVMWk7dak1BKanr3U7v1oynGSIlRJ7PLu46DVB6BXeSf9f8AeJ8kXjc6cpLNa7mXFtLDj5n3qus71JdiSJOpMNEeeK8lhwLakfGkU-GKmNe47RhbXWfvhl8VJQ5tgScs8d1NKn-PKtphCjd1Hw096orIQUHTqAUvz_8Nr16JBLf465wGBh0EdsxhEEDGRfoKkfBP2U7YnLy1"
    };

    return [adminUser, ...teacherUsers, ...studentUsers];
  }, [students, teachers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = [user.name, user.email, user.role]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All Status" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
      <div className="flex h-screen overflow-hidden">
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex h-16 items-center justify-center border-b border-slate-200 px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-lg font-bold text-white">S</div>
              <span className="text-lg font-bold text-slate-800">SJCS Admin</span>
            </div>
          </div>
          <div className="px-4 py-6">
            <nav className="space-y-1">
              {[
                { label: "Dashboard", icon: "dashboard" },
                { label: "User Management", icon: "people", active: true },
                { label: "Courses", icon: "school" },
                { label: "Schedule", icon: "calendar_today" },
                { label: "Reports", icon: "analytics" },
                { label: "Settings", icon: "settings" }
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-sjcs-blue/10 text-sjcs-blue"
                      : "text-slate-600 hover:bg-slate-50 hover:text-sjcs-blue"
                  }`}
                  type="button"
                >
                  <span className="material-icons mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-auto border-t border-slate-200 px-4 py-6">
            <div className="flex items-center gap-3">
              <img
                alt="Admin profile"
                className="h-10 w-10 rounded-full border-2 border-sjcs-blue object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUZc_Qsz1u7LM9imaBWKc6z6dUtYpGyxMEKrxoVJecbEwTmK2Rs6bm1TvPd4J22simPVMWk7dak1BKanr3U7v1oynGSIlRJ7PLu46DVB6BXeSf9f8AeJ8kXjc6cpLNa7mXFtLDj5n3qus71JdiSJOpMNEeeK8lhwLakfGkU-GKmNe47RhbXWfvhl8VJQ5tgScs8d1NKn-PKtphCjd1Hw096orIQUHTqAUvz_8Nr16JBLf465wGBh0EdsxhEEDGRfoKkfBP2U7YnLy1"
              />
              <div>
                <p className="text-sm font-medium text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">View Profile</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-lg font-bold text-white">S</div>
              <span className="text-lg font-bold text-slate-800">SJCS</span>
            </div>
            <button className="text-slate-500" type="button">
              <span className="material-icons">menu</span>
            </button>
          </div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <nav className="mb-1 flex text-sm text-slate-500">
                  <span className="hover:text-sjcs-blue">Home</span>
                  <span className="material-icons mx-1 text-lg text-slate-400">chevron_right</span>
                  <span className="hover:text-sjcs-blue">Administration</span>
                  <span className="material-icons mx-1 text-lg text-slate-400">chevron_right</span>
                  <span className="font-medium text-slate-800">User Management</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">User Management</h1>
                <p className="mt-1 text-sm text-slate-500">Manage access, roles, and profiles for the SJCS portal.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50" type="button">
                  <span className="material-icons mr-2 text-lg">file_download</span>
                  Export
                </button>
                <button className="inline-flex items-center rounded-lg bg-sjcs-blue px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700" type="button">
                  <span className="material-icons mr-2 text-lg">add</span>
                  Add New User
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:w-96">
                  <span className="material-icons absolute left-3 top-2.5 text-slate-400">search</span>
                  <input
                    className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                    placeholder="Search by name, email, or ID..."
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                      value={roleFilter}
                      onChange={(event) => setRoleFilter(event.target.value)}
                    >
                      {["All Roles", "Student", "Teacher", "Parent", "Admin"].map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>
                    <span className="material-icons absolute right-2 top-2.5 text-lg text-slate-500">expand_more</span>
                  </div>
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                    >
                      {["All Status", "Active", "Inactive", "Suspended"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <span className="material-icons absolute right-2 top-2.5 text-lg text-slate-500">expand_more</span>
                  </div>
                  <button className="text-sm font-medium text-sjcs-blue hover:text-blue-700" type="button">
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input className="h-4 w-4 rounded border-slate-300 text-sjcs-blue" type="checkbox" />
                      </th>
                      {[
                        "User",
                        "Role",
                        "Status",
                        "Last Login"
                      ].map((label) => (
                        <th key={label} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {label}
                        </th>
                      ))}
                      <th className="px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <input className="h-4 w-4 rounded border-slate-300 text-sjcs-blue" type="checkbox" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {user.avatar ? (
                                <img alt="" className="h-10 w-10 rounded-full object-cover" src={user.avatar} />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                                  {user.name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">{user.name}</div>
                              <div className="text-sm text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge[user.role]}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium ${
                              statusBadge[user.status]
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{user.lastLogin}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-sjcs-blue" type="button">
                            <span className="material-icons">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">
                <div className="hidden sm:block">
                  <p className="text-sm text-slate-700">
                    Showing <span className="font-medium text-slate-900">1</span> to{" "}
                    <span className="font-medium text-slate-900">{filteredUsers.length}</span> of{" "}
                    <span className="font-medium text-slate-900">1,240</span> results
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50" type="button">
                    <span className="material-icons text-base">chevron_left</span>
                  </button>
                  <button className="rounded-lg border border-sjcs-blue bg-sjcs-blue/10 px-4 py-2 text-sm font-medium text-sjcs-blue" type="button">
                    1
                  </button>
                  <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 hover:bg-slate-50" type="button">
                    2
                  </button>
                  <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 hover:bg-slate-50" type="button">
                    3
                  </button>
                  <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50" type="button">
                    <span className="material-icons text-base">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
