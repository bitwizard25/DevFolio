'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink } from 'lucide-react';
import { useLenis } from '@/components/SmoothScrollProvider';
import { resume } from '@/lib/site';

const ResumeModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { lenis } = useLenis();

    // Lock page scroll behind the overlay while open
    useEffect(() => {
        if (!lenis) return;
        if (isOpen) lenis.stop();
        else lenis.start();
        return () => lenis.start();
    }, [isOpen, lenis]);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-resume-modal', handleOpen);
        return () => window.removeEventListener('open-resume-modal', handleOpen);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl h-[90vh] bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a1a] z-10 w-full flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <FileText className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="hidden sm:block">
                                    <h3 className="text-white font-semibold">Resume Preview</h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href={resume.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Open in Drive
                                </a>
                                <a
                                    href={resume.downloadUrl}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-medium text-black bg-white rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </a>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Body — Google Drive's embeddable preview (has its own zoom/page controls) */}
                        <div data-lenis-prevent className="flex-1 bg-slate-900/50">
                            <iframe
                                src={resume.previewUrl}
                                title="Raj Bhoyar — Resume"
                                className="w-full h-full border-0"
                                allow="autoplay"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
