'use client';

import { useState } from "react";
import { Bookmark, BookmarkCheck, FileText } from "lucide-react";

const iconMap = {
  FileText,
};

export default function ResourcesSection({ 
  resources, 
  favorites, 
  toggleFavorite, 
  setModalResource,
  isTrialExpired 
}) {
  const [showAllResources, setShowAllResources] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [search, setSearch] = useState("");

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

  const displayedResources = showAllResources ? filteredResources : resources.slice(0, 6);

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Featured ressourcer
        </h2>
        <button 
          onClick={() => setShowAllResources(!showAllResources)}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
        >
          {showAllResources ? "Vis færre" : "Se alle"}
        </button>
      </div>

      {showAllResources && (
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Søg efter ressourcer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-3 text-sm rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-purple-100 border-2 border-purple-400 shadow-md text-purple-700"
                    : "bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {displayedResources.length === 0 ? (
        <p className="text-gray-600 text-center mt-20">
          {selectedCategory === "Favoritter"
            ? "Du har ikke gemt nogen favoritter endnu. Klik på bogmærke-ikonet for at tilføje."
            : "Ingen ressourcer fundet."}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {displayedResources.map((res, i) => {
            const Icon = iconMap[res.icon] || FileText;

            return (
              <div
                key={i}
                className="relative p-5 md:p-6 rounded-xl border border-purple-100 shadow-sm bg-white/80 hover:bg-purple-50 hover:shadow-lg transition-all duration-300 group"
              >
                <button
                  onClick={() => toggleFavorite(res.title)}
                  className="absolute top-3 right-3 text-purple-600 hover:text-pink-600 hover:scale-110 transition-all"
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
                    <Icon className="w-5 h-5 text-purple-600 group-hover:text-pink-600 transition-colors" />
                    <span className="text-sm text-gray-600">{res.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{res.title}</h3>
                  <p className="text-sm text-gray-600 leading-snug mb-2">{res.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    {res.tags?.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {res.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs"
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
    </section>
  );
}
