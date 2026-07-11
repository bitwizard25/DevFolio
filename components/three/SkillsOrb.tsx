'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useThreeGates } from './useThreeGates';
import WordSphere from './skills/WordSphere';

/** Decorative rotating sphere of skill names — desktop only, the pills remain the real content */
export default function SkillsOrb() {
  const tier = useThreeGates();
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Assume visible until the observer reports (see HeroScene)
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tier]);

  if (tier !== 'full') return null;

  return (
    <div ref={wrapperRef} aria-hidden="true" className="h-[440px] w-full">
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
        camera={{ fov: 45, position: [0, 0, 9.5], near: 0.1, far: 40 }}
      >
        {/* troika Text is unlit — no lights needed, keeps this canvas cheap */}
        <Suspense fallback={null}>
          <WordSphere />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
