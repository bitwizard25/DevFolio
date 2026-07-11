'use client'

import React, { useEffect, useRef, useState } from 'react';
import { caseStudies } from '@/lib/case-studies';
import { skillGroups } from '@/lib/skills';
import type { AppId } from './apps';

interface TerminalProps {
  openApp: (id: AppId) => void;
  closeSelf: () => void;
}

interface Line {
  prompt?: string;
  text: string;
}

const HELP = `Available commands:
  whoami            who is this guy
  ls projects       list case studies
  cat skills.txt    tech stack
  open <app>        about | projects | contact | skillglobe | github | resume
  clear             clear the screen
  exit              close this terminal`;

/** A small fake shell — enough commands to be fun, not enough to be a chore */
export default function Terminal({ openApp, closeSelf }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { text: "Welcome to RajOS. Type 'help' to get started." },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  const run = (raw: string): string | null => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return null;
    if (cmd === 'help') return HELP;
    if (cmd === 'whoami')
      return 'Raj Bhoyar — Full Stack Developer & AI Enthusiast.\nArchitecting scalable systems and intelligent agents.';
    if (cmd === 'ls' || cmd === 'ls projects')
      return caseStudies.map((c) => `${c.slug}/`).join('\n');
    if (cmd === 'cat skills.txt')
      return skillGroups
        .map((g) => `[${g.label}] ${g.skills.join(', ')}`)
        .join('\n');
    if (cmd.startsWith('open ')) {
      const target = cmd.slice(5).trim();
      if (target === 'resume') {
        window.dispatchEvent(new CustomEvent('open-resume-modal'));
        return 'Opening resume…';
      }
      if (target === 'skillglobe' || target === 'skill-globe') {
        openApp('skill-globe');
        return `Opening SkillGlobe.app…`;
      }
      if (target === 'about' || target === 'projects' || target === 'contact' || target === 'github') {
        openApp(target as AppId);
        return `Opening ${target}.app…`;
      }
      return `open: unknown app '${target}'`;
    }
    if (cmd === 'clear') {
      setLines([]);
      return null;
    }
    if (cmd === 'exit') {
      closeSelf();
      return null;
    }
    if (cmd === 'sudo rm -rf /') return 'nice try, ninja 🥷';
    return `command not found: ${cmd}. Try 'help'.`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = run(input);
    setLines((prev) => [
      ...prev,
      { prompt: 'raj@devfolio:~$', text: input },
      ...(output ? [{ text: output }] : []),
    ]);
    setInput('');
  };

  return (
    <div
      className="h-full min-h-[260px] p-4 font-mono text-[13px] leading-relaxed text-slate-200 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap break-words">
          {line.prompt && <span className="text-emerald-400">{line.prompt} </span>}
          <span className={line.prompt ? 'text-white' : 'text-slate-300'}>{line.text}</span>
        </div>
      ))}
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <span className="text-emerald-400 shrink-0">raj@devfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white caret-emerald-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
