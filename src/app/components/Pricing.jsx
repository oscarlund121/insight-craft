"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-28 px-6"
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          En enkel pris. Ingen overraskelser.
        </h2>
        <p className="text-lg md:text-xl text-gray-700">
          Fuld adgang til alle værktøjer – for kun 49 kr./md.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl max-w-xl mx-auto p-10 text-left"
      >
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            De første 7 dage er gratis
          </span>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-900">49 kr./md</p>
          <p className="text-sm text-gray-500">
            Ubegrænset adgang · Ingen binding
          </p>
        </div>

        <ul className="space-y-4 text-sm text-gray-700 mb-8">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-1" />
            <span>Adgang til alle AI-værktøjer</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-1" />
            <span>Ugentlige skabeloner og opdateringer</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-1" />
            <span>Op til 5 aktive projekter</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-1" />
            <span>Eksportér og gem dine resultater</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-1" />
            <span>Prioriteret support</span>
          </li>
        </ul>

        <Link
          href="/dashboard"
          className="block w-full text-center bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition"
        >
          Start gratis prøve
        </Link>
      </motion.div>
    </motion.section>
  );
}
