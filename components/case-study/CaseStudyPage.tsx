'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '@/lib/case-studies';
import CaseStudyHero from './CaseStudyHero';
import MetricsRow from './MetricsRow';
import AnimatedDiagram from './AnimatedDiagram';
import DecisionLog from './DecisionLog';
import ScalingStory from './ScalingStory';
import DeploymentSection from './DeploymentSection';
import CaseStudyNav from './CaseStudyNav';

interface CaseStudyPageProps {
  study: CaseStudy;
}

export default function CaseStudyPage({ study }: CaseStudyPageProps) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#030307] text-white overflow-hidden pb-12"
    >
      {/* 1. Hero Section */}
      <CaseStudyHero study={study} />

      {/* 2. Metrics Row */}
      <MetricsRow metrics={study.metrics} />

      {/* 3. Problem Prose Section */}
      <section className="py-20 relative">
        <div className="section-container max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Problem Statement
            </h2>
            <div className="text-slate-300 leading-relaxed font-light text-base space-y-4 pt-2">
              <p>{study.problem}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Architecture Diagram */}
      <section className="py-16 relative">
        <div className="section-container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <AnimatedDiagram spec={study.diagram} />
          </motion.div>
        </div>
      </section>

      {/* 5. Decision Log */}
      <DecisionLog decisions={study.decisions} />

      {/* 6. Scaling Deep Dive */}
      <ScalingStory story={study.scalingStory} />

      {/* 7. Deployment Details */}
      <DeploymentSection deployment={study.deployment} />

      {/* 8. Prev/Next Navigation */}
      <CaseStudyNav currentSlug={study.slug} />
    </motion.article>
  );
}
