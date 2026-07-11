'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useThreeGates } from './useThreeGates';
import ParallaxRig from './hero/ParallaxRig';
import DistortedBlob from './hero/DistortedBlob';
import FloatingShapes from './hero/FloatingShapes';

interface HeroSceneProps {
  /** The hero <section> — pointer events are read from it so the canvas can stay pointer-events-none */
  eventSourceRef: React.RefObject<HTMLElement | null>;
}

export default function HeroScene({ eventSourceRef }: HeroSceneProps) {
  const tier = useThreeGates();
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Assume visible until the observer reports — starting hidden would mount the
  // canvas with frameloop="never" and it might never paint its first frame
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

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

  // Fade-in fallback in case onCreated timing is off — never leave the canvas at opacity 0
  useEffect(() => {
    if (tier === 'off') return;
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, [tier]);

  if (tier === 'off') return null;
  const lite = tier === 'lite';

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        // rAF is suspended by the browser when the tab is hidden — no visibilitychange handler needed
        frameloop={inView ? 'always' : 'never'}
        dpr={lite ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 45, position: [0, 0, 8], near: 0.1, far: 40 }}
        eventSource={eventSourceRef as React.RefObject<HTMLElement>}
        eventPrefix="client"
        onCreated={() => setReady(true)}
      >
        {/* Fog fades the deep furniture into the page background */}
        <fog attach="fog" args={['#000000', 9, 20]} />
        <Suspense fallback={null}>
          <ParallaxRig parallax={!lite}>
            <DistortedBlob lite={lite} />
            <FloatingShapes lite={lite} />
          </ParallaxRig>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
