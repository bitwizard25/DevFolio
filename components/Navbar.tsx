'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-gray-800 to-gray-900 text-white backdrop-blur-sm rounded-full">
      <div className="max-w-screen-2xl mx-auto px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold">
              DevFolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-6 flex items-center space-x-3">
              <Link href="/" className="hover:bg-gray-700 px-2 py-1 rounded-md">Home</Link>
              <Link href="/about" className="hover:bg-gray-700 px-2 py-1 rounded-md">About</Link>
              <Link href="/projects" className="hover:bg-gray-700 px-2 py-1 rounded-md">Projects</Link>
              <Link href="/experience" className="hover:bg-gray-700 px-2 py-1 rounded-md">Experience</Link>
              <Link href="/contact" className="hover:bg-gray-700 px-2 py-1 rounded-md">Contact Me</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {isOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )} {/* Missing closing bracket here */}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-2 space-y-1 sm:px-3">
            <Link href="/" className="hover:bg-gray-700 block px-2 py-1 rounded-md">Home</Link>
            <Link href="/about" className="hover:bg-gray-700 block px-2 py-1 rounded-md">About</Link>
            <Link href="/projects" className="hover:bg-gray-700 block px-2 py-1 rounded-md">Projects</Link>
            <Link href="/experience" className="hover:bg-gray-700 block px-2 py-1 rounded-md">Experience</Link>
            <Link href="/contact" className="hover:bg-gray-700 block px-2 py-1 rounded-md">Contact Me</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
