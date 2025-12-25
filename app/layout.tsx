import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Raj Bhoyar | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Raj Bhoyar - Full Stack Developer specializing in Backend Development, AI/ML, and scalable systems. B.Tech CSE Graduate with expertise in Node.js, Python, and modern web technologies.",
  keywords: ["Full Stack Developer", "Backend Developer", "AI/ML", "Python", "Node.js", "React", "Portfolio"],
  authors: [{ name: "Raj Bhoyar" }],
  openGraph: {
    title: "Raj Bhoyar | Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Raj Bhoyar - Full Stack Developer specializing in Backend Development, AI/ML, and scalable systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-900 text-slate-100 overflow-x-hidden`}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Background Effects */}
          <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-20" />
          <div className="fixed inset-0 bg-dot-pattern opacity-40 -z-10" />

          {/* Decorative Blobs */}
          <div className="fixed top-0 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-blob -z-10" />
          <div className="fixed top-1/3 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 -z-10" />
          <div className="fixed bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-blob animation-delay-4000 -z-10" />

          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
