'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    { value: 3, suffix: '+', label: 'Years Experience', description: 'Building production systems' },
    { value: 10, suffix: 'K+', label: 'Events/Day', description: 'Message queue throughput' },
    { value: 15, suffix: '+', label: 'Projects', description: 'Shipped to production' },
    { value: 60, suffix: '%', label: 'Faster APIs', description: 'Performance optimization' },
];

const StatsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const statItems = statsRef.current?.querySelectorAll('.stat-item');
            const statNumbers = statsRef.current?.querySelectorAll('.stat-number');

            if (statItems) {
                gsap.from(statItems, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                    },
                });
            }

            // Counter animation
            if (statNumbers) {
                statNumbers.forEach((numEl, index) => {
                    const target = stats[index].value;
                    const counter = { value: 0 };

                    gsap.to(counter, {
                        value: target,
                        duration: 2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: numEl,
                            start: 'top 90%',
                            once: true,
                        },
                        onUpdate: () => {
                            (numEl as HTMLElement).textContent = Math.round(counter.value).toString();
                        },
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} data-scroll-section className="py-20 lg:py-24 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A84FF]/5 to-transparent" />

            <div className="section-container relative">
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-item text-center lg:border-l first:border-l-0 border-white/5 px-4"
                        >
                            <div className="flex items-baseline justify-center gap-1 mb-2">
                                <span className="stat-number text-4xl lg:text-5xl font-bold text-white">
                                    0
                                </span>
                                <span className="text-2xl lg:text-3xl font-bold gradient-text">
                                    {stat.suffix}
                                </span>
                            </div>
                            <p className="text-white/80 font-medium text-sm mb-1">{stat.label}</p>
                            <p className="text-white/40 text-xs">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
