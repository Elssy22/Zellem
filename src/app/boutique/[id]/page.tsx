"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";
import { useCart } from "@/context/CartContext";
import { usePocketBaseUrl } from "@/hooks/usePocketBaseUrl";

interface Artwork {
  id: string;
  collectionId: string;
  title: string;
  slug?: string;
  images: string | string[];
  description?: string;
  technique?: string;
  dimensions?: string;
  year?: number;
  price?: number;
  available?: boolean;
  category?: string;
  tags?: string[];
}

export default function ArtworkDetailPage() {
  const params = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [similarArtworks, setSimilarArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, items } = useCart();
  const pbUrl = usePocketBaseUrl();

  useEffect(() => {
    const fetchArtwork = async () => {
      const pb = getPocketBase();

      try {
        // Récupérer l'œuvre par son ID
        const record = await pb.collection("artworks").getOne(params.id as string);
        const artworkData = record as unknown as Artwork;
        setArtwork(artworkData);

        // Récupérer des œuvres similaires (autres œuvres)
        try {
          const similarRecords = await pb.collection("artworks").getList(1, 3, {
            filter: `id != "${params.id}"`,
            sort: "title",
          });
          setSimilarArtworks(similarRecords.items as unknown as Artwork[]);
        } catch (error) {
          console.error("Erreur lors du chargement des œuvres similaires:", error);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'œuvre:", error);
        setArtwork(null);
      }

      setIsLoading(false);
    };

    if (params.id) {
      fetchArtwork();
    }
  }, [params.id]);

  // Mise à jour des métadonnées SEO
  useEffect(() => {
    if (artwork) {
      // Mettre à jour le titre
      document.title = `${artwork.title} | Zellem Art`;

      // Mettre à jour ou créer les meta tags
      const updateMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attr}="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attr, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
      const image = Array.isArray(artwork.images) ? artwork.images[0] : artwork.images;
      const imageUrl = `${pbUrl}/api/files/${artwork.collectionId}/${artwork.id}/${image}`;

      // Description
      const description = artwork.description
        ? artwork.description.substring(0, 160)
        : `${artwork.title} - Œuvre originale par Zellem. ${artwork.technique || ''} ${artwork.dimensions || ''}`.trim();
      updateMeta('description', description);

      // Keywords (tags)
      if (artwork.tags && artwork.tags.length > 0) {
        updateMeta('keywords', artwork.tags.join(', '));
      }

      // Open Graph
      updateMeta('og:title', `${artwork.title} | Zellem Art`, true);
      updateMeta('og:description', description, true);
      updateMeta('og:type', 'product', true);
      updateMeta('og:image', imageUrl, true);

      // Twitter Card
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', `${artwork.title} | Zellem Art`);
      updateMeta('twitter:description', description);
      updateMeta('twitter:image', imageUrl);
    }
  }, [artwork]);

  const getImageUrl = useCallback((art: Artwork) => {
    const image = Array.isArray(art.images) ? art.images[0] : art.images;
    return `${pbUrl}/api/files/${art.collectionId}/${art.id}/${image}`;
  }, [pbUrl]);

  // Adapter l'artwork pour le panier (compatibilité avec CartContext)
  const getCartArtwork = (art: Artwork) => ({
    id: art.id,
    title: art.title,
    slug: art.slug || art.id,
    image: getImageUrl(art),
    description: art.description,
    technique: art.technique,
    dimensions: art.dimensions,
    year: art.year,
    price: art.price,
    available: art.available,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[160px]">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[160px]">
        <h1 className="text-2xl font-light tracking-[0.1em] mb-4">
          Œuvre non trouvée
        </h1>
        <p className="text-gray-500 mb-8">
          Cette œuvre n&apos;existe pas ou a été retirée.
        </p>
        <Link
          href="/boutique"
          className="px-6 py-3 border border-black text-sm tracking-[0.1em] hover:bg-black hover:text-white transition-all duration-300"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-[160px] min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-[3vw] pb-8">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-black transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/boutique" className="hover:text-black transition-colors">
            Boutique
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{artwork.title}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="px-[3vw] pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
            <Image
              src={getImageUrl(artwork)}
              alt={artwork.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              unoptimized
            />
            {artwork.available === false && (
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-black/70 text-white text-sm tracking-wide">
                  Vendu
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-[200px] lg:self-start">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.05em] mb-8">
              {artwork.title}
            </h1>

            {/* Description */}
            {artwork.description && (
              <div className="mb-4">
                <p className="text-gray-600 leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Price below description */}
            {artwork.price && (
              <div className="mb-8">
                <p className="text-2xl font-bold">
                  {artwork.price.toLocaleString("fr-FR")} €
                </p>
              </div>
            )}

            {/* Details */}
            <div className="mb-8 py-6 border-t border-b border-gray-200">
              <div className="grid grid-cols-2 gap-6 text-sm">
                {artwork.technique && (
                  <div>
                    <span className="text-gray-400 block mb-1">Technique</span>
                    <p className="font-medium">{artwork.technique}</p>
                  </div>
                )}
                {artwork.dimensions && (
                  <div>
                    <span className="text-gray-400 block mb-1">Dimensions</span>
                    <p className="font-medium">{artwork.dimensions}</p>
                  </div>
                )}
                {artwork.year && (
                  <div>
                    <span className="text-gray-400 block mb-1">Année</span>
                    <p className="font-medium">{artwork.year}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 block mb-1">Disponibilité</span>
                  <p className={`font-medium ${artwork.available !== false ? "text-green-600" : "text-red-500"}`}>
                    {artwork.available !== false ? "Disponible" : "Vendu"}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              {artwork.available !== false ? (
                <>
                  {items.some((item) => item.artwork.id === artwork.id) ? (
                    <div className="w-full px-8 py-4 bg-gray-100 text-gray-600 text-sm tracking-[0.1em] text-center">
                      Déjà dans votre panier
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(getCartArtwork(artwork))}
                      className="w-full px-8 py-4 bg-black text-white text-sm tracking-[0.1em] hover:bg-gray-800 transition-colors duration-300"
                    >
                      Acquérir cette œuvre
                    </button>
                  )}
                  <Link
                    href="/contact"
                    className="block w-full px-8 py-4 border border-black text-sm tracking-[0.1em] text-center hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Poser une question
                  </Link>
                </>
              ) : (
                <div className="text-center py-6 bg-gray-50">
                  <p className="text-gray-500 mb-2">
                    Cette œuvre a trouvé son nouveau foyer.
                  </p>
                  <Link
                    href="/contact"
                    className="text-black hover:underline"
                  >
                    Demander une œuvre similaire
                  </Link>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Œuvre originale signée</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Certificat d&apos;authenticité inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Livraison soignée et sécurisée</span>
              </div>
            </div>

            {/* Tags pour SEO */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Artworks */}
      {similarArtworks.length > 0 && (
        <section className="py-16 border-t border-gray-100">
          <div className="px-[3vw]">
            <h2 className="text-xl font-light tracking-[0.1em] mb-8 text-center">
              Autres œuvres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similarArtworks.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/boutique/${similar.id}`}
                  className="group"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={getImageUrl(similar)}
                      alt={similar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <h3 className="text-base font-light tracking-[0.05em] group-hover:text-gray-600 transition-colors">
                    {similar.title}
                  </h3>
                  {similar.price && (
                    <p className="text-sm text-gray-500 mt-1">
                      {similar.price.toLocaleString("fr-FR")} €
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
