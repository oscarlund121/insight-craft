'use client';

import { Mail, Search, Users } from "lucide-react";

export default function AIToolsSection({ isTrialExpired }) {
  const tools = [
    {
      name: "Newsletter Generator",
      description: "Generer professionelle nyhedsbreve",
      icon: Mail,
      href: "/tools/newsletter-generator",
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200"
    },
    {
      name: "SEO Optimizer", 
      description: "Optimer dit indhold til søgemaskiner",
      icon: Search,
      href: "/tools/seo-optimizer",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    },
    {
      name: "Social Media Helper",
      description: "Skab engaging sociale medier posts", 
      icon: Users,
      href: "/tools/social-media-helper",
      color: "bg-gradient-to-br from-white to-purple-50/30"
    }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        AI-værktøjer
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <a
              key={i}
              href={isTrialExpired ? "/opgrader" : tool.href}
              className={`
                p-5 md:p-6 rounded-xl border border-purple-100 shadow-sm
                bg-white/80 hover:bg-purple-50 hover:shadow-lg
                transition-all duration-300 group
                ${isTrialExpired ? "opacity-75 cursor-not-allowed" : ""}
              `}
              onClick={isTrialExpired ? (e) => e.preventDefault() : undefined}
            >
              <Icon className="w-8 h-8 text-purple-600 mb-4 group-hover:text-pink-600 transition-colors" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
              {isTrialExpired && (
                <p className="text-xs text-red-500 mt-2">Kræver opgradering</p>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}
