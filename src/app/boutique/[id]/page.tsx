"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/types";

// Données temporaires (seront remplacées par PocketBase)
const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Infini",
    description:
      "Une exploration de l'infini à travers les couleurs et les formes. Cette œuvre capture l'essence même de l'éternité, où chaque coup de pinceau représente un moment suspendu dans le temps. Les teintes chaudes se mêlent aux nuances plus froides pour créer une harmonie visuelle qui invite à la contemplation.",
    technique: "Acrylique sur toile",
    dimensions: "65 x 92 cm",
    price: 450,
    available: true,
    images: [
      "/images/placeholder-1.jpg",
      "/images/placeholder-1-detail.jpg",
      "/images/placeholder-1-context.jpg",
    ],
    category: "Portrait",
    year: 2024,
    created: "2024-01-15",
    updated: "2024-01-15",
  },
  {
    id: "2",
    title: "Vision",
    description:
      "Un regard vers l'intérieur, une quête de sens. Cette pièce explore les profondeurs de la perception humaine, où le visible et l'invisible se rencontrent. Les textures riches et les contrastes subtils évoquent une méditation sur la nature de la réalité.",
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
    description:
      "Le renouveau après la tempête, la lumière après l'obscurité. Cette œuvre symbolise la résilience de l'esprit humain et la beauté qui émerge des moments les plus sombres. Les couleurs vibrantes s'élèvent comme un phénix des cendres.",
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
    description:
      "L'énergie vitale qui nous anime tous. Une célébration de la force de vie qui circule en chacun de nous, représentée par des mouvements dynamiques et des couleurs énergiques qui semblent vibrer sur la toile.",
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
    description:
      "L'essence de l'humanité capturée sur toile. Un portrait qui va au-delà de la simple représentation physique pour toucher à l'âme du sujet. Chaque trait raconte une histoire, chaque ombre révèle une vérité.",
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
    description:
      "Un autoportrait de l'âme. Cette pièce introspective explore les couches multiples de l'identité, où le masque social rencontre le vrai soi. Une méditation visuelle sur ce que signifie être authentique.",
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
    description:
      "Le cercle de la vie, sans début ni fin. Une exploration de l'infini cyclique de l'existence, où la naissance et la mort, le début et la fin se rejoignent dans une danse éternelle.",
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
    description:
      "La tendresse dans le regard. Cette œuvre capture ce moment fugace où l'amour se lit dans les yeux, où la vulnérabilité devient force, où prendre soin de l'autre devient un acte d'art.",
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
    description:
      "Chaque fin est un nouveau commencement. Une méditation sur la transformation, où ce qui semble être une conclusion devient en réalité une ouverture vers de nouvelles possibilités.",
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

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement depuis PocketBase
    const found = mockArtworks.find((a) => a.id === params.id);
    if (found) {
      setArtwork(found);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="font-display text-2xl font-semibold mb-4">
          Œuvre non trouvée
        </h1>
        <p className="text-muted mb-8">
          Cette œuvre n&apos;existe pas ou a été retirée.
        </p>
        <Link
          href="/boutique"
          className="px-6 py-3 bg-primary text-white font-medium hover:bg-secondary transition-colors duration-300"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  // Trouver des œuvres similaires
  const similarArtworks = mockArtworks
    .filter((a) => a.id !== artwork.id && a.category === artwork.category)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-light">
        <div className="container-custom">
          <nav className="text-sm text-muted">
            <Link href="/" className="hover:text-accent transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link href="/boutique" className="hover:text-accent transition-colors">
              Boutique
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{artwork.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[4/5] relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">{artwork.title}</span>
                </div>
                {!artwork.available && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-red-500 text-white font-medium">
                      Vendu
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {artwork.images.length > 1 && (
                <div className="flex gap-4">
                  {artwork.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square w-20 relative bg-gray-100 transition-all duration-300 ${
                        selectedImage === index
                          ? "ring-2 ring-accent"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">{index + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="bg-white p-8 lg:p-10">
                {/* Category */}
                <span className="text-xs tracking-[0.3em] text-muted uppercase">
                  {artwork.category}
                </span>

                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-4">
                  {artwork.title}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-2xl font-semibold text-primary">
                    {artwork.price.toLocaleString("fr-FR")} €
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-medium text-sm uppercase tracking-wider mb-3">
                    Description
                  </h2>
                  <p className="text-secondary leading-relaxed">
                    {artwork.description}
                  </p>
                </div>

                {/* Details */}
                <div className="mb-8 space-y-4">
                  <h2 className="font-medium text-sm uppercase tracking-wider mb-3">
                    Détails de l&apos;œuvre
                  </h2>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted">Technique</span>
                      <p className="font-medium mt-1">{artwork.technique}</p>
                    </div>
                    <div>
                      <span className="text-muted">Dimensions</span>
                      <p className="font-medium mt-1">{artwork.dimensions}</p>
                    </div>
                    <div>
                      <span className="text-muted">Année</span>
                      <p className="font-medium mt-1">{artwork.year}</p>
                    </div>
                    <div>
                      <span className="text-muted">Disponibilité</span>
                      <p
                        className={`font-medium mt-1 ${
                          artwork.available ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {artwork.available ? "Disponible" : "Vendu"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  {artwork.available ? (
                    <>
                      <button
                        onClick={() => setShowContactForm(true)}
                        className="w-full px-8 py-4 bg-primary text-white font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
                      >
                        Acquérir cette œuvre
                      </button>
                      <Link
                        href="/contact"
                        className="block w-full px-8 py-4 border border-primary text-primary font-medium tracking-wide text-center hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        Poser une question
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4 bg-gray-100">
                      <p className="text-muted mb-2">
                        Cette œuvre a trouvé son nouveau foyer.
                      </p>
                      <Link
                        href="/contact"
                        className="text-accent hover:underline"
                      >
                        Demander une œuvre similaire
                      </Link>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Œuvre originale signée</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Certificat d&apos;authenticité inclus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Livraison soignée et sécurisée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Artworks */}
      {similarArtworks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="font-display text-2xl font-semibold mb-8">
              Œuvres similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarArtworks.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/boutique/${similar.id}`}
                  className="group"
                >
                  <article>
                    <div className="aspect-[4/5] relative overflow-hidden bg-light mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          {similar.title}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                    <span className="text-xs tracking-wider text-muted uppercase">
                      {similar.category}
                    </span>
                    <h3 className="font-display text-lg font-medium mt-1 group-hover:text-accent transition-colors duration-300">
                      {similar.title}
                    </h3>
                    <p className="text-primary font-medium mt-2">
                      {similar.price.toLocaleString("fr-FR")} €
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Purchase Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 p-2 text-muted hover:text-primary transition-colors"
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="font-display text-2xl font-semibold mb-2">
              Acquérir &ldquo;{artwork.title}&rdquo;
            </h2>
            <p className="text-muted mb-6">
              Remplissez ce formulaire pour réserver cette œuvre. Je vous
              contacterai rapidement pour finaliser la transaction.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  placeholder="Votre numéro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                  placeholder="Questions ou précisions..."
                />
              </div>

              <div className="bg-light p-4 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-muted">Œuvre</span>
                  <span className="font-medium">{artwork.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Prix</span>
                  <span className="font-semibold text-primary">
                    {artwork.price.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-white font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
              >
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
