import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";

const RegistrationStepTwoPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const [statusMessage, setStatusMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload) => (await api.post("/registration/step-2", payload)).data.data,
    onSuccess: (data) => {
      setStatusMessage("");
      navigate("/registration/success", { state: data });
    },
    onError: () => setStatusMessage("Unable to complete registration. Please try again.")
  });

  const updateField = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage("");
    if (formState.password !== formState.confirmPassword) {
      setStatusMessage("Passwords do not match.");
      return;
    }
    if (!formState.acceptTerms) {
      setStatusMessage("Please accept the terms to continue.");
      return;
    }
    mutation.mutate(formState);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans text-slate-800">
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#135bec 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="pointer-events-none absolute -bottom-20 -right-20 text-sjcs-blue/10">
        <span className="material-icons text-[400px]">school</span>
      </div>

      <div className="z-10 w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-sjcs-blue to-red-600 text-white shadow-lg">
            <span className="material-icons text-4xl">local_library</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Saint Joseph Catholic School</h1>
          <p className="mt-2 text-slate-500">Student Management Portal</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Complete Registration</h2>
              <p className="text-xs text-slate-500">Enter your personal details below</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-sjcs-blue/10 px-2 py-1 text-xs font-semibold text-sjcs-blue">Step 2 of 2</span>
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-slate-300" />
                <div className="h-2 w-2 rounded-full bg-sjcs-blue" />
              </div>
            </div>
          </div>
          <form className="space-y-5 p-8" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="material-icons absolute left-3 top-2.5 text-xl text-slate-400">person_outline</span>
                <input
                  id="fullName"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-sjcs-blue"
                  placeholder="e.g. Johnathan Doe"
                  value={formState.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-icons absolute left-3 top-2.5 text-xl text-slate-400">mail_outline</span>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-sjcs-blue"
                    placeholder="student@sjcs.edu"
                    value={formState.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="material-icons absolute left-3 top-2.5 text-xl text-slate-400">phone_iphone</span>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-sjcs-blue"
                    placeholder="(555) 123-4567"
                    value={formState.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Create Password
              </label>
              <div className="relative">
                <span className="material-icons absolute left-3 top-2.5 text-xl text-slate-400">lock_outline</span>
                <input
                  id="password"
                  type="password"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-sjcs-blue"
                  placeholder="Min. 8 characters"
                  value={formState.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  required
                />
              </div>
              <div className="mt-1 flex h-1 gap-1">
                <div className="h-full w-1/4 rounded-full bg-green-500" />
                <div className="h-full w-1/4 rounded-full bg-green-500" />
                <div className="h-full w-1/4 rounded-full bg-slate-200" />
                <div className="h-full w-1/4 rounded-full bg-slate-200" />
              </div>
              <p className="pt-0.5 text-right text-[10px] text-slate-500">Moderate</p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-icons absolute left-3 top-2.5 text-xl text-slate-400">lock_reset</span>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-sjcs-blue"
                  placeholder="Re-enter password"
                  value={formState.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 text-sm">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sjcs-blue"
                checked={formState.acceptTerms}
                onChange={(event) => updateField("acceptTerms", event.target.checked)}
              />
              <label className="text-slate-600" htmlFor="terms">
                I agree to the <span className="text-sjcs-blue underline">Terms & Conditions</span> and
                <span className="text-sjcs-blue underline"> Privacy Policy</span>.
              </label>
            </div>

            {statusMessage ? <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{statusMessage}</div> : null}

            <button
              className="group relative mt-4 w-full overflow-hidden rounded-lg p-0.5 shadow-lg shadow-blue-500/20"
              type="submit"
              disabled={mutation.isLoading}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-sjcs-blue" />
              <span className="relative flex items-center justify-center gap-2 rounded-[inherit] bg-transparent py-3.5 text-base font-bold text-white">
                {mutation.isLoading ? "Creating..." : "Create Account"}
                <span className="material-icons text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </span>
            </button>
          </form>
          <div className="border-t border-slate-100 bg-slate-50 px-8 py-4 text-center text-sm text-slate-600">
            Need to correct something? <span className="font-semibold text-sjcs-blue">Go Back to Step 1</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © 2023 Saint Joseph Catholic School. Need help? <span className="underline">Contact Administration</span>.
        </p>
      </div>
    </div>
  );
};

export default RegistrationStepTwoPage;
