"use client";

import { useEffect, useState } from "react";

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

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 bg-gray-900 text-white text-sm p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between z-50">
      <p className="mb-2 sm:mb-0">Vi bruger cookies til at forbedre din oplevelse. Ved at fortsætte accepterer du vores brug af cookies.</p>
      <button onClick={acceptCookies} className="bg-white text-gray-900 px-4 py-2 rounded font-semibold">Accepter</button>
    </div>
  );
}