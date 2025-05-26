'use client'

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://formspree.io/f/xkgrlkeg", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="bg-white text-gray-900 py-16 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Tilmeld dig nyhedsbrevet</h2>
        <p className="text-lg mb-6">Få adgang til gratis ressourcer og opdateringer hver uge</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              required
              placeholder="Din e-mailadresse"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Tilmeld
            </button>
          </form>
        ) : (
          <p className="text-green-600 text-lg font-medium">Tak for din tilmelding!</p>
        )}
      </div>
    </section>
  );
}