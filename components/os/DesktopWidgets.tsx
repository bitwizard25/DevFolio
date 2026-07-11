'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Music, GitCommit, MapPin } from 'lucide-react';

const STATUSES = [
  {
    id: 'status',
    icon: Activity,
    tint: 'text-emerald-400',
    label: 'Status',
    text: 'All Systems Operational',
    live: true,
  },
  {
    id: 'vibe',
    icon: Music,
    tint: 'text-purple-400',
    label: 'Vibe',
    text: 'Lo-Fi Beats · Coding',
    live: false,
  },
  {
    id: 'push',
    icon: GitCommit,
    tint: 'text-blue-400',
    label: 'Latest Push',
    text: 'feat: Portfolio OS relaunch',
    live: false,
  },
] as const;

function greetingFor(hour: number) {
  if (hour < 5) return 'Burning the midnight oil';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Sonoma-style ambient desktop widgets — the desktop at rest shouldn't be an empty wallpaper.
 * Decorative only (pointer-events-none): windows drag freely over them, the dock stays the
 * single interactive launcher.
 */
export default function DesktopWidgets() {
  const [now, setNow] = useState<Date | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const clock = setInterval(tick, 30000);
    const cycle = setInterval(() => setStatusIndex((i) => (i + 1) % STATUSES.length), 5000);
    return () => {
      clearInterval(clock);
      clearInterval(cycle);
    };
  }, []);

  if (!now) return null;
  const status = STATUSES[statusIndex];
  const StatusIcon = status.icon;

  return (
    <div className="absolute top-8 right-8 z-[5] flex flex-col gap-4 pointer-events-none select-none">
      {/* Clock widget */}
      <div className="relative w-72 rounded-3xl bg-black/35 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
          {greetingFor(now.getHours())}
        </p>
        <p className="text-4xl font-bold text-white tabular-nums tracking-tight mt-1">
          {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-xs text-white/60">
            {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="flex items-center gap-1 text-[11px] text-white/40">
            <MapPin className="w-3 h-3" /> Hyderabad
          </p>
        </div>
      </div>

      {/* Live dev-status widget — cycles like a lock-screen activity */}
      <div className="relative w-72 rounded-3xl bg-black/35 backdrop-blur-2xl border border-white/10 px-5 py-4 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="h-9 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={status.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              {status.live ? (
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              ) : (
                <StatusIcon className={`w-4 h-4 shrink-0 ${status.tint}`} />
              )}
              <div className="min-w-0">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${status.tint}`}>{status.label}</p>
                <p className="text-xs text-slate-200 font-medium truncate">{status.text}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
