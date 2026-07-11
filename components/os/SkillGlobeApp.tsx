'use client'

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import WordSphere from '../three/skills/WordSphere';
import { Orbit, Compass, RefreshCw, Settings2, Play, Pause, FastForward } from 'lucide-react';

export default function SkillGlobeApp() {
  const [showMesh, setShowMesh] = useState(true);
  const [speedMode, setSpeedMode] = useState<'paused' | 'normal' | 'fast'>('normal');

  const speedMultiplier = speedMode === 'paused' ? 0 : speedMode === 'fast' ? 3.5 : 1;

  return (
    <div className="flex flex-col h-full bg-[#07070d]/70 text-white font-sans select-none relative overflow-hidden">
      {/* Interactive Canvas */}
      <div className="flex-1 relative min-h-[250px] w-full">
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ fov: 45, position: [0, 0, 7.5], near: 0.1, far: 40 }}
        >
          <Suspense fallback={null}>
            <WordSphere speedMultiplier={speedMultiplier} showGlobeMesh={showMesh} />
            <Preload all />
          </Suspense>
        </Canvas>

        {/* Dynamic Glass Overlay Instructions */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/45 border border-white/10 backdrop-blur-md max-w-[200px] pointer-events-none space-y-1 shadow-lg">
          <div className="flex items-center gap-1.5 text-[#0A84FF]">
            <Orbit className="w-4 h-4 animate-spin-slow" />
            <span className="text-[10px] font-bold uppercase tracking-wider">3D Orbit Mode</span>
          </div>
          <p className="text-[9px] text-slate-400 leading-relaxed font-light">
            Move your mouse to adjust rotation skew. Hover/drag inside the sphere to inspect stack nodes.
          </p>
        </div>

        {/* Floating App Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center p-2.5 rounded-xl bg-black/45 border border-white/10 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-350 font-mono">Controls</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed selection */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/15">
              <button
                onClick={() => setSpeedMode('paused')}
                className={`p-1 rounded-md transition-colors ${
                  speedMode === 'paused'
                    ? 'bg-[#FF375F] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Pause Rotation"
              >
                <Pause className="w-3 h-3" />
              </button>
              <button
                onClick={() => setSpeedMode('normal')}
                className={`p-1 rounded-md transition-colors ${
                  speedMode === 'normal'
                    ? 'bg-[#0A84FF] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Normal Rotation"
              >
                <Play className="w-3 h-3" />
              </button>
              <button
                onClick={() => setSpeedMode('fast')}
                className={`p-1 rounded-md transition-colors ${
                  speedMode === 'fast'
                    ? 'bg-[#32D74B] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fast Rotation"
              >
                <FastForward className="w-3 h-3" />
              </button>
            </div>

            <div className="w-px h-4 bg-white/10" />

            {/* Wireframe toggle */}
            <button
              onClick={() => setShowMesh(!showMesh)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                showMesh
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-transparent border-white/5 text-slate-500 hover:text-slate-300'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${showMesh ? 'animate-spin-slow' : ''}`} />
              <span>Grid Mesh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control panel at the bottom */}
      <div className="h-14 border-t border-white/10 bg-white/[0.01] backdrop-blur-md px-4 flex items-center justify-between gap-4 shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#0A84FF]/10 border border-[#0A84FF]/20 text-[#0A84FF]">
            <Orbit className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200">SkillGlobe Visualizer</h3>
            <p className="text-[9.5px] text-slate-500 font-mono">Dynamic WebGL Render: 60 FPS</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/about"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl text-[10px] font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-1"
          >
            <span>Qualifications dossier</span>
            <Compass className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
