'use client'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    // Removed Locomotive Scroll - was causing SSR issues and slow loading
    // Site works fine with CSS smooth scrolling
    return <>{children}</>;
}
