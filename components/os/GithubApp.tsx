'use client'

import React from 'react';
import Image from 'next/image';
import { GitFork, Star, BookOpen, MapPin, Link as LinkIcon, Users, ExternalLink } from 'lucide-react';

export default function GithubApp() {
  // Mock contribution grid: 52 weeks x 7 days
  const contributionGrid = Array.from({ length: 364 }, () => {
    const val = Math.random();
    if (val > 0.85) return 'bg-green-500'; // Very high
    if (val > 0.6) return 'bg-green-600'; // High
    if (val > 0.35) return 'bg-green-700'; // Med
    if (val > 0.15) return 'bg-green-900'; // Low
    return 'bg-zinc-800/80'; // None
  });

  const repos = [
    {
      name: 'DevFolio',
      desc: 'Premium macOS-simulated and classic portfolio engineered with Next.js, Tailwind, and React Three Fiber.',
      lang: 'TypeScript',
      langColor: 'bg-blue-500',
      stars: 18,
      forks: 3,
    },
    {
      name: 'ai-transcript-intelligence',
      desc: 'High-performance speech-to-text intelligence pipeline with semantic analysis, keyphrase extraction, and summary generation.',
      lang: 'Python',
      langColor: 'bg-yellow-500',
      stars: 42,
      forks: 9,
    },
    {
      name: 'rabbitmq-event-pipeline',
      desc: 'Robust event-driven pipeline processing 10k+ events/day with dead-letter exchange handling and sliding-window retries.',
      lang: 'Go',
      langColor: 'bg-cyan-500',
      stars: 29,
      forks: 4,
    },
    {
      name: 'wizard-vibe',
      desc: 'Real-time interactive WebGL audio-visualizer and canvas shader animations synced to local audio streams.',
      lang: 'JavaScript',
      langColor: 'bg-amber-400',
      stars: 15,
      forks: 2,
    },
  ];

  return (
    <div className="w-full h-full bg-[#0d0d15] text-slate-100 flex flex-col font-sans select-text">
      {/* Toolbar / Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-slate-300 font-mono">github.com/bitwizard25</span>
        </div>
        <a
          href="https://github.com/bitwizard25"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-bold text-[#0A84FF] hover:underline"
        >
          <span>Open in GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          {/* Avatar */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
            <Image
              src="/Raj.jpg"
              alt="Raj Bhoyar"
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-grow text-center md:text-left space-y-2">
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Raj Bhoyar</h2>
              <p className="text-sm text-slate-400">bitwizard25</p>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl font-light">
              SDE (AI) | Scaling intelligent systems, high-performance RAG pipelines, and interactive visual designs.
            </p>
            
            {/* Meta pills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> India</span>
              <span className="flex items-center gap-1"><LinkIcon className="w-3.5 h-3.5" /> bitwizard25.github.io</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 120+ followers</span>
            </div>
          </div>
        </div>

        {/* Contributions Heatmap */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>3,124 contributions in the last year</span>
            <span className="text-[10px] text-slate-500 font-normal">Less • • • • More</span>
          </h3>
          {/* Grid Container */}
          <div className="w-full overflow-x-auto pb-1">
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[500px]">
              {contributionGrid.map((color, i) => (
                <div key={i} className={`w-[9px] h-[9px] rounded-[1.5px] ${color} transition-all duration-300 hover:scale-125`} />
              ))}
            </div>
          </div>
        </div>

        {/* Repositories */}
        <div className="space-y-3.5">
          <h3 className="text-sm font-bold text-white">Popular repositories</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo, i) => (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <h4 className="font-bold text-[#0A84FF] text-sm hover:underline cursor-pointer">
                    {repo.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                    <span>{repo.lang}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-500/20 text-yellow-500" /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repo.forks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
