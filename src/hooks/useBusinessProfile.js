import { useState, useEffect } from "react";

export function useBusinessProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("businessProfile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        setProfile(null);
      }
    }
  }, []);

  return { profile };
}
