'use client'
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled - Locomotive Scroll needs document
const SmoothScrollProvider = dynamic(
    () => import("@/components/SmoothScrollProvider"),
    { ssr: false }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SmoothScrollProvider>
            {children}
        </SmoothScrollProvider>
    );
}
