'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MASCOT_COLORS } from './mascot.constants';

// Cloud of circles around the ninja's feet (SVG units, viewBox 0 0 120 140)
const PUFFS = [
  { cx: 42, cy: 118, r: 12 },
  { cx: 78, cy: 120, r: 11 },
  { cx: 60, cy: 106, r: 13 },
  { cx: 34, cy: 100, r: 9 },
  { cx: 88, cy: 102, r: 10 },
  { cx: 60, cy: 128, r: 12 },
];

interface SmokePuffProps {
  /** Changing this key replays the burst; null renders nothing */
  burstId: number | null;
}

/** Ninja-vanish smoke burst — scale up and fade out, lightly staggered */
export default function SmokePuff({ burstId }: SmokePuffProps) {
  return (
    <AnimatePresence>
      {burstId !== null && (
        <motion.g key={burstId} exit={{ opacity: 0 }}>
          {PUFFS.map((puff, i) => (
            <motion.circle
              key={i}
              cx={puff.cx}
              cy={puff.cy}
              r={puff.r}
              fill={MASCOT_COLORS.smoke}
              initial={{ scale: 0.2, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: 'easeOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
        </motion.g>
      )}
    </AnimatePresence>
  );
}
