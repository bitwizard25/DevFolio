'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'py-3 glass shadow-lg'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl font-bold"
          >
            <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 group-hover:shadow-glow transition-all duration-300">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">DevFolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(link.href)
                    ? 'text-cyan-400'
                    : 'text-slate-300 hover:text-white'
                  }`}
              >
                {link.label}
                {/* Active Indicator */}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
                {/* Hover Effect */}
                <span className="absolute inset-0 rounded-lg bg-slate-700/0 hover:bg-slate-700/50 transition-colors duration-300 -z-10" />
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/contact"
              className="ml-4 btn-primary text-sm"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass hover:bg-slate-700/50 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-slate-100" />
            ) : (
              <Menu className="w-5 h-5 text-slate-100" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="glass rounded-xl p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive(link.href)
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block btn-primary text-center mt-4"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
