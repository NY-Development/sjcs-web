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
        </div>
      </div>
    </div>
  );
};

export default PortalHome;
