'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Audience() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-100 text-gray-900 py-16 px-6 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Hvem er det for?</h2>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          InsightCraft er lavet til dig, der ønsker at arbejde smartere – ikke hårdere.
        </p>
        <ul className="text-left max-w-xl mx-auto space-y-3 text-lg">
          <li>✅ Freelancere, der vil spare tid og levere mere værdi</li>
          <li>✅ Små virksomheder, der mangler ressourcer til egen marketing eller økonomi</li>
          <li>✅ E-handelsdrivende, der ønsker bedre struktur og indsigt</li>
        </ul>
      </div>
    </motion.section>
  );
}