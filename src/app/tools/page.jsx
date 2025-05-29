"use client";

import Link from "next/link";
import { Mail, Search, Megaphone } from "lucide-react";

const tools = [
  {
    title: "Nyhedsbrev Generator",
    description:
      "Få genereret engagerende nyhedsbreve baseret på din målgruppe og tilbud.",
    href: "/tools/newsletter-generator",
    icon: <Mail className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "SEO-Optimering",
    description:
      "Forbedr dine sidetitler, metabeskrivelser og nøgleord med AI-hjælp.",
    href: "/tools/seo-optimizer",
    icon: <Search className="w-5 h-5 text-gray-600" />,
  },
  {
    title: "SoMe Indhold",
    description:
      "Lav forslag til posts til LinkedIn, Instagram og Facebook på få sekunder.",
    href: "/tools/social-media-helper",
    icon: <Megaphone className="w-5 h-5 text-gray-600" />,
  },
];

export default function ToolsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">
        AI-værktøjer
      </h1>
      <p className="text-gray-600 mb-10 text-lg max-w-2xl">
        Brug vores smarte værktøjer til at generere tekster, optimere din
        kommunikation og spare tid i din markedsføring.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool, i) => (
          <Link
            key={i}
            href={tool.href}
            className="group p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-2">
              {tool.icon}
              <h2 className="text-lg font-semibold text-gray-900 group-hover:underline">
                {tool.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 group-hover:text-gray-800">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
