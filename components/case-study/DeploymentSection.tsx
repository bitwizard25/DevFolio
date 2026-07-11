'use client'
import React from 'react';
import { Cloud, GitPullRequest, Settings } from 'lucide-react';

interface DeploymentSectionProps {
  deployment?: {
    description: string;
    stack: string[];
    verified: boolean;
  };
}

export default function DeploymentSection({ deployment }: DeploymentSectionProps) {
  if (!deployment || !deployment.verified) return null;

  return (
    <div className="py-16 border-t border-white/5 bg-[#08080c]/30">
      <div className="section-container max-w-4xl mx-auto">
        <div className="rounded-3xl bg-black/60 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col">
          {/* macOS Title Bar */}
          <div className="flex items-center gap-2 px-5 h-10 shrink-0 border-b border-white/10 bg-white/[0.02] select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-80" />
            </div>
            <span className="flex-1 text-center text-[10px] font-bold text-white/30 tracking-wider uppercase font-mono pr-10">
              deploy_config.yml
            </span>
          </div>

          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-400">
                <Cloud className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase font-mono">
                  Deployment & Operations
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Production Environment
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light max-w-xl">
                {deployment.description}
              </p>
            </div>

            {/* Stack chips */}
            <div className="flex flex-wrap gap-2 md:max-w-xs justify-start md:justify-end">
              {deployment.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-350"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
