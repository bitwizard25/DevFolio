'use client'

import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  title: string;
  zIndex: number;
  maximized: boolean;
  /** Initial position on the desktop (px from desktop top-left) */
  initial: { x: number; y: number; width: number; height: number };
  dragBoundsRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const trafficLight = {
  // 20×20px hit target (Fitts's Law) wrapping a 12×12px visual dot — keeps the authentic
  // macOS look while giving every click a comfortable margin for error.
  hit: 'w-5 h-5 flex items-center justify-center rounded-full',
  dot: 'w-3 h-3 rounded-full border border-black/20 flex items-center justify-center hover:brightness-110',
};

/** A draggable macOS-style glass window. Dragging is title-bar only. */
export default function Window({
  title,
  zIndex,
  maximized,
  initial,
  dragBoundsRef,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  children,
}: WindowProps) {
  const dragControls = useDragControls();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      onPointerDown={onFocus}
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={dragBoundsRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0, ...(maximized ? { x: 0 } : {}) }}
      exit={{ opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.16 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className={`absolute flex flex-col rounded-[14px] border border-white/15 shadow-2xl shadow-black/60 overflow-hidden
                  bg-[#131320]/85 backdrop-blur-2xl ${maximized ? 'inset-x-3 top-3 bottom-[5.5rem]' : ''}`}
      style={
        maximized
          ? { zIndex }
          : {
              zIndex,
              left: initial.x,
              top: initial.y,
              width: initial.width,
              height: initial.height,
            }
      }
    >
      {/* Glass top highlight — a hairline of light along the window's top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

      {/* Title bar — the drag handle */}
      <div
        onPointerDown={(e) => {
          if (!maximized) dragControls.start(e);
        }}
        onDoubleClick={onToggleMaximize}
        className="relative flex items-center gap-2 px-3.5 h-9 shrink-0 border-b border-white/10 bg-white/[0.05] cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-3 group/lights" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={onClose} aria-label={`Close ${title}`} className={trafficLight.hit}>
            <span className={`${trafficLight.dot} bg-[#FF5F57]`}>
              <X className="w-2 h-2 text-[#4d0000] opacity-0 group-hover/lights:opacity-100 transition-opacity" strokeWidth={3} />
            </span>
          </button>
          <button onClick={onMinimize} aria-label={`Minimize ${title}`} className={trafficLight.hit}>
            <span className={`${trafficLight.dot} bg-[#FEBC2E]`}>
              <Minus className="w-2 h-2 text-[#5c3d00] opacity-0 group-hover/lights:opacity-100 transition-opacity" strokeWidth={3} />
            </span>
          </button>
          <button onClick={onToggleMaximize} aria-label={`Maximize ${title}`} className={trafficLight.hit}>
            <span className={`${trafficLight.dot} bg-[#28C840]`}>
              <Maximize2 className="w-2 h-2 text-[#003d0a] opacity-0 group-hover/lights:opacity-100 transition-opacity" strokeWidth={3} />
            </span>
          </button>
        </div>
        <span className="flex-1 text-center text-[13px] font-medium text-white/70 truncate pr-14 tracking-tight">
          {title}
        </span>
      </div>

      {/* Content — scrolls inside the window, not the page */}
      <div
        ref={contentRef}
        data-lenis-prevent
        className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain remove-scrollbar"
      >
        {children}
      </div>
    </motion.div>
  );
}
