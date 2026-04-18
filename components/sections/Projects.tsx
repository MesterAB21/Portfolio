"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Video, Linkedin } from "lucide-react";
import Image from "next/image";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

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
                  onClick={() => setSelectedProject(project)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-[20px] md:p-[40px]"
            style={{ background: "rgba(10, 10, 15, 0.7)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 280, damping: 25, mass: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#13131A] border border-[#2A2A38] rounded-[24px] shadow-2xl flex flex-col scroll-smooth pointer-events-auto"
              style={{
                boxShadow: `0 0 100px ${selectedProject.color}33`,
              }}
            >
              {/* Modal Banner */}
              <div 
                className="w-full h-[450px] shrink-0 relative flex flex-col justify-end p-[32px]"
              >
                <Image 
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover opacity-80"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13131A] via-[#13131A]/20 to-transparent" />
                
                {/* Solid Colored Badge */}
                <div 
                  className="px-[14px] py-[6px] rounded-[6px] mb-[16px] self-start shadow-md"
                  style={{ backgroundColor: selectedProject.color }}
                >
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">{selectedProject.type}</span>
                </div>
                <h3 className="font-syne font-bold text-[#E8E8F0] text-[36px] md:text-[48px] leading-tight">
                  {selectedProject.title}
                </h3>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-[24px] right-[24px] w-[36px] h-[36px] rounded-full bg-[#0A0A0F]/50 flex items-center justify-center text-[#9898A8] hover:text-[#E8E8F0] hover:bg-[#2A2A38] transition-colors z-20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-[32px] flex flex-col gap-[32px]">
                {/* Role & Date */}
                <div className="flex flex-wrap items-center gap-[12px]">
                  <span className="font-mono text-[13px] text-[#A0A0B0] bg-[#2A2A38]/50 px-[12px] py-[6px] rounded-full">
                    {selectedProject.role}
                  </span>
                </div>

                {/* What it does */}
                <div>
                  <h4 className="font-syne font-semibold text-[#E8E8F0] text-[18px] mb-[12px]">What it does</h4>
                  <p className="font-syne text-[#A0A0B0] text-[15px] leading-[1.7]">
                    {selectedProject.whatItDoes}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-syne font-semibold text-[#E8E8F0] text-[16px] mb-[12px]">Tech Stack</h4>
                  <div className="flex flex-wrap gap-[8px]">
                    {selectedProject.tags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-[16px] pt-[24px] border-t border-[#2A2A38]">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] bg-[#2A2A38] text-[#E8E8F0] hover:bg-[#3A3A4A] transition-colors font-syne font-medium text-[14px]">
                      <Github size={18} />
                      Source Code
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] text-[#0A0A0F] transition-opacity hover:opacity-90 font-syne font-medium text-[14px]" style={{ background: selectedProject.color }}>
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.videoUrl && (
                    <a href={selectedProject.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] transition-opacity hover:opacity-90 font-syne font-medium text-[14px] text-white" style={{ background: selectedProject.color }}>
                      <Video size={18} />
                      Walkthrough
                    </a>
                  )}
                  {selectedProject.linkedinUrl && (
                    <a href={selectedProject.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] border border-[#2A2A38] text-[#E8E8F0] hover:bg-[#2088ff20] hover:border-[#2088ff] transition-colors font-syne font-medium text-[14px]">
                      <Linkedin size={18} />
                      Post
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, isFeatured, index, onClick }: { project: Project; isFeatured: boolean; index: number; onClick: () => void }) {
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
      layoutId={`card-${project.id}`}
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
      onClick={onClick}
      className={`relative overflow-hidden rounded-[16px] bg-[#13131A] border border-[#2A2A38] cursor-pointer group ${isFeatured ? "col-span-1 md:col-span-2 h-[420px]" : "col-span-1 h-[300px]"
        }`}
      style={{ perspective: "1000px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent z-0" />
      </div>

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
      <div className="absolute bottom-0 left-0 right-0 p-[24px] pb-[72px] flex flex-col items-start z-10 pointer-events-none">
        {/* Solid Colored Badge */}
        <div 
          className="px-[12px] py-[6px] rounded-[6px] mb-[10px] shadow-sm"
          style={{ backgroundColor: project.color }}
        >
          <span className="font-mono text-[10px] font-black text-white uppercase tracking-widest">{typeDisplay}</span>
        </div>

        {/* Title */}
        <h3
          className="font-syne font-bold text-[#E8E8F0] mt-[8px]"
          style={{ fontSize: isFeatured ? "36px" : "26px" }}
        >
          {project.title}
        </h3>

        {/* Problem Statement */}
        <p className="font-syne text-[14px] text-[#B8B8C8] mt-[6px] leading-[1.5]">
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
      <div className="absolute top-[20px] right-[20px] flex items-center gap-[10px] z-20 pointer-events-auto">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-[44px] h-[44px] rounded-full bg-[#0A0A0F]/60 border border-[#2A2A38] flex items-center justify-center text-[#9898A8] hover:bg-[#E8E8F0] hover:text-[#0A0A0F] transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm">
            <Github size={22} />
          </a>
        )}
        {project.videoUrl && (
          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-[44px] h-[44px] rounded-full bg-[#0A0A0F]/60 border border-[#2A2A38] flex items-center justify-center text-[#9898A8] hover:bg-[#E8E8F0] hover:text-[#0A0A0F] transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm">
            <Video size={22} />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-[44px] h-[44px] rounded-full bg-[#0A0A0F]/60 border border-[#2A2A38] flex items-center justify-center text-[#9898A8] hover:bg-[#E8E8F0] hover:text-[#0A0A0F] transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm">
            <ExternalLink size={22} />
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
