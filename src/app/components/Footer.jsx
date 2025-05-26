import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 text-center text-sm">
      <div className="max-w-4xl mx-auto space-y-2">
        <p>Kontakt: kontakt@insightcraft.dk</p>
        <p>Betingelser & Privatlivspolitik</p>
        <p>CVR: 12345678</p>
        <p>&copy; {new Date().getFullYear()} InsightCraft. Alle rettigheder forbeholdes.</p>
      </div>
      <p className="text-xs text-gray-400 mt-2">Illustration anvendt med tilladelse fra <a href="https://storyset.com/" target="_blank" rel="noopener noreferrer" className="underline">Storyset</a></p>
    </footer>
  );
}