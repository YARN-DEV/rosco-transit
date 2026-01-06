'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Logo and subtitle */}
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold text-white">ROSCO Network</h1>
            <p className="text-sm text-gray-400">Europe • Americas • Africa</p>
          </Link>

          {/* Center/Right side - Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === '/' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/routes"
              className={`transition-colors ${
                pathname === '/routes' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Routes
            </Link>
            <Link
              href="/quote"
              className={`transition-colors ${
                pathname === '/quote' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Get Quote
            </Link>
            <Link
              href="/tracking"
              className={`transition-colors ${
                pathname === '/tracking' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Track
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                pathname === '/contact' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>

            {/* Call-to-action button */}
            <Link
              href="/quote"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors px-4 py-2 rounded ${
                  pathname === '/' ? 'bg-slate-800 text-white font-semibold' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/routes"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors px-4 py-2 rounded ${
                  pathname === '/routes' ? 'bg-slate-800 text-white font-semibold' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Routes
              </Link>
              <Link
                href="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors px-4 py-2 rounded ${
                  pathname === '/quote' ? 'bg-slate-800 text-white font-semibold' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Get Quote
              </Link>
              <Link
                href="/tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors px-4 py-2 rounded ${
                  pathname === '/tracking' ? 'bg-slate-800 text-white font-semibold' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Track
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors px-4 py-2 rounded ${
                  pathname === '/contact' ? 'bg-slate-800 text-white font-semibold' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Contact
              </Link>
              <Link
                href="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center"
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
