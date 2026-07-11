'use client'

import React from 'react';
import { motion, MotionValue, TargetAndTransition } from 'framer-motion';
import { MASCOT_COLORS as C } from './mascot.constants';
import type { Mood } from './useMascotBrain';
import SmokePuff from './SmokePuff';

interface NinjaSvgProps {
  mood: Mood;
  blinking: boolean;
  trick: 'shuriken' | null;
  burstId: number | null;
  pupilX: MotionValue<number>;
  pupilY: MotionValue<number>;
  eyesX: MotionValue<number>;
  eyesY: MotionValue<number>;
  tilt: MotionValue<number>;
  stretchX: MotionValue<number>;
  stretchY: MotionValue<number>;
  onClick?: () => void;
}

const fillBox = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

// Vertical position/bounce per mood (translation only — deform group handles rotate/scale)
const positionTargets: Record<Mood, TargetAndTransition> = {
  entering: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
  waving: { y: 0, opacity: 1 },
  tracking: { y: 0, opacity: 1 },
  idle: {
    y: [0, -3, 0],
    opacity: 1,
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  hiding: { y: 95, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 26 } },
  celebrating: { y: [0, -10, 0, -7, 0], opacity: 1, transition: { duration: 0.9 } },
  shy: { y: 0, opacity: 1 },
  teleporting: { opacity: 0, transition: { duration: 0.18, delay: 0.25 } },
};

const armLTargets: Record<Mood, TargetAndTransition> = {
  entering: { rotate: 0, y: 0 },
  waving: { rotate: 0, y: 0 },
  tracking: { rotate: 0, y: 0 },
  idle: { rotate: 0, y: 0 },
  hiding: { rotate: 0, y: 0 },
  celebrating: { rotate: 130, y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  shy: { rotate: 115, y: -20, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  teleporting: { rotate: 0, y: 0 },
};

const armRTargets: Record<Mood, TargetAndTransition> = {
  entering: { rotate: 0, y: 0 },
  waving: {
    rotate: [0, -60, -30, -60, 0],
    y: 0,
    transition: { duration: 1.4, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' },
  },
  tracking: { rotate: 0, y: 0 },
  idle: { rotate: 0, y: 0 },
  hiding: { rotate: 0, y: 0 },
  celebrating: { rotate: -130, y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  shy: { rotate: -115, y: -20, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  teleporting: { rotate: 0, y: 0 },
};

/**
 * The site mascot: a small flat-shaded ninja, styled to match the OS's own icon language
 * (AppIcon.tsx) rather than a separately-illustrated cartoon character — flat fills, one
 * shared soft specular highlight, muted secondary motion. A placeholder for the eventual
 * AI-assistant redesign; for now it should read as part of the same visual system as the
 * dock, not a plush-toy mascot bolted onto it.
 */
export default function NinjaSvg({
  mood,
  blinking,
  trick,
  burstId,
  pupilX,
  pupilY,
  eyesX,
  eyesY,
  tilt,
  stretchX,
  stretchY,
  onClick,
}: NinjaSvgProps) {
  const eyesClosed = blinking || mood === 'shy';

  return (
    <svg
      viewBox="0 0 120 140"
      className="w-24 h-28 overflow-visible pointer-events-auto cursor-pointer select-none"
      aria-hidden="true"
      onClick={onClick}
    >
      <defs>
        {/* One shared specular highlight — same language as AppIcon.tsx's dock-tile gloss,
            not per-part "3D toy" shading. */}
        <radialGradient id="ninja-specular" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* position group: enter/hide/bob (translation only) */}
      <motion.g initial={{ y: 140, opacity: 1 }} animate={positionTargets[mood]}>
        {/* deform group: cursor tilt + squash/stretch, anchored at the feet */}
        <motion.g
          style={{
            rotate: tilt,
            scaleX: stretchX,
            scaleY: stretchY,
            transformBox: 'fill-box',
            transformOrigin: '50% 100%',
          }}
        >
          {/* Katana handle peeking over the right shoulder (drawn behind the body) */}
          <g transform="rotate(-38 88 44)">
            <rect x={85} y={18} width={6.5} height={30} rx={3} fill={C.katana} />
            <rect x={85} y={23} width={6.5} height={2.5} fill={C.hood} />
            <rect x={85} y={29} width={6.5} height={2.5} fill={C.hood} />
            <rect x={82.5} y={44} width={11.5} height={3.5} rx={1.75} fill={C.katana} />
          </g>

          {/* Feet (behind the body's bottom edge) */}
          <ellipse cx={44} cy={127} rx={11} ry={5} fill={C.feet} />
          <ellipse cx={76} cy={127} rx={11} ry={5} fill={C.feet} />

          {/* Body: flat-filled minion-style bean capsule with a soft outline so it reads on black */}
          <rect x={26} y={28} width={68} height={98} rx={34} fill={C.body} stroke={C.outline} strokeWidth={1.5} />

          {/* Mask band: darker region wrapping the eyes */}
          <rect x={28} y={50} width={64} height={34} rx={17} fill={C.hood} />

          {/* Belt sash */}
          <rect x={28} y={100} width={64} height={8} rx={4} fill={C.sash} transform="rotate(-2 60 104)" />
          <rect x={79} y={104} width={6} height={13} rx={3} fill={C.sash} transform="rotate(-16 82 104)" />

          {/* Curved headband: hugs the dome right above the eyes, knot sits just past the temple */}
          <path d="M 30.5 47 Q 60 43 84 47.5 L 84 55 Q 60 50.5 30.5 54.5 Z" fill={C.headband} />

          {/* Knot */}
          <circle cx={83.5} cy={51} r={3.8} fill={C.headband} />

          {/* Short tails, tucked close against the head with a barely-perceptible ambient sway
              instead of a cartoon flutter */}
          <motion.path
            d="M 84.5 48.5 Q 92 46.5 95.5 50.5 Q 89.5 51.5 85 51 Z"
            fill={C.headband}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ ...fillBox, transformOrigin: 'left center' }}
          />
          <motion.path
            d="M 84.5 52 Q 89.5 58.5 89 64.5 Q 84 58.5 82.5 53 Z"
            fill={C.headband}
            opacity={0.85}
            animate={{ rotate: [1, -2, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ ...fillBox, transformOrigin: 'left top' }}
          />

          {/* Eyes group: subtle parallax toward the cursor */}
          <motion.g style={{ x: eyesX, y: eyesY }}>
            <circle cx={46} cy={66} r={12.5} fill={C.eyeWhite} />
            <circle cx={74} cy={66} r={12.5} fill={C.eyeWhite} />

            {/* Pupils: THE cursor trackers */}
            <motion.g style={{ x: pupilX, y: pupilY }}>
              <circle cx={46} cy={66} r={5.2} fill={C.pupil} />
              <circle cx={74} cy={66} r={5.2} fill={C.pupil} />
              <circle cx={47.7} cy={64.3} r={1.4} fill={C.eyeWhite} />
              <circle cx={75.7} cy={64.3} r={1.4} fill={C.eyeWhite} />
            </motion.g>

            {/* Eyelids: blink + shy squeeze */}
            <motion.g
              initial={false}
              animate={{ scaleY: eyesClosed ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
            >
              <circle cx={46} cy={66} r={13} fill={C.hood} />
              <circle cx={74} cy={66} r={13} fill={C.hood} />
            </motion.g>
          </motion.g>

          {/* Arms: short tapered limbs that overlap into the body at the shoulder seam, so they
              read as attached arms rather than separate floating pill/wheel shapes. */}
          <motion.g
            initial={false}
            animate={armLTargets[mood]}
            style={{ transformBox: 'fill-box', transformOrigin: '26px 84px' }}
          >
            <path
              d="M 26 84 Q 16 85 15 96 Q 14.5 106 21 110 Q 27 112 29 106 L 29 88 Z"
              fill={C.limb}
              stroke={C.outline}
              strokeWidth={1}
            />
          </motion.g>
          <motion.g
            initial={false}
            animate={armRTargets[mood]}
            style={{ transformBox: 'fill-box', transformOrigin: '94px 84px' }}
          >
            <path
              d="M 94 84 Q 104 85 105 96 Q 105.5 106 99 110 Q 93 112 91 106 L 91 88 Z"
              fill={C.limb}
              stroke={C.outline}
              strokeWidth={1}
            />
          </motion.g>

          {/* Shuriken idle trick */}
          <motion.g
            initial={false}
            animate={
              trick === 'shuriken'
                ? { opacity: [0, 1, 1, 0], rotate: [0, 720], y: [0, -16, -16, 0] }
                : { opacity: 0, rotate: 0, y: 0 }
            }
            transition={{ duration: 1 }}
            style={fillBox}
          >
            <path
              d="M 102 76 L 106 68 L 110 76 L 118 80 L 110 84 L 106 92 L 102 84 L 94 80 Z"
              fill={C.shuriken}
            />
            <circle cx={106} cy={80} r={2.2} fill={C.hood} />
          </motion.g>

          {/* Shared specular highlight — one soft gloss over the whole silhouette, not per-part shading */}
          <rect x={26} y={28} width={68} height={60} rx={34} fill="url(#ninja-specular)" pointerEvents="none" />
        </motion.g>
      </motion.g>

      {/* Smoke burst lives outside the position group so it survives the vanish */}
      <SmokePuff burstId={burstId} />
    </svg>
  );
}
