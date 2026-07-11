'use client'

import React from 'react';
import { skillGroups } from '@/lib/skills';

/**
 * Lightweight, non-3D stand-in for SkillGlobeApp on mobile — same data as the desktop's
 * word-orb, but plain grouped pills. Deliberately never imports @react-three/fiber/drei/three,
 * so that whole dependency graph never enters the mobile bundle.
 */
export default function MobileSkillsList() {
  return (
    <div className="p-5 space-y-6 overflow-y-auto h-full">
      {skillGroups.map((group) => (
        <div key={group.label}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              {group.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/85 bg-white/[0.06] border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
