'use client'
import React from 'react';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from '@/components/interactions/Magnetic';
import KineticText from '@/components/interactions/KineticText';
import Parallax from '@/components/interactions/Parallax';

const ContactCTA = () => {
    return (
        <section data-scroll-section className="py-32 lg:py-40 relative overflow-hidden">
            {/* Subtle glow — centered with margins, not translate (framer's y transform would override translate classes) */}
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -ml-[300px] -mt-[300px] pointer-events-none">
                <Parallax range={[-40, 40]}>
                    <div
                        className="w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
                        style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.2) 0%, transparent 60%)' }}
                    />
                </Parallax>
            </div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >

                    {/* Headline - Simple, inviting */}
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        <KineticText text="Let's talk." />
                    </h2>

                    <p className="text-lg text-white/60 mb-12 max-w-md mx-auto">
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>

                    {/* Two CTAs - Primary and Secondary */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Magnetic>
                            <a
                                href="mailto:rajbhoyar729@gmail.com"
                                data-mascot-react="celebrate"
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4
                                         text-lg font-medium text-white
                                         bg-gradient-to-r from-[#0A84FF] to-[#5856D6] rounded-2xl
                                         overflow-hidden
                                         transition-all duration-300
                                         hover:shadow-[0_0_40px_rgba(10,132,255,0.4)]"
                            >
                                <Mail className="relative z-10 w-5 h-5" />
                                <span className="relative z-10">Get in Touch</span>
                                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                        </Magnetic>

                        <Magnetic>
                            <a
                                href="https://linkedin.com/in/raj-bhoyar-b597b416a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4
                                         text-lg font-medium text-white/70
                                         bg-white/5 border border-white/10 rounded-2xl
                                         overflow-hidden
                                         transition-all duration-300
                                         hover:bg-white/10 hover:text-white hover:border-white/20
                                         hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                            >
                                <Linkedin className="relative z-10 w-5 h-5" />
                                <span className="relative z-10">LinkedIn</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactCTA;
