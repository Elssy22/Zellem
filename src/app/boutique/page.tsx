"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { artworks as allArtworks } from "@/data/artworks";

export default function BoutiquePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-[160px] min-h-screen bg-white">
      {/* Titre de la page */}
      <div className="px-[3vw] pb-8">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.1em]">
          Boutique
        </h1>
      </div>

      {/* Barre de filtres / info */}
      <div className="px-[3vw] pb-6 flex items-center justify-between border-b border-gray-100">
        <div className="text-sm text-gray-500">
          {allArtworks.length} œuvres
        </div>
      </div>

      {/* Grille de produits - Style e-commerce */}
      <div className="px-[3vw] py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {allArtworks.map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/boutique/${artwork.id}`}
              className={`group block transition-all duration-500 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 mb-3">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Badge disponibilité */}
                {artwork.available === false && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs tracking-wide">
                      Vendu
                    </span>
                  </div>
                )}
              </div>

              {/* Info produit */}
              <div>
                <h2 className="text-sm font-normal text-gray-900 leading-tight mb-1 group-hover:text-gray-600 transition-colors">
                  {artwork.title}
                </h2>
                {artwork.price && (
                  <p className="text-sm text-gray-500">
                    {artwork.price.toLocaleString("fr-FR")} €
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <section className="py-16 px-[3vw] text-center border-t border-gray-100 mt-8">
        <h2 className="text-xl font-light tracking-[0.1em] mb-4">
          Vous cherchez quelque chose de spécifique ?
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">
          Je réalise également des commandes personnalisées. Contactez-moi pour
          discuter de votre projet.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 border border-black text-sm tracking-[0.1em] hover:bg-black hover:text-white transition-all duration-300"
        >
          Me contacter
        </Link>
      </section>
    </main>
  );
}
