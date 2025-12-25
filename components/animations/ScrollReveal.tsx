'use client'
import React, { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    ease?: string;
    start?: string;
    once?: boolean;
    stagger?: number;
}

/**
 * ScrollReveal Component
 * Wraps children with scroll-triggered reveal animation
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className = '',
    delay = 0,
    duration = 1,
    y = 60,
    x = 0,
    scale = 1,
    rotation = 0,
    ease = 'power3.out',
    start = 'top 85%',
    once = true,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.set(element, { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 });
            return;
        }

        gsap.set(element, {
            opacity: 0,
            y,
            x,
            scale: scale === 1 ? 1 : 0.9,
            rotation,
        });

        const animation = gsap.to(element, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [delay, duration, y, x, scale, rotation, ease, start, once]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
