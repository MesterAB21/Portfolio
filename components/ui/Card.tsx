import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-border-custom p-6 ${
        hover ? "hover:border-accent/40 transition-colors duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
