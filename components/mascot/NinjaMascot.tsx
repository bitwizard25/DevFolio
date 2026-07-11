'use client'

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  useScroll,
  useVelocity,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { useMouse } from '@/components/providers/MouseProvider';
import { useMascotBrain } from './useMascotBrain';
import { useEyeTracking } from './useEyeTracking';
import { ANCHORS, TIMINGS } from './mascot.constants';
import NinjaSvg from './NinjaSvg';

/**
 * The site companion: a little ninja fixed in a corner, eyes tracking the cursor.
 * Desktop-only (fine pointer + lg screens). Click it for a smoke-bomb teleport.
 */
export default function NinjaMascot() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const { hasFinePointer, mouseX } = useMouse();
  const [mounted, setMounted] = useState(false);
  const [wideEnough, setWideEnough] = useState(false);
  const [anchorIndex, setAnchorIndex] = useState(0);
  const [burstId, setBurstId] = useState<number | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const teleporting = useRef(false);

  const enabled = mounted && !reduced;
  const brain = useMascotBrain(enabled);
  const tracking = useEyeTracking(hostRef, anchorIndex, enabled);

  useEffect(() => {
    setMounted(true);
    const check = () => setWideEnough(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Feed idle detection from cursor movement (MotionValue event — no re-renders)
  useMotionValueEvent(mouseX, 'change', () => {
    if (enabled) brain.noteActivity();
  });

  // Duck when the page is being flung past
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useMotionValueEvent(scrollVelocity, 'change', (v) => {
    if (!enabled) return;
    if (Math.abs(v) > TIMINGS.scrollHideVelocity) {
      if (showTimer.current) clearTimeout(showTimer.current);
      showTimer.current = null;
      brain.requestMood('hiding');
    } else if (Math.abs(v) < TIMINGS.scrollShowVelocity && !showTimer.current) {
      showTimer.current = setTimeout(() => {
        showTimer.current = null;
        brain.release('hiding');
      }, TIMINGS.scrollShowDebounceMs);
    }
  });

  // Click easter egg: smoke-bomb teleport to the next anchor
  const teleport = () => {
    if (!enabled || teleporting.current) return;
    teleporting.current = true;
    brain.requestMood('teleporting');
    setBurstId((id) => (id ?? 0) + 1);

    setTimeout(() => {
      setAnchorIndex((i) => (i + 1) % ANCHORS.length);
      setBurstId((id) => (id ?? 0) + 1);
      brain.release('teleporting');
      teleporting.current = false;
    }, TIMINGS.teleportOutMs);
  };

  if (!mounted || !hasFinePointer || !wideEnough) return null;

  return (
    <div
      ref={hostRef}
      // On / the desktop shell sits at z-60 (Dock at internal z-100) — the ninja rides above
      // both as a desktop buddy
      className={`fixed pointer-events-none ${pathname === '/' ? 'z-[105]' : 'z-40'}`}
      style={ANCHORS[anchorIndex]}
      aria-hidden="true"
    >
      <NinjaSvg
        mood={brain.mood}
        blinking={brain.blinking}
        trick={brain.trick}
        burstId={burstId}
        onClick={teleport}
        {...tracking}
      />
    </div>
  );
}
