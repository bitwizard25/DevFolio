'use client'
import React from 'react';

interface VerifyBadgeProps {
  verified: boolean;
  className?: string;
}

export default function VerifyBadge({ verified, className = "" }: VerifyBadgeProps) {
  if (process.env.NODE_ENV !== 'development' || verified) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 cursor-help ${className}`}
      title="Unverified claim — Raj must confirm this metric or detail before production deploy."
    >
      [VERIFY]
    </span>
  );
}
