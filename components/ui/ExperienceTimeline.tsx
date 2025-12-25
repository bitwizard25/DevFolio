'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
    {
        type: 'work',
        title: 'Backend Developer',
        organization: 'NNIIT',
        period: 'May 2024 - Present',
        description: 'Building scalable EdTech backend with Node.js, MongoDB, and RabbitMQ. Processing 10K+ daily events through message queues.',
        highlights: ['RabbitMQ Integration', 'Cron Automation', 'API Optimization'],
        icon: Briefcase,
        color: '#0A84FF',
    },
    {
        type: 'work',
        title: 'Backend Developer Intern',
        organization: 'NNIIT',
        period: 'Jan 2024 - Apr 2024',
        description: 'Developed core backend features, implemented database schemas, and built RESTful APIs for the EdTech platform.',
        highlights: ['MongoDB Schema Design', 'REST APIs', 'Code4GovTech Selection'],
        icon: Briefcase,
        color: '#BF5AF2',
    },
    {
        type: 'education',
        title: 'B.Tech in Computer Science',
        organization: 'BDCOE Wardha',
        period: '2020 - 2024',
        description: 'Graduated with strong foundation in Data Structures, Algorithms, and Software Engineering principles.',
        highlights: ['DSA', 'Software Engineering', 'Database Systems'],
        icon: GraduationCap,
        color: '#32D74B',
    },
    {
        type: 'achievement',
        title: 'Code4GovTech Contributor',
        organization: 'Government of India Initiative',
        period: '2023',
        description: 'Selected among top contributors for open-source contributions to government technology projects.',
        highlights: ['Open Source', 'Government Tech', 'Top Contributor'],
        icon: Award,
        color: '#FF9F0A',
    },
];

const ExperienceTimeline = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%',
                },
            });

            // Timeline line animation
            const line = timelineRef.current?.querySelector('.timeline-line');
            if (line) {
                gsap.fromTo(line,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Timeline items stagger
            const items = timelineRef.current?.querySelectorAll('.timeline-item');
            if (items) {
                gsap.from(items, {
                    opacity: 0,
                    x: -40,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 75%',
                    },
                });
            }

            // Timeline dots
            const dots = timelineRef.current?.querySelectorAll('.timeline-dot');
            if (dots) {
                gsap.from(dots, {
                    scale: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 75%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

            <div className="section-container relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <p className="text-overline text-[#0A84FF] mb-3">My Journey</p>
                    <h2 className="section-title">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-body-large">
                        From academic foundations to building production systems at scale
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Animated timeline line */}
                        <div
                            className="timeline-line absolute left-8 top-0 bottom-0 w-px origin-top"
                            style={{
                                background: 'linear-gradient(180deg, #0A84FF 0%, #BF5AF2 50%, #32D74B 100%)',
                            }}
                        />

                        {/* Timeline items */}
                        <div className="space-y-8">
                            {experiences.map((exp, index) => {
                                const Icon = exp.icon;
                                return (
                                    <div key={index} className="timeline-item relative pl-20">
                                        {/* Dot */}
                                        <div
                                            className="timeline-dot absolute left-6 w-5 h-5 rounded-full border-4 border-black z-10"
                                            style={{ backgroundColor: exp.color }}
                                        />

                                        {/* Card */}
                                        <div className="card p-6">
                                            <div className="flex items-start gap-4">
                                                {/* Icon */}
                                                <div
                                                    className="p-3 rounded-xl shrink-0"
                                                    style={{ backgroundColor: `${exp.color}15` }}
                                                >
                                                    <Icon className="w-5 h-5" style={{ color: exp.color }} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                                                        <span className="text-white/30">•</span>
                                                        <span className="text-sm" style={{ color: exp.color }}>
                                                            {exp.organization}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-white/40 mb-3">{exp.period}</p>
                                                    <p className="text-white/50 text-sm mb-4 leading-relaxed">
                                                        {exp.description}
                                                    </p>

                                                    {/* Highlights */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.highlights.map((highlight, hIndex) => (
                                                            <span
                                                                key={hIndex}
                                                                className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-white/50"
                                                            >
                                                                {highlight}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/about"
                        className="btn-secondary inline-flex items-center gap-2 group"
                    >
                        View Full Experience
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
