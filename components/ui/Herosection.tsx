'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import HeroCanvas from './HeroCanvas';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (!mounted) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Set initial states
      gsap.set([nameRef.current, taglineRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.95,
      });
      gsap.set(scrollRef.current, {
        opacity: 0,
      });

      // Staggered reveal - name first, everything follows
      tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1 }, 0.3)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to(imageRef.current, { opacity: 1, scale: 1, duration: 1.2 }, 0.4)
        .to(scrollRef.current, { opacity: 1, duration: 0.6 }, 1.4);

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />

      {/* Interactive Canvas Animation */}
      <HeroCanvas />

      {/* Subtle glow accent */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.4) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">

          {/* Left - Content: Radical simplicity */}
          <div className="text-center lg:text-left space-y-8">

            {/* Name - Big, confident, memorable */}
            <h1
              ref={nameRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{ opacity: 0 }}
            >
              <span className="text-white">Raj</span>
              <span className="block gradient-text mt-1">Bhoyar</span>
            </h1>

            {/* Tagline - One line that sticks */}
            <p
              ref={taglineRef}
              className="text-xl md:text-2xl text-white/50 font-light max-w-md mx-auto lg:mx-0"
              style={{ opacity: 0 }}
            >
              I build systems that scale.
            </p>

            {/* CTA - One primary action */}
            <div ref={ctaRef} className="pt-4" style={{ opacity: 0 }}>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white 
                         bg-gradient-to-r from-[#0A84FF] to-[#5856D6] rounded-2xl
                         hover:shadow-[0_0_40px_rgba(10,132,255,0.3)] transition-all duration-500"
              >
                See My Work
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* Secondary links - subtle */}
              <div className="flex items-center gap-4 justify-center lg:justify-start mt-8">
                {[
                  { icon: Github, href: 'https://github.com/rajbhoyar729', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:rbhoyar729@gmail.com', label: 'Email' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="p-3 text-white/30 hover:text-white/70 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Image: Clean, no decorations */}
          <div ref={imageRef} className="flex justify-center lg:justify-end" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Soft glow behind image */}
              <div
                className="absolute -inset-4 rounded-full opacity-40 blur-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.2) 0%, rgba(191,90,242,0.2) 100%)' }}
              />

              {/* Image - simple, professional */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10">
                  <Image
                    src="/Raj.jpg"
                    alt="Raj Bhoyar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Minimal */}
        <button
          ref={scrollRef}
          onClick={scrollToNext}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/50 
                     transition-colors duration-300 cursor-pointer"
          style={{ opacity: 0 }}
          aria-label="Scroll to next section"
        >
          <ArrowDown className="w-5 h-5 animate-float" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;