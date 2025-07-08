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
      icon: Zap,
      title: "Se alle værktøjer",
      description: "Udforsk vores komplette værktøjskasse",
      href: "/tools",
      isMain: true
    },
    {
      icon: Mail,
      title: "Nyhedsbrev Generator",
      description: "Opret engagerende nyhedsbreve",
      href: "/tools/newsletter-generator"
    },
    {
      icon: Target,
      title: "SEO-Optimering",
      description: "Optimer til søgemaskiner",
      href: "/tools/seo-optimizer"
    },
    {
      icon: Share2,
      title: "SoMe Indhold",
      description: "Generer sociale medier indhold",
      href: "/tools/social-media-helper"
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
          <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-lg overflow-hidden transition-all duration-200 transform opacity-100 scale-100">
            {/* Hovedlink øverst */}
            <div className="border-b border-gray-100">
              {tools.filter(tool => tool.isMain).map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={index}
                    href={tool.href}
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-lg mr-3">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{tool.title}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{tool.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Individuelle værktøjer */}
            <div className="py-1">
              {tools.filter(tool => !tool.isMain).map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={index}
                    href={tool.href}
                    className="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-md mr-3">
                      <IconComponent className="w-3 h-3 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-xs">{tool.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{tool.description}</div>
                    </div>
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
