import clsx from "clsx";

export const Button = ({ className, variant = "primary", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-sjcs-blue text-white hover:opacity-90 focus:ring-sjcs-blue/40",
    outline:
      "border border-sjcs-blue text-sjcs-blue hover:bg-sjcs-blue/10 focus:ring-sjcs-blue/40",
    ghost: "text-sjcs-blue hover:bg-sjcs-blue/10 focus:ring-sjcs-blue/40"
  };

  return <button className={clsx(base, variants[variant], className)} {...props} />;
};
