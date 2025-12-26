'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutPreview = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                }
            );

            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 40 },
                {
                    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} data-scroll-section className="py-32 lg:py-40 relative">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left - Content: Personality first */}
                    <div ref={contentRef} className="space-y-8" style={{ opacity: 0 }}>
                        {/* Lead with personality, not credentials */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            I love making<br />
                            <span className="gradient-text">complex things simple.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-white/50 leading-relaxed">
                            <p>
                                Software Development Engineer (AI) at NNIIT, where I build RAG pipelines
                                and intelligent systems. Previously a Founding Engineer at Games World League.
                            </p>
                            <p>
                                LangChain, Node.js, MongoDB, Neo4j — and a healthy obsession with clean code.
                                B.Tech CSE from BDCOE Wardha.
                            </p>
                        </div>

                        {/* Single CTA */}
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-2 text-white/70 hover:text-white 
                                     transition-colors duration-300"
                        >
                            <span className="font-medium">More about me</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Right - Visual: Clean card */}
                    <div ref={imageRef} className="flex justify-center lg:justify-end" style={{ opacity: 0 }}>
                        <div className="relative">
                            {/* Glow */}
                            <div
                                className="absolute -inset-8 rounded-3xl opacity-30 blur-3xl"
                                style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.15) 0%, rgba(191,90,242,0.15) 100%)' }}
                            />

                            {/* Card */}
                            <div className="relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 max-w-sm">
                                {/* Image */}
                                <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden">
                                    <Image
                                        src="/Raj.jpg"
                                        alt="Raj Bhoyar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-semibold text-white">Raj Bhoyar</h3>
                                    <p className="text-[#0A84FF] text-sm font-medium">SDE (AI) @ NNIIT</p>
                                </div>

                                {/* Stats - earned, not listed */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">3+</p>
                                        <p className="text-xs text-white/40 mt-1">Years</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">15+</p>
                                        <p className="text-xs text-white/40 mt-1">Projects</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">10K</p>
                                        <p className="text-xs text-white/40 mt-1">Events/Day</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
