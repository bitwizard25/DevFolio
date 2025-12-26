import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Raj Bhoyar | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Raj Bhoyar - Full Stack Developer specializing in Backend Development, AI/ML, and scalable systems. B.Tech CSE Graduate with expertise in Node.js, Python, and modern web technologies.",
  keywords: ["Full Stack Developer", "Software Developer", "AI/ML", "Python", "Node.js", "React", "Portfolio"],
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
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
