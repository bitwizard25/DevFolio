'use client'
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { caseStudies, CaseStudy } from '@/lib/case-studies';

interface CaseStudyNavProps {
  currentSlug: string;
}

export default function CaseStudyNav({ currentSlug }: CaseStudyNavProps) {
  const currentIndex = caseStudies.findIndex((study) => study.slug === currentSlug);

  if (currentIndex === -1) return null;

  // Previous and Next study calculations (looping)
  const prevStudy = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length];
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="py-20 border-t border-white/5 bg-[#07070a]/40">
      <div className="section-container max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-stretch">
          {/* Previous Link */}
          <Link
            href={`/projects/${prevStudy.slug}`}
            className="flex-1 group p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-white transition-colors duration-300 mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Previous Case Study
            </div>
            <div>
              <h4 className="text-base font-bold text-white leading-tight">
                {prevStudy.title}
              </h4>
              <p className="text-xs text-slate-400 font-light mt-1 line-clamp-1">
                {prevStudy.tagline}
              </p>
            </div>
          </Link>

          {/* Next Link */}
          <Link
            href={`/projects/${nextStudy.slug}`}
            className="flex-1 group p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between text-right"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-white transition-colors duration-300 justify-end mb-2">
              Next Case Study
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white leading-tight">
                {nextStudy.title}
              </h4>
              <p className="text-xs text-slate-400 font-light mt-1 line-clamp-1 animate-pulse">
                {nextStudy.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Center - Back to Home Link */}
        <div className="text-center mt-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all duration-300"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Back to Project Grid
          </Link>
        </div>
      </div>
    </div>
  );
}
