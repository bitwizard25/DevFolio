'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for revealing elements on scroll with fade and slide
 */
export const useScrollReveal = (
    options: {
        y?: number;
        x?: number;
        opacity?: number;
        duration?: number;
        delay?: number;
        ease?: string;
        start?: string;
        once?: boolean;
    } = {}
) => {
    const elementRef = useRef<HTMLDivElement>(null);

    const {
        y = 60,
        x = 0,
        opacity = 0,
        duration = 1,
        delay = 0,
        ease = 'power3.out',
        start = 'top 85%',
        once = true,
    } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.set(element, { opacity: 1, y: 0, x: 0 });
            return;
        }

        gsap.set(element, { opacity, y, x });

        const animation = gsap.to(element, {
            opacity: 1,
            y: 0,
            x: 0,
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
    }, [y, x, opacity, duration, delay, ease, start, once]);

    return elementRef;
};

/**
 * Hook for staggered reveal of child elements
 */
export const useStaggerReveal = (
    options: {
        y?: number;
        opacity?: number;
        duration?: number;
        stagger?: number;
        delay?: number;
        ease?: string;
        start?: string;
        childSelector?: string;
    } = {}
) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        y = 40,
        opacity = 0,
        duration = 0.8,
        stagger = 0.1,
        delay = 0,
        ease = 'power3.out',
        start = 'top 85%',
        childSelector = ':scope > *',
    } = options;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const children = container.querySelectorAll(childSelector);
        if (children.length === 0) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.set(children, { opacity: 1, y: 0 });
            return;
        }

        gsap.set(children, { opacity, y });

        const animation = gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease,
            scrollTrigger: {
                trigger: container,
                start,
            },
        });

        return () => {
            animation.kill();
        };
    }, [y, opacity, duration, stagger, delay, ease, start, childSelector]);

    return containerRef;
};

/**
 * Hook for parallax scrolling effect
 */
export const useParallax = (speed: number = 0.5) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const animation = gsap.to(element, {
            yPercent: -50 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => {
            animation.kill();
        };
    }, [speed]);

    return elementRef;
};

/**
 * Hook for animating numbers from 0 to target value
 */
export const useCountUp = (
    targetValue: number,
    options: {
        duration?: number;
        delay?: number;
        start?: string;
        suffix?: string;
        prefix?: string;
    } = {}
) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const { duration = 2, delay = 0, start = 'top 85%', suffix = '', prefix = '' } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const counter = { value: 0 };

        const animation = gsap.to(counter, {
            value: targetValue,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
            onUpdate: () => {
                element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
            },
        });

        return () => {
            animation.kill();
        };
    }, [targetValue, duration, delay, start, suffix, prefix]);

    return elementRef;
};

/**
 * Hook for progress bar animation
 */
export const useProgressBar = (
    targetWidth: number,
    options: {
        duration?: number;
        delay?: number;
        ease?: string;
        start?: string;
    } = {}
) => {
    const barRef = useRef<HTMLDivElement>(null);
    const { duration = 1.2, delay = 0, ease = 'power3.out', start = 'top 90%' } = options;

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        gsap.set(bar, { width: '0%' });

        const animation = gsap.to(bar, {
            width: `${targetWidth}%`,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: bar,
                start,
                once: true,
            },
        });

        return () => {
            animation.kill();
        };
    }, [targetWidth, duration, delay, ease, start]);

    return barRef;
};
