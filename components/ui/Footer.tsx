'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/rajbhoyar729', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:rbhoyar729@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="relative border-t border-slate-800">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-xl font-bold gradient-text">DevFolio</h3>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full Stack Developer & AI Enthusiast crafting digital experiences with passion and precision.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:bg-cyan-500/20 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Let&apos;s Connect</h4>
            <p className="text-slate-400 text-sm">
              Open for opportunities and collaborations.
            </p>
            <Link
              href="/contact"
              className="inline-block btn-primary text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Raj Bhoyar. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            in India
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg hover:shadow-glow-lg hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
