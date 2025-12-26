'use client'
import React, { useEffect, useRef } from 'react';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
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
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} data-scroll-section className="py-32 lg:py-40 relative">
            {/* Subtle glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
                style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.2) 0%, transparent 60%)' }}
            />

            <div className="section-container relative z-10">
                <div ref={contentRef} className="max-w-2xl mx-auto text-center" style={{ opacity: 0 }}>

                    {/* Headline - Simple, inviting */}
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Let&apos;s talk.
                    </h2>

                    <p className="text-lg text-white/40 mb-12 max-w-md mx-auto">
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>

                    {/* Two CTAs - Primary and Secondary */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="mailto:rajbhoyar729@gmail.com"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 
                                     text-lg font-medium text-white 
                                     bg-gradient-to-r from-[#0A84FF] to-[#5856D6] rounded-2xl
                                     hover:shadow-[0_0_40px_rgba(10,132,255,0.3)] 
                                     transition-all duration-500"
                        >
                            <Mail className="w-5 h-5" />
                            Get in Touch
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="https://linkedin.com/in/raj-bhoyar-b597b416a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4
                                     text-lg font-medium text-white/70 
                                     bg-white/5 border border-white/10 rounded-2xl
                                     hover:bg-white/10 hover:text-white hover:border-white/20
                                     transition-all duration-300"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
