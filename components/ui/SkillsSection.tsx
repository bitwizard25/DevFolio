'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const skillGroups = [
    {
        label: 'Backend',
        skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
        color: '#0A84FF',
    },
    {
        label: 'Databases',
        skills: ['MongoDB', 'Neo4j', 'Redis', 'RabbitMQ'],
        color: '#32D74B',
    },
    {
        label: 'AI & LLMs',
        skills: ['LangChain', 'LangGraph', 'OpenAI', 'Gemini', 'Groq', 'RAG', 'Chroma', 'CrewAI', 'MCP'],
        color: '#BF5AF2',
    },
    {
        label: 'Others',
        skills: ['Git', 'Docker', 'Zoho API', 'MSG91', 'Payment Gateways'],
        color: '#FF9F0A',
    },
];

const SkillsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

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

            const groups = skillsRef.current?.querySelectorAll('.skill-group');
            if (groups) {
                gsap.fromTo(groups,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                        scrollTrigger: { trigger: skillsRef.current, start: 'top 80%' },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} data-scroll-section className="py-32 lg:py-40 relative">
            <div className="section-container">
                {/* Header - Simple */}
                <div ref={headerRef} className="text-center mb-20" style={{ opacity: 0 }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What I work with
                    </h2>
                    <p className="text-lg text-white/40 max-w-md mx-auto">
                        Technologies I use to bring ideas to life
                    </p>
                </div>

                {/* Skills - Clean groups with pills */}
                <div ref={skillsRef} className="max-w-4xl mx-auto space-y-16">
                    {skillGroups.map((group, index) => (
                        <div key={index} className="skill-group" style={{ opacity: 0 }}>
                            {/* Group label */}
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: group.color }}
                                />
                                <span className="text-sm font-medium text-white/50 uppercase tracking-wider">
                                    {group.label}
                                </span>
                            </div>

                            {/* Skills pills */}
                            <div className="flex flex-wrap gap-3">
                                {group.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/80
                                                 bg-white/[0.05] border border-white/10
                                                 hover:bg-white/[0.08] hover:border-white/20
                                                 transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
