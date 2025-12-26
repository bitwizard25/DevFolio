'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Database, Bot, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: 'EdTech Backend Platform',
        description: 'Production system at NNIIT handling 10K+ daily events. Built session management, automated cron jobs for session lifecycle, and RabbitMQ message queues for async processing.',
        tags: ['Node.js', 'MongoDB', 'RabbitMQ'],
        icon: Database,
        gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
        title: 'AI Session Analytics',
        description: 'RAG pipeline analyzing tutoring session transcripts using LangChain. Extracts insights, generates metrics, and stores knowledge in Neo4j graph database for semantic search.',
        tags: ['Python', 'LangChain', 'Neo4j', 'OpenAI'],
        icon: Bot,
        gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
        title: 'Smart Scheduling Engine',
        description: 'Automated scheduling system integrating Zoho Calendar API. Handles conflict detection, tutor-student matching, and session lifecycle from creation to completion.',
        tags: ['Express', 'Zoho API', 'MongoDB'],
        icon: Zap,
        gradient: 'from-green-500/20 to-emerald-500/20',
    },
];

const FeaturedProjects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );

            const cards = cardsRef.current?.querySelectorAll('.project-card');
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} data-scroll-section className="py-32 lg:py-40 relative">
            <div className="section-container">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20" style={{ opacity: 0 }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Selected work
                    </h2>
                    <p className="text-lg text-white/40 max-w-md mx-auto">
                        Systems I&apos;ve built that solve real problems
                    </p>
                </div>

                {/* Projects Grid */}
                <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        return (
                            <div
                                key={index}
                                className="project-card group relative p-8 rounded-2xl 
                                         bg-white/[0.02] border border-white/10
                                         hover:bg-white/[0.04] hover:border-white/20
                                         transition-all duration-500 cursor-pointer"
                                style={{ opacity: 0 }}
                            >
                                {/* Subtle gradient on hover */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative">
                                    {/* Icon */}
                                    <div className="inline-flex p-3 rounded-xl bg-white/5 mb-6">
                                        <Icon className="w-6 h-6 text-white/60" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-white/40 leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 text-xs text-white/50 bg-white/5 rounded-lg"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 text-white/50 hover:text-white 
                                 transition-colors duration-300"
                    >
                        <span className="font-medium">View all projects</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
