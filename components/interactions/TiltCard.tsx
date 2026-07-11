'use client'

import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { useMouse } from '@/components/providers/MouseProvider';

interface TiltCardProps {
  children: React.ReactNode;
  /** Max rotation in degrees */
  maxTilt?: number;
  className?: string;
  /** Applied to the tilting element — set the card's border-radius here so the glare clips to it */
  innerClassName?: string;
  glare?: boolean;
}

/** 3D perspective tilt following the pointer, with a glare sweep. Inert on touch/reduced motion. */
export default function TiltCard({
  children,
  maxTilt = 6,
  className = '',
  innerClassName = '',
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { hasFinePointer } = useMouse();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 60%)`;

  const inert = reduced || !hasFinePointer;

  const onPointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * maxTilt);
    rx.set(-(py - 0.5) * 2 * maxTilt);
    gx.set(px * 100);
    gy.set(py * 100);
    glareOpacity.set(1);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  if (inert) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 800 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{
          rotateX: springRx,
          rotateY: springRy,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.01 }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBackground, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
