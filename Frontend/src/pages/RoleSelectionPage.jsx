import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore.js";
import { Container } from "../components/ui/Container.jsx";

const roles = [
  {
    value: "Student",
    title: "Student",
    description:
      "Access your grades, submit assignments, and view your personalized class schedule.",
    icon: "school"
  },
  {
    value: "Parent",
    title: "Parent / Guardian",
    description:
      "Monitor attendance, pay tuition securely, and track your student's academic progress.",
    icon: "family_restroom"
  },
  {
    value: "Teacher",
    title: "Teacher",
    description:
      "Manage classes, input grades, and communicate directly with students and parents.",
    icon: "cast_for_education",
    note: "* Identity verification required",
    badge: "Approval Req."
  }
];

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState("Student");
  const setRole = useAuthStore((state) => state.setRole);
  const navigate = useNavigate();

  const handleContinue = () => {
    setRole(selectedRole);
    // navigate(`/login?role=${encodeURIComponent(selectedRole)}`);
    navigate(`/registration/step-2?role=${encodeURIComponent(selectedRole)}`); // for the time being.
  };

  return (
    <div className="min-h-screen bg-sjcs-gray font-display text-sjcs-textPrimary">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-white shadow-sjcs-soft">
              SJ
            </div>
            <span className="text-xl font-bold">
              Saint Joseph <span className="text-sjcs-blue">Catholic School</span>
            </span>
          </div>
          <Link className="flex items-center gap-1 text-sm font-medium text-sjcs-textSecondary hover:text-sjcs-blue" to="/">
            <span className="material-icons text-base">help_outline</span>
            Need Help?
          </Link>
        </Container>
      </nav>

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl space-y-12">
          <div className="mx-auto w-full max-w-3xl">
            <ol className="flex items-center" role="list">
              {[1, 2, 3, 4].map((step) => (
                <li key={step} className={`relative ${step < 4 ? "pr-8 sm:pr-20" : ""}`}>
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${step === 1 ? "bg-sjcs-blue" : "bg-slate-200"}`} />
                  </div>
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      step === 1
                        ? "bg-sjcs-blue text-white"
                        : "border-2 border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    {step === 1 ? <span className="material-icons text-sm">person_outline</span> : step}
                  </div>
                  <span className={`absolute -bottom-8 left-1/2 w-max -translate-x-1/2 text-xs ${step === 1 ? "font-semibold text-sjcs-blue" : "text-slate-400"}`}>
                    {step === 1 ? "Role Selection" : step === 2 ? "Personal Info" : step === 3 ? "Credentials" : "Review"}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Select Your Role</h1>
            <p className="mx-auto max-w-2xl text-lg text-sjcs-textSecondary">
              Welcome to the Saint Joseph Catholic School portal. Please choose the account type
              that best describes you to begin registration.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.value}
                className={`group relative flex h-full flex-col items-center rounded-xl border-2 bg-white p-8 text-center shadow-sm transition-all ${
                  selectedRole === role.value
                    ? "border-sjcs-blue ring-1 ring-sjcs-blue"
                    : "border-transparent hover:border-sjcs-blue/30"
                }`}
                onClick={() => setSelectedRole(role.value)}
                type="button"
              >
                {role.badge ? (
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    <span className="material-icons mr-1 align-middle text-[12px]">admin_panel_settings</span>
                    {role.badge}
                  </div>
                ) : null}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sjcs-blue/10 text-sjcs-blue transition-transform group-hover:scale-110">
                  <span className="material-icons text-3xl">{role.icon}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold">{role.title}</h3>
                <p className="text-sm text-sjcs-textSecondary">{role.description}</p>
                {role.note ? (
                  <p className="mt-4 text-xs font-medium text-amber-600">{role.note}</p>
                ) : null}
                {selectedRole === role.value ? (
                  <span className="material-icons absolute right-4 top-4 text-sjcs-blue">check_circle</span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              className="group inline-flex min-w-[200px] items-center justify-center rounded-lg bg-sjcs-blue px-8 py-3.5 text-base font-semibold text-white transition hover:shadow-lg"
              onClick={handleContinue}
              type="button"
            >
              Continue
              <span className="material-icons ml-2 text-xl transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="text-center text-sm text-sjcs-textSecondary">
            Already have an account?
            <Link className="ml-1 font-medium text-sjcs-blue hover:underline" to="/login">
              Log in here
            </Link>
          </div>
        </div>
      </main>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sjcs-blue/10 via-sjcs-blue/40 to-sjcs-blue/10" />
    </div>
  );
};

export default RoleSelectionPage;
