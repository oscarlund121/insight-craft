'use client';

import { useState, useEffect } from "react";
import {
  LogOut, X,
  Bookmark, BookmarkCheck,
  FileText, Zap, PenTool, Globe, BookOpen, BarChart2
} from "lucide-react";
import { client } from "../../lib/sanity";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";
import UpgradeNotice from "../components/UpgradeNotice";

const iconMap = {
  FileText,
  Zap,
  PenTool,
  Globe,
  BookOpen,
  BarChart2,
};

function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - then.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function Dashboard() {
  const { user } = useUser();
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [search, setSearch] = useState("");
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

  const categories = ["Alle", "Favoritter", ...new Set(resources.map((r) => r.category))];

  const filteredResources = resources.filter((r) => {
    const isFavorite = favorites.includes(r.title);
    const matchesCategory =
      selectedCategory === "Alle" ||
      (selectedCategory === "Favoritter" ? isFavorite : r.category === selectedCategory);
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ModalIcon = modalResource ? iconMap[modalResource.icon] : null;

  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-white text-gray-900 relative">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold">Dine AI-ressourcer</h1>
            </div>

            {isTrialExpired && <UpgradeNotice />}

            <input
              type="text"
              placeholder="Søg efter ressourcer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 mb-8"
            />

            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-full transition font-medium ${
                    selectedCategory === cat
                      ? "bg-purple-700 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredResources.length === 0 ? (
              <p className="text-gray-500 text-center mt-20">
                {selectedCategory === "Favoritter"
                  ? "Du har ikke gemt nogen favoritter endnu. Klik på bogmærke-ikonet for at tilføje."
                  : "Ingen ressourcer fundet."}
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {filteredResources.map((res, i) => {
                  const Icon = iconMap[res.icon] || FileText;
                  const isEven = i % 2 === 0;
                  const bgColor = isEven ? "bg-purple-50" : "bg-emerald-50";

                  return (
                    <div
                      key={i}
                      className={`relative p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-200 hover:border-gray-300 ${bgColor}`}
                    >
                      <button
                        onClick={() => toggleFavorite(res.title)}
                        className="absolute top-3 right-3 text-purple-600 hover:scale-110 transition"
                        aria-label="Gem som favorit"
                      >
                        {favorites.includes(res.title) ? (
                          <BookmarkCheck className="w-5 h-5 fill-purple-600" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => setModalResource(res)}
                        className="text-left block w-full"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-500">{res.category}</span>
                        </div>
                        <h2 className="font-semibold text-lg mb-1">{res.title}</h2>
                        <p className="text-sm text-gray-700 leading-snug mb-2">{res.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          {res.tags?.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {res.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="bg-white/60 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {res.updated && <span>Opdateret {res.updated}</span>}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {modalResource && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl max-w-md w-full p-8 relative border border-gray-100">
                <button
                  onClick={() => setModalResource(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                  aria-label="Luk"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  {ModalIcon && <ModalIcon className="w-5 h-5 text-gray-600" />}
                  <span className="text-sm text-gray-500">{modalResource.category}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">{modalResource.title}</h2>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{modalResource.description}</p>
                {isTrialExpired ? (
                  <p className="text-sm text-red-500">
                    Din gratis prøveperiode er udløbet.{" "}
                    <a href="/opgrader" className="underline">Opgrader for adgang</a>.
                  </p>
                ) : (
                  <a
                    href={modalResource.link}
                    target="_blank"
                    className="inline-block bg-purple-700 text-white px-5 py-2 rounded-xl font-medium hover:bg-purple-800 transition"
                  >
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          )}
        </main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
