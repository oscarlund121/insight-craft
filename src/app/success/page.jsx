'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in?redirect_url=/success');
    }
  }, [isLoaded, isSignedIn]);

  if (!isSignedIn) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-emerald-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-full shadow-inner">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tilmelding gennemført
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Tak fordi du tilmeldte dig InsightCraft – du har nu adgang til alle AI-værktøjer!
        </p>

        <Link
          href="/dashboard"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Gå til platformen
        </Link>
      </motion.div>
    </main>
  );
}
