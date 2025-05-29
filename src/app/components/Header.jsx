"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 200ms buffer så man kan flytte musen
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">
          InsightCraft
        </Link>

        <nav className="space-x-4 flex items-center relative">
          <Link href="/dashboard" className="text-sm text-gray-700 hover:text-black">
            Dashboard
          </Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-sm text-gray-700 hover:text-black flex items-center">
              Værktøjer <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                <Link href="/tools/newsletter-generator" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  Nyhedsbrev Generator
                </Link>
                <Link href="/tools/seo-optimizer" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  SEO-Optimering
                </Link>
                <Link href="/tools/social-media-helper" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  SoMe Indhold
                </Link>
                <Link href="/tools" className="block px-4 py-2 text-sm hover:bg-gray-50 border-t">
                  Se alle værktøjer
                </Link>
              </div>
            )}
          </div>

          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <button className="text-sm text-gray-700 hover:text-black">Log ind</button>
            </SignInButton>

            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <button className="text-sm text-white bg-gray-900 px-3 py-1 rounded hover:bg-black">
                Start gratis prøve
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
