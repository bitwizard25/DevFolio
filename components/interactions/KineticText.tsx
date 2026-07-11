'use client'

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
}

const containerVariants = {
  hover: {
    transition: { staggerChildren: 0.02 },
  },
};

const charVariants = {
  initial: { y: 0 },
  hover: {
    y: -6,
    transition: { type: 'spring', stiffness: 500, damping: 18 },
  },
};

/**
 * Per-character lift stagger on hover. Screen readers get one string via aria-label.
 * Solid-color text only — per-char spans break bg-clip-text gradients.
 */
export default function KineticText({ text, className = '' }: KineticTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <motion.span
      aria-label={text}
      role="text"
      initial="initial"
      whileHover="hover"
      variants={containerVariants}
      className={`inline-block ${className}`}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span key={ci} variants={charVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
