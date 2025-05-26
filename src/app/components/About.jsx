'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.8 }}
      className="bg-white text-gray-800 py-16 px-6 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Hvad er InsightCraft?</h2>
        <p className="text-lg md:text-xl leading-relaxed">
          InsightCraft er en digital abonnementsplatform, der leverer AI-genereret indhold direkte til dig.
          Få adgang til professionelle skabeloner, rapporter og arbejdsredskaber – udviklet specielt til freelancere og små virksomheder
          inden for marketing, økonomi og e-handel.
        </p>
      </div>
    </motion.section>
  );
}
