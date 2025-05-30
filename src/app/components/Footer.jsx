'use client';

import React from 'react';
import Link from 'next/link';
import {
  Linkedin,
  Twitter,
  Instagram,
  Globe,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-purple-900 dark:bg-gray-900 text-white py-20 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand & kontakt */}
        <div>
          <h3 className="text-lg font-semibold mb-2">InsightCraft</h3>
          <p className="text-purple-200 dark:text-gray-300">
            AI-redskaber til selvstændige og små virksomheder.
          </p>
          <p className="mt-4 text-purple-300 dark:text-gray-400">CVR: 12345678</p>
          <p className="text-purple-300 dark:text-gray-400">kontakt@insightcraft.dk</p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-base font-semibold mb-2">Menu</h4>
          <ul className="space-y-2 text-purple-300 dark:text-gray-400">
            <li><Link href="/">Forside</Link></li>
            <li><Link href="/tools">Værktøjer</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        {/* Juridisk */}
        <div>
          <h4 className="text-base font-semibold mb-2">Juridisk</h4>
          <ul className="space-y-2 text-purple-300 dark:text-gray-400">
            <li><Link href="/privatliv">Privatlivspolitik</Link></li>
            <li><Link href="/betingelser">Betingelser</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright & SoMe */}
      <div className="mt-12 text-center">
        <p className="text-purple-400 dark:text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} InsightCraft. Alle rettigheder forbeholdes.
        </p>

        <div className="mt-10">
          <p className="text-sm text-purple-300 dark:text-gray-400 mb-3">Følg os</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://linkedin.com/company/insightcraft"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-purple-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition" />
            </a>
            <a
              href="https://twitter.com/insightcraft"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-purple-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition" />
            </a>
            <a
              href="https://instagram.com/insightcraft"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-purple-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition" />
            </a>
            <a
              href="https://insightcraft.dk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hjemmeside"
            >
              <Globe className="w-5 h-5 text-purple-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
