  'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Fejl ved oprettelse af checkout-session');

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert('Noget gik galt. Prøv igen senere.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition flex items-center justify-center"
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {loading ? 'Sender...' : 'Opgrader til Pro'}
    </button>
  );
}
