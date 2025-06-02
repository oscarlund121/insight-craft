'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-orange-50 via-pink-100 to-violet-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          pompus ai marketing
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          pompus ai er værktøj som er skabt til hjælpe dig med at generere marketingindhold med AI – hurtigt, klart og kompetent.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/pricing"
            className="bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Prøv gratis
          </a>
          <a
            href="#examples"
            className="border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
          >
            Se eksempler
          </a>
        </div>
      </motion.div>
    </section>
  );
}
