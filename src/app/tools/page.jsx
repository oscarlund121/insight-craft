"use client";

import Link from "next/link";
import { Mail, Search, Megaphone } from "lucide-react";

const tools = [
  {
    title: "Nyhedsbrev Generator",
    description:
      "Få genereret engagerende nyhedsbreve baseret på din målgruppe og tilbud.",
    href: "/tools/newsletter-generator",
    icon: <Mail className="w-5 h-5 text-purple-700" />,
    bg: "bg-purple-50",
  },
  {
    title: "SEO-Optimering",
    description:
      "Forbedr dine sidetitler, metabeskrivelser og nøgleord med AI-hjælp.",
    href: "/tools/seo-optimizer",
    icon: <Search className="w-5 h-5 text-emerald-700" />,
    bg: "bg-emerald-50",
  },
  {
    title: "SoMe Indhold",
    description:
      "Lav forslag til posts til LinkedIn, Instagram og Facebook på få sekunder.",
    href: "/tools/social-media-helper",
    icon: <Megaphone className="w-5 h-5 text-yellow-600" />,
    bg: "bg-yellow-50",
  },
];

export default function ToolsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
        AI-værktøjer
      </h1>
      <p className="text-gray-700 mb-12 text-lg max-w-2xl">
        Brug vores værktøjer til at skabe tekster, optimere SEO og styrke din kommunikation med AI.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool, i) => (
          <Link
            key={i}
            href={tool.href}
            className={`${tool.bg} group p-6 rounded-2xl shadow-sm border border-transparent hover:shadow-md hover:border-gray-200 transition`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white p-2 rounded-full shadow">
                {tool.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:underline">
                {tool.title}
              </h2>
            </div>
            <p className="text-sm text-gray-700 group-hover:text-gray-900">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
