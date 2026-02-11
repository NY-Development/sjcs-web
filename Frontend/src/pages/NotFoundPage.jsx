import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sjcs-gray px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sjcs-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sjcs-blue">404</p>
        <h1 className="mt-3 text-3xl font-bold text-sjcs-textPrimary">This page is missing</h1>
        <p className="mt-3 text-sm text-sjcs-textSecondary">
          The link may be broken or the page has moved. Try heading back to the portal to continue.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white" to="/portal">
            Back to Portal
          </Link>
          <Link className="rounded-lg border border-sjcs-blue px-4 py-2 text-sm font-semibold text-sjcs-blue" to="/">
            Go to Landing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
