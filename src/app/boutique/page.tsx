"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/types";

// Données temporaires (seront remplacées par PocketBase)
const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Infini",
    description: "Une exploration de l'infini à travers les couleurs et les formes.",
    technique: "Acrylique sur toile",
    dimensions: "65 x 92 cm",
    price: 450,
    available: true,
    images: ["/images/placeholder-1.jpg"],
    category: "Portrait",
    year: 2024,
    created: "2024-01-15",
    updated: "2024-01-15",
  },
  {
    id: "2",
    title: "Vision",
    description: "Un regard vers l'intérieur, une quête de sens.",
    technique: "Huile sur toile",
    dimensions: "50 x 70 cm",
    price: 380,
    available: true,
    images: ["/images/placeholder-2.jpg"],
    category: "Portrait",
    year: 2024,
    created: "2024-02-20",
    updated: "2024-02-20",
  },
  {
    id: "3",
    title: "Renaissance",
    description: "Le renouveau après la tempête, la lumière après l'obscurité.",
    technique: "Technique mixte",
    dimensions: "80 x 100 cm",
    price: 620,
    available: true,
    images: ["/images/placeholder-3.jpg"],
    category: "Abstrait",
    year: 2023,
    created: "2023-11-10",
    updated: "2023-11-10",
  },
  {
    id: "4",
    title: "Énergie",
    description: "L'énergie vitale qui nous anime tous.",
    technique: "Acrylique sur toile",
    dimensions: "60 x 80 cm",
    price: 420,
    available: false,
    images: ["/images/placeholder-4.jpg"],
    category: "Abstrait",
    year: 2023,
    created: "2023-09-05",
    updated: "2023-09-05",
  },
  {
    id: "5",
    title: "Human",
    description: "L'essence de l'humanité capturée sur toile.",
    technique: "Huile sur toile",
    dimensions: "70 x 90 cm",
    price: 550,
    available: true,
    images: ["/images/placeholder-5.jpg"],
    category: "Portrait",
    year: 2024,
    created: "2024-03-12",
    updated: "2024-03-12",
  },
  {
    id: "6",
    title: "Moi",
    description: "Un autoportrait de l'âme.",
    technique: "Acrylique sur toile",
    dimensions: "55 x 75 cm",
    price: 390,
    available: true,
    images: ["/images/placeholder-6.jpg"],
    category: "Portrait",
    year: 2024,
    created: "2024-04-01",
    updated: "2024-04-01",
  },
  {
    id: "7",
    title: "O",
    description: "Le cercle de la vie, sans début ni fin.",
    technique: "Technique mixte",
    dimensions: "100 x 100 cm",
    price: 750,
    available: true,
    images: ["/images/placeholder-7.jpg"],
    category: "Abstrait",
    year: 2024,
    created: "2024-05-15",
    updated: "2024-05-15",
  },
  {
    id: "8",
    title: "Care",
    description: "La tendresse dans le regard.",
    technique: "Huile sur toile",
    dimensions: "45 x 60 cm",
    price: 320,
    available: true,
    images: ["/images/placeholder-8.jpg"],
    category: "Portrait",
    year: 2023,
    created: "2023-08-20",
    updated: "2023-08-20",
  },
  {
    id: "9",
    title: "Welcome to the End",
    description: "Chaque fin est un nouveau commencement.",
    technique: "Acrylique sur toile",
    dimensions: "90 x 120 cm",
    price: 880,
    available: true,
    images: ["/images/placeholder-9.jpg"],
    category: "Abstrait",
    year: 2024,
    created: "2024-06-01",
    updated: "2024-06-01",
  },
];

const categories = ["Tous", "Portrait", "Abstrait"];
const techniques = ["Toutes", "Acrylique sur toile", "Huile sur toile", "Technique mixte"];

export default function BoutiquePage() {
  const [artworks, setArtworks] = useState<Artwork[]>(mockArtworks);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(mockArtworks);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedTechnique, setSelectedTechnique] = useState("Toutes");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("date_desc");

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...artworks];

    // Filtre par catégorie
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }

    // Filtre par technique
    if (selectedTechnique !== "Toutes") {
      filtered = filtered.filter((a) => a.technique === selectedTechnique);
    }

    // Filtre disponibilité
    if (showAvailableOnly) {
      filtered = filtered.filter((a) => a.available);
    }

    // Tri
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "date_asc":
        filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
        break;
      case "date_desc":
        filtered.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredArtworks(filtered);
  }, [artworks, selectedCategory, selectedTechnique, showAvailableOnly, sortBy]);

  // Animation au scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredArtworks]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] text-muted uppercase animate-fade-in">
              Galerie
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 animate-slide-up">
              Boutique
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto animate-slide-up stagger-1">
              Découvrez mes créations et trouvez l&apos;œuvre qui résonnera avec
              votre âme.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === cat
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-secondary hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Additional filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Technique filter */}
              <select
                value={selectedTechnique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="px-4 py-2 text-sm bg-gray-100 border-none focus:ring-2 focus:ring-accent"
              >
                {techniques.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>

              {/* Available only */}
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                Disponibles uniquement
              </label>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-sm bg-gray-100 border-none focus:ring-2 focus:ring-accent"
              >
                <option value="date_desc">Plus récentes</option>
                <option value="date_asc">Plus anciennes</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="title">Alphabétique</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted">
            {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? "s" : ""}{" "}
            {selectedCategory !== "Tous" && `dans ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {filteredArtworks.length > 0 ? (
            <div className="masonry-grid">
              {filteredArtworks.map((artwork, index) => (
                <Link
                  key={artwork.id}
                  href={`/boutique/${artwork.id}`}
                  className={`masonry-item group reveal-on-scroll opacity-0`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <article className="relative bg-white">
                    {/* Image Container */}
                    <div
                      className="relative overflow-hidden bg-light"
                      style={{
                        aspectRatio: index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/5" : "1/1",
                      }}
                    >
                      {/* Placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">{artwork.title}</span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-4 py-2 bg-white text-primary text-sm font-medium">
                            Voir l&apos;œuvre
                          </span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {!artwork.available && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium">
                            Vendu
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <span className="text-xs tracking-wider text-muted uppercase">
                        {artwork.category}
                      </span>
                      <h3 className="font-display text-lg font-medium mt-1 group-hover:text-accent transition-colors duration-300">
                        {artwork.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted">{artwork.technique}</span>
                        <span className="font-medium text-primary">
                          {artwork.price.toLocaleString("fr-FR")} €
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted text-lg">Aucune œuvre ne correspond à vos critères.</p>
              <button
                onClick={() => {
                  setSelectedCategory("Tous");
                  setSelectedTechnique("Toutes");
                  setShowAvailableOnly(false);
                }}
                className="mt-4 text-accent hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-light">
        <div className="container-custom text-center">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Vous cherchez quelque chose de spécifique ?
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-8">
            Je réalise également des commandes personnalisées. Contactez-moi pour
            discuter de votre projet.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-white font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
          >
            Demander une commande personnalisée
          </Link>
        </div>
      </section>
    </>
  );
}
