'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies';
import Magnetic from '@/components/interactions/Magnetic';

interface CaseStudyHeroProps {
  study: CaseStudy;
}

export default function CaseStudyHero({ study }: CaseStudyHeroProps) {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-transparent pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-start">
          {/* Left - Metas and Title */}
          <div className="space-y-6">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-3">
              {study.company && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                  {study.company}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                {study.role}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                {study.period}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {study.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                {study.tagline}
              </p>
            </div>

            {/* Summary */}
            <p className="text-slate-300 leading-relaxed text-lg font-light">
              {study.summary}
            </p>

            {/* Action Links */}
            {study.links && (study.links.live || study.links.github) && (
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {study.links.live && (
                  <Magnetic>
                    <a
                      href={study.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-white/5"
                    >
                      Visit Live Site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Magnetic>
                )}
                {study.links.github && (
                  <Magnetic>
                    <a
                      href={study.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white border border-white/10 font-semibold text-sm hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      View Source
                      <Github className="w-4 h-4" />
                    </a>
                  </Magnetic>
                )}
              </div>
            )}

            {/* Confidentiality Callout */}
            {study.confidential && (
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3.5 max-w-xl">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                  <Lock className="w-5 h-5 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wide">
                    Confidential Work Experience
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This project was developed under a Non-Disclosure Agreement (NDA). System architecture and decisions are discussed conceptually; proprietary code, business logic, and user details are omitted.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right - Hero Image */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-black/80">
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Ambient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
