'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from '@/components/interactions/Magnetic';
import TiltCard from '@/components/interactions/TiltCard';
import KineticText from '@/components/interactions/KineticText';
import Parallax from '@/components/interactions/Parallax';

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
                            <KineticText text="I love making" /><br />
                            <span className="gradient-text">complex things simple.</span>
                        </h2>

                        {/* Miller's Law: Chunking information into 3 distinct beats */}
                        <div className="space-y-6">
                            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                                I'm a software engineer who bridges the gap between complex backend systems and intuitive user experiences.
                            </p>

                            <div className="grid gap-4 mt-8">
                                {[
                                    { icon: "🚀", title: "AI Specialist", desc: "Building RAG pipelines & Intelligent Systems", border: "border-l-4 border-l-[#0A84FF]" },
                                    { icon: "💡", title: "Founding Engineer", desc: "Scaled startup tech from 0 to Production", border: "border-l-4 border-l-[#FF9F0A]" },
                                    { icon: "🔧", title: "Backend Architect", desc: "High-performance systems (10k+ events/day)", border: "border-l-4 border-l-[#32D74B]" }
                                ].map((item, i) => (
                                    <div 
                                      key={i} 
                                      className={`flex items-center gap-5 p-5 rounded-2xl bg-[#12121e]/40 border border-white/5 ${item.border} hover:bg-[#161626]/60 hover:border-white/10 transition-all duration-300 shadow-md shadow-black/10`}
                                    >
                                        <span className="text-2xl shrink-0 p-2.5 rounded-xl bg-white/5">{item.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-slate-100 text-sm md:text-base">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-slate-400 mt-0.5 leading-relaxed font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fitts's Law: Large touch target for primary action */}
                        <div className="pt-2">
                            <Magnetic>
                                <Link
                                    href="/about"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/10"
                                >
                                    <span className="relative z-10">More about me</span>
                                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>

                    {/* Right - Visual: Clean card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="flex justify-center lg:justify-end"
                    >
                        <Parallax range={[-30, 30]} className="relative">
                            {/* Glow */}
                            <Parallax range={[-20, 20]} className="absolute -inset-8">
                                <div
                                    className="w-full h-full rounded-3xl opacity-35 blur-3xl"
                                    style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.2) 0%, rgba(191,90,242,0.2) 100%)' }}
                                />
                            </Parallax>

                            {/* Card - Premium Glass */}
                            <TiltCard maxTilt={4} innerClassName="rounded-3xl">
                            <div className="relative p-8 md:p-10 rounded-3xl bg-[#0d0d15]/80 backdrop-blur-xl border border-white/10 max-w-sm shadow-2xl shadow-black/80 flex flex-col items-center">
                                {/* Specular glow overlay */}
                                <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04]" />

                                {/* Image with dual ring glow */}
                                <div className="relative w-24 h-24 mb-6 rounded-full p-1 bg-gradient-to-tr from-[#0A84FF] via-[#BF5AF2] to-[#32D74B] shadow-xl shadow-black/35">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border border-black/40">
                                        <Image
                                            src="/Raj.jpg"
                                            alt="Raj Bhoyar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="text-center space-y-1">
                                    <h3 className="text-xl font-bold text-white tracking-tight">Raj Bhoyar</h3>
                                    <p className="text-[#0A84FF] text-xs font-bold tracking-widest uppercase font-mono">Founding Engineer @ Hapminds</p>
                                </div>

                                {/* Stats - elegant glass grid */}
                                <div className="grid grid-cols-3 gap-3 w-full mt-8 pt-6 border-t border-white/10">
                                    {[
                                        { val: "3+", label: "Years", color: "hover:text-[#0A84FF]" },
                                        { val: "15+", label: "Projects", color: "hover:text-purple-400" },
                                        { val: "10K", label: "Events", color: "hover:text-green-450" }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="text-center p-2 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                                            <p className={`text-base md:text-lg font-bold text-white ${stat.color} transition-colors font-mono`}>{stat.val}</p>
                                            <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </TiltCard>
                        </Parallax>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
