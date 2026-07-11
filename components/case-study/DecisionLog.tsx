'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Decision } from '@/lib/case-studies';
import { Check, X, HelpCircle } from 'lucide-react';
import TiltCard from '@/components/interactions/TiltCard';
import VerifyBadge from './VerifyBadge';

interface DecisionLogProps {
  decisions: Decision[];
}

export default function DecisionLog({ decisions }: DecisionLogProps) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <div className="py-20 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4 border border-purple-500/20">
            <HelpCircle className="w-3 h-3" />
            <span>Engineering Maturity</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Decision Log
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            Architectural decisions are trade-off balances. Here is the engineering logic behind key choices.
          </p>
        </div>

        {/* Decisions Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {decisions.map((decision, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <TiltCard className="h-full" innerClassName="rounded-3xl">
                <div className="h-full rounded-3xl bg-[#0b0b12]/60 border border-white/10 flex flex-col justify-between backdrop-blur-md overflow-hidden">
                  {/* macOS Title Bar */}
                  <div className="flex items-center gap-2 px-4 h-9 shrink-0 border-b border-white/5 bg-white/[0.02] select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-80" />
                    </div>
                    <span className="flex-1 text-center text-[10px] font-bold text-white/30 tracking-wider uppercase font-mono pr-10">
                      decision_{index + 1}.json
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-6">
                      {/* Choice over Alternative */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                              Chose: {decision.choice}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-slate-400">
                              Over: {decision.alternative}
                            </span>
                          </div>
                          <VerifyBadge verified={decision.verified} />
                        </div>

                        <p className="text-xs text-slate-400 italic">
                          Context: {decision.context}
                        </p>
                      </div>

                      {/* Rationale */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider">
                          Core Rationale
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                          {decision.rationale}
                        </p>
                      </div>
                    </div>

                    {/* Trade-offs columns */}
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                      {/* Accepted Trade-offs */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                          <Check className="w-3 h-3" />
                          Accepted Trade-off
                        </div>
                        <ul className="space-y-1.5">
                          {decision.tradeoffs.accepted.map((item, idx) => (
                            <li key={idx} className="text-[11px] text-slate-400 leading-relaxed font-light">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What it avoided */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                          <X className="w-3 h-3" />
                          What was avoided
                        </div>
                        <ul className="space-y-1.5">
                          {decision.tradeoffs.rejected.map((item, idx) => (
                            <li key={idx} className="text-[11px] text-slate-400 leading-relaxed font-light">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
