'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Magnetic from '@/components/interactions/Magnetic';
import { useLenis } from '@/components/SmoothScrollProvider';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null, // the static gradient below is the loading state
});

const socials = [
  { icon: Github, href: 'https://github.com/bitwizard25', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:rbhoyar729@gmail.com', label: 'Email' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();
  const reduced = useReducedMotion();

  // Viewport-anchored parallax: content recedes at different speeds as you scroll away
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -40]);
  const portraitY = useTransform(scrollY, [0, 800], [0, 70]);
  const glowY = useTransform(scrollY, [0, 800], [0, 140]);

  const scrollToNext = () => {
    if (lenis) {
      lenis.scrollTo(window.innerHeight);
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient — also the fallback when WebGL is gated off */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />

      {/* Low-poly 3D scene (lazy, pointer events read from this section) */}
      <HeroScene eventSourceRef={sectionRef} />

      {/* Subtle glow accent — centered with margins, not translate (framer's y would override translate classes) */}
      <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] -ml-[300px] -mt-[300px] pointer-events-none">
        <motion.div
          className="w-full h-full rounded-full opacity-15 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.4) 0%, transparent 70%)', y: reduced ? 0 : glowY }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">

          {/* Left - Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            style={{ y: reduced ? 0 : contentY }}
          >

            {/* Name - Big, confident, memorable */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
            >
              <span className="text-white block">Raj</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-[-0.1em] pb-4">
                Bhoyar
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="text-xl md:text-2xl text-slate-400 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Architecting scalable systems and intelligent agents.
              <br />
              <span className="text-white/80">Simple. Efficient. Impactful.</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
              className="pt-8 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <Magnetic>
                <Link
                  href="#projects"
                  data-mascot-react="celebrate"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/10"
                >
                  <span className="relative z-10">See My Work</span>
                  <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Magnetic>

              {/* Social Links */}
              <div className="flex items-center gap-6">
                {socials.map((social) => (
                  <Magnetic key={social.label} strength={0.2} padding={6}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="group inline-block p-2 text-slate-400 hover:text-white transition-colors duration-300 hover-wiggle"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                    </a>
                  </Magnetic>
                ))}
                <Magnetic strength={0.2} padding={6}>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
                    className="group p-2 text-slate-400 hover:text-white transition-colors duration-300 hover-wiggle"
                    aria-label="Resume"
                  >
                    <FileText className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end relative"
            style={{ y: reduced ? 0 : portraitY }}
          >
            {/* Contextual Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div
              data-mascot-react="shy"
              className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            >
              {/* Stylish Border */}
              <div className="absolute inset-0 border border-white/10 rounded-[2rem] rotate-3 scale-105" />
              <div className="absolute inset-0 border border-white/5 rounded-[2rem] -rotate-3 scale-105" />

              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/Raj.jpg"
                  alt="Raj Bhoyar"
                  fill
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 450px"
                  className="object-cover"
                  priority
                />
                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 100 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-transparent to-white/20" />
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToNext(); }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 p-4 cursor-pointer"
            aria-label="Scroll Down"
          >
            <span className="sr-only">Scroll Down</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
