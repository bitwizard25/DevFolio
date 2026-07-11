'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { User, Folder, TerminalSquare, FileText, Mail, Orbit, Github } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AboutApp from './AboutApp';
import ProjectsApp from './ProjectsApp';
import ContactApp from './ContactApp';
import GithubApp from './GithubApp';

// Dynamically imported: apps.tsx is imported by BOTH Desktop.tsx and MobileOS.tsx, and a static
// import here would pull SkillGlobeApp's three/@react-three/* graph into the mobile bundle even
// though MobileOS never renders this branch (it swaps in MobileSkillsList instead). A dynamic
// import means that chunk is only ever fetched when this component actually mounts.
const SkillGlobeApp = dynamic(() => import('./SkillGlobeApp'), { ssr: false });

export type AppId = 'about' | 'projects' | 'contact' | 'terminal' | 'resume' | 'skill-globe' | 'github';

export interface AppSpec {
  id: AppId;
  title: string;
  /** Short name shown under desktop icons */
  label: string;
  icon: LucideIcon;
  /** Default window frame (px, relative to the desktop) */
  frame: { x: number; y: number; width: number; height: number };
}

// Terminal renders separately (needs openApp/closeSelf); everything else is static content.
// Case Studies isn't its own app — ProjectsApp already links out to every case study per
// project, so a second navigation surface pointing at the same destinations would be redundant.
export const APPS: AppSpec[] = [
  { id: 'about', title: 'About.app', label: 'About', icon: User, frame: { x: 120, y: 70, width: 880, height: 560 } },
  { id: 'projects', title: 'Projects.app', label: 'Projects', icon: Folder, frame: { x: 200, y: 50, width: 960, height: 620 } },
  { id: 'skill-globe', title: 'SkillGlobe.app', label: 'SkillGlobe', icon: Orbit, frame: { x: 220, y: 80, width: 560, height: 500 } },
  { id: 'terminal', title: 'Terminal — zsh', label: 'Terminal', icon: TerminalSquare, frame: { x: 380, y: 160, width: 620, height: 400 } },
  { id: 'github', title: 'GitHub.app', label: 'GitHub', icon: Github, frame: { x: 300, y: 100, width: 800, height: 580 } },
  { id: 'resume', title: 'Resume.pdf', label: 'Resume', icon: FileText, frame: { x: 340, y: 130, width: 520, height: 340 } },
  { id: 'contact', title: 'Contact.app', label: 'Contact', icon: Mail, frame: { x: 260, y: 60, width: 820, height: 600 } },
];

export const getApp = (id: AppId) => APPS.find((a) => a.id === id)!;

/** Static window content per app (terminal is wired up inside Desktop; resume has no window — see Desktop.openApp) */
export function renderAppContent(id: AppId): React.ReactNode {
  switch (id) {
    case 'about':
      return <AboutApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'skill-globe':
      return <SkillGlobeApp />;
    case 'github':
      return <GithubApp />;
    case 'contact':
      return <ContactApp />;
    default:
      return null;
  }
}
