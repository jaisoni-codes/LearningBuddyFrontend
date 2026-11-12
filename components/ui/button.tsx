import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 rounded-field font-bold transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "h-12 px-5 bg-accent text-white hover:bg-accent-strong",
  quiet: "h-9 px-2 text-accent hover:bg-accent-wash",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
