'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/components/SmoothScrollProvider';
import { APPS, AppId, getApp, renderAppContent } from './apps';
import Window from './Window';
import Dock from './Dock';
import BootScreen from './BootScreen';
import Terminal from './Terminal';
import MobileOS from './MobileOS';

interface WinState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
}

const initialWindows = (): Record<AppId, WinState> =>
  Object.fromEntries(
    APPS.map((a) => [a.id, { open: false, minimized: false, maximized: false, z: 10 }]),
  ) as Record<AppId, WinState>;

/** The OS shell: wallpaper, menu bar, desktop icons, dock, and the window manager */
export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const zCounter = useRef(10);
  const [windows, setWindows] = useState<Record<AppId, WinState>>(initialWindows);
  const [booting, setBooting] = useState(true);
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(null);
  const { lenis } = useLenis();

  useEffect(() => {
    setBooting(!sessionStorage.getItem('os-booted'));
    const check = () => setIsDesktopViewport(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // The page behind the desktop must not scroll
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  const openApp = (id: AppId) => {
    // Resume has no window of its own — it opens the existing PDF modal directly, one step
    if (id === 'resume') {
      window.dispatchEvent(new CustomEvent('open-resume-modal'));
      return;
    }
    zCounter.current += 1;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true, minimized: false, z: zCounter.current },
    }));
  };

  const closeApp = (id: AppId) =>
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: false, maximized: false } }));

  const minimizeApp = (id: AppId) =>
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }));

  const toggleMaximize = (id: AppId) =>
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], maximized: !prev[id].maximized } }));

  const focusApp = (id: AppId) => {
    zCounter.current += 1;
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], z: zCounter.current } }));
  };

  const finishBoot = () => {
    sessionStorage.setItem('os-booted', '1');
    setBooting(false);
  };

  const visibleWindows = APPS.filter((a) => windows[a.id].open && !windows[a.id].minimized);
  const openIds = APPS.filter((a) => windows[a.id].open).map((a) => a.id);

  // Phones/tablets get the iOS-style springboard instead of the window manager
  if (isDesktopViewport === false) {
    return <MobileOS />;
  }

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 z-[60] overflow-hidden bg-gradient-to-b from-[#020205] via-[#050512] to-[#0a0a1e] select-none"
    >
      {/* Wallpaper: a slow, subtle "living wallpaper" breathing zoom, like macOS dynamic desktops */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.045 }}
        transition={{ duration: 50, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        <Image
          src="/os-wallpaper.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {/* Subtle scrim so window chrome and the dock stay legible without washing out the photo */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />


      {/* Windows */}
      <AnimatePresence>
        {visibleWindows.map((app) => (
          <Window
            key={app.id}
            title={app.title}
            zIndex={windows[app.id].z}
            maximized={windows[app.id].maximized}
            initial={getApp(app.id).frame}
            dragBoundsRef={desktopRef}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onToggleMaximize={() => toggleMaximize(app.id)}
            onFocus={() => focusApp(app.id)}
          >
            {app.id === 'terminal' ? (
              <Terminal openApp={openApp} closeSelf={() => closeApp('terminal')} />
            ) : (
              renderAppContent(app.id)
            )}
          </Window>
        ))}
      </AnimatePresence>

      <Dock openIds={openIds} onLaunch={openApp} />

      <AnimatePresence>{booting && <BootScreen onDone={finishBoot} />}</AnimatePresence>
    </div>
  );
}
