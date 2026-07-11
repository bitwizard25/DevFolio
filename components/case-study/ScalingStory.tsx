'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ScalingSection } from '@/lib/case-studies';
import { ShieldCheck, HardDrive, RefreshCw } from 'lucide-react';

interface ScalingStoryProps {
  story: ScalingSection[];
}

export default function ScalingStory({ story }: ScalingStoryProps) {
  if (!story || story.length === 0) return null;

  return (
    <div className="py-20 relative border-t border-white/5 bg-slate-950/20">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 border border-cyan-500/20">
            <CpuIcon className="w-3 h-3" />
            <span>Architecture Deep Dive</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            System Design & Scaling
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            Deep dive into consistency guarantees, scalability bottlenecks, and fault tolerance mechanisms.
          </p>
        </div>

        {/* Story List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {story.map((section, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="rounded-3xl bg-[#09090f]/50 border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl flex flex-col"
              >
                {/* macOS Title Bar */}
                <div className="flex items-center gap-2 px-5 h-10 shrink-0 border-b border-white/10 bg-white/[0.02] select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-80" />
                  </div>
                  <span className="flex-1 text-center text-[10px] font-bold text-white/30 tracking-wider uppercase font-mono pr-10">
                    {index === 0 ? 'consistency_spec.md' : index === 1 ? 'scaling_limits.md' : 'recovery_policy.md'}
                  </span>
                </div>

                <div className="p-8 grid md:grid-cols-[200px,1fr] gap-6 items-start">
                  {/* Left Column - Heading/Theme */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400">
                      {index === 0 && <ShieldCheck className="w-5 h-5" />}
                      {index === 1 && <HardDrive className="w-5 h-5" />}
                      {index >= 2 && <RefreshCw className="w-5 h-5" />}
                      <span className="text-xs font-bold tracking-widest uppercase font-mono">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {section.heading}
                    </h3>
                  </div>

                  {/* Right Column - Body/Detail */}
                  <div className="space-y-4">
                    <p className="text-sm text-slate-350 leading-relaxed font-light">
                      {section.body}
                    </p>
                    {section.bullets && (
                      <ul className="space-y-2">
                        {section.bullets.map((bullet, bulletIdx) => (
                          <li
                            key={bulletIdx}
                            className="text-xs text-slate-450 flex items-start gap-2 leading-relaxed"
                          >
                            <span className="text-cyan-400 mt-1 select-none font-bold">›</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Inline helper CPU icon
const CpuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 15h3" /><path d="M1 9h3" /><path d="M1 15h3" /></svg>
);
