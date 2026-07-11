'use client'

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { APP_GRADIENTS, TILE_SHADOW, TileId } from './theme';

interface AppIconProps {
  id: TileId;
  icon: LucideIcon;
  /** Sizing only — e.g. "w-12 h-12" for a fixed tile, "w-full h-full" inside a sized wrapper */
  className?: string;
}

/**
 * The one place that defines what an "app icon" looks like — used by both the Dock and
 * desktop shortcuts so they can never visually drift apart.
 *
 * Percentage border-radius (not a fixed px value) so the squircle shape holds up as the
 * dock magnifies a tile from 48px to 76px. A soft top-biased radial highlight replaces a
 * flat gradient — a hard 50%-cut linear gradient reads as a visible seam at small sizes.
 */
export default function AppIcon({ id, icon: Icon, className = '' }: AppIconProps) {
  const shadow = TILE_SHADOW[id];

  return (
    <span
      className={`relative flex items-center justify-center rounded-[28%] bg-gradient-to-b ${APP_GRADIENTS[id]} border border-white/15 ring-1 ring-white/[0.08] overflow-hidden ${className}`}
      style={{
        boxShadow: `0 10px 18px -6px rgba(${shadow},0.5), 0 2px 5px -1px rgba(0,0,0,0.35)`,
      }}
    >
      {/* Soft specular highlight — no hard edge */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(120% 90% at 50% -15%, rgba(255,255,255,0.4), transparent 60%)',
        }}
      />
      {/* Faint inner shadow along the bottom edge for depth */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)' }}
      />
      <Icon className="relative w-[56%] h-[56%] text-white" strokeWidth={2.25} />
    </span>
  );
}
