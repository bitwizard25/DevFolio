'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Metric } from '@/lib/case-studies';
import CountUp from '@/components/ui/CountUp';
import VerifyBadge from './VerifyBadge';

interface MetricsRowProps {
  metrics: Metric[];
}

export default function MetricsRow({ metrics }: MetricsRowProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="py-16 border-t border-b border-white/5 bg-slate-900/10 backdrop-blur-3xl">
      <div className="section-container">
        <div className="text-center mb-12">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider text-white/60">
            Quantified Impact
          </h3>
        </div>

        <div className={`grid gap-8 md:grid-cols-${Math.min(metrics.length, 4)} max-w-5xl mx-auto justify-stretch`}>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-baseline gap-1">
                  <CountUp
                    value={metric.numericValue}
                    className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                  />
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {metric.suffix}
                  </span>
                  <VerifyBadge verified={metric.verified} className="self-center" />
                </div>
                <h4 className="text-sm font-semibold text-slate-200">
                  {metric.label}
                </h4>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">
                  Measurement Formula
                </span>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {metric.formula}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
