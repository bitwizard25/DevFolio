'use client'

import dynamic from 'next/dynamic';
import { MotionConfig } from 'framer-motion';
import { MouseProvider } from '@/components/providers/MouseProvider';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const NinjaMascot = dynamic(() => import('@/components/mascot/NinjaMascot'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <MouseProvider>
                <SmoothScrollProvider>
                    {children}
                    <NinjaMascot />
                </SmoothScrollProvider>
            </MouseProvider>
        </MotionConfig>
    );
}
