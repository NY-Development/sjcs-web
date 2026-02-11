export const PageError = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sjcs-gray px-6">
      <div className="max-w-xl rounded-2xl bg-white p-8 shadow-sjcs-soft">
        <h1 className="text-2xl font-semibold text-sjcs-textPrimary">Something went wrong</h1>
        <p className="mt-2 text-sm text-sjcs-textSecondary">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          onClick={resetErrorBoundary}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
};
