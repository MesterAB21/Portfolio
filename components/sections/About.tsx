"use client";

import { motion } from "framer-motion";
import SectionDivider from "../ui/SectionDivider";
import SectionLabel from "../ui/SectionLabel";
import StatCard from "../ui/StatCard";

export default function About() {
  const stats = [
    { value: "3+", label: "Years coding", color: "#7F77DD" },
    { value: "15+", label: "Projects built", color: "#EF9F27" },
    { value: "5+", label: "ML models deployed", color: "#1D9E75" },
    { value: "3", label: "Domains mastered", color: "#7F77DD" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="overflow-hidden w-full relative">
      {/* Parallax Background Number */}
      <div
        data-section-number
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(200px, 30vw, 400px)",
          fontWeight: 900,
          fontFamily: "var(--font-syne), sans-serif",
          color: "transparent",
          WebkitTextStroke: "1px rgba(127, 119, 221, 0.06)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          opacity: 0,
        }}
      >
        01
      </div>

      <div
        className="mx-auto w-full relative z-10"
        style={{
          padding: "clamp(80px, 12vh, 140px) 0",
          maxWidth: "1200px",
          paddingLeft: "clamp(20px, 5vw, 80px)",
          paddingRight: "clamp(20px, 5vw, 80px)",
        }}
      >
        <SectionDivider />

        <div className="flex flex-col md:flex-row gap-[48px] md:gap-[80px] items-start md:items-center">
          {/* LEFT COLUMN — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-[58%] flex flex-col"
          >
            <SectionLabel text="ABOUT ME" />

            <h2
              className="font-syne font-semibold text-text-1 mb-[24px]"
              data-animate="fade-up"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
              }}
            >
              I don&apos;t just write code.
              <br />I build things that think.
            </h2>

            <div className="flex flex-col gap-[16px] mb-[32px]" data-animate="stagger-children">
              <p
                className="text-text-2"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                I&apos;m a developer based in Algeria, driven by one question:
                what happens when great engineering meets intelligent systems?
              </p>
              <p
                className="text-text-2"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                I build across the full stack — from pixel-perfect React
                interfaces to Python backends and machine learning pipelines in
                production.
              </p>
              <p
                className="text-text-2"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                I care about work that ships, scales, and actually solves
                something. If you have a hard problem, I want to hear about it.
              </p>
            </div>

            {/* Availability badge */}
            <div className="self-start inline-flex items-center gap-[8px] bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-full px-[16px] py-[8px]">
              <div
                className="w-[8px] h-[8px] rounded-full bg-[#1D9E75]"
                style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
              />
              <span
                className="font-mono text-[13px] text-[#1D9E75]"
              >
                Available for freelance &amp; collaboration
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Stats Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="w-full md:w-[42%]"
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="grid grid-cols-2 gap-[16px]"
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    color={stat.color}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
