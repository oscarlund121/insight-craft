"use client";

import { useEffect, useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (err) {
        console.error("Kunne ikke parse profil fra localStorage", err);
      }
    }
  }, []);

  return profile;
}
