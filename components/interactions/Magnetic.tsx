'use client'

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useMouse } from '@/components/providers/MouseProvider';

interface MagneticProps {
  children: React.ReactNode;
  /** How strongly the element chases the cursor (0..1) */
  strength?: number;
  /** Invisible hit-area halo in px — keep smaller than the gap to neighboring clickables */
  padding?: number;
  className?: string;
  disabled?: boolean;
}

/** Cursor-proximity attraction: the wrapped element leans toward the pointer and springs back on leave */
export default function Magnetic({
  children,
  strength = 0.3,
  padding = 24,
  className = '',
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { hasFinePointer } = useMouse();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const inert = disabled || reduced || !hasFinePointer;

  const onPointerMove = (e: React.PointerEvent) => {
    if (inert || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{
        x: springX,
        y: springY,
        padding: inert ? 0 : padding,
        margin: inert ? 0 : -padding,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
