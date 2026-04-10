"use client";

import SectionLabel from "../ui/SectionLabel";
import { skillTracks } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-[clamp(80px,12vh,140px)] w-full overflow-hidden bg-base relative">
      {/* Parallax Background Number */}
      <div
        data-section-number
        style={{
          position: "absolute",
          top: "50%",
          left: "-5%",
          transform: "translateY(-50%)",
          fontSize: "clamp(200px, 30vw, 400px)",
          fontWeight: 900,
          fontFamily: "var(--font-syne), sans-serif",
          color: "transparent",
          WebkitTextStroke: "1px rgba(29, 158, 117, 0.06)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          opacity: 0,
        }}
      >
        03
      </div>

      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,80px)] xl:px-0 mb-[64px] relative z-10">
        <SectionLabel text="TECHNOLOGIES & TOOLS" />
        <h2 className="font-syne font-semibold text-text-1 text-[clamp(28px,4vw,44px)] leading-tight mb-[16px]">
          What I build with
        </h2>
        <p className="font-syne text-[16px] text-[#9898A8] max-w-2xl">
          I select tools that optimize for speed, scale, and intelligence. Below is my evolving ecosystem of frameworks, languages, and platforms.
        </p>
      </div>

      <div className="flex flex-col gap-[32px] w-full relative pt-4 pb-4 z-10">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[10vw] md:w-[20vw] bg-gradient-to-r from-[#0A0A0F] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[10vw] md:w-[20vw] bg-gradient-to-l from-[#0A0A0F] to-transparent z-20 pointer-events-none" />

        {skillTracks.map((track, trackIndex) => {
          // Odd rows go left, Even rows go right
          const isReversed = trackIndex % 2 !== 0;
          const animationClass = isReversed ? "animate-marquee-right" : "animate-marquee-left";

          return (
            <div
              key={track.id}
              data-animate="track"
              className="w-full overflow-hidden marquee-container flex group"
            >
              {/* Duplicate the list twice for infinite smooth scrolling */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center shrink-0 gap-[24px] px-[12px] ${animationClass} group-hover:[animation-play-state:paused]`}
                  style={{ width: "max-content" }}
                >
                  {/* Category Lead Label - moving WITH the skills */}
                  <div className="flex items-center gap-[16px] mr-[32px]">
                    <div
                      className="w-[12px] h-[12px] rounded-full"
                      style={{
                        backgroundColor: track.color,
                        boxShadow: `0 0 15px ${track.color}, 0 0 30px ${track.color}`
                      }}
                    />
                    <span
                      className="font-syne font-bold text-[28px] md:text-[36px] uppercase tracking-tighter"
                      style={{
                        color: track.color,
                        textShadow: `0 0 20px ${track.color}40`
                      }}
                    >
                      {track.category}
                    </span>
                    {/* The requested "Innovative Spacer" */}
                    <div
                      className="h-[2px] w-[60px] md:w-[120px] opacity-40 ml-[8px]"
                      style={{
                        background: `linear-gradient(to right, ${track.color}, transparent)`
                      }}
                    />
                  </div>

                  {/* Skills Pills */}
                  {track.skills.map((skill, index) => (
                    <div
                      key={`${track.id}-${skill.name}-${index}`}
                      className="px-[24px] py-[14px] rounded-full border border-[#2A2A38] bg-[#1C1C26] transition-all duration-300 hover:border-[var(--hover-color)] hover:shadow-[var(--hover-glow)] hover:-translate-y-1 cursor-crosshair box-border shrink-0"
                      style={{
                        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                        "--hover-color": track.color,
                        "--hover-glow": `0 4px 12px ${track.color}40`
                      } as React.CSSProperties}
                    >
                      <span className="font-mono text-[14px] text-[#E8E8F0] whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}

                  {/* Spacer between loops */}
                  <div className="w-[100px] h-px" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
