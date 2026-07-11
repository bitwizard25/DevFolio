'use client'

import { RefObject, useEffect, useRef } from 'react';
import { useSpring, useTransform, useVelocity, MotionValue } from 'framer-motion';
import { useMouse } from '@/components/providers/MouseProvider';
import { EYE_TRACKING } from './mascot.constants';

export interface EyeTracking {
  pupilX: MotionValue<number>;
  pupilY: MotionValue<number>;
  eyesX: MotionValue<number>;
  eyesY: MotionValue<number>;
  tilt: MotionValue<number>;
  stretchX: MotionValue<number>;
  stretchY: MotionValue<number>;
}

/**
 * Cursor math for the mascot: pupil deflection (atan2 toward the cursor, clamped to the eye
 * whites), body tilt, and velocity-driven squash & stretch. All MotionValues — zero re-renders.
 *
 * @param hostRef   the fixed-position wrapper (its center is the "eye origin")
 * @param recalcKey bump after teleports so the center is re-measured
 * @param enabled   false = everything frozen at rest (reduced motion)
 */
export function useEyeTracking(
  hostRef: RefObject<HTMLElement | null>,
  recalcKey: number,
  enabled: boolean,
): EyeTracking {
  const { mouseX, mouseY } = useMouse();
  const center = useRef({ x: 0, y: 0 });
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  // The wrapper is position:fixed, so scroll never moves it — measure on mount/resize/teleport
  useEffect(() => {
    const measure = () => {
      const el = hostRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    // Wait a frame so teleport anchor styles have applied
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [hostRef, recalcKey]);

  // Pupils: angle + clamped distance toward the cursor
  const pupilTarget = useTransform([mouseX, mouseY] as const, (values: number[]) => {
    if (!enabledRef.current) return { x: 0, y: 0 };
    const [x, y] = values;
    const dx = x - center.current.x;
    const dy = y - center.current.y;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.hypot(dx, dy) / EYE_TRACKING.fullDeflectionPx, 1);
    return {
      x: Math.cos(angle) * EYE_TRACKING.maxPupilX * dist,
      y: Math.sin(angle) * EYE_TRACKING.maxPupilY * dist,
    };
  });
  const pupilX = useSpring(useTransform(pupilTarget, (v) => v.x), { stiffness: 400, damping: 28 });
  const pupilY = useSpring(useTransform(pupilTarget, (v) => v.y), { stiffness: 400, damping: 28 });

  // Eye group drifts a touch less than the pupils — depth inside the face
  const eyesX = useSpring(useTransform(pupilTarget, (v) => v.x * 0.35), { stiffness: 300, damping: 26 });
  const eyesY = useSpring(useTransform(pupilTarget, (v) => v.y * 0.35), { stiffness: 300, damping: 26 });

  // Body leans toward the cursor's horizontal position in the viewport
  const tiltTarget = useTransform(mouseX, (x: number) => {
    if (!enabledRef.current || typeof window === 'undefined') return 0;
    return ((x / window.innerWidth) * 2 - 1) * EYE_TRACKING.maxTiltDeg;
  });
  const tilt = useSpring(tiltTarget, { stiffness: 200, damping: 20 });

  // Squash & stretch on fast mouse movement — velocity of the *smoothed* position
  // (velocity of raw pointer values is too spiky)
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const vx = useVelocity(smoothX);
  const vy = useVelocity(smoothY);
  const speed = useTransform([vx, vy] as const, (values: number[]) =>
    enabledRef.current ? Math.hypot(values[0], values[1]) : 0,
  );
  const stretchX = useSpring(useTransform(speed, [0, 4000], [1, 1.12]), { stiffness: 300, damping: 18 });
  const stretchY = useSpring(useTransform(speed, [0, 4000], [1, 0.9]), { stiffness: 300, damping: 18 });

  return { pupilX, pupilY, eyesX, eyesY, tilt, stretchX, stretchY };
}
