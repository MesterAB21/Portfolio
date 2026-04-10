"use client";

import { useEffect, useRef } from "react";

/**
 * Floating gradient orbs that slowly drift across the page
 * in the background, adding depth and atmosphere.
 * These are positioned fixed and z-indexed behind content.
 */
export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs: HTMLDivElement[] = [];

    const orbConfigs = [
      { color: "rgba(127, 119, 221, 0.04)", size: 500, x: "15%", y: "20%", duration: 25 },
      { color: "rgba(29, 158, 117, 0.03)", size: 400, x: "75%", y: "35%", duration: 30 },
      { color: "rgba(239, 159, 39, 0.03)", size: 350, x: "60%", y: "65%", duration: 28 },
      { color: "rgba(127, 119, 221, 0.03)", size: 450, x: "30%", y: "80%", duration: 32 },
      { color: "rgba(29, 158, 117, 0.025)", size: 300, x: "85%", y: "85%", duration: 22 },
    ];

    orbConfigs.forEach((config) => {
      const orb = document.createElement("div");
      Object.assign(orb.style, {
        position: "absolute",
        width: config.size + "px",
        height: config.size + "px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
        left: config.x,
        top: config.y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        animation: `float-orb ${config.duration}s ease-in-out infinite alternate`,
        willChange: "transform",
        filter: "blur(40px)",
      });
      container.appendChild(orb);
      orbs.push(orb);
    });

    return () => {
      orbs.forEach((orb) => {
        if (container.contains(orb)) container.removeChild(orb);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes float-orb {
          0% { transform: translate(-50%, -50%) translateY(0) translateX(0); }
          33% { transform: translate(-50%, -50%) translateY(-30px) translateX(15px); }
          66% { transform: translate(-50%, -50%) translateY(15px) translateX(-20px); }
          100% { transform: translate(-50%, -50%) translateY(-15px) translateX(10px); }
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      />
    </>
  );
}
