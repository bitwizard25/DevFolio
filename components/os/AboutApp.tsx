'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Cpu, HardDrive, HelpCircle, FileText, ExternalLink } from 'lucide-react';

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState<'overview' | 'storage' | 'support'>('overview');

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e]/30 text-white font-sans select-none">
      {/* Sidebar / Topbar Tab Selector */}
      <div className="flex border-b border-white/10 bg-white/[0.02] px-4">
        {[
          { id: 'overview', label: 'Overview', icon: Cpu },
          { id: 'storage', label: 'Storage', icon: HardDrive },
          { id: 'support', label: 'Support & Info', icon: HelpCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wide border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#0A84FF] text-white bg-white/[0.04]'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-[160px,1fr] gap-8 items-center h-full">
            {/* System Icon */}
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative w-28 h-28 rounded-3xl overflow-hidden border border-white/20 shadow-xl shadow-black/40">
                <Image
                  src="/Raj.jpg"
                  alt="Raj Bhoyar Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">Raj Bhoyar</h3>
                <p className="text-[10px] text-slate-400">Founding Engineer @ Hapminds</p>
              </div>
            </div>

            {/* Spec Table */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">RajOS Sequoia</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Version 15.5.20 (Build 26A324)</p>
              </div>

              <div className="h-px bg-white/10" />

              {/* Real stack facts, enclosed together — distinct from the flavor chip below */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="grid grid-cols-[100px,1fr] gap-x-4 gap-y-2.5 text-xs font-light">
                  <span className="text-slate-400 font-medium">Core Stack:</span>
                  <span className="text-white">Node.js, Express, Python (FastAPI/Django)</span>

                  <span className="text-slate-400 font-medium">System Core:</span>
                  <span className="text-white">React, Next.js, Framer Motion, Tailwind v3</span>

                  <span className="text-slate-400 font-medium">Memory (Cache):</span>
                  <span className="text-white">Redis Cache, MongoDB Aggregations</span>

                  <span className="text-slate-400 font-medium">Graphics:</span>
                  <span className="text-white">Three.js / React Three Fiber Hero Orbs</span>

                  <span className="text-slate-400 font-medium">Event Engine:</span>
                  <span className="text-white">RabbitMQ Queue Clustering (10k+ events/day)</span>

                  <span className="text-slate-400 font-medium">Agent Engine:</span>
                  <span className="text-white">CrewAI Multi-Agents, LangChain, RAG Pipelines</span>
                </div>
              </div>

              {/* Flavor text — playful, deliberately set apart so it never reads as a real spec */}
              <div className="rounded-xl border border-dashed border-white/15 p-3 flex items-center justify-between gap-3">
                <div className="grid grid-cols-[100px,1fr] gap-x-4 gap-y-2.5 text-xs font-light flex-1">
                  <span className="text-slate-500 font-medium">Developer Model:</span>
                  <span className="text-slate-400 font-mono">Raj-Bhoyar-SDE-AI-2026</span>

                  <span className="text-slate-500 font-medium">Serial Code:</span>
                  <span className="text-cyan-400/70 font-mono tracking-wider font-semibold">BITWIZARD25-CSE24</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic -mt-2">Flavor text, not hardware.</p>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Database & Messaging Drives</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Physical cache allocators and persistence engines</p>
            </div>

            <div className="space-y-4">
              {/* Mongo Drive */}
              <div className="space-y-2 pb-4 border-b border-white/5">
                <span className="font-semibold text-slate-200 text-xs">MongoDB Persistence Drive (LMS & Analytics)</span>
                <p className="text-[10px] text-slate-400 italic">Highly optimized MongoDB pipelines with complex analytical aggregations ($facet, $lookup).</p>
              </div>

              {/* Neo4j Drive */}
              <div className="space-y-2 pb-4 border-b border-white/5">
                <span className="font-semibold text-slate-200 text-xs">Neo4j Graph Database (Entities & Relationships)</span>
                <p className="text-[10px] text-slate-400 italic">Built Neo4j ORM query builder wrappers for CRUD mapping across 252+ entities.</p>
              </div>

              {/* Redis Drive */}
              <div className="space-y-2">
                <span className="font-semibold text-slate-200 text-xs">Redis In-Memory Cache (Sessions & Locks)</span>
                <p className="text-[10px] text-slate-400 italic">High performance rate-limiter, session caching, and locking microservice engines.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="grid md:grid-cols-2 gap-6 items-start h-full">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Developer Resources</h3>
                <p className="text-[11px] text-slate-400">Reach out for collaborations, roles, or details</p>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/bitwizard25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
                >
                  <span className="text-xs font-medium text-slate-200">GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://linkedin.com/in/raj-bhoyar-b597b416a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
                >
                  <span className="text-xs font-medium text-slate-200">LinkedIn Network</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="mailto:rbhoyar729@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
                >
                  <span className="text-xs font-medium text-slate-200">Send Email</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Resume Verification</h4>
                  <p className="text-[10px] text-slate-400">Verified qualifications dossier</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Graduated with a Bachelor of Technology in Computer Science and Engineering (2024). Recipient of multiple program honors, including the C4GT 2023 Fellowship.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
                className="w-full py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-slate-200 transition-colors"
              >
                Open Resume PDF Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
