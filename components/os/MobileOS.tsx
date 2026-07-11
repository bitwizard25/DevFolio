'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Wifi, BatteryFull, Github, Home as HomeIcon } from 'lucide-react';
import { APPS, AppId, getApp, renderAppContent } from './apps';
import Terminal from './Terminal';
import MobileSkillsList from './MobileSkillsList';
import AppIcon from './AppIcon';
import type { TileId } from './theme';

type ViewableApp = Extract<AppId, 'about' | 'projects' | 'skill-globe' | 'terminal' | 'contact' | 'github'>;

const VIEWABLE: ViewableApp[] = ['about', 'projects', 'skill-globe', 'terminal', 'contact', 'github'];

function isViewable(id: AppId): id is ViewableApp {
  return (VIEWABLE as AppId[]).includes(id);
}

/**
 * The touch-native reinterpretation of the desktop OS: an iOS-style home screen — status bar,
 * a wallpaper, a springboard grid of app icons, and a home indicator — instead of simulating
 * draggable windows on a screen with no cursor. Tapping an icon opens that app full-screen;
 * the home indicator returns to the springboard. Reuses the exact same app content components
 * as the desktop (AboutApp/ProjectsApp/ContactApp/Terminal) since they already collapse to a
 * single column below sm/md — only SkillGlobe gets swapped for a lightweight, non-3D list so
 * `three`/`@react-three/*` never enter the mobile bundle.
 */
export default function MobileOS() {
  const router = useRouter();
  const [activeApp, setActiveApp] = useState<ViewableApp | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  const goHome = () => setActiveApp(null);

  const onTap = (id: AppId) => {
    if (id === 'resume') {
      window.dispatchEvent(new CustomEvent('open-resume-modal'));
      return;
    }
    if (isViewable(id)) setActiveApp(id);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-black select-none">
      {/* Wallpaper — static on mobile, no continuous zoom (battery/GPU cost isn't worth it here) */}
      <Image src="/os-wallpaper.png" alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

      {/* Fake status bar */}
      <div
        className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-6 text-white text-[13px] font-semibold"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)', height: 'calc(14px + env(safe-area-inset-top) + 24px)' }}
      >
        <span className="tabular-nums">{time}</span>
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5" aria-hidden="true" />
          <BatteryFull className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      {/* Springboard */}
      {!activeApp && (
        <div className="absolute inset-0 pt-24 px-6 grid grid-cols-4 gap-x-4 gap-y-6 content-start">
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => onTap(app.id)}
              className="flex flex-col items-center gap-1.5"
              aria-label={`Open ${app.title}`}
            >
              <AppIcon id={app.id} icon={app.icon} className="w-14 h-14" />
              <span className="text-[11px] text-white font-medium text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                {app.label}
              </span>
            </button>
          ))}

          <button
            onClick={() => router.push('/classic')}
            className="flex flex-col items-center gap-1.5"
            aria-label="Classic Site"
          >
            <AppIcon id={'home' as TileId} icon={HomeIcon} className="w-14 h-14" />
            <span className="text-[11px] text-white font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">Classic Site</span>
          </button>
        </div>
      )}

      {/* Full-screen app view */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            key={activeApp}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="absolute inset-0 z-20 flex flex-col bg-[#0d0d15]"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            <div className="flex items-center gap-2 px-3 h-12 shrink-0 border-b border-white/10 bg-white/[0.03]">
              <button
                onClick={goHome}
                className="flex items-center gap-1 px-2 py-1.5 -ml-1 rounded-lg text-[#0A84FF] active:bg-white/10"
                aria-label="Back to Home Screen"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Home</span>
              </button>
              <span className="flex-1 text-center text-sm font-semibold text-white/80 pr-16 truncate">
                {getApp(activeApp).title}
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
              {activeApp === 'terminal' ? (
                <Terminal openApp={onTap} closeSelf={goHome} />
              ) : activeApp === 'skill-globe' ? (
                <MobileSkillsList />
              ) : (
                renderAppContent(activeApp)
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home indicator */}
      <button
        onClick={activeApp ? goHome : undefined}
        aria-label={activeApp ? 'Return to Home Screen' : undefined}
        aria-hidden={!activeApp}
        tabIndex={activeApp ? 0 : -1}
        className={`absolute bottom-0 inset-x-0 z-30 flex justify-center ${activeApp ? '' : 'pointer-events-none'}`}
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
      >
        <span
          className={`w-32 h-1.5 rounded-full bg-white/70 transition-opacity ${activeApp ? 'opacity-90' : 'opacity-40'}`}
        />
      </button>
    </div>
  );
}
