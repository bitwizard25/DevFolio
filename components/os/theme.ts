import type { AppId } from './apps';

export type TileId = AppId | 'github' | 'home';

/** Single source of truth for app-tile gradients — shared by every AppIcon consumer (Dock today) */
export const APP_GRADIENTS: Record<TileId, string> = {
  about: 'from-[#3DA2FF] to-[#0055B3]', // System Blue
  projects: 'from-[#8785F5] to-[#3634A3]', // Indigo
  'skill-globe': 'from-[#BF5AF2] to-[#640D96]', // Siri/Podcasts Purple
  terminal: 'from-[#3A3A3C] to-[#000000]', // Terminal Dark
  resume: 'from-[#FFB93D] to-[#B36B00]', // PDF Orange
  contact: 'from-[#5CE374] to-[#1E822D]', // Mint
  github: 'from-[#333940] to-[#0d1117]', // GitHub-authentic near-black
  home: 'from-[#AEAEB2] to-[#48484A]', // System Gray (Finder/System-style)
};

/** Ambient colored shadow cast beneath each tile — the subtle cue real app icons have */
export const TILE_SHADOW: Record<TileId, string> = {
  about: '10,132,255',
  projects: '94,92,230',
  'skill-globe': '191,90,242',
  terminal: '0,0,0',
  resume: '255,159,10',
  contact: '50,215,75',
  github: '0,0,0',
  home: '72,72,74',
};
