'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
    {
        title: 'Backend Development',
        description: 'Building robust APIs and server-side applications',
        skills: [
            { name: 'Node.js/Express', level: 90 },
            { name: 'Python/Django', level: 88 },
            { name: 'RESTful APIs', level: 92 },
            { name: 'GraphQL', level: 75 },
        ],
        color: 'from-[#0A84FF] to-[#5856D6]',
        accentColor: '#0A84FF',
    },
    {
        title: 'Database & Queues',
        description: 'Data architecture and message processing',
        skills: [
            { name: 'MongoDB', level: 90 },
            { name: 'Neo4j', level: 82 },
            { name: 'RabbitMQ', level: 85 },
            { name: 'Redis', level: 78 },
        ],
        color: 'from-[#BF5AF2] to-[#FF375F]',
        accentColor: '#BF5AF2',
    },
    {
        title: 'AI & ML',
        description: 'Intelligent solutions and automation',
        skills: [
            { name: 'LangChain', level: 85 },
            { name: 'OpenAI APIs', level: 85 },
            { name: 'Streamlit', level: 90 },
            { name: 'RAG Systems', level: 80 },
        ],
        color: 'from-[#32D74B] to-[#30D158]',
        accentColor: '#32D74B',
    },
    {
        title: 'DevOps & Tools',
        description: 'Deployment and development workflow',
        skills: [
            { name: 'Git/GitHub', level: 92 },
            { name: 'Docker', level: 75 },
            { name: 'CI/CD', level: 75 },
            { name: 'Linux', level: 80 },
        ],
        color: 'from-[#FF9F0A] to-[#FF375F]',
        accentColor: '#FF9F0A',
    },
];

const SkillsSection = () => {
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
                const cards = cardsRef.current?.querySelectorAll('.skill-card');
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

                // Progress bars animation
                const progressBars = cardsRef.current?.querySelectorAll('.progress-fill');
                if (progressBars) {
                    progressBars.forEach((bar) => {
                        const targetWidth = bar.getAttribute('data-width');
                        gsap.fromTo(bar,
                            { width: '0%' },
                            {
                                width: `${targetWidth}%`,
                                duration: 1.2,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: bar,
                                    start: 'top 95%',
                                },
                            }
                        );
                    });
                }
            }, sectionRef);

            animationRan.current = true;

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 relative">
            <div className="section-container">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
                    <p className="text-overline text-[#0A84FF] mb-3">What I Do</p>
                    <h2 className="section-title">
                        Skills & <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-body-large">
                        Specialized in backend development with a focus on scalable architecture,
                        database optimization, and AI integration
                    </p>
                </div>

                {/* Skills Grid */}
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="skill-card card p-6 lg:p-8"
                            style={{ opacity: 0 }}
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="text-title text-white mb-2">{category.title}</h3>
                                <p className="text-white/40 text-sm">{category.description}</p>
                            </div>

                            {/* Skills */}
                            <div className="space-y-5">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-white/80 font-medium">{skill.name}</span>
                                            <span className="text-white/40">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`progress-fill h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                data-width={skill.level}
                                                style={{ width: 0 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/about"
                        className="btn-secondary inline-flex items-center gap-2 group"
                    >
                        View Full Profile
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
