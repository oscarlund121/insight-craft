'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Layers3 } from 'lucide-react';

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 py-28 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            En ny måde at lave marketing på
          </motion.h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            InsightCraft kombinerer kunstig intelligens med klar strategi – og leverer værktøjer der skaber resultater.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureBox
            icon={<Sparkles className="w-6 h-6 text-purple-600" />}
            title="Skabeloner der tænker for dig"
            description="Vælg et format, indtast et mål – og få content der virker, på få sekunder."
          />
          <FeatureBox
            icon={<Rocket className="w-6 h-6 text-indigo-600" />}
            title="Fart + frihed"
            description="Spar tid, slip for skriveblokering, og byg marketing der skalerer med dig."
          />
          <FeatureBox
            icon={<Layers3 className="w-6 h-6 text-blue-600" />}
            title="Flere værktøjer. Én platform."
            description="SEO-tekster, kampagneplaner, AI-billeder og meget mere – samlet ét sted."
          />
        </div>
      </div>

      {/* Subtil baggrundseffekt */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 via-transparent to-purple-100/10 pointer-events-none"></div>
    </motion.section>
  );
}

function FeatureBox({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-100 rounded-full p-2">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
