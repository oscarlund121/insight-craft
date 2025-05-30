'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Noget gik galt med betalingen.");
      }
    } catch (err) {
      console.error(err);
      alert("Der opstod en fejl.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
      >
        Priser
      </motion.h1>
      <p className="text-gray-600 mb-10 text-lg">
        Få adgang til alle AI-værktøjer – prøv gratis i 7 dage, ingen binding.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-xl mx-auto border"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">InsightCraft Pro</h2>
        <p className="text-gray-700 mb-6">49 kr./måned – efter 7 dages gratis prøve</p>

        <ul className="text-gray-700 text-left mb-6 space-y-3">
          <li className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" /> Ubegrænset adgang til alle værktøjer
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" /> SEO, nyhedsbrev & SoMe generatorer
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" /> Ingen binding, annullér når som helst
          </li>
        </ul>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Start gratis prøve
        </button>
      </motion.div>
    </main>
  );
}
