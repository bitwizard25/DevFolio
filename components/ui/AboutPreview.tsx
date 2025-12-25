'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, Zap, Database } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
    { icon: Database, label: 'MongoDB Expert', color: '#32D74B' },
    { icon: Zap, label: '10K+ Events/Day', color: '#FF9F0A' },
    { icon: Code, label: 'Node.js Pro', color: '#0A84FF' },
];

const AboutPreview = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Content animation
            gsap.from(contentRef.current, {
                opacity: 0,
                x: -60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });

            // Image animation
            gsap.from(imageRef.current, {
                opacity: 0,
                x: 60,
                scale: 0.95,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });

            // Highlights stagger
            const highlights = contentRef.current?.querySelectorAll('.highlight-item');
            if (highlights) {
                gsap.from(highlights, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 70%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* Left - Content */}
                    <div ref={contentRef} className="space-y-8">
                        <div>
                            <p className="text-overline text-[#0A84FF] mb-3">About Me</p>
                            <h2 className="section-title">
                                Backend Developer with a passion for{' '}
                                <span className="gradient-text">scalable systems</span>
                            </h2>
                        </div>

                        <p className="text-body-large text-white/60 leading-relaxed">
                            I&apos;m a B.Tech CSE graduate from BDCOE Wardha, currently working as a
                            Backend Developer at NNIIT. I specialize in building production-grade
                            systems that handle real-world complexity with elegance.
                        </p>

                        <p className="text-body text-white/50 leading-relaxed">
                            My expertise spans Node.js, MongoDB, RabbitMQ, and AI integrations.
                            I&apos;ve architected message queue systems processing 10K+ daily events
                            and optimized APIs for 60% faster response times.
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {highlights.map((item, index) => (
                                <div
                                    key={index}
                                    className="highlight-item flex items-center gap-2 px-4 py-2 rounded-xl glass-subtle"
                                >
                                    <item.icon
                                        className="w-4 h-4"
                                        style={{ color: item.color }}
                                    />
                                    <span className="text-sm text-white/70 font-medium">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/about"
                            className="btn-primary inline-flex items-center gap-2 group"
                        >
                            Learn More About Me
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Right - Visual */}
                    <div ref={imageRef} className="flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Glow effect */}
                            <div
                                className="absolute -inset-8 rounded-3xl opacity-40 blur-3xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(10,132,255,0.2) 0%, rgba(191,90,242,0.2) 100%)',
                                }}
                            />

                            {/* Card */}
                            <div className="relative card p-8 lg:p-10 max-w-md">
                                {/* Profile image */}
                                <div className="relative w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] rounded-2xl" />
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                        <Image
                                            src="/Raj.jpg"
                                            alt="Raj Bhoyar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="text-center space-y-3">
                                    <h3 className="text-xl font-bold text-white">Raj Bhoyar</h3>
                                    <p className="text-[#0A84FF] font-medium">Backend Developer @ NNIIT</p>
                                    <p className="text-white/50 text-sm">
                                        Building scalable EdTech solutions with modern backend technologies
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">3+</p>
                                        <p className="text-xs text-white/40">Years</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">15+</p>
                                        <p className="text-xs text-white/40">Projects</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">7+</p>
                                        <p className="text-xs text-white/40">Certs</p>
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
