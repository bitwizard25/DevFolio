'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Server, Database, Bot, GitBranch, TrendingUp, Lock, Code2, Users, ArrowUpRight, LucideIcon } from 'lucide-react';
import { projects, Project, ProjectIcon } from '@/lib/projects';
import TiltCard from '@/components/interactions/TiltCard';
import Magnetic from '@/components/interactions/Magnetic';
import KineticText from '@/components/interactions/KineticText';
import Parallax from '@/components/interactions/Parallax';

// Simple Briefcase Icon component for usage
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);

const iconMap: Record<ProjectIcon, LucideIcon> = {
  server: Server,
  database: Database,
  bot: Bot,
  'git-branch': GitBranch,
  trending: TrendingUp,
  users: Users,
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[project.icon];
  const isOffice = project.category === 'office';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard className="h-full" innerClassName="rounded-3xl">
        <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 h-full bg-slate-900/40 border border-white/5 ${isHovered ? 'border-cyan-500/30 shadow-2xl shadow-cyan-500/10' : 'hover:border-white/10'
          }`}>
          {/* Gradient Border Effect - Cleaner */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

          {/* Card Content */}
          <div className="relative card p-0 overflow-hidden h-full flex flex-col bg-[#0a0a0a]/90 backdrop-blur-xl">
            {/* macOS Title Bar */}
            <div className="flex items-center gap-2 px-4 h-9 shrink-0 border-b border-white/5 bg-white/[0.02] select-none rounded-t-3xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5F57] opacity-85" />
                <span className="w-2 h-2 rounded-full bg-[#FEBC2E] opacity-85" />
                <span className="w-2 h-2 rounded-full bg-[#28C840] opacity-85" />
              </div>
              <span className="flex-1 text-center text-[10px] font-semibold text-white/30 tracking-wider uppercase font-mono pr-10">
                {project.caseStudySlug ? `${project.caseStudySlug}.app` : `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.app`}
              </span>
            </div>

            {/* Project Image/Header */}
            <div className="relative h-56 overflow-hidden group-hover:h-56 transition-all duration-500 shrink-0">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

              {/* Icon Overlay */}
              <div className="absolute top-4 left-4 flex items-center justify-center transition-all duration-300">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Hover Overlay with Links - ONLY for Personal Projects */}
              {!isOffice && (
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn p-4 rounded-full bg-white text-black hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      aria-label="View Live"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-md"
                      aria-label="View Source"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}

              {/* Office Badge - Sleek Pill */}
              {isOffice && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 flex items-center gap-1.5 shadow-lg">
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">Confidential</span>
                </div>
              )}

              {/* Metrics Badge */}
              {project.metrics && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 shadow-lg">
                  <span className="text-xs font-semibold text-emerald-400">{project.metrics}</span>
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-6 flex flex-col flex-grow relative">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
              </div>

              {project.company && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400/80">
                    <BriefcaseIcon className="w-3 h-3" />
                    {project.company}
                  </span>
                </div>
              )}

              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                {project.description}
              </p>

              {/* Tags - Minimal Pills */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-500">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Case Study Link */}
              {project.caseStudySlug && (
                <Link
                  href={`/projects/${project.caseStudySlug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group/cs"
                >
                  Read case study
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// Homepage preview cap (Hick's/Miller's Law — first-glance surface only; /projects and every
// OS project browser stay uncapped since those are "I opened this to browse everything" views).
// Picked for deepest case-study coverage, not just array order — see lib/case-studies.ts.
const FEATURED_OFFICE_IDS = [1, 5, 4];
const FEATURED_PERSONAL_IDS = [102, 101];

const byFeaturedOrder = (ids: number[]) => (a: Project, b: Project) => ids.indexOf(a.id) - ids.indexOf(b.id);

interface ProjectsSectionProps {
  /** Homepage preview mode: caps to 5 total + adds a "View all" link to /projects */
  featured?: boolean;
}

const ProjectsSection = ({ featured = false }: ProjectsSectionProps) => {
  const allOffice = projects.filter(p => p.category === 'office');
  const allPersonal = projects.filter(p => p.category === 'personal');

  const officeProjects = featured
    ? allOffice.filter(p => FEATURED_OFFICE_IDS.includes(p.id)).sort(byFeaturedOrder(FEATURED_OFFICE_IDS))
    : allOffice;
  const personalProjects = featured
    ? allPersonal.filter(p => FEATURED_PERSONAL_IDS.includes(p.id)).sort(byFeaturedOrder(FEATURED_PERSONAL_IDS))
    : allPersonal;
  const totalCount = allOffice.length + allPersonal.length;

  return (
    <section id="projects" className="min-h-screen py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-transparent pointer-events-none">
        <Parallax range={[-60, 60]} className="absolute top-[20%] right-[10%]">
          <div className="w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        </Parallax>
        <Parallax range={[60, -60]} className="absolute bottom-[10%] left-[5%]">
          <div className="w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
        </Parallax>
      </div>

      <div className="section-container relative z-10">

        {/* --- OFFICE PROJECTS --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 border border-cyan-500/20">
                <BriefcaseIcon className="w-3 h-3" />
                <span>Work Experience</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <KineticText text="Enterprise" /> <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Scalable, production-ready systems built for NNIIT and other organizations.
              </p>
              <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-wider">
                * Confidential / Under NDA
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {officeProjects.map((project, index) => (
              <div key={project.id} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* --- PERSONAL PROJECTS --- */}
        <div className="relative">
          {/* Divider */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6 border border-purple-500/20">
                <Code2 className="w-3 h-3" />
                <span>Side Hustles</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <KineticText text="Personal &" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Open Source</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Experiments, hackathons, and contributions to the developer community.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {personalProjects.map((project, index) => (
              <div key={project.id} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {featured && (
            <Magnetic>
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-cyan-600/80 to-purple-600/80 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              >
                <span className="relative z-10">View all {totalCount} projects</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>
          )}
          <Magnetic>
            <a
              href="https://github.com/bitwizard25"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/10"
            >
              <span className="relative z-10">View Full GitHub Profile</span>
              <Github className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};


export default ProjectsSection;
