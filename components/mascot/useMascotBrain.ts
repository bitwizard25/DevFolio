'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { TIMINGS } from './mascot.constants';

export type Mood =
  | 'entering'
  | 'waving'
  | 'idle'
  | 'tracking'
  | 'hiding'
  | 'celebrating'
  | 'shy'
  | 'teleporting';

const PRIORITY: Record<Mood, number> = {
  teleporting: 6,
  entering: 5,
  hiding: 4,
  shy: 3,
  celebrating: 3,
  waving: 2,
  tracking: 1,
  idle: 0,
};

interface MascotBrain {
  mood: Mood;
  blinking: boolean;
  trick: 'shuriken' | null;
  /** Higher-priority moods win; lower requests are ignored until the current one reverts */
  requestMood: (next: Mood, opts?: { for?: number }) => void;
  /** Force back to tracking regardless of priority; pass a mood to only release from that mood */
  release: (from?: Mood) => void;
  /** Call on any pointer activity — feeds idle detection */
  noteActivity: () => void;
}

/**
 * The mascot's mood machine + timers: wave on load, idle detection, blinking,
 * random idle tricks, hover-reaction delegation via [data-mascot-react].
 */
export function useMascotBrain(enabled: boolean): MascotBrain {
  const [mood, setMoodState] = useState<Mood>('entering');
  const [blinking, setBlinking] = useState(false);
  const [trick, setTrick] = useState<'shuriken' | null>(null);
  const moodRef = useRef<Mood>('entering');
  const revertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivity = useRef(Date.now());

  const setMood = useCallback((next: Mood) => {
    moodRef.current = next;
    setMoodState(next);
  }, []);

  const release = useCallback(
    (from?: Mood) => {
      if (from && moodRef.current !== from) return;
      if (revertTimer.current) clearTimeout(revertTimer.current);
      revertTimer.current = null;
      setMood('tracking');
    },
    [setMood],
  );

  const requestMood = useCallback(
    (next: Mood, opts?: { for?: number }) => {
      if (PRIORITY[next] < PRIORITY[moodRef.current]) return;
      if (revertTimer.current) clearTimeout(revertTimer.current);
      revertTimer.current = null;
      setMood(next);
      if (opts?.for) {
        revertTimer.current = setTimeout(release, opts.for);
      }
    },
    [setMood, release],
  );

  const noteActivity = useCallback(() => {
    lastActivity.current = Date.now();
    if (moodRef.current === 'idle') setMood('tracking');
  }, [setMood]);

  // Entrance: rise → wave → track
  useEffect(() => {
    if (!enabled) {
      setMood('tracking');
      return;
    }
    const waveTimer = setTimeout(() => setMood('waving'), TIMINGS.enterMs);
    const trackTimer = setTimeout(() => setMood('tracking'), TIMINGS.enterMs + TIMINGS.waveMs);
    return () => {
      clearTimeout(waveTimer);
      clearTimeout(trackTimer);
    };
  }, [enabled, setMood]);

  // Idle detection: mouse still for a while → idle
  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      if (
        moodRef.current === 'tracking' &&
        Date.now() - lastActivity.current > TIMINGS.idleAfterMs
      ) {
        setMood('idle');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [enabled, setMood]);

  // Blink loop (runs in every mood except hiding/teleporting)
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const blinkOnce = (thenDouble: boolean) => {
      setBlinking(true);
      timer = setTimeout(() => {
        setBlinking(false);
        if (thenDouble) {
          timer = setTimeout(() => blinkOnce(false), 120);
        } else {
          schedule();
        }
      }, TIMINGS.blinkDurationMs);
    };

    const schedule = () => {
      if (cancelled) return;
      const delay =
        TIMINGS.blinkMinMs + Math.random() * (TIMINGS.blinkMaxMs - TIMINGS.blinkMinMs);
      timer = setTimeout(() => {
        if (cancelled) return;
        if (moodRef.current === 'hiding' || moodRef.current === 'teleporting') {
          schedule();
          return;
        }
        blinkOnce(Math.random() < TIMINGS.doubleBlinkChance);
      }, delay);
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled]);

  // Idle tricks: occasional shuriken spin while idle
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const schedule = () => {
      if (cancelled) return;
      const delay =
        TIMINGS.trickMinMs + Math.random() * (TIMINGS.trickMaxMs - TIMINGS.trickMinMs);
      timer = setTimeout(() => {
        if (cancelled) return;
        if (moodRef.current === 'idle') {
          setTrick('shuriken');
          setTimeout(() => setTrick(null), 1100);
        }
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled]);

  // Hover reactions: one delegated listener for [data-mascot-react] elements
  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.('[data-mascot-react]');
      if (!el) return;
      const reaction = (el as HTMLElement).dataset.mascotReact;
      if (reaction === 'celebrate') requestMood('celebrating', { for: TIMINGS.reactionMs });
      if (reaction === 'shy') requestMood('shy', { for: TIMINGS.reactionMs });
    };
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => document.removeEventListener('mouseover', onOver);
  }, [enabled, requestMood]);

  return { mood, blinking, trick, requestMood, release, noteActivity };
}
