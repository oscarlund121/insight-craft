'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full shadow-inner">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tilmelding annulleret
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Du har annulleret tilmeldingen. Du kan altid vende tilbage og få adgang til værktøjerne.
        </p>

        <Link
          href="/pricing"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Se priser
        </Link>
      </motion.div>
    </main>
  );
}
