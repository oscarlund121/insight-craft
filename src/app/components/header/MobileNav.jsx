"use client";

import Link from "next/link";
import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Mail, Target, Share2, Zap } from "lucide-react";

export default function MobileNav({ isOpen, onClose }) {
  const handleClick = () => {
    if (onClose) onClose();
  };

  const tools = [
    {
      icon: Zap,
      title: "Se alle værktøjer",
      href: "/tools",
      isMain: true
    },
    {
      icon: Mail,
      title: "Nyhedsbrev Generator",
      href: "/tools/newsletter-generator"
    },
    {
      icon: Target,
      title: "SEO-Optimering",
      href: "/tools/seo-optimizer"
    },
    {
      icon: Share2,
      title: "SoMe Indhold",
      href: "/tools/social-media-helper"
    }
  ];

  return (
    <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200/50 backdrop-blur-lg transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
      <div className="px-6 py-4 space-y-2">
        <Link 
          href="/platform" 
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50/50 font-medium transition-colors duration-200 rounded-lg px-3" 
          onClick={handleClick}
        >
          Platform
        </Link>

        <details className="block">
          <summary className="py-3 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-3 rounded-lg hover:bg-gray-50/50">
            Værktøjer
          </summary>
          <div className="mt-2 border-t border-gray-100 pt-2">
            {/* Hovedlink øverst */}
            {tools.filter(tool => tool.isMain).map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link 
                  key={index}
                  href={tool.href} 
                  className="flex items-center gap-3 py-2.5 text-gray-700 hover:text-gray-900 transition-colors duration-200 px-3 rounded-lg hover:bg-gray-50/50 border-b border-gray-100 mb-2 pb-3" 
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-purple-600 rounded-lg">
                    <IconComponent className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">{tool.title}</span>
                </Link>
              );
            })}
            
            {/* Individuelle værktøjer */}
            {tools.filter(tool => !tool.isMain).map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link 
                  key={index}
                  href={tool.href} 
                  className="flex items-center gap-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 rounded-lg hover:bg-gray-50/50 text-sm" 
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-center w-5 h-5 bg-gray-100 rounded-md">
                    <IconComponent className="w-3 h-3 text-purple-600" />
                  </div>
                  <span>{tool.title}</span>
                </Link>
              );
            })}
          </div>
        </details>

        <Link 
          href="/pricing" 
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50/50 font-medium transition-colors duration-200 rounded-lg px-3" 
          onClick={handleClick}
        >
          Priser
        </Link>
        
        <Link 
          href="/profile" 
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50/50 font-medium transition-colors duration-200 rounded-lg px-3" 
          onClick={handleClick}
        >
          Profil
        </Link>

        <SignedOut>
          <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
            <Button 
              onClick={handleClick} 
              className="w-full mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            >
              Start gratis
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
}
