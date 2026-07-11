import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";
import CommandMenu from "@/components/ui/CommandMenu";
import RealTimePulse from "@/components/ui/RealTimePulse";

/**
 * Chrome for every "classic" page (about/projects/contact/classic homepage): nav, footer,
 * the command palette, and the live-status widget. The OS root (`/`) deliberately does NOT
 * get this layout — Desktop.tsx is a full-screen shell with its own navigation (the Dock),
 * and mounting these here would either sit invisibly behind it or fight its own Lenis scroll-lock.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <CommandMenu />
      <RealTimePulse />
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
