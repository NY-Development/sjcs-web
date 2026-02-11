import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";

const fallbackStatus = {
  name: "Sarah Jenkins",
  email: "sarah.j@example.com",
  referenceId: "#TR-2023-8492",
  status: "Pending Approval",
  submittedAt: "Submitted today",
  nextStep: "Admin Review",
  activation: "Awaiting approval"
};

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state;

  const { data: statusData } = useQuery({
    queryKey: ["registration-status"],
    queryFn: async () => (await api.get("/registration/status")).data.data
  });

  const status = stateData || statusData || fallbackStatus;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sjcs-blue text-white font-bold">S</div>
          <span className="text-lg font-bold text-slate-900">Saint Joseph Catholic School</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
          <span>Need help?</span>
          <button className="text-sjcs-blue font-medium" type="button">
            Contact Support
          </button>
        </div>
      </nav>

      <main className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="h-2 w-full bg-gradient-to-r from-sjcs-blue/60 via-sjcs-blue to-blue-400" />
          <div className="p-8 sm:p-12">
            <div className="mb-10 text-center">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
                <div className="absolute inset-0 rounded-full border-4 border-green-100 opacity-50" />
                <span className="material-icons text-5xl">check_circle</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Registration Received</h1>
              <p className="mt-3 text-lg text-slate-500">
                Welcome to the SJCS family, <span className="font-semibold text-slate-900">{status.name}</span>.
                Your application has been successfully submitted.
              </p>
            </div>

            <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Current Status</p>
                  <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                    </span>
                    {status.status}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-slate-500">Reference ID</p>
                  <p className="font-mono text-slate-900 font-medium">{status.referenceId}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sjcs-blue text-white">
                    <span className="material-icons text-base">check</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sjcs-blue">Registration</p>
                    <p className="text-xs text-slate-500">{status.submittedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
                    <span className="material-icons text-base">sync</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{status.nextStep}</p>
                    <p className="text-xs text-amber-600">In Progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                    <span className="material-icons text-base">lock_open</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Activation</p>
                    <p className="text-xs text-slate-400">{status.activation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10 space-y-4">
              <div className="flex gap-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <span className="material-icons text-sjcs-blue">info</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">What happens next?</h3>
                  <p className="text-sm text-slate-600">
                    You will receive an email at <strong>{status.email}</strong> once your account is active (typically
                    within 24-48 hours).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                className="w-full rounded-lg bg-sjcs-blue px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/20"
                type="button"
                onClick={() => navigate("/")}
              >
                Return to Home Page
              </button>
              <button
                className="w-full rounded-lg border border-slate-200 bg-white px-8 py-3 font-semibold text-slate-700"
                type="button"
              >
                Contact IT Support
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              If you believe you've made a mistake in your registration, contact the IT office at
              <span className="underline"> support@sjcs.edu</span>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationSuccessPage;
