"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function DesktopNav() {
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
    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800 relative">
      <Link href="/dashboard" className="hover:text-black transition">Platform</Link>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/tools" className="flex items-center gap-1 hover:text-black transition">
          Værktøjer <ChevronDown className="w-4 h-4" />
        </Link>

        {showDropdown && (
          <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
            <Link href="/tools" className="block px-4 py-3 text-sm hover:bg-gray-50 transition font-medium">Se alle værktøjer</Link>
            <Link href="/tools/newsletter-generator" className="block px-4 py-3 text-sm hover:bg-gray-50 transition">Nyhedsbrev Generator</Link>
            <Link href="/tools/seo-optimizer" className="block px-4 py-3 text-sm hover:bg-gray-50 transition">SEO-Optimering</Link>
            <Link href="/tools/social-media-helper" className="block px-4 py-3 text-sm hover:bg-gray-50 transition">SoMe Indhold</Link>
          </div>
        )}
      </div>

      <Link href="/pricing" className="hover:text-black transition">Priser</Link>
      <Link href="/profile" className="hover:text-black transition">Profil</Link>

      <SignedOut>
        <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
          <Button className="text-sm px-4 py-2">Start gratis</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  );
}
