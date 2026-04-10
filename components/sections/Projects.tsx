"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import TechTag from "../ui/TechTag";
import { projects, Project } from "../../data/projects";

type FilterType = "All" | "Web" | "AI/ML" | "Data" | "Automation";

const filters: FilterType[] = ["All", "Web", "AI/ML", "Data", "Automation"];

const getFilterKeyword = (filter: FilterType): string => {
  switch (filter) {
    case "Web": return "web";
    case "AI/ML": return "ai-ml";
    case "Data": return "data";
    case "Automation": return "automation";
    default: return "all";
  }
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.type === getFilterKeyword(activeFilter);
  });

  return (
    <section id="projects" className="py-[clamp(80px,12vh,140px)] w-full relative overflow-hidden">
      {/* Parallax Background Number */}
      <div
        data-section-number
        style={{
          position: "absolute",
          top: "50%",
          right: "-5%",
          transform: "translateY(-50%)",
          fontSize: "clamp(200px, 30vw, 400px)",
          fontWeight: 900,
          fontFamily: "var(--font-syne), sans-serif",
          color: "transparent",
          WebkitTextStroke: "1px rgba(239, 159, 39, 0.06)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          opacity: 0,
        }}
      >
        02
      </div>

      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,80px)] relative z-10">

        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[32px] mb-[64px]">
          <div>
            <SectionLabel text="SELECTED WORK" />
            <h2 className="font-syne font-semibold text-text-1 text-[clamp(28px,4vw,44px)] leading-tight">
              Featured projects
            </h2>
          </div>

          {/* Filter Bar */}
          <ul className="flex flex-wrap items-center gap-[16px] border-b border-[#2A2A38]">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <li key={filter} className="relative">
                  <button
                    onClick={() => setActiveFilter(filter)}
                    className={`font-syne font-medium text-[14px] pb-[12px] transition-colors relative z-10 ${isActive ? "text-[#E8E8F0]" : "text-[#5A5A6E] hover:text-[#9898A8]"
                      }`}
                  >
                    {filter}
                  </button>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-accent z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-[20px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFeatured = project.featured && activeFilter === "All";
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFeatured={isFeatured}
                  index={index}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isFeatured, index }: { project: Project; isFeatured: boolean; index: number }) {
  // Normalize type string for UI
  const typeDisplay = {
    "web": "WEB",
    "ai-ml": "AI/ML",
    "data": "DATA",
    "automation": "AUTOMATION"
  }[project.type];

  return (
    <motion.div
      layout
      data-animate="card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        delay: index * 0.08 // Stagger entry
      }}
      whileHover="hovered"
      className={`relative overflow-hidden rounded-[16px] bg-[#13131A] border border-[#2A2A38] cursor-pointer group ${isFeatured ? "col-span-1 md:col-span-2 h-[380px]" : "col-span-1 h-[260px]"
        }`}
      style={{ perspective: "1000px" }}
    >
      {/* Background active color on hover & Shadow */}
      <motion.div
        variants={{ hovered: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none rounded-[16px] transition-colors"
        style={{
          borderColor: project.color,
          borderWidth: "1px",
          borderStyle: "solid",
          boxShadow: `0 0 30px ${project.color}26` // Math.round(0.15 * 255).toString(16) => ~26
        }}
      // Using framer motion variant propagation to handle the border and shadow gracefully
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0F] to-transparent z-0 pointer-events-none" />

      {/* Persistent Content */}
      <div className="absolute bottom-0 left-0 right-0 p-[24px] flex flex-col items-start z-10 pointer-events-none">
        {/* Type Badge */}
        <div
          className="font-mono text-[11px] px-[10px] py-[4px] rounded-[4px] border"
          style={{
            borderColor: project.color,
            color: project.color,
            backgroundColor: `${project.color}4D` // ~30% opacity
          }}
        >
          {typeDisplay}
        </div>

        {/* Title */}
        <h3
          className="font-syne font-semibold text-[#E8E8F0] mt-[8px]"
          style={{ fontSize: isFeatured ? "32px" : "22px" }}
        >
          {project.title}
        </h3>

        {/* Problem Statement */}
        <p className="font-syne text-[14px] text-[#9898A8] mt-[6px] leading-[1.5]">
          {project.problem}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-[8px] mt-[16px]">
          {project.tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="absolute top-[24px] right-[24px] flex items-center gap-[12px] z-20">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#5A5A6E] hover:text-[#E8E8F0] transition-colors">
            <Github size={16} />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#5A5A6E] hover:text-[#E8E8F0] transition-colors">
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      {/* Hover Impact Overlay */}
      <motion.div
        variants={{
          hovered: { opacity: 1, y: 0 }
        }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-[20px_24px] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(transparent, rgba(10,10,15,0.98))"
        }}
      >
        <p
          className="font-mono text-[13px] font-medium"
          style={{ color: project.color }}
        >
          {project.impact}
        </p>
      </motion.div>
    </motion.div>
  );
}
