'use client';

import dynamic from 'next/dynamic';

const ResumeModal = dynamic(() => import('./ResumeModal'), {
    ssr: false
});

export default function ResumeModalWrapper() {
    return <ResumeModal />;
}
