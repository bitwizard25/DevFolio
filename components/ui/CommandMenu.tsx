'use client'
import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, Home, Code2, Briefcase, Mail, FileText, Github, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandMenu = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-xl"
                    >
                        <Command className="w-full" loop>
                            <div className="flex items-center border-b border-white/10 px-4">
                                <Search className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 text-white disabled:cursor-not-allowed disabled:opacity-50"
                                    autoFocus
                                />
                            </div>
                            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                                <Command.Empty className="py-6 text-center text-sm text-slate-500">
                                    No results found.
                                </Command.Empty>

                                <Command.Group heading="Navigation" className="text-xs font-medium text-slate-500 mb-2 px-2">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/'))}
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Home className="mr-2 h-4 w-4" />
                                        <span>Home</span>
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/#projects'))}
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Code2 className="mr-2 h-4 w-4" />
                                        <span>Projects</span>
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/about'))}
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        <span>About & Experience</span>
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/contact'))}
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Mail className="mr-2 h-4 w-4" />
                                        <span>Contact</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Separator className="my-1 h-px bg-white/10" />

                                <Command.Group heading="Social & Links" className="text-xs font-medium text-slate-500 my-2 px-2">
                                    <Command.Item
                                        onSelect={() => runCommand(() => window.open('https://github.com/rajbhoyar729', '_blank'))}
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Github className="mr-2 h-4 w-4" />
                                        <span>GitHub</span>
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => window.dispatchEvent(new CustomEvent('open-resume-modal')))}
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>View Resume</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Separator className="my-1 h-px bg-white/10" />

                                <Command.Group heading="System" className="text-xs font-medium text-slate-500 my-2 px-2">
                                    <Command.Item
                                        className="flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-400 cursor-not-allowed opacity-50"
                                    >
                                        <Laptop className="mr-2 h-4 w-4" />
                                        <span>Toggle Theme (Dark Mode Active)</span>
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>

                            <div className="border-t border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500">
                                <span>Navigation</span>
                                <div className="flex gap-2">
                                    <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">↑</span>
                                    <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">↓</span>
                                    <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">↵</span>
                                </div>
                            </div>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandMenu;
