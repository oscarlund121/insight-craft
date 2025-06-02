'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import DesktopNav from './header/DesktopNav';
import AuthButtons from './header/AuthButtons';
import MobileNav from './header/MobileNav';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-gray-900"
        >
          <Image
            src="/images/ic-logo.png"
            alt="InsightCraft Logo"
            width={32}
            height={32}
          />
          InsightCraft
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <DesktopNav />
          <AuthButtons />
        </div>

        {/* Mobile nav toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-800"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} />
    </header>
  );
}
