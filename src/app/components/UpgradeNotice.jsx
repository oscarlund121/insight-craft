"use client";

export default function UpgradeNotice() {
  return (
    <div className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="mb-2 font-medium">
        Din gratis prøveperiode er udløbet.
      </p>
      <p className="mb-4">
        Få ubegrænset adgang til alle ressourcer for kun <span className="font-semibold">49 kr./md</span>. Ingen binding.
      </p>
      <a
        href="https://buy.stripe.com/test_7sYcN585h3hQchkctkgMw00" // placeholder link
        target="_blank"
        className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Opgrader nu
      </a>
    </div>
  );
}
