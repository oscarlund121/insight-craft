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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors duration-200"
        >
          <Image
            src="/images/ic-logo.png"
            alt="InsightCraft Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          InsightCraft
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <DesktopNav />
        </div>

        {/* Auth buttons - visible on both desktop and mobile */}
        <div className="flex items-center gap-3">
          <AuthButtons />
          
          {/* Mobile nav toggle - only visible on mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
