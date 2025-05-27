"use client";

export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Opgrader din adgang</h1>
        <p className="mb-4 text-lg text-gray-700">
          Få ubegrænset adgang til alle AI-skabeloner og ressourcer for kun
          <span className="font-semibold"> 49 kr./md</span>. Ingen binding, afmeld når som helst.
        </p>
        <ul className="text-left mb-8 text-gray-600 list-disc list-inside">
          <li>Adgang til nye materialer hver uge</li>
          <li>Eksklusive værktøjer til marketing, økonomi og e-handel</li>
          <li>Prioriteret support</li>
        </ul>
        <a
          href="https://buy.stripe.com/test_7sYcN585h3hQchkctkgMw00"
          target="_blank"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Gå til betaling
        </a>
        <p className="mt-4 text-sm text-gray-500">Ingen betaling endnu – du kan stadig bruge din gratis prøveperiode.</p>
      </div>
    </main>
  );
}
