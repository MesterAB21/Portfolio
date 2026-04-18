"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionDivider from "../ui/SectionDivider";
import SectionLabel from "../ui/SectionLabel";
import StatCard from "../ui/StatCard";

export default function About() {
  const stats = [
    { value: "2+", label: "Year coding", color: "#7F77DD" },
    { value: "10+", label: "Project", color: "#EF9F27" },
    { value: "3+", label: "Model deployed", color: "#1D9E75" },
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
            className="w-full md:w-[50%] flex flex-col"
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
                I&apos;m a full stack developer based in Algeria, driven by one question:
                what happens when great engineering meets intelligent systems?
              </p>
              <p
                className="text-text-2"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
               I’m a passionate builder dedicated to turning ideas into impactful digital products. I focus on creating scalable solutions that help businesses streamline operations, leverage data, and bring innovative concepts to life.
              </p>
              <p
                className="text-text-2"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                Driven by curiosity and a commitment to excellence, I enjoy solving complex problems and transforming them into intuitive, real-world experiences. My goal is to create technology that not only works seamlessly but also delivers meaningful value and lasting impact.
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

          {/* RIGHT COLUMN — Photo & Stats Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="w-full md:w-[50%] flex flex-col gap-10"
          >
            {/* Animated Photo Container */}
            <motion.div 
              variants={itemVariants}
              className="relative w-full max-w-[360px] aspect-square mx-auto lg:mx-0 group"
            >
              {/* Continuous Floating & Rotating Animation */}
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 2, -2, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full relative z-10"
              >
                {/* Decorative Glowing Backdrop */}
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl group-hover:bg-accent/30 transition-colors duration-500 -z-10" />
                
                {/* Offset Rotating Border Graphic */}
                <div className="absolute inset-0 border border-accent/40 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 z-0" />
                <div className="absolute inset-0 border border-[#1D9E75]/40 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 z-0" />

                {/* Main Photo Box */}
                <div className="w-full h-full bg-[#0A0A0F] border border-[#2A2A38] rounded-2xl flex items-center justify-center overflow-hidden relative z-10 group-hover:border-accent/50 transition-colors duration-500">
                  <Image 
                    src="/images/IMG_20260320_004003_009.jpg" 
                    alt="Hamaidi Abderrahmane" 
                    width={600} 
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
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
