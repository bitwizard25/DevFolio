'use client'
import React from 'react';
import { motion } from 'framer-motion';

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
    return (
        <section data-scroll-section className="py-32 lg:py-40 relative">
            <div className="section-container">
                {/* Header - Simple */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What I work with
                    </h2>
                    <p className="text-lg text-white/40 max-w-md mx-auto">
                        Technologies I use to bring ideas to life
                    </p>
                </motion.div>

                {/* Skills - Clean groups with pills */}
                <div className="max-w-4xl mx-auto space-y-16">
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="skill-group"
                        >
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
                                    <motion.span
                                        key={skillIndex}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: (index * 0.1) + (skillIndex * 0.05), // Calculated stagger
                                            ease: "backOut"
                                        }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/80
                                                 bg-white/[0.05] border border-white/10
                                                 cursor-default transition-colors"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
