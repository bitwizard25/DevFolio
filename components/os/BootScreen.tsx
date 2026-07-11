'use client'

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Short, skippable boot splash shown on first entry per session */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [showSkipHint, setShowSkipHint] = useState(false);

  // Reduced-motion visitors skip straight through — no bar, no wait
  useEffect(() => {
    if (reduced) onDone();
  }, [reduced, onDone]);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setShowSkipHint(true), 400);
    return () => clearTimeout(t);
  }, [reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className="absolute inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-black cursor-pointer"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      onClick={onDone}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') onDone();
      }}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl"
        aria-hidden="true"
      >
        🥷
      </motion.div>
      <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-white/80 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onAnimationComplete={onDone}
        />
      </div>
      <p className="text-xs text-white/40 font-medium tracking-widest uppercase">Portfolio OS</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showSkipHint ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-[10px] text-white/30 tracking-widest uppercase"
      >
        Click or press any key to skip
      </motion.p>
    </motion.div>
  );
}
