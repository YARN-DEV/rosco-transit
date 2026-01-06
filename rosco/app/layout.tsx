import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Modern sans-serif font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROSCO Network - International Shipping Solutions",
  description: "Ship goods between Europe, North America, South America & Africa. Compare routes, get estimates, and track cargo in one portal.",
  keywords: ["shipping", "freight", "logistics", "international shipping", "cargo tracking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-900 text-slate-100 min-h-screen flex flex-col`}
      >
        {/* Global Navbar - appears on every page */}
        <Navbar />
        
        {/* Full-width background with consistent styling */}
        <div className="w-full flex-1 flex flex-col">
          {/* All pages wrapped with consistent structure */}
          {children}
        </div>
        
        {/* Global Footer - appears on every page */}
        <Footer />
      </body>
    </html>
  );
}
