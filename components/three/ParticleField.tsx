"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null);
  const { camera } = useThree();

  // Mouse tracking state
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse to [-1, 1]
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const colorAccent = new THREE.Color("#7F77DD");
    const colorAi = new THREE.Color("#1D9E75");

    for (let i = 0; i < count; i++) {
      // Boundaries: x[-15,15], y[-8,8], z[-5,0]
      pos[i * 3] = (Math.random() - 0.5) * 30; // x: -15 to 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16; // y: -8 to 8
      pos[i * 3 + 2] = -Math.random() * 5; // z: -5 to 0

      // Colors: 70% accent, 30% AI green
      const isAccent = Math.random() < 0.7;
      const c = isAccent ? colorAccent : colorAi;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      // Sizes: 0.015 to 0.04
      siz[i] = Math.random() * 0.025 + 0.015;
    }
    return [pos, col, siz];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;

    // Upward drift animation
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += 0.004; // y drift
      // Wrap around
      if (positions[i * 3 + 1] > 8) {
        positions[i * 3 + 1] = -8;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Mouse parallax
    const targetRotY = mouse.current.x * 0.08;
    const targetRotX = mouse.current.y * 0.08;

    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX, 0.05);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={1}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <Particles count={isMobile ? 80 : 300} />
      </Canvas>
    </div>
  );
}
