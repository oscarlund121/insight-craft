'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-20 px-6 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Velkommen til InsightCraft</h1>
        <p className="text-lg md:text-xl mb-8">Få adgang til AI-genererede skabeloner og værktøjer, der styrker din forretning.</p>
        <div className="mb-8">
          <Image
            src="/images/hero-data-input-2.svg"
            alt="Illustration af digitale AI-værktøjer"
            width={400}
            height={200}
            loading="lazy"
            className="mx-auto rounded-xl shadow-lg"
          />
        </div>
        <a href="#newsletter" className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-200 transition">Tilmeld dig gratis</a>
      </div>
    </motion.section>
  );
}
