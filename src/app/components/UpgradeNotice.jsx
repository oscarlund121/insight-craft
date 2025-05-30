'use client';

export default function UpgradeNotice() {
  return (
    <div className="bg-red-100/80 border border-red-200 rounded-2xl p-6 text-center shadow-sm mb-10">
      <p className="text-base font-semibold text-red-700 mb-2">
        Din gratis prøveperiode er udløbet
      </p>
      <p className="text-sm text-red-600 mb-6">
        Få fuld adgang til alle værktøjer for kun <span className="font-bold">49 kr./md</span>. Ingen binding.
      </p>
      <a
        href="https://buy.stripe.com/test_7sYcN585h3hQchkctkgMw00"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-700 transition"
      >
        Opgrader nu
      </a>
    </div>
  );
}
