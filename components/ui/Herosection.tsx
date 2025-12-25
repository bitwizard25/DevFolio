'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowDown, Terminal, Sparkles, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const roles = [
  'Backend Developer',
  'System Architect',
  'AI/ML Enthusiast',
  'Full Stack Engineer',
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  // Typing animation
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(role.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // GSAP entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        }
      });

      // Set initial states
      gsap.set([badgeRef.current, headingRef.current, roleRef.current, descRef.current, ctaRef.current, socialRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.set(imageContainerRef.current, {
        opacity: 0,
        scale: 0.9,
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
      });

      // Animate elements in sequence
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(headingRef.current, { opacity: 1, y: 0, duration: 1 }, 0.4)
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to(socialRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
        .to(imageContainerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out'
        }, 0.3)
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, 1.2);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noise"
    >
      {/* Premium Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(10,132,255,0.15) 0%, transparent 70%)',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(191,90,242,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-[10%] w-24 h-24 border border-white/5 rounded-full animate-float" />
      <div className="absolute bottom-1/3 right-[8%] w-32 h-32 border border-white/5 rounded-full animate-float delay-500" />

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]">

          {/* Left - Content */}
          <div className="text-center lg:text-left space-y-8">

            {/* Status Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-subtle"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-white/70 text-sm font-medium">Available for opportunities</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                ref={headingRef}
                className="text-display text-balance"
              >
                Hi, I&apos;m{' '}
                <span className="gradient-text block mt-2">Raj Bhoyar</span>
              </h1>

              <div
                ref={roleRef}
                className="h-12 md:h-14 flex items-center justify-center lg:justify-start"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl text-white/50 font-light tracking-tight">
                  {displayText}
                  <span className="animate-blink text-[#0A84FF] ml-0.5">|</span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-body-large text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              B.Tech CSE &apos;24 from BDCOE Wardha. Currently building{' '}
              <span className="text-white/90 font-medium">production-grade EdTech systems</span>{' '}
              at NNIIT, processing 10K+ daily events with Node.js, MongoDB, and RabbitMQ.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#projects"
                className="btn-primary flex items-center justify-center gap-2 text-lg group"
              >
                View My Work
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary flex items-center justify-center gap-2 text-lg"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </Link>
            </div>

            {/* Social Links */}
            <div
              ref={socialRef}
              className="flex items-center gap-4 justify-center lg:justify-start pt-2"
            >
              {[
                { icon: Github, href: 'https://github.com/rajbhoyar729', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:rbhoyar729@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-subtle hover:bg-white/10 
                           hover:scale-110 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Profile Visual */}
          <div
            ref={imageContainerRef}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute -inset-8 rounded-full opacity-60 blur-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(10,132,255,0.3) 0%, rgba(191,90,242,0.3) 100%)',
                }}
              />

              {/* Profile Container */}
              <div className="relative">
                {/* Animated gradient border */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0A84FF] via-[#BF5AF2] to-[#0A84FF] animate-gradient opacity-80 blur-sm"
                  style={{ backgroundSize: '200% 200%' }}
                />

                {/* Image container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-black/80">
                  <Image
                    src="/Raj.jpg"
                    alt="Raj Bhoyar - Backend Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 p-3.5 rounded-2xl glass-elevated shadow-xl animate-float">
                  <Terminal className="w-6 h-6 text-[#0A84FF]" />
                </div>
                <div className="absolute -bottom-2 -left-2 p-3.5 rounded-2xl glass-elevated shadow-xl animate-float delay-500">
                  <Sparkles className="w-6 h-6 text-[#BF5AF2]" />
                </div>

                {/* Role badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full glass-elevated shadow-xl whitespace-nowrap">
                  <span className="text-sm font-medium text-white/90">
                    🏢 Backend Dev @ NNIIT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          ref={scrollIndicatorRef}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 
                     text-white/30 hover:text-white/60 transition-colors cursor-pointer group"
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-float" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;