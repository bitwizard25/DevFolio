import type { CSSProperties } from 'react';

// Palette — dark ninja body with the site's accent tokens.
// Body tones sit a few steps above pure black so the silhouette reads on the page background.
export const MASCOT_COLORS = {
  body: '#232339',
  hood: '#15152A',
  outline: 'rgba(255,255,255,0.10)',
  limb: '#1B1B30',
  feet: '#2E2E4A',
  eyeWhite: '#FFFFFF',
  pupil: '#15152A',
  headband: '#0A84FF', // --color-primary
  sash: '#BF5AF2', // --color-secondary
  shuriken: '#AEAEB2',
  katana: '#3A3A55',
  smoke: '#8E8E93',
} as const;

// Fixed-position anchors the mascot teleports between (avoids RealTimePulse at bottom-right
// and the Footer scroll-top at bottom-24 right-6)
export const ANCHORS: CSSProperties[] = [
  { left: '1.5rem', bottom: '1.5rem' },
  { left: '1.5rem', top: '50%', transform: 'translateY(-50%)' },
  { right: '1.5rem', top: '50%', transform: 'translateY(-50%)' },
];

export const TIMINGS = {
  idleAfterMs: 2000,
  blinkMinMs: 2800,
  blinkMaxMs: 6000,
  blinkDurationMs: 130,
  doubleBlinkChance: 0.12,
  trickMinMs: 12000,
  trickMaxMs: 20000,
  reactionMs: 1400,
  waveMs: 1600,
  enterMs: 700,
  teleportOutMs: 450,
  teleportInMs: 450,
  scrollHideVelocity: 1800,
  scrollShowVelocity: 200,
  scrollShowDebounceMs: 400,
} as const;

// Eye tracking geometry (SVG units)
export const EYE_TRACKING = {
  maxPupilX: 5,
  maxPupilY: 4,
  fullDeflectionPx: 240,
  maxTiltDeg: 10,
} as const;
