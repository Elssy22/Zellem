"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Données temporaires pour les œuvres (seront remplacées par PocketBase)
const artworks = [
  {
    id: "1",
    title: "Infini",
    slug: "infini",
  },
  {
    id: "2",
    title: "Vision",
    slug: "vision",
  },
  {
    id: "3",
    title: "Renaissance",
    slug: "renaissance",
  },
  {
    id: "4",
    title: "Énergie",
    slug: "energie",
  },
  {
    id: "5",
    title: "Human",
    slug: "human",
  },
  {
    id: "6",
    title: "Moi",
    slug: "moi",
  },
];

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation après le montage
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-[72px] min-h-screen bg-white">
      {/* Grille de projets - Style Novo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork, index) => (
          <Link
            key={artwork.id}
            href={`/boutique/${artwork.id}`}
            className={`group relative block overflow-hidden transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredId(artwork.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Placeholder gradient - À remplacer par les vraies images */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg,
                    hsl(${(index * 45) % 360}, 20%, 75%) 0%,
                    hsl(${(index * 45 + 40) % 360}, 15%, 82%) 50%,
                    hsl(${(index * 45 + 80) % 360}, 20%, 78%) 100%)`
                }}
              />

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                  hoveredId === artwork.id ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Titre centré sur l'image au hover */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  hoveredId === artwork.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-light tracking-[0.15em] text-center px-6">
                  {artwork.title}
                </h2>
              </div>
            </div>

            {/* Titre en dessous - visible uniquement sur mobile */}
            <div className="md:hidden py-6 px-[3vw] text-center border-b border-gray-100">
              <h2 className="text-base font-light tracking-[0.1em]">
                {artwork.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
