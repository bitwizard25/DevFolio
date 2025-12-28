'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder, Server, Database, Bot, GitBranch, TrendingUp, Lock, Award, Code2, Users } from 'lucide-react';

// Simple Briefcase Icon component for usage
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  link?: string;
  github?: string;
  tags: string[];
  featured?: boolean;
  icon: React.ElementType;
  metrics?: string;
  category: 'office' | 'personal';
  company?: string;
}

const projects: Project[] = [
  // Office Projects (NNIIT)
  {
    id: 1,
    title: "EdTech Session Management",
    description: "Production-grade backend managing 10K+ daily tutor-student sessions with automated scheduling.",
    longDescription: "Built comprehensive session management system with MongoDB aggregations, RabbitMQ queues, and automated notifications via MSG91.",
    image: "/project_edtech_platform_1766890051656.png",
    tags: ["Node.js", "MongoDB", "RabbitMQ", "MSG91", "Cron"],
    featured: true,
    icon: Server,
    metrics: "10K+ events/day",
    category: 'office',
    company: 'NNIIT'
  },
  {
    id: 2,
    title: "Order Management API",
    description: "High-performance REST API with MongoDB aggregation pipelines, 60% faster response times.",
    longDescription: "Optimized order management using $lookup, $facet for pagination and dynamic search with relevance scoring.",
    image: "/project_api_data_1766890087589.png",
    tags: ["Node.js", "MongoDB", "REST API", "Aggregation"],
    featured: true,
    icon: Database,
    metrics: "60% faster",
    category: 'office',
    company: 'NNIIT'
  },
  {
    id: 4,
    title: "AI Assistant with CrewAI",
    description: "Multi-agent AI system using CrewAI, Groq LLM, and LangChain for intelligent automation.",
    longDescription: "Developed AI assistant leveraging CrewAI for multi-agent orchestration with chain-of-thought reasoning.",
    image: "/project_ai_agents_1766890069336.png",
    tags: ["Python", "LangChain", "CrewAI", "Groq"],
    featured: true,
    icon: Bot,
    category: 'office',
    company: 'NNIIT'
  },
  {
    id: 5,
    title: "RabbitMQ Architecture",
    description: "Enterprise-grade message queue with dead-letter queues, retries, and consumer scaling.",
    longDescription: "Redesigned RabbitMQ implementation following best practices for reliable event-driven architecture.",
    image: "/project_rabbitmq_arch_1766890105265.png",
    tags: ["RabbitMQ", "Node.js", "Event-Driven"],
    featured: false,
    icon: GitBranch,
    category: 'office',
    company: 'NNIIT'
  },
  {
    id: 6,
    title: "Transcript Analysis Pipeline",
    description: "Automated AI-powered pipeline for session transcript analysis and insight generation.",
    longDescription: "End-to-end pipeline with cron jobs for fetching, RAG-based analysis, and automated reporting.",
    image: "/project_transcript_analysis_1766890257445.png",
    tags: ["Python", "RAG", "LLM", "Cron"],
    featured: false,
    icon: TrendingUp,
    category: 'office',
    company: 'NNIIT'
  },

  // Personal Projects
  {
    id: 101,
    title: "Lok Darpan",
    description: "A digital platform reflecting social dynamics and civic engagement. MERN Stack application.",
    longDescription: "Built a comprehensive full-stack application (MERN) to facilitate transparency and digital civic engagement.",
    image: "/project_lok_darpan_1766892221259.png",
    link: "https://github.com/rajbhoyar729/LokDarpan",
    github: "https://github.com/rajbhoyar729/LokDarpan",
    tags: ["MERN Stack", "React", "Node.js", "Social"],
    featured: true,
    icon: Users,
    category: 'personal'
  },
  {
    id: 102,
    title: "Wizard Vibe",
    description: "AI-powered productivity assistant with real-time collaboration and smart task automation.",
    longDescription: "Developed an intelligent assistant using OpenAI, LangChain, and Socket.IO for real-time features and meeting summaries.",
    image: "/project_wizard_vibe_1766892242642.png",
    link: "https://github.com/rajbhoyar729/Wizard-Vibe",
    github: "https://github.com/rajbhoyar729/Wizard-Vibe",
    tags: ["AI", "LangChain", "Socket.IO", "MERN"],
    featured: true,
    icon: Bot,
    category: 'personal'
  },
  {
    id: 103,
    title: "Expense Tracker",
    description: "Full-stack financial dashboard for tracking expenses with data visualization.",
    longDescription: "created a personal finance management tool with interactive charts and secure transactions processing.",
    image: "/project_expense_tracker_1766892258626.png",
    link: "https://github.com/rajbhoyar729",
    github: "https://github.com/rajbhoyar729",
    tags: ["React", "Charts.js", "Finance", "Node.js"],
    featured: true,
    icon: Database,
    category: 'personal'
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = project.icon;
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
      <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 h-full bg-slate-900/40 border border-white/5 ${isHovered ? 'transform scale-[1.01] border-cyan-500/30 shadow-2xl shadow-cyan-500/10' : 'hover:border-white/10'
        }`}>
        {/* Gradient Border Effect - Cleaner */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

        {/* Card Content */}
        <div className="relative card p-0 overflow-hidden h-full flex flex-col bg-[#0a0a0a]/90 backdrop-blur-xl">
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
            <div className={`absolute top-4 left-4 flex items-center justify-center transition-all duration-300 ${isOffice ? 'opacity-100' : 'opacity-100'}`}>
              <div className={`p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg`}>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const officeProjects = projects.filter(p => p.category === 'office');
  const personalProjects = projects.filter(p => p.category === 'personal');

  return (
    <section id="projects" className="min-h-screen py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-transparent pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
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
                Enterprise <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Scalable, production-ready systems built for NNIIT and other organizations.
              </p>
              <p className="text-xs text-slate-600 mt-4 font-medium uppercase tracking-wider">
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
                Personal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Open Source</span>
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
          className="text-center mt-20"
        >
          <a
            href="https://github.com/rajbhoyar729"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/10"
          >
            <span className="relative z-10">View Full GitHub Profile</span>
            <Github className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};


export default ProjectsSection;