import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import ResumeModalWrapper from "@/components/ui/ResumeModalWrapper";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajbhoyar.dev"),
  title: "Raj Bhoyar | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Raj Bhoyar - Full Stack Developer specializing in Backend Development, AI/ML, and scalable systems. B.Tech CSE Graduate with expertise in Node.js, Python, and modern web technologies.",
  keywords: ["Full Stack Developer", "Software Developer", "AI/ML", "Python", "Node.js", "React", "Portfolio"],
  authors: [{ name: "Raj Bhoyar" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Raj Bhoyar | Full Stack Developer | AI Enthusiast",
    description: "Portfolio of Raj Bhoyar - Full Stack Developer specializing in Backend Development, AI/ML, and scalable systems.",
    url: "https://rajbhoyar.dev",
    siteName: "Raj Bhoyar Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raj Bhoyar | Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Raj Bhoyar - Full Stack Developer specializing in Backend Development, AI/ML, and scalable systems.",
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
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-xl z-50 font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to content
        </a>
        <ClientLayout>
          <ResumeModalWrapper />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
