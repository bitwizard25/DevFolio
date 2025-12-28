'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Globe, MessageSquare } from 'lucide-react';

const SystemArchitecture = () => {
    const [activeStep, setActiveStep] = useState(0);

    // Auto-play effect
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const steps = [
        {
            id: 0,
            title: "User Interaction",
            desc: "Student joins session",
            icon: Globe,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            borderColor: "border-blue-500/50",
            shadow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]"
        },
        {
            id: 1,
            title: "API Gateway",
            desc: "Request validated",
            icon: Server,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            borderColor: "border-purple-500/50",
            shadow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]"
        },
        {
            id: 2,
            title: "Message Queue",
            desc: "RabbitMQ Async Buffer",
            icon: MessageSquare,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            borderColor: "border-orange-500/50",
            shadow: "shadow-[0_0_30px_rgba(249,115,22,0.2)]"
        },
        {
            id: 3,
            title: "Worker & DB",
            desc: "Update MongoDB/Neo4j",
            icon: Database,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            borderColor: "border-emerald-500/50",
            shadow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        }
    ];

    return (
        <div className="w-full bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm p-6 lg:p-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">RabbitMQ Event Pipeline</h3>
                <p className="text-slate-400 text-sm">Handling 10k+ daily events with 99.9% reliability</p>
            </div>

            <div className="relative max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] min-h-[400px]">
                {/* Connecting Lines (Absolute behind grid) */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" style={{ overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="grid-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                        {/* TL -> TR */}
                        <motion.path d="M 25% 25% L 75% 25%" stroke="url(#grid-flow)" strokeWidth="4" strokeDasharray="8 8" className="opacity-30" />
                        {/* TR -> BR */}
                        <motion.path d="M 75% 25% L 75% 75%" stroke="url(#grid-flow)" strokeWidth="4" strokeDasharray="8 8" className="opacity-30" />
                        {/* BR -> BL */}
                        <motion.path d="M 75% 75% L 25% 75%" stroke="url(#grid-flow)" strokeWidth="4" strokeDasharray="8 8" className="opacity-30" />
                        {/* BL -> TL (Loop) */}
                        <motion.path d="M 25% 75% L 25% 25%" stroke="url(#grid-flow)" strokeWidth="4" strokeDasharray="8 8" className="opacity-20" />

                        {/* Particles */}
                        <AnimatePresence>
                            {activeStep === 0 && <motion.circle r="6" fill="#60a5fa" initial={{ cx: "25%", cy: "25%" }} animate={{ cx: "75%", cy: "25%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />}
                            {activeStep === 1 && <motion.circle r="6" fill="#a855f7" initial={{ cx: "75%", cy: "25%" }} animate={{ cx: "75%", cy: "75%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />}
                            {activeStep === 2 && <motion.circle r="6" fill="#f97316" initial={{ cx: "75%", cy: "75%" }} animate={{ cx: "25%", cy: "75%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />}
                            {activeStep === 3 && <motion.circle r="6" fill="#10b981" initial={{ cx: "25%", cy: "75%" }} animate={{ cx: "25%", cy: "25%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />}
                        </AnimatePresence>
                    </svg>
                </div>

                {/* 2x2 Grid Container */}
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-8 p-4 relative z-10">
                    {/* 0: TL - User */}
                    <motion.div
                        className="flex flex-col items-center justify-center p-6 text-center"
                        animate={{ scale: activeStep === 0 ? 1.05 : 1, opacity: activeStep === 0 ? 1 : 0.7 }}
                    >
                        <div className={`p-4 rounded-xl mb-4 border transition-all duration-500 ${activeStep === 0 ? `${steps[0].bg} ${steps[0].borderColor} ${steps[0].shadow}` : 'bg-slate-800/50 border-white/5'}`}>
                            <Globe className={`w-8 h-8 ${steps[0].color}`} />
                        </div>
                        <h4 className="text-white font-semibold">{steps[0].title}</h4>
                        <p className="text-xs text-slate-400">{steps[0].desc}</p>
                    </motion.div>

                    {/* 1: TR - API */}
                    <motion.div
                        className="flex flex-col items-center justify-center p-6 text-center"
                        animate={{ scale: activeStep === 1 ? 1.05 : 1, opacity: activeStep === 1 ? 1 : 0.7 }}
                    >
                        <div className={`p-4 rounded-xl mb-4 border transition-all duration-500 ${activeStep === 1 ? `${steps[1].bg} ${steps[1].borderColor} ${steps[1].shadow}` : 'bg-slate-800/50 border-white/5'}`}>
                            <Server className={`w-8 h-8 ${steps[1].color}`} />
                        </div>
                        <h4 className="text-white font-semibold">{steps[1].title}</h4>
                        <p className="text-xs text-slate-400">{steps[1].desc}</p>
                    </motion.div>

                    {/* 3: BL - Worker (Order switched visually for grid flow: 0(TL)->1(TR)->2(BR)->3(BL)) 
                       Wait, Grid index: 0=TL, 1=TR, 2=BL, 3=BR. 
                       Flow: TL -> TR -> BR -> BL.
                       So nodes should be:
                       TL: User (0)
                       TR: API (1)
                       BR: Queue (2)
                       BL: Worker (3)
                    */}

                    {/* Grid cell 3 (Bottom Left) -> Worker */}
                    <motion.div
                        className="flex flex-col items-center justify-center p-6 text-center col-start-1 row-start-2"
                        animate={{ scale: activeStep === 3 ? 1.05 : 1, opacity: activeStep >= 3 ? 1 : 0.7 }}
                    >
                        <div className={`p-4 rounded-xl mb-4 border transition-all duration-500 ${activeStep === 3 ? `${steps[3].bg} ${steps[3].borderColor} ${steps[3].shadow}` : 'bg-slate-800/50 border-white/5'}`}>
                            <Database className={`w-8 h-8 ${steps[3].color}`} />
                        </div>
                        <h4 className="text-white font-semibold">{steps[3].title}</h4>
                        <p className="text-xs text-slate-400">{steps[3].desc}</p>
                    </motion.div>

                    {/* Grid cell 4 (Bottom Right) -> Queue */}
                    <motion.div
                        className="flex flex-col items-center justify-center p-6 text-center col-start-2 row-start-2"
                        animate={{ scale: activeStep === 2 ? 1.05 : 1, opacity: activeStep >= 2 ? 1 : 0.7 }}
                    >
                        <div className={`p-4 rounded-xl mb-4 border transition-all duration-500 ${activeStep === 2 ? `${steps[2].bg} ${steps[2].borderColor} ${steps[2].shadow}` : 'bg-slate-800/50 border-white/5'}`}>
                            <MessageSquare className={`w-8 h-8 ${steps[2].color}`} />
                        </div>
                        <h4 className="text-white font-semibold">{steps[2].title}</h4>
                        <p className="text-xs text-slate-400">{steps[2].desc}</p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default SystemArchitecture;
