'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Music, GitCommit } from 'lucide-react';

const RealTimePulse = () => {
    const [status, setStatus] = useState('coding');
    const [time, setTime] = useState('');

    useEffect(() => {
        // Update time every minute
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
        };
        updateTime();
        const timer = setInterval(updateTime, 60000);

        // Cycle statuses
        const states = ['coding', 'music', 'system'];
        let i = 0;
        const statusTimer = setInterval(() => {
            i = (i + 1) % states.length;
            setStatus(states[i]);
        }, 5000);

        return () => {
            clearInterval(timer);
            clearInterval(statusTimer);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-40 hidden lg:flex"
        >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg">

                <AnimatePresence mode="wait">
                    {status === 'coding' && (
                        <motion.div
                            key="coding"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Status</span>
                                <span className="text-xs text-slate-300 font-medium">All Systems Operational</span>
                            </div>
                        </motion.div>
                    )}

                    {status === 'music' && (
                        <motion.div
                            key="music"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Music className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Vibe</span>
                                <span className="text-xs text-slate-300 font-medium">Lo-Fi Beats • Coding</span>
                            </div>
                        </motion.div>
                    )}

                    {status === 'system' && (
                        <motion.div
                            key="system"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <GitCommit className="w-3.5 h-3.5 text-blue-400" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Latest Push</span>
                                <span className="text-xs text-slate-300 font-medium">feat: Added RabbitMQ Visuals</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="h-6 w-px bg-white/10 mx-1" />
                <span className="text-xs text-slate-500 font-mono">{time}</span>
            </div>
        </motion.div>
    );
};

export default RealTimePulse;
