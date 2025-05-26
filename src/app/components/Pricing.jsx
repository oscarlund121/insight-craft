'use client'

import React from 'react';
import { motion } from 'framer-motion';

export default function Pricing() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.9 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.6 }}
      className="bg-gray-100 text-gray-900 py-16 px-6 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Prisoversigt</h2>
        <p className="text-lg mb-6">Fuld adgang til alt indhold – ingen binding</p>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow inline-block"
        >
          <p className="text-2xl font-semibold mb-2">49 kr./md</p>
          <p className="text-sm text-gray-600">Få nye AI-ressourcer hver uge</p>
        </motion.div>
      </div>
    </motion.section>
  );
}