'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { books, Book } from '@/lib/books';
import VerifyBadge from '@/components/case-study/VerifyBadge';
import { BookOpen } from 'lucide-react';

export default function Bookshelf() {
  const [activeBookId, setActiveBookId] = useState<number | null>(null);

  return (
    <div className="py-24 relative overflow-hidden border-t border-white/5 bg-[#08080c]/50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 border border-blue-500/20">
            <BookOpen className="w-3 h-3" />
            <span>Continuous Mastery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Books that changed how I build
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            My foundational library for distributed engineering and robust architecture.
          </p>
        </div>

        {/* Bookshelf Shelf Representation */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Desktop Bookshelf Layout (Hidden on Mobile) */}
          <div className="hidden md:flex justify-center items-end gap-6 relative min-h-[320px] pb-1">
            {books.map((book, index) => {
              const rotation = index % 2 === 0 ? 1.5 : -1.5;
              const isHovered = activeBookId === book.id;

              return (
                <div
                  key={book.id}
                  className="relative group"
                  onMouseEnter={() => setActiveBookId(book.id)}
                  onMouseLeave={() => setActiveBookId(null)}
                >
                  <motion.button
                    aria-expanded={isHovered}
                    aria-controls={`takeaway-${book.id}`}
                    className="focus:outline-none"
                    style={{ transformOrigin: 'bottom center' }}
                    animate={{
                      rotate: isHovered ? 0 : rotation,
                      y: isHovered ? -16 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Book Spine / Cover */}
                    <div
                      className={`w-44 h-64 rounded-xl p-6 flex flex-col justify-between text-left
                                 bg-gradient-to-br ${book.color} backdrop-blur-md border
                                 shadow-xl transition-all duration-300
                                 ${isHovered ? 'shadow-[0_15px_30px_rgba(10,132,255,0.15)] border-white/20' : 'border-white/5'}`}
                    >
                      {/* Top spine decoration */}
                      <div className="h-1.5 w-8 bg-white/20 rounded-full" />

                      {/* Title & Author */}
                      <div className="space-y-2">
                        <span className="text-xs text-white/40 font-mono tracking-widest block uppercase">
                          Vol. 0{book.id}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight line-clamp-3">
                          {book.title}
                        </h3>
                        <p className="text-xs text-white/60 font-medium">
                          {book.author}
                        </p>
                      </div>

                      {/* Bottom spine decoration */}
                      <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-4">
                        <span className="text-[10px] text-white/30 uppercase font-bold tracking-wider">
                          takeaway
                        </span>
                        <VerifyBadge verified={book.verified} />
                      </div>
                    </div>
                  </motion.button>

                  {/* Popover Takeaway Box (Desktop only, positioned above the book) */}
                  <motion.div
                    id={`takeaway-${book.id}`}
                    role="region"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.95,
                      y: isHovered ? -20 : 10,
                      pointerEvents: isHovered ? 'auto' : 'none',
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl
                               bg-slate-950/90 border border-white/10 shadow-2xl backdrop-blur-md z-30 pointer-events-none"
                  >
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {book.takeaway}
                    </p>
                    {/* Popover Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10" />
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Shelf Line (Desktop only) */}
          <div className="hidden md:block w-full h-[4px] bg-gradient-to-r from-transparent via-slate-700 to-transparent shadow-[0_5px_10px_rgba(0,0,0,0.5)] mb-12" />

          {/* Mobile 2x2 Grid Layout (Visible on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
            {books.map((book) => (
              <div
                key={book.id}
                className={`p-6 rounded-2xl bg-gradient-to-br ${book.color} border border-white/5 backdrop-blur-md`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] text-white/40 font-mono tracking-widest block uppercase mb-1">
                      Vol. 0{book.id}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {book.author}
                    </p>
                  </div>
                  <VerifyBadge verified={book.verified} />
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block mb-1">
                    Core Takeaway
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {book.takeaway}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
