'use client';

import { useState } from 'react';

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-portal-session', {
        method: 'POST',
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe portal URL not found');
      }
    } catch (err) {
      console.error('Error creating Stripe portal session:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="mt-4 px-4 py-2 rounded bg-black text-white hover:bg-gray-900 transition disabled:opacity-50"
    >
      {loading ? 'Åbner...' : 'Administrer abonnement'}
    </button>
  );
}
