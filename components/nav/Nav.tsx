"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for background blur and border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (mobileMenuOpen) setMobileMenuOpen(false);
    
    // For logo going to top
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-[12px] border-b border-[#2A2A38]"
            : "bg-transparent border-b border-transparent"
        } h-[56px] md:h-[64px]`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-[clamp(20px,5vw,80px)] flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => handleScrollTo(e, "#top")}
            className="font-syne font-bold text-[20px] text-accent tracking-wide"
            aria-label="Scroll to top"
          >
            MK.
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`font-syne text-[14px] font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-accent"
                          : "text-[#D1D1E0] hover:text-[#E8E8F0]"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="font-syne text-[14px] font-medium px-[20px] py-[8px] rounded-[6px] border border-accent text-accent hover:bg-accent hover:text-[#0A0A0F] transition-all duration-250 ease-in-out"
            >
              Hire me
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text-1 p-1 -mr-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-base flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-4 right-[clamp(20px,5vw,80px)] text-text-1 p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-syne text-[32px] font-semibold text-text-1 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
