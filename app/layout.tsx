import type { Metadata } from "next";
import  {Oswald}  from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";


const geistMono =Oswald({
  subsets: ["cyrillic"],
  weight: ["400", "700"],  // Regular and Bold weights
})

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "it is a portfolio of Raj Bhoyar a backend developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistMono} remove-scrollbar antialiased overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800`}
      >
      <div>
        <Navbar/>
        {children}
        <Footer/>
        </div>
      </body>
    </html>
  );
}
