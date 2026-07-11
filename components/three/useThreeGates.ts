'use client'

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export type WebGLTier = 'off' | 'lite' | 'full';

function probeWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Decides how much 3D this device should get.
 * 'off'  — reduced motion, no WebGL, or very low memory: render nothing (CSS fallback)
 * 'lite' — touch/small screens: fewer shapes, lower dpr, no pointer parallax
 * 'full' — desktop with a fine pointer
 */
export function useThreeGates(): WebGLTier {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<WebGLTier>('off');

  useEffect(() => {
    const decide = (): [WebGLTier, string] => {
      if (reduced) return ['off', 'prefers-reduced-motion'];
      if (!probeWebGL()) return ['off', 'no WebGL support'];
      const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory;
      if (deviceMemory !== undefined && deviceMemory < 4) return ['off', `deviceMemory=${deviceMemory}`];
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const small = window.innerWidth < 768;
      if (coarse || small) return ['lite', coarse ? 'coarse pointer' : 'small viewport'];
      return ['full', 'desktop'];
    };
    const [next, reason] = decide();
    if (process.env.NODE_ENV === 'development') {
      console.info(`[3d] tier=${next} (${reason})`);
    }
    setTier(next);
  }, [reduced]);

  return tier;
}
