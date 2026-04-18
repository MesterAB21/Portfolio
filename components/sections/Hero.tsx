"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

// Dynamically import ParticleField for client-side rendering only
const ParticleField = dynamic(() => import("../three/ParticleField"), {
  ssr: false,
});

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // 5B — Role text: typewriter
  useEffect(() => {
    const roles = [
      'Full-Stack Developer',
      'Data Scientist',
      'AI & Automation Engineer',
    ]

    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    const type = () => {
      if (!roleRef.current) return

      const current = roles[roleIndex]
      const displayed = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++)

      roleRef.current.textContent = displayed

      const typeSpeed = isDeleting ? 28 : 55

      // ... wait after typing
      if (!isDeleting && charIndex > current.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true
          type()
        }, 2000)
        return
      }

      if (isDeleting && charIndex < 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        timeoutId = setTimeout(type, 400)
        return
      }

      timeoutId = setTimeout(type, typeSpeed)
    }

    timeoutId = setTimeout(type, 1400)

    return () => clearTimeout(timeoutId)
  }, [])

  // 5A — Name slide in
  useEffect(() => {
    if (!nameRef.current) return

    const split = SplitText.create(nameRef.current, {
      type: 'words',
      mask: 'words',
    })

    gsap.from(split.words, {
      xPercent: -120,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.12,
      delay: 0.3,
    })

    return () => split.revert()
  }, [])

  // 5C — Eyebrow, tagline, CTAs staggered fade up
  useEffect(() => {
    const targets = ['.hero-eyebrow', '.hero-tagline', '.hero-ctas', '.hero-scroll-indicator'];

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        // Clear all inline styles so CSS takes over cleanly
        gsap.set(targets, { clearProps: 'all' });
      },
    })

    tl.from('.hero-eyebrow', {
      y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
    })
      .from('.hero-tagline', {
        y: 24, opacity: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.1')
      .from('.hero-ctas', {
        y: 24, opacity: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.1')
      .from('.hero-scroll-indicator', {
        opacity: 0, duration: 0.5,
      }, '-=0.1')

    return () => {
      // Kill timeline and reset inline styles so re-mount starts clean
      tl.kill();
      gsap.set(targets, { clearProps: 'all' });
    }
  }, [])

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden w-full"
    >
      {/* Particle Field Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-[800px] w-full px-[24px] flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div 
          className="hero-eyebrow font-mono text-[13px] text-text-1 tracking-[0.14em] uppercase mb-[24px]"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
        >
          Available for work &middot; Algeria &middot; Remote-friendly
        </div>

        {/* Decorative Lines and Name Row */}
        <div className="flex items-center justify-center w-full gap-4 md:gap-8 mb-4 relative">
          <div className="hidden md:block w-[clamp(40px,8vw,100px)] h-[1px] bg-[#7F77DD] opacity-40 shrink-0" />
          <h1
            ref={nameRef}
            className="font-syne font-bold text-[clamp(52px,9vw,96px)] text-text-1 leading-none tracking-tight shrink-0 transition-all text-center flex-1 md:flex-initial"
            style={{ textShadow: "0 0 60px rgba(127,119,221,0.25)" }}
          >
            Hamaidi Abderrahmane
          </h1>
          <div className="hidden md:block w-[clamp(40px,8vw,100px)] h-[1px] bg-[#7F77DD] opacity-40 shrink-0" />
        </div>

        {/* Animated Role Switcher */}
        <div className="h-[40px] md:h-[48px] mb-6 flex items-center justify-center">
          <p
            style={{
              fontSize: 'clamp(18px, 3vw, 32px)',
              fontWeight: 500,
              color: '#E8E8F0',                              // WHITE — not purple
              textShadow: '0 2px 28px rgba(0,0,0,0.95)',     // dark halo — always readable over particles
              fontFamily: 'var(--font-syne)',
              minHeight: '1.4em',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <span ref={roleRef} />
            <span
              ref={cursorRef}
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: '#7F77DD',
                verticalAlign: 'middle',
                animation: 'blink 0.8s step-end infinite',
              }}
            />
          </p>
        </div>

        {/* Value Proposition */}
        <p 
          className="hero-tagline font-syne text-[18px] font-normal text-text-1 leading-[1.6] max-w-lg mx-auto mb-10"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
        >
          I build systems that work, scale, and think.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-[32px] py-[16px] bg-accent text-[#0A0A0F] rounded-[10px] font-syne font-bold hover:bg-[#6B63C7] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(127,119,221,0.4)]"
          >
            Download CV
          </a>
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center px-[32px] py-[16px] border border-[#2A2A38] text-text-1 rounded-[10px] font-syne font-bold hover:bg-[#2A2A38] transition-all"
          >
            See projects ↓
          </a>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center text-[#5A5A6E] animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
