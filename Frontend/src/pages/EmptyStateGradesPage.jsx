import { Link } from "react-router-dom";

const EmptyStateGradesPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sjcs-gray px-6 py-16">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-sjcs-soft">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sjcs-blue/10 text-sjcs-blue">
          <span className="material-icons text-4xl">school</span>
        </div>
        <h1 className="text-2xl font-bold text-sjcs-textPrimary">No grades posted yet</h1>
        <p className="mt-3 text-sm text-sjcs-textSecondary">
          Your teachers have not published grades for this term. Check back soon or review your upcoming mock exams.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white" to="/mock-exams">
            View Mock Exams
          </Link>
          <Link className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue" to="/portal">
            Back to Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateGradesPage;
