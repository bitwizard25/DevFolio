'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ZoomIn, ZoomOut } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ResumeModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState<number>(0);
    const [scale, setScale] = useState(1.0);

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

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

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

                            {/* Controls */}
                            <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1 border border-white/5 mx-auto">
                                <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"><ZoomOut className="w-4 h-4" /></button>
                                <span className="text-xs text-slate-400 w-12 text-center">{Math.round(scale * 100)}%</span>
                                <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"><ZoomIn className="w-4 h-4" /></button>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href="/raj.pdf"
                                    download="Raj_Bhoyar_Resume.pdf"
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

                        {/* PDF Body - Scrollable */}
                        <div className="flex-1 bg-slate-900/50 overflow-y-auto overflow-x-hidden p-6 sm:p-8 flex flex-col items-center gap-6">
                            <Document
                                file="/raj.pdf"
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="flex flex-col gap-6"
                                loading={
                                    <div className="flex items-center justify-center h-64 text-slate-400">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                                        Loading PDF...
                                    </div>
                                }
                                error={
                                    <div className="text-red-400 p-8 text-center bg-red-500/10 rounded-xl border border-red-500/20">
                                        Failed to load PDF. Please download it directly.
                                    </div>
                                }
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        scale={scale}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className="shadow-2xl border border-white/5"
                                    />
                                ))}
                            </Document>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
