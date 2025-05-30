'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieNotice() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookieAccepted");
    if (hasAccepted) setAccepted(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", true);
    setAccepted(true);
  };

  return (
    <AnimatePresence>
      {!accepted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 inset-x-4 bg-gray-900 text-white text-sm md:text-base p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 z-50"
        >
          <p className="text-center md:text-left leading-snug">
            Vi bruger cookies til at forbedre din oplevelse. Ved at fortsætte accepterer du vores brug af cookies.
          </p>
          <button
            onClick={acceptCookies}
            className="bg-white text-gray-900 px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Accepter
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
