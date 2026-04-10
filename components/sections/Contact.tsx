"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const getError = (field: string) => {
    if (!touched[field]) return "";
    if (field === "name" && !formData.name.trim()) return "Name is required.";
    if (field === "email") {
      if (!formData.email.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Enter a valid email.";
    }
    if (field === "message" && !formData.message.trim()) return "Message is required.";
    return "";
  };

  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = !getError("name") && !getError("email") && !getError("message") &&
    formData.name && formData.email && formData.message;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-32 px-6 flex flex-col items-center">
      <style>{`
        .contact-input {
          width: 100%;
          background: #0A0A0F;
          border: 1px solid #2A2A38;
          border-radius: 10px;
          padding: 14px 16px;
          color: #E8E8F0;
          font-family: var(--font-syne), sans-serif;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-input:focus {
          border-color: #7F77DD;
          outline: none;
          box-shadow: 0 0 0 3px rgba(127,119,221,0.15);
        }
        .contact-input.error {
          border-color: #D85A30;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top-color: #0A0A0F;
          border-right-color: #0A0A0F;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="w-full max-w-[600px] mx-auto">
        <p className="font-mono text-sm tracking-widest uppercase mb-3 text-center" style={{ color: "var(--text-3)" }}>
          CONTACT
        </p>
        <h2
          className="font-syne text-center mb-4 text-text-1 leading-tight"
          style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600 }}
        >
          Let&apos;s build something.
        </h2>
        <p className="text-center mb-12" style={{ fontSize: "16px", color: "#9898A8" }}>
          Open to freelance projects, full-time roles, and interesting collaborations.
        </p>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-surface border border-border-custom rounded-2xl"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ border: "2px solid #1D9E75" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M20 6L9 17L4 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </svg>
            </div>
            <p className="font-syne text-text-1 text-center" style={{ fontSize: "18px" }}>
              Message sent. I&apos;ll reply within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="Your name"
                className={`contact-input ${getError("name") ? "error" : ""}`}
              />
              {getError("name") && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[#D85A30]" style={{ fontSize: "13px" }}>
                  {getError("name")}
                </motion.div>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="your@email.com"
                className={`contact-input ${getError("email") ? "error" : ""}`}
              />
              {getError("email") && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[#D85A30]" style={{ fontSize: "13px" }}>
                  {getError("email")}
                </motion.div>
              )}
            </div>

            <div>
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="What are you working on?"
                className="contact-input"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                placeholder="Tell me more"
                rows={4}
                className={`contact-input resize-none flex ${getError("message") ? "error" : ""}`}
              />
              {getError("message") && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[#D85A30]" style={{ fontSize: "13px" }}>
                  {getError("message")}
                </motion.div>
              )}
            </div>

            {status === "error" && (
              <p className="text-[#D85A30] text-sm text-center">Something went wrong. Please try again.</p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              className="w-full mt-2 flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: "#7F77DD",
                color: "#0A0A0F",
                padding: "16px",
                borderRadius: "10px",
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") e.currentTarget.style.background = "#534AB7";
              }}
              onMouseLeave={(e) => {
                if (status !== "sending") e.currentTarget.style.background = "#7F77DD";
              }}
            >
              {status === "sending" ? <div className="spinner" /> : "Submit"}
            </motion.button>
          </form>
        )}

        <div className="mt-16 flex flex-col items-center">
          <p className="mb-8" style={{ fontSize: "12px", color: "#5A5A6E" }}>
            — or reach me directly —
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <Github size={24} className="text-text-2 group-hover:text-accent transition-colors" />
              <span className="font-mono text-xs text-text-3 group-hover:text-accent transition-colors">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <Linkedin size={24} className="text-text-2 group-hover:text-accent transition-colors" />
              <span className="font-mono text-xs text-text-3 group-hover:text-accent transition-colors">LinkedIn</span>
            </a>
            <a href="mailto:your@email.com" className="flex flex-col items-center gap-2 group">
              <Mail size={24} className="text-text-2 group-hover:text-accent transition-colors" />
              <span className="font-mono text-xs text-text-3 group-hover:text-accent transition-colors">your@email.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


