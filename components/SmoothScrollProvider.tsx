'use client'
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LocomotiveScrollProvider({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Initialize Locomotive Scroll
        const locomotiveScroll = new LocomotiveScroll({
            el: containerRef.current!,
            smooth: true,
            multiplier: 1,
            lerp: 0.1, // Linear interpolation - lower = smoother
            smartphone: {
                smooth: true,
            },
            tablet: {
                smooth: true,
            },
        });

        // Sync Locomotive with GSAP ScrollTrigger
        locomotiveScroll.on('scroll', ScrollTrigger.update);

        // Tell ScrollTrigger to use these proxy methods
        ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
                if (value !== undefined) {
                    locomotiveScroll.scrollTo(value, { duration: 0, disableLerp: true });
                }
                return locomotiveScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: containerRef.current?.style.transform ? 'transform' : 'fixed',
        });

        // Refresh ScrollTrigger and Locomotive on updates
        ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
        ScrollTrigger.refresh();

        return () => {
            locomotiveScroll.destroy();
            ScrollTrigger.removeEventListener('refresh', () => locomotiveScroll.update());
        };
    }, []);

    return (
        <div ref={containerRef} data-scroll-container>
            {children}
        </div>
    );
}
