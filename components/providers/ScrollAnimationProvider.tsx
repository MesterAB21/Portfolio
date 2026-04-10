"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Wait for content to fully render
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 600);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

function initScrollAnimations() {
  /* ═══════════════════════════════════════════
     1. PARALLAX BACKGROUND SECTION NUMBERS
     ═══════════════════════════════════════════ */
  document.querySelectorAll("[data-section-number]").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 30, opacity: 0 },
      {
        yPercent: -30,
        opacity: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });

  /* ═══════════════════════════════════════════
     2. SECTION REVEAL ANIMATIONS
     ═══════════════════════════════════════════ */

  // About section — slide from left + blur
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    const aboutElements = aboutSection.querySelectorAll(
      "[data-animate='fade-up'], h2, p, .reveal-up"
    );
    aboutElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // Projects section — scale + rotate from center
  const projectsSection = document.querySelector("#projects");
  if (projectsSection) {
    // Header fades in
    const projectHeader = projectsSection.querySelector("h2");
    if (projectHeader) {
      gsap.fromTo(
        projectHeader,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectHeader,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Project cards stagger in with 3D tilt
    const cards = projectsSection.querySelectorAll("[data-animate='card']");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 80,
          opacity: 0,
          rotateX: 8,
          scale: 0.92,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // Skills section — horizontal slide in
  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    const skillHeader = skillsSection.querySelector("h2");
    if (skillHeader) {
      gsap.fromTo(
        skillHeader,
        { x: -60, opacity: 0, filter: "blur(6px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillHeader,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Marquee tracks slide in from opposite sides
    const tracks = skillsSection.querySelectorAll("[data-animate='track']");
    tracks.forEach((track, i) => {
      const fromX = i % 2 === 0 ? -120 : 120;
      gsap.fromTo(
        track,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // Contact section — same cascading blur animation as About
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    const contactElements = contactSection.querySelectorAll(
      "p.font-mono, h2, p:not(.font-mono), form > div, button[type='submit'], .mt-16"
    );
    contactElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // AI Lab section — same cascading blur animation as About
  const aiLabSection = document.querySelector("#ailab"); // fixed typo
  if (aiLabSection) {
    const aiLabElements = aiLabSection.querySelectorAll(
      "p.font-mono, h2, p.text-center, .flex.p-1, .w-full.flex.justify-center"
    );
    aiLabElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  /* ═══════════════════════════════════════════
     3. HORIZONTAL SCROLL LINE BETWEEN SECTIONS
     ═══════════════════════════════════════════ */
  document.querySelectorAll("[data-animate='divider-line']").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  /* ═══════════════════════════════════════════
     4. TEXT CHARACTER REVEAL (for big headings)
     ═══════════════════════════════════════════ */
  /*
  document.querySelectorAll("[data-animate='text-reveal']").forEach((el) => {
    const text = el.textContent || "";
    el.textContent = "";
    (el as HTMLElement).style.overflow = "hidden";

    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.transform = "translateY(110%)";
      span.style.opacity = "0";
      span.classList.add("char-reveal");
      wrapper.appendChild(span);
    });

    el.appendChild(wrapper);

    gsap.to(wrapper.querySelectorAll(".char-reveal"), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.02,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
  */

  /* ═══════════════════════════════════════════
     5. STAGGER FADE-UP for generic elements
     ═══════════════════════════════════════════ */
  document.querySelectorAll("[data-animate='stagger-children']").forEach((container) => {
    const kids = container.children;
    gsap.fromTo(
      kids,
      { y: 40, opacity: 0, filter: "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  /* ═══════════════════════════════════════════
     6. PARALLAX SECTIONS — slight Y movement
     ═══════════════════════════════════════════ */
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = parseFloat((el as HTMLElement).dataset.parallax || "0.1");
    gsap.to(el, {
      yPercent: -20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
}
