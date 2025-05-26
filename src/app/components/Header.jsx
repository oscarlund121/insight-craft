"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-lg font-bold text-gray-900">
          InsightCraft
        </a>
        <nav className="space-x-4 flex items-center">
          <a href="/dashboard" className="text-sm text-gray-700 hover:text-black">
            Dashboard
          </a>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <button className="text-sm text-gray-700 hover:text-black">
                Log ind
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
