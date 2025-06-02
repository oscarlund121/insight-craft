"use client";

import Link from "next/link";
import { SignedOut, SignUpButton } from "@clerk/nextjs";

export default function MobileNav({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="md:hidden px-6 pb-4 space-y-2 text-sm text-gray-800">
      <Link href="/platform" className="block py-2" onClick={handleClick}>Platform</Link>

      <details className="block">
        <summary className="py-2 cursor-pointer">Værktøjer</summary>
        <div className="pl-4 space-y-1">
          <Link href="/tools/newsletter-generator" className="block py-1" onClick={handleClick}>Nyhedsbrev Generator</Link>
          <Link href="/tools/seo-optimizer" className="block py-1" onClick={handleClick}>SEO-Optimering</Link>
          <Link href="/tools/social-media-helper" className="block py-1" onClick={handleClick}>SoMe Indhold</Link>
          <Link href="/tools" className="block py-1" onClick={handleClick}>Se alle værktøjer</Link>
        </div>
      </details>

      <Link href="/pricing" className="block py-2" onClick={handleClick}>Priser</Link>

      <SignedOut>
        <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
          {({ open }) => (
            <button
              onClick={() => {
                open();
                handleClick();
              }}
              className="w-full mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            >
              Start gratis
            </button>
          )}
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
