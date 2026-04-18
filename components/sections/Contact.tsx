"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web Application",
    message: "",
  });

  const getError = (field: string) => {
    if (!touched[field]) return "";
    if (field === "name" && !formData.name.trim()) return "Name is required.";
    if (field === "email") {
      if (!formData.email.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Enter a valid email.";
    }
    if (field === "message" && !formData.message.trim()) return "Project Details are required.";
    return "";
  };

  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <section id="contact" className="py-32 px-6 flex flex-col items-center relative overflow-hidden bg-background">
      <style>{`
        .modern-input {
          width: 100%;
          background: rgba(22, 22, 30, 0.6);
          border: 1px solid rgba(42, 42, 56, 0.5);
          border-radius: 16px;
          padding: 16px 20px;
          color: #E8E8F0;
          font-family: var(--font-syne), sans-serif;
          font-size: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modern-input:hover {
          background: rgba(30, 30, 42, 0.8);
          border-color: rgba(60, 60, 75, 0.8);
        }
        .modern-input:focus {
          border-color: #7F77DD;
          background: rgba(22, 22, 30, 0.95);
          outline: none;
          box-shadow: 0 0 0 4px rgba(127,119,221,0.15);
        }
        .modern-input.error {
          border-color: #D85A30;
        }
        .modern-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239898A8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
        }
        .modern-label {
          display: block;
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: #9898A8;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding-left: 4px;
        }
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          transform: translateX(-100%);
        }
        .btn-hover:hover .shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-[#7F77DD]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] bg-[#1D9E75]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        
        {/* LEFT COLUMN: Info & Trust Elements */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 h-full py-8">
          
          {/* Header Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D9E75] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D9E75]"></span>
              </span>
              <span className="font-mono text-xs tracking-widest text-[#1D9E75] uppercase">Open to Work</span>
            </div>
            
            <h2 className="font-syne text-[clamp(2.5rem,5vw,4rem)] font-bold text-text-1 leading-[1.1] mb-6">
              Let&apos;s build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F77DD] to-[#1D9E75] italic">future</span> together.
            </h2>
            
            <p className="text-text-2 text-[17px] font-syne opacity-90 leading-relaxed max-w-[420px]">
              Partner with me to turn your ideas into scalable, high-performance digital products that drive real results.
            </p>
          </motion.div>

          {/* Contact Details Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-6 rounded-3xl bg-surface border border-border hover:border-[#7F77DD]/30 transition-colors group">
                <Clock className="text-[#7F77DD] mb-3" size={24} />
                <h4 className="font-syne text-text-1 font-semibold mb-1">Fast Response</h4>
                <p className="font-mono text-text-3 text-xs">Within 24 hours</p>
              </div>
              <div className="flex-1 p-6 rounded-3xl bg-surface border border-border hover:border-[#1D9E75]/30 transition-colors group">
                <svg className="text-[#1D9E75] mb-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h4 className="font-syne text-text-1 font-semibold mb-1">Trusted Quality</h4>
                <p className="font-mono text-text-3 text-xs">Exceeding expectations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
               <a href="mailto:mesterab21@gmail.com" className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-surface border border-border hover:border-[#D85A30]/40 hover:bg-[#D85A30]/5 transition-all hover:-translate-y-1 group">
                 <div className="w-12 h-12 rounded-full bg-[#0A0A0F] border border-border flex items-center justify-center group-hover:border-[#D85A30]/30 transition-all">
                    <Mail size={24} className="text-text-2 group-hover:text-[#D85A30] transition-colors" />
                 </div>
                 <span className="font-mono text-[11px] tracking-widest text-text-3 uppercase group-hover:text-text-1 transition-colors">Email</span>
               </a>
               <a href="https://wa.me/213781569010" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-surface border border-border hover:border-[#1D9E75]/40 hover:bg-[#1D9E75]/5 transition-all hover:-translate-y-1 group">
                 <div className="w-12 h-12 rounded-full bg-[#0A0A0F] border border-border flex items-center justify-center group-hover:border-[#1D9E75]/30 transition-all">
                    <MessageCircle size={24} className="text-text-2 group-hover:text-[#1D9E75] transition-colors" />
                 </div>
                 <span className="font-mono text-[11px] tracking-widest text-text-3 uppercase group-hover:text-text-1 transition-colors">WhatsApp</span>
               </a>
               <a href="https://www.linkedin.com/in/abderrahmane-hamaidi-7666073b7/" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-surface border border-border hover:border-[#0077b5]/40 hover:bg-[#0077b5]/5 transition-all hover:-translate-y-1 group">
                 <div className="w-12 h-12 rounded-full bg-[#0A0A0F] border border-border flex items-center justify-center group-hover:border-[#0077b5]/30 transition-all">
                    <Linkedin size={24} className="text-text-2 group-hover:text-[#0077b5] transition-colors" />
                 </div>
                 <span className="font-mono text-[11px] tracking-widest text-text-3 uppercase group-hover:text-text-1 transition-colors">LinkedIn</span>
               </a>
               <a href="https://github.com/MesterAB21" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-surface border border-border hover:border-[#E8E8F0]/40 hover:bg-[#E8E8F0]/5 transition-all hover:-translate-y-1 group">
                 <div className="w-12 h-12 rounded-full bg-[#0A0A0F] border border-border flex items-center justify-center group-hover:border-[#E8E8F0]/30 transition-all">
                    <Github size={24} className="text-text-2 group-hover:text-[#E8E8F0] transition-colors" />
                 </div>
                 <span className="font-mono text-[11px] tracking-widest text-text-3 uppercase group-hover:text-text-1 transition-colors">GitHub</span>
               </a>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-[#1C1C26] to-[#0A0A0F] border border-[#2A2A38] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7F77DD]/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-[#7F77DD]/20 transition-all duration-700" />
            <div className="flex gap-2 mb-6">
              {[1,2,3,4,5].map(star => (
                <svg key={star} className="w-4 h-4 text-[#F2C94C]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="font-syne text-[16px] italic text-text-2 leading-relaxed relative z-10 mb-8">
              &quot;Abderrahmane delivered our SaaS platform with exceptional quality and speed. His understanding of complex architectures made a massive difference to our launch timeline.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center font-syne text-sm font-bold text-text-1">JD</div>
              <div>
                <p className="font-syne text-sm text-text-1 font-semibold">Sarah Jenkins</p>
                <p className="font-mono text-[11px] text-text-3 uppercase tracking-wider">Product Lead, TechNova</p>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="bg-[#0f0f15]/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-[#2A2A38] shadow-[0_0_80px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-center min-h-[600px] h-full">
            
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7F77DD]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1D9E75]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 mb-10">
              <h3 className="font-syne text-3xl font-bold text-text-1 mb-3">Let’s Discuss Your Project</h3>
              <p className="font-syne text-text-2 text-[16px] max-w-[400px]">
                Ready to bring your ideas to life? Whether you need a new website, a custom application, or an AI-powered solution, I’m here to help you achieve your goals.
              </p>
            </div>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center flex-1"
              >
                <div className="w-20 h-20 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/30 flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-full border border-[#1D9E75] animate-ping opacity-20"></div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M20 6L9 17L4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </svg>
                </div>
                <h4 className="font-syne font-bold text-text-1 text-2xl mb-3">Message Received!</h4>
                <p className="font-syne text-text-2 text-[16px] max-w-[300px]">
                  Thank you for reaching out. I&apos;ll be in touch with you very shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-10 px-6 py-3 rounded-xl border border-border text-text-2 font-syne text-sm transition-all hover:bg-surface hover:text-text-1"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="modern-label">Full Name <span className="text-[#D85A30]">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      placeholder="John Doe"
                      className={`modern-input ${getError("name") ? "error" : ""}`}
                    />
                    {getError("name") && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 text-[#D85A30] text-[13px] font-syne">
                        {getError("name")}
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="modern-label">Email Address <span className="text-[#D85A30]">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="john@example.com"
                      className={`modern-input ${getError("email") ? "error" : ""}`}
                    />
                    {getError("email") && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 text-[#D85A30] text-[13px] font-syne">
                        {getError("email")}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="modern-label">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="modern-input modern-select"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value="Automation System">Automation System</option>
                    <option value="Data Science / AI">Data Science / AI</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="modern-label">Project Details <span className="text-[#D85A30]">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell me about your objectives, timeline, or requirements..."
                    rows={4}
                    className={`modern-input resize-none h-[120px] ${getError("message") ? "error" : ""}`}
                  />
                  {getError("message") && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 text-[#D85A30] text-[13px] font-syne">
                      {getError("message")}
                    </motion.div>
                  )}
                </div>

                {status === "error" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-[#D85A30]/10 border border-[#D85A30]/30 text-[#D85A30] text-[14px] font-syne flex items-center gap-3">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Something went wrong while sending your message. Please try again.</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  className="w-full mt-4 flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed group btn-hover relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #7F77DD 0%, #675DCB 100%)",
                    color: "#FFF",
                    padding: "20px",
                    borderRadius: "16px",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    boxShadow: "0 10px 30px -10px rgba(127,119,221,0.5)",
                  }}
                >
                  <div className="absolute inset-0 shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  
                  {status === "sending" ? (
                    <div className="spinner" />
                  ) : (
                    <span className="relative z-10 flex items-center gap-3">
                      Start Your Project
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1.5 transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
