'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

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
    <section
      id="newsletter"
      className="bg-gradient-to-br from-purple-50 via-white to-emerald-50 py-28 px-6 border-t border-gray-100"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Tilmeld dig nyhedsbrevet
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Få nye AI-værktøjer og skabeloner direkte i din indbakke – helt gratis.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              required
              placeholder="Din e-mailadresse"
              className="flex-1 w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-black transition"
            >
              Tilmeld gratis
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-6 text-emerald-600">
            <CheckCircle className="w-8 h-8" />
            <p className="text-lg font-medium">Tak – du er nu tilmeldt!</p>
          </div>
        )}
      </div>
    </section>
  );
}
