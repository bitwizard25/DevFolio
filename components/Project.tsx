'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder, Server, Database, Bot, MessageSquare, Workflow, BarChart3, Vote, Shield } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  link: string;
  github: string;
  tags: string[];
  featured?: boolean;
  icon: React.ElementType;
  metrics?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "EdTech Session Management",
    description: "Production-grade backend managing 10K+ daily tutor-student sessions with automated scheduling.",
    longDescription: "Built comprehensive session management system with MongoDB aggregations, RabbitMQ queues, and automated notifications via MSG91.",
    image: "/Ai Assistant Project Logo.jpg",
    link: "#",
    github: "https://github.com/rajbhoyar729",
    tags: ["Node.js", "MongoDB", "RabbitMQ", "MSG91", "Cron"],
    featured: true,
    icon: Server,
    metrics: "10K+ events/day"
  },
  {
    id: 2,
    title: "Order Management API",
    description: "High-performance REST API with MongoDB aggregation pipelines, 60% faster response times.",
    longDescription: "Optimized order management using $lookup, $facet for pagination and dynamic search with relevance scoring.",
    image: "/ByteBuddy.jpg",
    link: "#",
    github: "https://github.com/rajbhoyar729",
    tags: ["Node.js", "MongoDB", "REST API", "Aggregation"],
    featured: true,
    icon: Database,
    metrics: "60% faster"
  },

  {
    id: 4,
    title: "AI Assistant with CrewAI",
    description: "Multi-agent AI system using CrewAI, Groq LLM, and LangChain for intelligent automation.",
    longDescription: "Developed AI assistant leveraging CrewAI for multi-agent orchestration with chain-of-thought reasoning.",
    image: "/Ai Assistant Project Logo.jpg",
    link: "#",
    github: "https://github.com/rajbhoyar729",
    tags: ["Python", "LangChain", "CrewAI", "Groq"],
    featured: false,
    icon: Bot,
  },
  {
    id: 5,
    title: "RabbitMQ Architecture",
    description: "Enterprise-grade message queue with dead-letter queues, retries, and consumer scaling.",
    longDescription: "Redesigned RabbitMQ implementation following best practices for reliable event-driven architecture.",
    image: "/Chatbot.jpg",
    link: "#",
    github: "https://github.com/rajbhoyar729",
    tags: ["RabbitMQ", "Node.js", "Event-Driven"],
    featured: false,
    icon: Workflow,
  },
  {
    id: 6,
    title: "Transcript Analysis Pipeline",
    description: "Automated AI-powered pipeline for session transcript analysis and insight generation.",
    longDescription: "End-to-end pipeline with cron jobs for fetching, RAG-based analysis, and automated reporting.",
    image: "/Chatbot.jpg",
    link: "#",
    github: "https://github.com/rajbhoyar729",
    tags: ["Python", "RAG", "LLM", "Cron"],
    featured: false,
    icon: BarChart3,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${isHovered ? 'transform scale-[1.02]' : ''
        }`}>
        {/* Gradient Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Card Content */}
        <div className="relative card p-0 overflow-hidden">
          {/* Project Image/Header */}
          <div className="relative h-48 overflow-hidden group-hover:h-48 transition-all duration-500">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500" />

            {/* Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <div className={`p-4 rounded-2xl glass`}>
                <IconComponent className="w-10 h-10 text-slate-300" />
              </div>
            </div>
            {/* Hover Overlay with Links */}
            <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-cyan-500/30 transition-colors duration-300"
                aria-label="View Live"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-purple-500/30 transition-colors duration-300"
                aria-label="View Source"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30">
                <span className="text-xs font-medium text-cyan-400">Featured</span>
              </div>
            )}

            {/* Metrics Badge */}
            {project.metrics && (
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30">
                <span className="text-xs font-medium text-emerald-400">{project.metrics}</span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <Folder className="w-5 h-5 text-slate-500 flex-shrink-0" />
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
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
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="min-h-screen py-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Production-grade systems I&apos;ve built — from high-performance APIs to blockchain solutions
            </p>
          </motion.div>
        </div>

        {/* Featured Projects Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-slate-300 mb-6 text-center"
            >
              Other Noteworthy Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/rajbhoyar729"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;