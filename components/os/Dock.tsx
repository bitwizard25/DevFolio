'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMotionValue } from 'framer-motion';
import { Home } from 'lucide-react';
import { APPS, AppId } from './apps';
import DockIcon from './DockIcon';

interface DockProps {
  openIds: AppId[];
  onLaunch: (id: AppId) => void;
}

/** Bottom dock: app launchers that magnify toward the pointer, like the real thing */
export default function Dock({ openIds, onLaunch }: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const router = useRouter();

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100]">
      <div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className="relative flex items-end gap-3 px-4 py-3 rounded-[26px] bg-white/[0.08] backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/50"
      >
        {/* Glass top highlight, matching the window chrome */}
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
        {APPS.map((app) => (
          <DockIcon
            key={app.id}
            id={app.id}
            label={app.title}
            icon={app.icon}
            mouseX={mouseX}
            isOpen={openIds.includes(app.id)}
            onClick={() => onLaunch(app.id)}
          />
        ))}

        {/* Classic Site is a route escape-hatch, not a primary app — enclosed as its own group.
            GitHub now has a real in-OS app/window (GithubApp.tsx, in the main APPS loop above),
            so it no longer needs a second, duplicate external-link tile here. */}
        <div className="flex items-end gap-3 pl-2.5 ml-0.5 rounded-2xl bg-white/[0.04] border border-white/5">
          <DockIcon id="home" label="Classic Site" icon={Home} mouseX={mouseX} isOpen={false} onClick={() => router.push('/classic')} />
        </div>
      </div>
    </div>
  );
}
