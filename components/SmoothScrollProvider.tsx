'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MotionValue, useMotionValue, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

interface LenisContextValue {
  lenis: Lenis | null;
  /** Page scroll progress 0..1, driven by Lenis (stays 0 under reduced motion) */
  scrollProgress: MotionValue<number>;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollProgress: null as unknown as MotionValue<number>,
});

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const scrollProgress = useMotionValue(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reduced motion: native scrolling only (html scroll-behavior handles anchors)
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -80 }, // clear the fixed navbar on #hash clicks
    });

    instance.on('scroll', ({ progress }: { progress: number }) => {
      scrollProgress.set(progress);
    });

    let raf = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    });

    setLenis(instance);

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced, scrollProgress]);

  // anchors:true only intercepts real clicks — cover router.push('/#projects') style navigation
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) lenis.scrollTo(hash, { offset: -80 });
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={{ lenis, scrollProgress }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
