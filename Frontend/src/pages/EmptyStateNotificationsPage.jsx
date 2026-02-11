import { Link } from "react-router-dom";

const EmptyStateNotificationsPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sjcs-gray px-6 py-16">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-sjcs-soft">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sjcs-blue/10 text-sjcs-blue">
          <span className="material-icons text-4xl">notifications_off</span>
        </div>
        <h1 className="text-2xl font-bold text-sjcs-textPrimary">All caught up</h1>
        <p className="mt-3 text-sm text-sjcs-textSecondary">
          You have no new notifications right now. When updates arrive, they will appear here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white" to="/portal">
            Back to Portal
          </Link>
          <Link className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue" to="/mock-exams/results">
            View Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateNotificationsPage;
