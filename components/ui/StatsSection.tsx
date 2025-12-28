'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
    { value: 3, suffix: '+', label: 'Years Experience', description: 'Building production systems' },
    { value: 10, suffix: 'K+', label: 'Events/Day', description: 'Message queue throughput' },
    { value: 15, suffix: '+', label: 'Projects', description: 'Shipped to production' },
    { value: 60, suffix: '%', label: 'Faster APIs', description: 'Performance optimization' },
];

const StatItem = ({ stat }: { stat: typeof stats[0] }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, stat.value, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (value) => {
                    if (ref.current) {
                        ref.current.textContent = Math.round(value).toString();
                    }
                },
            });
            return () => controls.stop();
        }
    }, [isInView, stat.value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="stat-item text-center lg:border-l first:border-l-0 border-white/5 px-4"
        >
            <div className="flex items-baseline justify-center gap-1 mb-2">
                <span ref={ref} className="stat-number text-4xl lg:text-5xl font-bold text-white">
                    0
                </span>
                <span className="text-2xl lg:text-3xl font-bold gradient-text">
                    {stat.suffix}
                </span>
            </div>
            <p className="text-white/80 font-medium text-sm mb-1">{stat.label}</p>
            <p className="text-white/40 text-xs">{stat.description}</p>
        </motion.div>
    );
};

const StatsSection = () => {
    return (
        <section data-scroll-section className="py-20 lg:py-24 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A84FF]/5 to-transparent" />

            <div className="section-container relative">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                    {stats.map((stat, index) => (
                        <StatItem key={index} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
