"use client";

import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative flex items-center justify-center p-6"
      style={{
        backgroundColor: "#0A0A0F",
        borderTop: "1px solid #2A2A38",
      }}
    >
      <div className="max-w-6xl w-full mx-auto flex items-center justify-center relative">
        <p
          className="text-center font-mono"
          style={{
            fontSize: "12px",
            color: "#5A5A6E",
          }}
        >
          Built by Hamaidi Abderrahmane · 2025 · Next.js + Tailwind + Framer Motion
        </p>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="absolute right-0 flex items-center justify-center transition-colors group"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid #2A2A38",
            color: "#5A5A6E",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7F77DD";
            e.currentTarget.style.color = "#7F77DD";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2A2A38";
            e.currentTarget.style.color = "#5A5A6E";
          }}
        >
          <ChevronUp size={20} className="transition-colors" />
        </button>
      </div>
    </footer>
  );
}
