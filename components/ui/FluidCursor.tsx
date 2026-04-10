"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

/**
 * =========================================================
 * ANTIGRAVITY PARTICLE SYSTEM (Three.js WebGL Layer)
 * =========================================================
 */
function AntigravityParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const { viewport } = useThree();

  // Optimization: Limit count to maintain 60FPS
  const count = 1500;

  // Custom Soft Glowing Particle Texture (eliminates WebGL square fragments)
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const tempColor = new THREE.Color();
    // CSE.club style galaxy palette
    const palettes = ["#7F77DD", "#2DD4BF", "#3B82F6", "#F472B6"];

    for (let i = 0; i < count; i++) {
      // Widen the spread beyond the viewport bounds to ensure smooth parallax edge rolling
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.5;
      const z = (Math.random() - 0.5) * 4; // Depth

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      tempColor.set(palettes[Math.floor(Math.random() * palettes.length)]);
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }
    return [pos, orig, col];
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (!pointsRef.current || !geometryRef.current || reducedMotion) return;

    // Convert normalized mouse device coordinates to world space targets
    const targetX = (state.mouse.x * viewport.width) / 2;
    const targetY = (state.mouse.y * viewport.height) / 2;

    const positionsArray = geometryRef.current.attributes.position.array as Float32Array;

    // Antigravity physics loop directly manipulating the BufferGeometry for maximum performance
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      let cx = positionsArray[idx];
      let cy = positionsArray[idx + 1];
      let cz = positionsArray[idx + 2];

      const dx = cx - targetX;
      const dy = cy - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion radius algorithm
      const maxDist = 1.5;
      if (dist < maxDist) {
        // Exponential falloff for smooth easing away from cursor
        const force = Math.pow((maxDist - dist) / maxDist, 2);
        // Reduced from 0.15 to 0.06 for a much gentler push
        cx += (dx / dist) * force * 0.06;
        cy += (dy / dist) * force * 0.06;
      }

      // Spring physics (return gradually to origin)
      // Reduced from 0.05 to 0.015 for a slow, silky, floating recovery
      cx += (ox - cx) * 0.015;
      cy += (oy - cy) * 0.015;

      // Subtle depth parallax tied to mouse position
      const parallaxFactor = oz * 0.05;
      cx -= state.mouse.x * parallaxFactor;
      cy -= state.mouse.y * parallaxFactor;

      positionsArray[idx] = cx;
      positionsArray[idx + 1] = cy;
      positionsArray[idx + 2] = cz;
    }

    geometryRef.current.attributes.position.needsUpdate = true;
    
    // Silky smooth, dampened interpolation for the ambient universe rotation
    pointsRef.current.rotation.x += (state.mouse.y * 0.05 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (state.mouse.x * 0.05 - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture || undefined}
      />
    </points>
  );
}

/**
 * =========================================================
 * MAIN COMPONENT
 * Coordinates WebGL context, strict DOM bindings, GSAP cursor.
 * =========================================================
 */
export default function FluidCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial environmental safety checks
    setMounted(true);
    
    // Touch fallback
    const mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mqTouch.matches);
    mqTouch.addEventListener("change", (e) => setIsTouch(e.matches));

    // Reduced motion accessibility
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqMotion.matches);
    mqMotion.addEventListener("change", (e) => setReducedMotion(e.matches));

    // Hide native cursor gracefully globally
    if (!mqTouch.matches) {
      document.documentElement.style.cursor = "none";
    }

    return () => {
      document.documentElement.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    if (!mounted || isTouch || reducedMotion) return;
    if (!dotRef.current || !ringRef.current || !cursorRef.current) return;

    cursorRef.current.style.opacity = "1";

    // 2. High-performance GSAP quickSetters for cursor translation via `will-change: transform`
    const xDotSet = gsap.quickSetter(dotRef.current, "x", "px");
    const yDotSet = gsap.quickSetter(dotRef.current, "y", "px");
    const xRingSet = gsap.quickSetter(ringRef.current, "x", "px");
    const yRingSet = gsap.quickSetter(ringRef.current, "y", "px");

    // Track state to avoid layout trashing
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    
    // We are binding custom physics to RequestAnimationFrame since quickSetter is immediate
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Dot is instant (1:1 with hardware cursor)
      xDotSet(mouse.x);
      yDotSet(mouse.y);
    };
    
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const tick = () => {
      // Ring uses smooth LERP chasing
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      
      xRingSet(ring.x);
      yRingSet(ring.y);
      
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // 3. Complex Magnetic Logic mapping via Event Delegation
    let activeMagnet: HTMLElement | null = null;
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-magnetic]") as HTMLElement;
      
      if (el) {
        activeMagnet = el;
        
        // Emphasize Cursor Ring
        gsap.to(ringRef.current, {
          width: 50,
          height: 50,
          borderColor: "rgba(127,119,221,0.9)",
          backgroundColor: "rgba(127,119,221,0.1)",
          xPercent: -50,
          yPercent: -50,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Hide Dot in interactive states
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-magnetic]") as HTMLElement;
      
      if (el) {
        activeMagnet = null;
        
        // Reshape cursor to default
        gsap.to(ringRef.current, {
          width: 32,
          height: 32,
          borderColor: "rgba(127,119,221,0.4)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
        
        // Snap element physically back to origin and clear inline styles so CSS can work again
        gsap.to(el, { 
          x: 0, 
          y: 0, 
          duration: 0.6, 
          ease: "elastic.out(1, 0.4)",
          onComplete: () => {
            gsap.set(el, { clearProps: "x,y,transform" });
          }
        });
      }
    };

    // Parallax Magnetic Drag processing
    const handleMagneticMove = (e: MouseEvent) => {
      if (activeMagnet) {
        const rect = activeMagnet.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        // Apply GSAP physics to physically pull the DOM element toward cursor
        gsap.to(activeMagnet, {
          x: (e.clientX - cx) * 0.3,
          y: (e.clientY - cy) * 0.3,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousemove", handleMagneticMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", handleMagneticMove);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, isTouch, reducedMotion]);

  if (!mounted) return null; // Avoid SSR hydration mismatches

  return (
    <>
      {/* 4. OVERLAY: WebGL Parallax Antigravity Grid */}
      {/* Moved from z-[0] to z-[40] so it renders over section backgrounds like a magical mist! */}
      <div 
        className="pointer-events-none fixed inset-0 z-[40] opacity-60 mix-blend-screen" 
        aria-hidden="true"
        // Force GPU layers
        style={{ willChange: "transform" }}
      >
        {/* We use frameloop="demand" / "always" carefully, here we let Fiber handle it efficiently */}
        {(!isTouch && !reducedMotion) && (
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 60 }} 
            dpr={[1, 2]} // Optimize pixel ratio
            gl={{ alpha: true, antialias: false }} // Power preference optimization
            eventSource={document.body} // Crucial! Listen to body for mouse coordinates
            style={{ pointerEvents: "none" }} // 100% guarantee no click-blocking
          >
            <AntigravityParticles reducedMotion={reducedMotion} />
          </Canvas>
        )}
      </div>

      {/* 5. OVERLAY: High-end Custom GSAP Cursor */}
      {!isTouch && !reducedMotion && (
        <div 
          ref={cursorRef} 
          id="__premium-cursor" 
          className="pointer-events-none fixed inset-0 z-[2147483647] overflow-hidden opacity-0 transition-opacity duration-500"
          aria-hidden="true"
        >
          {/* Tracking Head (Dot) */}
          <div
            ref={dotRef}
            className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(127,119,221,0.8)]"
            style={{ willChange: "transform" }} 
          />
          
          {/* Interpolation Tail (Ring) */}
          <div
            ref={ringRef}
            className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 backdrop-blur-[1px]"
            style={{ willChange: "transform, width, height, background-color, border-color" }}
          />
        </div>
      )}
    </>
  );
}
