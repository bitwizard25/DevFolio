import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              DevFolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
              <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md">About</Link>
              <Link href="/projects" className="hover:bg-gray-700 px-3 py-2 rounded-md">Projects</Link>
              <Link href="/experience" className="hover:bg-gray-700 px-3 py-2 rounded-md">Experience</Link>
              <Link href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contact Me</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="hover:bg-gray-700 block px-3 py-2 rounded-md">Home</Link>
            <Link href="/about" className="hover:bg-gray-700 block px-3 py-2 rounded-md">About</Link>
            <Link href="/projects" className="hover:bg-gray-700 block px-3 py-2 rounded-md">Projects</Link>
            <Link href="/experience" className="hover:bg-gray-700 block px-3 py-2 rounded-md">Experience</Link>
            <Link href="/contact" className="hover:bg-gray-700 block px-3 py-2 rounded-md">Contact Me</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;