'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, HelpCircle } from 'lucide-react';
import Magnetic from '@/components/interactions/Magnetic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030307] text-white relative overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-transparent pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] rotate-45" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-8 p-10 rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Question Icon */}
          <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 mb-2">
            <HelpCircle className="w-10 h-10 animate-bounce" />
          </div>

          <h1 className="text-6xl font-bold tracking-tighter text-white">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-200">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            The path you are looking for does not exist or has been moved to another location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-4"
        >
          <Magnetic>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-white/5"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </div>
  );
}
