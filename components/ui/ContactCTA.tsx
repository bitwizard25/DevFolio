'use client'
import React, { useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ArrowRight, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactCTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Main content animation
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 60,
                scale: 0.98,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            // Stagger child elements
            const children = contentRef.current?.querySelectorAll('.animate-child');
            if (children) {
                gsap.from(children, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 75%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(10,132,255,0.2) 0%, transparent 60%)',
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(191,90,242,0.2) 0%, transparent 60%)',
                    }}
                />
            </div>

            <div className="section-container relative z-10">
                <div ref={contentRef} className="max-w-3xl mx-auto text-center">
                    {/* Icon */}
                    <div className="animate-child inline-flex p-5 rounded-2xl mb-8"
                        style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.15) 0%, rgba(191,90,242,0.15) 100%)' }}>
                        <MessageCircle className="w-10 h-10 text-[#0A84FF]" />
                    </div>

                    {/* Heading */}
                    <h2 className="animate-child section-title mb-6">
                        Let&apos;s Build Something{' '}
                        <span className="gradient-text">Amazing Together</span>
                    </h2>

                    {/* Description */}
                    <p className="animate-child text-body-large text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
                        Whether you have a project in mind, want to discuss backend architecture,
                        or just want to connect — I&apos;m always open to new opportunities.
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-child flex flex-wrap justify-center gap-4 mb-12">
                        <a
                            href="mailto:rajbhoyar729@gmail.com"
                            className="btn-primary flex items-center gap-2 group"
                        >
                            <Mail className="w-5 h-5" />
                            Get in Touch
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="https://linkedin.com/in/raj-bhoyar-b597b416a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center gap-2"
                        >
                            <Linkedin className="w-5 h-5" />
                            Connect on LinkedIn
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="animate-child flex justify-center gap-4 mb-10">
                        {[
                            { icon: Mail, href: 'mailto:rajbhoyar729@gmail.com', label: 'Email' },
                            { icon: Linkedin, href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', label: 'LinkedIn' },
                            { icon: Github, href: 'https://github.com/rajbhoyar729', label: 'GitHub' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                className="p-3.5 rounded-xl glass-subtle hover:bg-white/10 
                                         hover:scale-110 transition-all duration-300 group"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </div>

                    {/* Availability Badge */}
                    <div className="animate-child inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-subtle">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#32D74B] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#32D74B]"></span>
                        </span>
                        <span className="text-sm text-white/70 font-medium">Available for new opportunities</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
