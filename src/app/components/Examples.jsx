'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Examples() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.8 }}
      className="bg-white text-gray-900 py-16 px-6 text-center"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Eksempler på AI-indhold</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2">Marketing-skabeloner</h3>
            <p>Kampagneplaner, sociale medieposts, e-mail flows</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2">Økonomirapporter</h3>
            <p>Indsigtsfulde rapporter med AI-genererede grafer og oversigter</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2">E-commerce tools</h3>
            <p>Produktbeskrivelser, SEO-tekster og performance-analyser</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}