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
        description: 'Scalable backend system processing 10K+ daily events with RabbitMQ queues, automated cron jobs, and real-time session management.',
        tags: ['Node.js', 'MongoDB', 'RabbitMQ', 'Cron Jobs'],
        icon: Database,
        color: '#0A84FF',
        metrics: ['10K+ Events/Day', '60% Faster APIs', '99.9% Uptime'],
    },
    {
        title: 'AI-Powered Session Analytics',
        description: 'RAG-based transcript analysis system using LangChain and Neo4j for intelligent tutoring insights and automated reporting.',
        tags: ['Python', 'LangChain', 'Neo4j', 'OpenAI'],
        icon: Bot,
        color: '#BF5AF2',
        metrics: ['AI-Powered', 'Real-time Analysis', 'Auto Reports'],
    },
    {
        title: 'Automated Scheduling System',
        description: 'Smart scheduling engine with Zoho Calendar integration, conflict detection, and automated session lifecycle management.',
        tags: ['Express', 'Zoho API', 'MongoDB', 'Automation'],
        icon: Zap,
        color: '#32D74B',
        metrics: ['Zero Conflicts', 'Auto-Sync', '24/7 Running'],
    },
];

const FeaturedProjects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const animationRan = useRef(false);

    useEffect(() => {
        if (animationRan.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Header animation
                gsap.fromTo(headerRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                        },
                    }
                );

                // Cards stagger animation
                const cards = cardsRef.current?.querySelectorAll('.project-card');
                if (cards && cards.length > 0) {
                    gsap.fromTo(cards,
                        { opacity: 0, y: 60 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: cardsRef.current,
                                start: 'top 85%',
                            },
                        }
                    );
                }
            }, sectionRef);

            animationRan.current = true;

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-24 lg:py-32 relative">
            <div className="section-container">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
                    <p className="text-overline text-[#0A84FF] mb-3">Featured Work</p>
                    <h2 className="section-title">
                        Projects & <span className="gradient-text">Achievements</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-body-large">
                        A showcase of backend systems, automation tools, and AI-powered solutions I&apos;ve built
                    </p>
                </div>

                {/* Projects Grid */}
                <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        return (
                            <div
                                key={index}
                                className="project-card card p-6 lg:p-8 group cursor-pointer"
                                style={{ opacity: 0 }}
                            >
                                {/* Icon */}
                                <div
                                    className="inline-flex p-3 rounded-xl mb-6"
                                    style={{
                                        backgroundColor: `${project.color}15`,
                                    }}
                                >
                                    <Icon
                                        className="w-6 h-6"
                                        style={{ color: project.color }}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0A84FF] transition-colors">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/50 text-sm mb-5 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Metrics */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.metrics.map((metric, metricIndex) => (
                                        <span
                                            key={metricIndex}
                                            className="px-2.5 py-1 rounded-md text-xs font-medium"
                                            style={{
                                                backgroundColor: `${project.color}15`,
                                                color: project.color,
                                            }}
                                        >
                                            {metric}
                                        </span>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-white/50"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="btn-primary inline-flex items-center gap-2 group"
                    >
                        View All Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
