'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MotionValue, useMotionValue } from 'framer-motion';

interface MouseContextValue {
  /** Cursor position in viewport px */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  /** Cursor position normalized to [-1, 1] across the viewport */
  normX: MotionValue<number>;
  normY: MotionValue<number>;
  /** True on devices with a real hover-capable pointer (desktop mouse/trackpad) */
  hasFinePointer: boolean;
}

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    setHasFinePointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      normX.set((e.clientX / window.innerWidth) * 2 - 1);
      normY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mouseX, mouseY, normX, normY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY, normX, normY, hasFinePointer }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) {
    return {
      mouseX: { set: () => {}, get: () => 0 } as any,
      mouseY: { set: () => {}, get: () => 0 } as any,
      normX: { set: () => {}, get: () => 0 } as any,
      normY: { set: () => {}, get: () => 0 } as any,
      hasFinePointer: false,
    };
  }
  return ctx;
}
