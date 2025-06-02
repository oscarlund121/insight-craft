"use client";

import Link from "next/link";
import { SignedOut, SignedIn, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function MobileNav({ isOpen, onClose }) {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`md:hidden px-6 pb-4 space-y-2 text-sm text-gray-800 ${isOpen ? "block" : "hidden"}`}>
      <Link href="/platform" className="block py-2" onClick={handleClick}>Platform</Link>

      <details className="block">
        <summary className="py-2 cursor-pointer">Værktøjer</summary>
        <div className="pl-4 space-y-1">
          <Link href="/tools" className="block py-1" onClick={handleClick}>Se alle værktøjer</Link>
          <Link href="/tools/newsletter-generator" className="block py-1" onClick={handleClick}>Nyhedsbrev Generator</Link>
          <Link href="/tools/seo-optimizer" className="block py-1" onClick={handleClick}>SEO-Optimering</Link>
          <Link href="/tools/social-media-helper" className="block py-1" onClick={handleClick}>SoMe Indhold</Link>
        </div>
      </details>

      <Link href="/pricing" className="block py-2" onClick={handleClick}>Priser</Link>
      <Link href="/profile" className="block py-2" onClick={handleClick}>Profil</Link>

      <SignedOut>
        <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
          <Button onClick={handleClick} className="w-full mt-2">
            Start gratis
          </Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <div className="mt-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
}
