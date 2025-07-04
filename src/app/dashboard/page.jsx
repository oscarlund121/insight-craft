'use client';

import { useState, useEffect } from "react";
import { client } from "../../lib/sanity";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";
import UpgradeNotice from "../components/UpgradeNotice";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import AIToolsSection from "../components/dashboard/AIToolsSection";
import ResourcesSection from "../components/dashboard/ResourcesSection";
import ResourceModal from "../components/dashboard/ResourceModal";

function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - then.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function Dashboard() {
  const { user } = useUser();
  const [resources, setResources] = useState([]);
  const [modalResource, setModalResource] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const signupDate = user?.publicMetadata?.signupDate;
  const isTrialExpired = signupDate && daysSince(signupDate) > 7;

  useEffect(() => {
    if (user && !signupDate) {
      fetch("/api/set-signup-date", { method: "POST" });
    }
  }, [user, signupDate]);

  useEffect(() => {
    client
      .fetch(`*[_type == "resource"] | order(updated desc)`)
      .then((data) => setResources(data));

    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const toggleFavorite = (title) => {
    const updated = favorites.includes(title)
      ? favorites.filter((t) => t !== title)
      : [...favorites, title];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
            
            <DashboardHeader user={user} />

            {isTrialExpired && <UpgradeNotice />}

            <AIToolsSection isTrialExpired={isTrialExpired} />

            <ResourcesSection 
              resources={resources}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              setModalResource={setModalResource}
              isTrialExpired={isTrialExpired}
            />

          </div>

          <ResourceModal 
            modalResource={modalResource}
            setModalResource={setModalResource}
            isTrialExpired={isTrialExpired}
          />
        </main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
