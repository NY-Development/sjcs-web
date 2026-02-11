import clsx from "clsx";

export const Container = ({ className, ...props }) => {
  return <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
};
