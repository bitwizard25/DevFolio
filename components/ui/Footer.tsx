'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useLenis } from '@/components/SmoothScrollProvider';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      // Show only when near bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      setShowScrollTop(scrollTop > scrollHeight - clientHeight * 2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/bitwizard25', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:rbhoyar729@gmail.com', label: 'Email' },
  ];

  return (
    <footer data-scroll-section className="relative py-12 border-t border-white/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Name / Logo */}
          <Link href="/" className="text-lg font-semibold text-white/70 hover:text-white transition-colors link-underline">
            Raj Bhoyar
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="p-2 text-white/50 hover:text-white/80 transition-colors duration-300 hover-wiggle"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Scroll to top - Only appears near bottom */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 p-3 rounded-full
                          bg-white/10 border border-white/10 text-white/50
                          hover:bg-white/20 hover:text-white
                          transition-all duration-300 z-50
                          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};

export default Footer;
