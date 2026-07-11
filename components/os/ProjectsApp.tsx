'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, FileCode, Folder, FolderGit, ArrowUpRight, Github, BookOpen } from 'lucide-react';
import { projects, Project } from '@/lib/projects';

export default function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);
  const [filter, setFilter] = useState<'all' | 'office' | 'personal'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'office' && p.category === 'office') ||
      (filter === 'personal' && p.category === 'personal');
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-full bg-[#161622]/40 text-white font-sans select-none">
      {/* 1. Finder Left Sidebar */}
      <div className="w-48 bg-black/35 border-r border-white/10 p-3.5 space-y-5 shrink-0 hidden sm:block">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Favorites</p>
          <button
            onClick={() => setFilter('all')}
            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            <span>All Work</span>
          </button>

          <button
            onClick={() => setFilter('office')}
            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'office'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
            <span>Office Work</span>
          </button>

          <button
            onClick={() => setFilter('personal')}
            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'personal'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <FolderGit className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400/20" />
            <span>Side Projects</span>
          </button>
        </div>
      </div>

      {/* Main Container (Toolbar + Content Grid + Preview Pane) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Finder Top Toolbar */}
        <div className="h-11 border-b border-white/10 bg-white/[0.02] px-4 flex items-center justify-between gap-4 shrink-0">
          {/* Breadcrumb */}
          <span className="text-[11px] font-semibold text-slate-400 font-mono">
            Finder &gt; {filter === 'all' ? 'All_Work' : filter === 'office' ? 'Office_Work' : 'Side_Projects'}
          </span>

          {/* Search bar */}
          <div className="relative max-w-xs w-full flex items-center">
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-7 bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 text-xs outline-none text-white focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* 3. Content Panel (Split Grid & Sidebar) */}
        <div className="flex-grow flex min-h-0">
          {/* Files Grid Area */}
          <div className="flex-1 p-4 overflow-y-auto min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProjects.map((p) => {
                const isSelected = selectedProject?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center group ${
                      isSelected
                        ? 'bg-[#0A84FF]/25 border-[#0A84FF] shadow-lg shadow-[#0A84FF]/10'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/15'
                    }`}
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center mb-2">
                      {p.category === 'office' ? (
                        <Folder className="w-11 h-11 text-purple-400 fill-purple-400/20 group-hover:scale-105 transition-transform" />
                      ) : (
                        <FileCode className="w-10 h-10 text-cyan-400 group-hover:scale-105 transition-transform" />
                      )}
                      {p.caseStudySlug && (
                        <span
                          className="absolute -top-1 -right-1 p-1 rounded-full bg-[#FF6B87]/20 border border-[#FF6B87]/40"
                          title="Has a case study"
                        >
                          <BookOpen className="w-2.5 h-2.5 text-[#FF6B87]" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-200 truncate w-full px-1">
                      {p.title}
                    </span>
                    <span className="text-[9px] text-slate-500 uppercase mt-0.5 tracking-wider font-mono">
                      {p.category === 'office' ? 'Folder' : 'App'}
                    </span>
                  </button>
                );
              })}

              {filteredProjects.length === 0 && (
                <div className="col-span-full py-16 text-center text-xs text-slate-500">
                  No project files found
                </div>
              )}
            </div>
          </div>

          {/* 4. Finder Right Info Preview Panel */}
          {selectedProject && (
            <div className="w-64 border-l border-white/10 bg-black/15 p-4 flex flex-col justify-between shrink-0 overflow-y-auto h-full hidden md:flex">
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-black/40">
                  {selectedProject.image && (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-200 truncate">{selectedProject.title}</h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                {/* Info Fields */}
                <div className="space-y-2 text-[10px]">
                  <div className="grid grid-cols-[60px,1fr] gap-2">
                    <span className="text-slate-500">Kind:</span>
                    <span className="text-slate-300 font-medium">
                      {selectedProject.category === 'office' ? 'Office System Folder' : 'Personal Project Application'}
                    </span>
                  </div>

                  <div className="grid grid-cols-[60px,1fr] gap-2">
                    <span className="text-slate-500">Size:</span>
                    {selectedProject.metrics ? (
                      <span className="text-emerald-400 font-mono font-medium">
                        {selectedProject.metrics}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic font-normal">No public metrics</span>
                    )}
                  </div>

                  <div className="grid grid-cols-[60px,1fr] gap-2">
                    <span className="text-slate-500">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                {selectedProject.caseStudySlug && (
                  <Link
                    href={`/projects/${selectedProject.caseStudySlug}`}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-slate-200 transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
