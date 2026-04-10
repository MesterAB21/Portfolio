import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "outline" | "ghost";
};

const variants = {
  primary:
    "bg-accent text-base hover:bg-accent/90",
  outline:
    "border border-border-custom text-text-1 hover:border-accent hover:text-accent",
  ghost: "text-text-2 hover:text-accent",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-syne font-semibold rounded-lg transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-syne font-semibold rounded-lg transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
