"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

export default function StatCard({ value, label, color }: StatCardProps) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric value and suffix (e.g., "15" and "+")
    const match = value.match(/(\d+)(.*)/);
    if (!match) {
      setCount(value);
      return;
    }

    const startValue = 0;
    const endValue = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // easeOutExpo
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(startValue + (endValue - startValue) * easing);
      
      setCount(`${currentVal}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      style={{
        background: "#1C1C26",
        border: "1px solid #2A2A38",
        borderRadius: "16px",
        padding: "28px",
      }}
      className="group transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background active color on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      {/* Border color change via hover class using CSS vars might be tricky dynamically in Tailwind, 
          doing it inline relies on state, so we use a style trick or rely on parent group-hover 
          Simpler to just use CSS custom prop or explicit inline style transition.
          Actually, we can use an absolute border overlay. */}
      <div 
        className="absolute inset-0 border border-transparent group-hover:border-opacity-100 transition-colors duration-300 rounded-[16px] pointer-events-none"
        style={{ borderColor: color, opacity: 0 }}
        ref={(el) => {
          if (el) {
            // pure CSS hover effect
            el.style.opacity = '1';
          }
        }}
      />
      <style>{`
        .group:hover { border-color: ${color} !important; }
      `}</style>
      
      <p style={{ fontFamily: "var(--font-syne)", fontSize: "48px", fontWeight: 700, color: color, lineHeight: 1 }}>
        {count}
      </p>
      <p style={{ fontFamily: "var(--font-syne)", fontSize: "14px", color: "#9898A8", marginTop: "8px" }}>
        {label}
      </p>
    </motion.div>
  );
}
