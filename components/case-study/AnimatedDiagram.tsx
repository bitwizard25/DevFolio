'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Globe, Server, Database, Bot, Clock, FileText, Bell, Layers, Cpu, LucideIcon } from 'lucide-react';
import { DiagramSpec, DiagramIcon } from '@/lib/case-studies';

// Map icon strings to Lucide components
const iconMap: Record<DiagramIcon, LucideIcon> = {
  globe: Globe,
  server: Server,
  queue: Layers, // Stack/Layers represents message queues nicely
  db: Database,
  bot: Bot,
  cron: Clock,
  doc: FileText,
  bell: Bell,
};

interface AnimatedDiagramProps {
  spec: DiagramSpec;
}

interface NodeCoord {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function AnimatedDiagram({ spec }: AnimatedDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  // Compute layout positions (width = 800, height = 400 relative coordinate space)
  const nodeCoords: NodeCoord[] = [];
  const nodeMap = new Map<string, NodeCoord>();

  if (spec.layout === 'pipeline-rows') {
    // 2-row layout (Client -> API -> DB; Cron -> Queue -> Notify)
    const nodeWidth = 135;
    const nodeHeight = 82;
    const row1Ids = ['client', 'api', 'mongo', 'source', 'embed'];
    spec.nodes.forEach((node) => {
      const isRow1 = row1Ids.includes(node.id) || ['cron-fetch', 'chunk-embed'].some(id => node.id.includes(id));
      const colIndex = spec.nodes.filter(n => {
        const nIsRow1 = row1Ids.includes(n.id) || ['cron-fetch', 'chunk-embed'].some(id => n.id.includes(id));
        return isRow1 === nIsRow1;
      }).indexOf(node);
      
      const countInRow = spec.nodes.filter(n => {
        const nIsRow1 = row1Ids.includes(n.id) || ['cron-fetch', 'chunk-embed'].some(id => n.id.includes(id));
        return isRow1 === nIsRow1;
      }).length;

      const spacingX = 640 / (countInRow - 1 || 1);
      const x = 80 + colIndex * spacingX;
      const y = isRow1 ? 80 : 250;
      const coord = { id: node.id, x: x - nodeWidth / 2, y: y - nodeHeight / 2, width: nodeWidth, height: nodeHeight };
      nodeCoords.push(coord);
      nodeMap.set(node.id, coord);
    });
  } else {
    // Default 1-row pipeline layout (Client -> Queue -> Worker -> DB etc)
    const count = spec.nodes.length;
    const nodeWidth = count > 5 ? 115 : 140;
    const nodeHeight = 82;
    spec.nodes.forEach((node, index) => {
      const spacingX = 660 / (count - 1 || 1);
      const x = 70 + index * spacingX;
      const y = 160;
      const coord = { id: node.id, x: x - nodeWidth / 2, y: y - nodeHeight / 2, width: nodeWidth, height: nodeHeight };
      nodeCoords.push(coord);
      nodeMap.set(node.id, coord);
    });
  }

  // Active step loop for animated paths
  useEffect(() => {
    if (!isInView || reducedMotion || spec.edges.length === 0) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % spec.edges.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [isInView, reducedMotion, spec.edges.length]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0a0a10]/80 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col"
    >
      {/* macOS Title Bar */}
      <div className="flex items-center gap-2 px-6 h-11 shrink-0 border-b border-white/10 bg-[#0d0d15]/50 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] opacity-80" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] opacity-80" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#28C840] opacity-80" />
        </div>
        <span className="flex-1 text-center text-xs font-semibold text-white/50 tracking-wider uppercase font-mono pr-14">
          system_visualizer.app
        </span>
      </div>

      <div className="p-6 lg:p-8 flex-1">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-white mb-2">{spec.title}</h3>
          {spec.caption && <p className="text-slate-400 text-xs">{spec.caption}</p>}
        </div>

      <div className="relative w-full aspect-[16/10] md:aspect-[16/8] min-h-[340px] max-w-4xl mx-auto">
        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Paths and Edges */}
          <g>
            {spec.edges.map((edge, index) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              if (!fromNode || !toNode) return null;

              // Calculate connection points (center of boxes)
              const startX = fromNode.x + fromNode.width / 2;
              const startY = fromNode.y + fromNode.height / 2;
              const endX = toNode.x + toNode.width / 2;
              const endY = toNode.y + toNode.height / 2;

              // Adjust endpoints slightly to touch border instead of center
              const angle = Math.atan2(endY - startY, endX - startX);
              const padStartX = startX + Math.cos(angle) * (fromNode.width / 2);
              const padStartY = startY + Math.sin(angle) * (fromNode.height / 2);
              const padEndX = endX - Math.cos(angle) * (toNode.width / 2);
              const padEndY = endY - Math.sin(angle) * (toNode.height / 2);

              // Create control point offset for curves when routing y-change
              const hasYDiff = Math.abs(endY - startY) > 50;
              const pathD = hasYDiff
                ? `M ${padStartX} ${padStartY} C ${padStartX + (endX - startX) * 0.4} ${padStartY}, ${padStartX + (endX - startX) * 0.6} ${padEndY}, ${padEndX} ${padEndY}`
                : `M ${padStartX} ${padStartY} L ${padEndX} ${padEndY}`;

              const isActive = activeStep === index && isInView && !reducedMotion;

              return (
                <g key={index}>
                  {/* Background Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="3"
                  />
                  {/* Flow Path */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={isActive ? 'url(#active-flow-grad)' : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isActive ? '3' : '2'}
                    strokeDasharray={edge.dashed ? '6 4' : undefined}
                    animate={
                      isActive
                        ? { strokeDashoffset: [-20, 0] }
                        : {}
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: 'linear',
                    }}
                  />

                  {/* Traveling Particle */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.circle
                        r="4"
                        fill={spec.nodes.find(n => n.id === edge.from)?.color || '#0A84FF'}
                        style={{ offsetPath: `path('${pathD}')`, offsetDistance: '0%' }}
                        animate={{ offsetDistance: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Edge Label (Optional) */}
                  {edge.label && (
                    <text
                      x={(padStartX + padEndX) / 2}
                      y={(padStartY + padEndY) / 2 - 10}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.4)"
                      className="text-[10px] font-mono select-none"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Definitions */}
          <defs>
            <linearGradient id="active-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#BF5AF2" stopOpacity="1" />
              <stop offset="100%" stopColor="#32D74B" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* HTML Nodes in SVG coordinates using foreignObject */}
          {spec.nodes.map((node) => {
            const coord = nodeMap.get(node.id);
            if (!coord) return null;

            const Icon = iconMap[node.icon] || Cpu;
            const isNodeActive = spec.edges.some(
              (e, i) =>
                activeStep === i &&
                (e.from === node.id || e.to === node.id) &&
                isInView &&
                !reducedMotion
            );

            return (
              <foreignObject
                key={node.id}
                x={coord.x}
                y={coord.y}
                width={coord.width}
                height={coord.height}
                className="overflow-visible"
              >
                <div
                  className={`w-full h-full rounded-2xl border p-3 flex flex-col justify-center items-center text-center
                             transition-all duration-500 ease-out select-none
                             bg-[#0f0f1b]/90 backdrop-blur-md
                             ${
                               isNodeActive
                                 ? 'border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-102'
                                 : 'border-white/5 hover:border-white/10'
                             }`}
                >
                  {/* Node Icon */}
                  <div
                    className="p-1.5 rounded-lg mb-2 border"
                    style={{
                      color: node.color,
                      borderColor: `${node.color}25`,
                      backgroundColor: `${node.color}08`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Title & Desc */}
                  <h4 className="text-[10.5px] font-bold text-white leading-tight line-clamp-2 px-1">
                    {node.title}
                  </h4>
                  <p className="text-[8.5px] text-slate-400 leading-normal line-clamp-2 mt-1 px-1 font-light">
                    {node.desc}
                  </p>
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>
      </div>
    </div>
  );
}
