'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/ic-logo.png" alt="InsightCraft logo" className="h-8 w-auto" />
          <span className="text-xl font-extrabold tracking-tight text-gray-900">InsightCraft</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800 relative">
          <Link href="/dashboard" className="hover:text-black transition">Platform</Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 hover:text-black transition">
              Værktøjer <ChevronDown className="w-4 h-4" />
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                <Link href="/tools/newsletter-generator" className="block px-4 py-3 text-sm hover:bg-gray-50 transition">
                  Nyhedsbrev Generator
                </Link>
                <Link href="/tools/seo-optimizer" className="block px-4 py-3 text-sm hover:bg-gray-50 transition">
                  SEO-Optimering
                </Link>
                <Link href="/tools/social-media-helper" className="block px-4 py-3 text-sm hover:bg-gray-50 transition">
                  SoMe Indhold
                </Link>
                <Link href="/tools" className="block px-4 py-3 text-sm hover:bg-gray-50 border-t border-gray-100 transition">
                  Se alle værktøjer
                </Link>
              </div>
            )}
          </div>

          <Link href="/pricing" className="hover:text-black transition">Priser</Link>

          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <button className="text-sm hover:text-black">Log ind</button>
            </SignInButton>
            <SignInButton mode="modal" afterSignInUrl="/pricing">
              <button className="ml-2 text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition shadow">
                Start gratis
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        {/* Mobile nav toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-800">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 text-sm text-gray-800">
          <Link href="/platform" className="block py-2">Platform</Link>

          <details className="block">
            <summary className="py-2 cursor-pointer">Værktøjer</summary>
            <div className="pl-4 space-y-1">
              <Link href="/tools/newsletter-generator" className="block py-1">Nyhedsbrev Generator</Link>
              <Link href="/tools/seo-optimizer" className="block py-1">SEO-Optimering</Link>
              <Link href="/tools/social-media-helper" className="block py-1">SoMe Indhold</Link>
              <Link href="/tools" className="block py-1">Se alle værktøjer</Link>
            </div>
          </details>

          <Link href="/pricing" className="block py-2">Priser</Link>

          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <button className="w-full mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition">
                Start gratis
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
