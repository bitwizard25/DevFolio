'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Magnetic from '@/components/interactions/Magnetic';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Work' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Navbar appears after scrolling 80px
      setIsVisible(window.scrollY > 80);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
        }`}
    >
      {/* Glassmorphic bar */}
      <div className="mx-4 mt-4 rounded-2xl glass-elevated">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo - Simple, confident */}
          <Link href="/" className="text-lg font-semibold text-white hover:text-white/80 transition-colors">
            RB
          </Link>

          {/* Desktop Navigation - Minimal */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg link-underline
                  ${isActive(link.href)
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                {link.label}
                {/* Subtle active dot */}
                {isActive(link.href) && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0A84FF] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Magnetic strength={0.25} padding={8}>
              <Link
                href="/contact"
                className="block px-5 py-2 text-sm font-medium text-white
                           bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
              >
                Contact
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-64 pb-4' : 'max-h-0'
            }`}
        >
          <div className="px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.href)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 mt-2 text-center text-sm font-medium text-white
                         bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
