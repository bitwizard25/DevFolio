'use client'
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const experiences = [
    {
        type: 'work',
        title: 'Software Development Engineer (AI)',
        organization: 'NNIIT',
        period: 'Nov 2025 - Present',
        description: 'Leading AI initiatives including RAG pipelines, transcript analysis with LangChain, and intelligent automation systems.',
        highlights: ['LangChain', 'RAG Systems', 'AI Integration'],
        icon: Briefcase,
        color: '#0A84FF',
    },
    {
        type: 'work',
        title: 'Full Stack Engineer',
        organization: 'NNIIT',
        period: 'Jun 2025 - Nov 2025',
        description: 'Built scalable EdTech backend processing 10K+ daily events. Developed session management, RabbitMQ queues, and automated cron jobs.',
        highlights: ['Node.js', 'MongoDB', 'RabbitMQ'],
        icon: Briefcase,
        color: '#5856D6',
    },
    {
        type: 'work',
        title: 'Founding Engineer',
        organization: 'Games World League',
        period: 'May 2024 - May 2025',
        description: 'Core engineering team building the gaming platform from ground up. Architected backend systems and implemented key features.',
        highlights: ['Full Stack', 'Architecture', 'Startup'],
        icon: Briefcase,
        color: '#BF5AF2',
    },
    {
        type: 'work',
        title: 'Software Developer Intern',
        organization: 'BlueKei Solutions',
        period: 'Feb 2024 - Apr 2024',
        description: 'Built internal management tool using Neo4j and Flask. Established CRUD operations and streamlined internal processes.',
        highlights: ['Neo4j', 'Flask', 'Python'],
        icon: Briefcase,
        color: '#32D74B',
    },
    {
        type: 'work',
        title: 'Technical Lead',
        organization: 'TFL',
        period: 'Jun 2023 - Jun 2024',
        description: 'Led technical initiatives and managed team operations. Previously served as Admin member handling event management.',
        highlights: ['Leadership', 'Team Management', 'Events'],
        icon: Briefcase,
        color: '#FF9F0A',
    },
    {
        type: 'education',
        title: 'B.Tech in Computer Science',
        organization: 'BDCOE Wardha',
        period: '2020 - 2024',
        description: 'Graduated with strong foundation in Data Structures, Algorithms, and Software Engineering.',
        highlights: ['DSA', 'Software Engineering', 'Databases'],
        icon: GraduationCap,
        color: '#FF375F',
    },
];

const ExperienceTimeline = () => {
    return (
        <section data-scroll-section className="py-24 lg:py-32 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-overline text-[#0A84FF] mb-3">My Journey</p>
                    <h2 className="section-title">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-body-large">
                        From academic foundations to building production systems at scale
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Animated timeline line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            viewport={{ once: true }}
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
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.1, ease: "backOut" }}
                                            viewport={{ once: true }}
                                            className="timeline-dot absolute left-6 w-5 h-5 rounded-full border-4 border-black z-10"
                                            style={{ backgroundColor: exp.color }}
                                        />

                                        {/* Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="card p-6"
                                        >
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
                                        </motion.div>
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
