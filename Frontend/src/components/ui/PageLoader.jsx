export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sjcs-gray">
      <div className="flex flex-col items-center gap-3 text-sjcs-textSecondary">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sjcs-blue/30 border-t-sjcs-blue" />
        <span className="text-sm font-medium">Loading SJCS Portal...</span>
      </div>
    </div>
  );
};
