"use client";

import Link from "next/link";
import { ChevronDown, Zap, Target, Share2, Mail } from "lucide-react";
import { useState, useRef } from "react";
import { SignedOut, SignUpButton } from "@clerk/nextjs";
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

  const tools = [
    {
      icon: Mail,
      title: "Nyhedsbrev Generator",
      description: "Opret engagerende nyhedsbreve med AI-assistance",
      href: "/tools/newsletter-generator"
    },
    {
      icon: Target,
      title: "SEO-Optimering",
      description: "Optimer dit indhold til søgemaskiner",
      href: "/tools/seo-optimizer"
    },
    {
      icon: Share2,
      title: "SoMe Indhold",
      description: "Generer indhold til sociale medier",
      href: "/tools/social-media-helper"
    },
    {
      icon: Zap,
      title: "Se alle værktøjer",
      description: "Udforsk vores komplette værktøjskasse",
      href: "/tools"
    }
  ];

  return (
    <nav className="hidden md:flex items-center gap-8 text-gray-700 relative">
      <Link href="/dashboard" className="font-medium hover:text-gray-900 transition-colors duration-200">Platform</Link>

      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/tools" className="flex items-center gap-1 font-medium hover:text-gray-900 transition-colors duration-200">
          Værktøjer 
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
        </Link>

        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-lg overflow-hidden transition-all duration-200 transform opacity-100 scale-100">
            <div className="grid grid-cols-2 gap-0">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={index}
                    href={tool.href}
                    className="p-4 hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 block"
                  >
                    <IconComponent className="w-8 h-8 mb-3 text-purple-600" />
                    <div className="font-semibold text-gray-900 mb-1">{tool.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{tool.description}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Link href="/pricing" className="font-medium hover:text-gray-900 transition-colors duration-200">Priser</Link>
      <Link href="/profile" className="font-medium hover:text-gray-900 transition-colors duration-200">Profil</Link>

      <SignedOut>
        <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
          <Button className="text-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg">Start gratis</Button>
        </SignUpButton>
      </SignedOut>
    </nav>
  );
}
