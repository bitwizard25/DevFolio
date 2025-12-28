'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPreview = () => {
    return (
        <section data-scroll-section className="py-32 lg:py-40 relative">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        {/* Lead with personality */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            I love making<br />
                            <span className="gradient-text">complex things simple.</span>
                        </h2>

                        {/* Miller's Law: Chunking information into 3 distinct beats */}
                        <div className="space-y-6">
                            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                                I'm a software engineer who bridges the gap between complex backend systems and intuitive user experiences.
                            </p>

                            <div className="grid gap-4">
                                {[
                                    { icon: "🚀", title: "AI Specialist", desc: "Building RAG pipelines & Intelligent Systems" },
                                    { icon: "💡", title: "Founding Engineer", desc: "Scaled startup tech from 0 to Production" },
                                    { icon: "🔧", title: "Backend Architect", desc: "High-performance systems (10k+ events/day)" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-sm text-white/50">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fitts's Law: Large touch target for primary action */}
                        <Link
                            href="/about"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/10"
                        >
                            <span className="relative z-10">More about me</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </motion.div>

                    {/* Right - Visual: Clean card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Glow */}
                            <div
                                className="absolute -inset-8 rounded-3xl opacity-30 blur-3xl"
                                style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.15) 0%, rgba(191,90,242,0.15) 100%)' }}
                            />

                            {/* Card - Premium Glass */}
                            <div className="relative p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 max-w-sm shadow-2xl">
                                {/* Image */}
                                <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                                    <Image
                                        src="/Raj.jpg"
                                        alt="Raj Bhoyar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold text-white tracking-tight">Raj Bhoyar</h3>
                                    <p className="text-[#0A84FF] text-sm font-semibold tracking-wide uppercase">SDE (AI) @ NNIIT</p>
                                </div>

                                {/* Stats - earned, not listed */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                                    <div className="text-center group">
                                        <p className="text-2xl font-bold text-white group-hover:text-[#0A84FF] transition-colors">3+</p>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">Years</p>
                                    </div>
                                    <div className="text-center group">
                                        <p className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">15+</p>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">Projects</p>
                                    </div>
                                    <div className="text-center group">
                                        <p className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">10K</p>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">Events</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
