'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

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
            <button className="text-gray-300 hover:text-white">
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
