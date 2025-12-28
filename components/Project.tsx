'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder, Server, Database, Bot, Workflow, BarChart3, Lock, Award, Code2 } from 'lucide-react';

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
    image: "/Ai Assistant Project Logo.jpg",
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
    image: "/ByteBuddy.jpg",
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
    image: "/Ai Assistant Project Logo.jpg",
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
    image: "/Chatbot.jpg",
    tags: ["RabbitMQ", "Node.js", "Event-Driven"],
    featured: false,
    icon: Workflow,
    category: 'office',
    company: 'NNIIT'
  },
  {
    id: 6,
    title: "Transcript Analysis Pipeline",
    description: "Automated AI-powered pipeline for session transcript analysis and insight generation.",
    longDescription: "End-to-end pipeline with cron jobs for fetching, RAG-based analysis, and automated reporting.",
    image: "/Chatbot.jpg",
    tags: ["Python", "RAG", "LLM", "Cron"],
    featured: false,
    icon: BarChart3,
    category: 'office',
    company: 'NNIIT'
  },

  // Personal Projects
  {
    id: 101,
    title: "Code4GovTech Contributor",
    description: "Selected for C4GT '23. Contributed to open-source digital public goods infrastructure.",
    longDescription: "Part of the prestigious Code4GovTech program, contributing to scalable government-tech solutions.",
    image: "/Ai Assistant Project Logo.jpg", // Placeholder
    link: "https://www.code4govtech.in/",
    github: "https://github.com/rajbhoyar729",
    tags: ["Open Source", "GovTech", "Public Goods"],
    featured: true,
    icon: Code2,
    category: 'personal'
  },
  {
    id: 102,
    title: "Flipkart GRiD 4.0",
    description: "National finalist in Flipkart's flagship engineering challenge solving robotics/AI problems.",
    longDescription: "Developed innovative solutions for e-commerce logistics and warehousing challenges.",
    image: "/ByteBuddy.jpg", // Placeholder
    link: "#",
    github: "https://github.com/rajbhoyar729",
    tags: ["Hackathon", "Problem Solving", "Innovation"],
    featured: true,
    icon: Award,
    category: 'personal'
  },
  {
    id: 103,
    title: "Portfolio Website",
    description: "Modern portfolio built with Next.js, Framer Motion, and Tailwind CSS.",
    longDescription: "A high-performance personal website featuring smooth animations and component-based architecture.",
    image: "/Raj.jpg",
    link: "#",
    github: "https://github.com/rajbhoyar729/DevFolio",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    featured: false,
    icon: Server, // Using generic icon
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
      <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 h-full bg-slate-900/50 border border-white/5 ${isHovered ? 'transform scale-[1.02] border-white/20' : ''
        }`}>
        {/* Gradient Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Card Content */}
        <div className="relative card p-0 overflow-hidden h-full flex flex-col">
          {/* Project Image/Header */}
          <div className="relative h-48 overflow-hidden group-hover:h-48 transition-all duration-500 shrink-0">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500" />

            {/* Icon Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isOffice ? 'opacity-100' : 'opacity-100 group-hover:opacity-0'}`}>
              <div className={`p-4 rounded-2xl glass`}>
                <IconComponent className="w-10 h-10 text-slate-300" />
              </div>
            </div>

            {/* Hover Overlay with Links - ONLY for Personal Projects */}
            {!isOffice && (
              <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-cyan-500/30 transition-colors duration-300"
                    aria-label="View Live"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-purple-500/30 transition-colors duration-300"
                    aria-label="View Source"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            )}

            {/* Office Badge */}
            {isOffice && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-medium text-amber-200">Confidential</span>
              </div>
            )}

            {/* Metrics Badge (if available) */}
            {project.metrics && (
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30">
                <span className="text-xs font-medium text-emerald-400">{project.metrics}</span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              {project.company && (
                <span className="text-xs font-medium text-cyan-400/80 bg-cyan-400/10 px-2 py-1 rounded">
                  {project.company}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.slice(0, 4).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-1 rounded-md text-xs font-medium text-slate-500">
                  +{project.tags.length - 4}
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
    <section className="min-h-screen py-20">
      <div className="section-container">

        {/* --- OFFICE PROJECTS --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                <BriefcaseIcon className="w-4 h-4" />
                <span>Work Experience</span>
              </div>
              <h2 className="section-title">
                Enterprise <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Scalable, production-ready systems built for NNIIT and other organizations.
                <br />
                <span className="text-sm text-slate-500 italic">* Source code not available due to NDA/Confidentiality.</span>
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {officeProjects.map((project, index) => (
              <div key={project.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* --- PERSONAL PROJECTS --- */}
        <div>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
                <Code2 className="w-4 h-4" />
                <span>Side Hustles</span>
              </div>
              <h2 className="section-title">
                Personal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Open Source</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Experiments, hackathons, and contributions to the developer community.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {personalProjects.map((project, index) => (
              <div key={project.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md">
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
          className="text-center mt-16"
        >
          <a
            href="https://github.com/rajbhoyar729"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Simple Briefcase Icon component for usage above if not imported from lucide-react
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);

export default ProjectsSection;