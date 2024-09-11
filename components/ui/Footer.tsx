'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2"> {/* Reduced padding */}
      <div className=" max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0"> {/* Reduced space */}
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-semibold">Raj Bhoyar</h2> {/* Reduced font size */}
            <p className="text-gray-400 text-xs">Full Stack Developer | AI Enthusiast</p> {/* Smaller font */}
          </div>
          <div className="flex space-x-2"> {/* Reduced icon spacing */}
            <Link href="https://github.com/rajbhoyar729" passHref>
              <Github className="hover:text-blue-500 transition-colors duration-300" size={18} /> {/* Smaller icon */}
            </Link>
            <Link href="https://linkedin.com/in/raj-bhoyar-b597b416a/" passHref>
              <Linkedin className="hover:text-blue-500 transition-colors duration-300" size={18} /> {/* Smaller icon */}
            </Link>
            <Link href="mailto:rbhoyar729@gmail.com" passHref>
              <Mail className="hover:text-blue-500 transition-colors duration-300" size={18} /> {/* Smaller icon */}
            </Link>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0"> {/* Reduced spacing */}
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} Raj Bhoyar. All rights reserved.</p>
          <div className="flex space-x-2"> {/* Reduced link spacing */}
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"> {/* Smaller font */}
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"> {/* Smaller font */}
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} /> {/* Reduced size */}
        </button>
      )}
    </footer>
  );
};

export default Footer;
