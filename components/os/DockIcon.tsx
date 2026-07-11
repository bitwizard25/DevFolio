'use client'

import React, { useRef } from 'react';
import { motion, useTransform, useSpring, useReducedMotion, MotionValue } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import AppIcon from './AppIcon';
import type { TileId } from './theme';

interface DockIconProps {
  id: TileId;
  label: string;
  icon: LucideIcon;
  mouseX: MotionValue<number>;
  isOpen: boolean;
  onClick: () => void;
  href?: string;
}

const BASE = 48; // px, matches w-12/h-12
const MAX = 76;
const DISTANCE = 140; // px of mouse influence on either side

/** One dock tile: scales up as the pointer nears it, and lifts its neighbors along the way (real macOS dock feel) */
export default function DockIcon({ id, label, icon: Icon, mouseX, isOpen, onClick, href }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return DISTANCE + 1;
    return x - (rect.left + rect.width / 2);
  });

  const sizeTarget = useTransform(distance, [-DISTANCE, 0, DISTANCE], [BASE, MAX, BASE]);
  const size = useSpring(sizeTarget, { stiffness: 320, damping: 22, mass: 0.6 });
  const lift = useTransform(size, [BASE, MAX], [0, -14]);

  // Reduced-motion visitors get a fixed-size tile with only a non-transform hover cue —
  // the magnify spring is driven by raw useTransform/useSpring, which bypasses the app-wide
  // <MotionConfig reducedMotion="user"> entirely, so it needs its own explicit guard.
  const style = reduced ? {} : { width: size, height: size, y: lift };

  const content = (
    <>
      {id === 'contact' && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-[32%] bg-[#32D74B]/50 blur-md -z-10 ${
            reduced ? 'opacity-60 scale-110' : 'animate-[contact-glow_2.4s_ease-in-out_infinite]'
          }`}
        />
      )}
      <AppIcon id={id} icon={Icon} className={reduced ? 'w-12 h-12 hover:brightness-110' : 'w-full h-full'} />
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#2c2c2e]/95 border border-white/10 text-[11px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
        {label}
      </span>
      <span
        className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
          isOpen ? 'bg-white shadow-[0_0_6px_#fff]' : 'bg-transparent'
        }`}
      />
    </>
  );

  const className = 'relative flex w-full h-full items-center justify-center group cursor-pointer';

  return (
    <motion.div
      ref={ref}
      style={style}
      className={`relative flex items-end justify-center ${reduced ? 'w-12 h-12' : ''}`}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
          {content}
        </a>
      ) : (
        <button onClick={onClick} aria-label={`Open ${label}`} className={className}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
