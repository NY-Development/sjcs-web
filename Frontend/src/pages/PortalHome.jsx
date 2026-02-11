import { Link } from "react-router-dom";
import { useAuthStore } from "../lib/authStore.js";

const PortalHome = () => {
  const { user, role } = useAuthStore();

  return (
    <div className="min-h-screen bg-sjcs-gray px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 shadow-sjcs-soft">
        <h1 className="text-3xl font-semibold text-sjcs-textPrimary">Welcome to SJCS</h1>
        <p className="mt-3 text-sjcs-textSecondary">
          {user ? `Signed in as ${user.email}` : "Authenticated user"} · Role: {role || "Unknown"}
        </p>
        <p className="mt-6 text-sm text-sjcs-textSecondary">
          Dashboard modules are coming next. Pick another route to continue the build-out.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white"
            to="/"
          >
            Back to Landing
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/login"
          >
            Login Screen
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/student"
          >
            Student Dashboard
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/teacher"
          >
            Teacher Dashboard
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/admin"
          >
            Admin Dashboard
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/parent"
          >
            Parent Dashboard
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/grades"
          >
            Academic Grades
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/attendance"
          >
            Attendance Calendar
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/payments"
          >
            Payments & Finance
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/mock-exams"
          >
            Mock Exams Portal
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/mock-exams/results"
          >
            Mock Exam Results
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/materials"
          >
            Learning Materials Library
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/materials/upload"
          >
            Upload Learning Materials
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/study-hub"
          >
            Study Intelligence Hub
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/clubs"
          >
            Clubs & Activities
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/clubs/robotics"
          >
            Club Detail (Robotics)
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/kanban"
          >
            Group Projects Kanban
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/admin/users"
          >
            User Management
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/admin/configuration"
          >
            Admin System Configuration
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/admin/management"
          >
            Admin Management Dashboard
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/admin/finance"
          >
            Admin Payment Collection
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/admin/reports"
          >
            Institutional Reports
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/settings/profile"
          >
            User Profile
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/settings/security"
          >
            Account Security Settings
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/settings/notifications"
          >
            Notification Preferences
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/registration/step-2"
          >
            Registration Step 2
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/registration/success"
          >
            Registration Success
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/empty/grades"
          >
            Empty State (Grades)
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/empty/materials"
          >
            Empty State (Materials)
          </Link>
          <Link
            className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue"
            to="/empty/notifications"
          >
            Empty State (Notifications)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortalHome;
