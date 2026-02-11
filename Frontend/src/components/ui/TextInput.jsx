import clsx from "clsx";

export const TextInput = ({ label, error, className, ...props }) => {
  return (
    <label className="block text-sm font-medium text-sjcs-textSecondary">
      <span className="mb-2 block text-sjcs-textPrimary">{label}</span>
      <input
        className={clsx(
          "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-sjcs-textPrimary shadow-sm focus:border-sjcs-blue focus:outline-none focus:ring-2 focus:ring-sjcs-blue/20",
          error && "border-sjcs-danger focus:border-sjcs-danger focus:ring-sjcs-danger/30",
          className
        )}
        {...props}
      />
      {error ? <span className="mt-2 block text-xs text-sjcs-danger">{error}</span> : null}
    </label>
  );
};
