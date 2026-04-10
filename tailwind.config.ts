import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0A0F",
        surface: "#13131A",
        "surface-2": "#1C1C26",
        "border-custom": "#2A2A38",
        accent: "#7F77DD",
        ai: "#1D9E75",
        highlight: "#EF9F27",
        "text-1": "#E8E8F0",
        "text-2": "#9898A8",
        "text-3": "#5A5A6E",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
