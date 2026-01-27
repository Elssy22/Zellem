"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";

interface Artwork {
  id: string;
  collectionId: string;
  title: string;
  images: string | string[];
  price?: number;
}

interface HeroContent {
  title: string;
  subtitle: string;
  content: string;
}

// Composant pour les cartes mobile avec effet zoom au scroll
function MobileArtworkCard({
  artwork,
  index,
  isLoaded,
  getImageUrl,
}: {
  artwork: { id: string; collectionId: string; title: string; images: string | string[] };
  index: number;
  isLoaded: boolean;
  getImageUrl: (artwork: { id: string; collectionId: string; title: string; images: string | string[]; price?: number }) => string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleScroll = () => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculer la position relative de la carte dans la fenêtre
      const cardCenter = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;

      // Distance du centre de l'écran (0 = au centre, 1 = en haut/bas de l'écran)
      const distanceFromCenter = Math.abs(cardCenter - screenCenter) / (windowHeight / 2);

      // Calculer le scale : max 1.11 au centre, min 1.0 aux bords
      const newScale = 1 + (1 - Math.min(distanceFromCenter, 1)) * 0.11;

      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Appel initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/boutique/${artwork.id}`}
      className={`group relative block overflow-hidden rounded-lg transition-all duration-700 ease-out ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Image Container avec effet zoom */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <Image
          src={getImageUrl(artwork)}
          alt={artwork.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale})`,
          }}
          unoptimized
        />
      </div>

      {/* Titre avec encadré */}
      <div className="pt-4 pb-2 px-4">
        <div className="border border-gray-200 py-3 px-4">
          <h2 className="text-lg font-light tracking-[0.1em] text-center">
            {artwork.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

// Valeurs fixes pour les particules (évite l'erreur d'hydratation)
const VAPOR_PARTICLES = [
  { left: 5, delay: 0.1, duration: 3.2 },
  { left: 15, delay: 0.8, duration: 4.1 },
  { left: 25, delay: 0.3, duration: 3.5 },
  { left: 35, delay: 1.2, duration: 4.5 },
  { left: 45, delay: 0.6, duration: 3.8 },
  { left: 55, delay: 1.5, duration: 4.2 },
  { left: 65, delay: 0.2, duration: 3.3 },
  { left: 75, delay: 1.0, duration: 4.8 },
  { left: 85, delay: 0.5, duration: 3.6 },
  { left: 95, delay: 1.8, duration: 4.0 },
  { left: 10, delay: 0.9, duration: 3.9 },
  { left: 20, delay: 1.4, duration: 4.3 },
  { left: 30, delay: 0.4, duration: 3.4 },
  { left: 40, delay: 1.1, duration: 4.6 },
  { left: 50, delay: 0.7, duration: 3.7 },
  { left: 60, delay: 1.6, duration: 4.4 },
  { left: 70, delay: 0.0, duration: 3.1 },
  { left: 80, delay: 1.3, duration: 4.7 },
  { left: 90, delay: 0.8, duration: 3.0 },
  { left: 100, delay: 1.9, duration: 4.9 },
];

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "ZELLEM",
    subtitle: "ART . LOVE . LIFE",
    content: "Bienvenue dans mon univers artistique. Chaque œuvre raconte une histoire, capture une émotion, révèle une part de l'âme.",
  });

  // Charger les données depuis PocketBase
  useEffect(() => {
    const fetchData = async () => {
      const pb = getPocketBase();

      // Charger les œuvres (triées par position puis par titre)
      try {
        const artworksRecords = await pb.collection("artworks").getList<Artwork>(1, 50, {
          sort: "position,title",
        });
        setArtworks(artworksRecords.items);
      } catch (error) {
        console.error("Erreur lors du chargement des œuvres:", error);
      }

      // Charger le contenu hero
      try {
        const heroRecords = await pb.collection("page_contents").getList(1, 1, {
          filter: 'page = "home" && section = "hero"',
        });
        if (heroRecords.items.length > 0) {
          const hero = heroRecords.items[0];
          setHeroContent({
            title: hero.title || "ZELLEM",
            subtitle: hero.subtitle || "ART . LOVE . LIFE",
            content: hero.content || "",
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement du hero:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Durée de l'intro avec le logo
    const introTimer = setTimeout(() => {
      setIntroFading(true);
    }, 2000);

    // Fin de l'animation de disparition
    const fadeTimer = setTimeout(() => {
      setShowIntro(false);
      // Petit délai avant d'afficher le contenu
      setTimeout(() => setIsLoaded(true), 100);
    }, 3000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const getImageUrl = (artwork: Artwork) => {
    const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
    const image = Array.isArray(artwork.images) ? artwork.images[0] : artwork.images;
    return `${pbUrl}/api/files/${artwork.collectionId}/${artwork.id}/${image}`;
  };

  return (
    <>
      {/* Écran d'intro avec logo et effet vapeur */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-1000 ${
            introFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Particules de vapeur */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {VAPOR_PARTICLES.map((particle, i) => (
              <div
                key={i}
                className="vapor-particle"
                style={{
                  left: `${particle.left}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Logo central */}
          <div
            className={`relative z-10 transition-all duration-1000 ${
              introFading ? "scale-110 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Image
              src="/images/LOGO.png"
              alt="Zellem"
              width={384}
              height={384}
              className="w-64 md:w-80 lg:w-96 h-auto"
              priority
            />
          </div>

          {/* Effet de vapeur qui monte */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              introFading ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 vapor-rise" />
          </div>
        </div>
      )}

      {/* Styles pour l'animation de vapeur */}
      <style jsx>{`
        .vapor-particle {
          position: absolute;
          bottom: 40%;
          width: 100px;
          height: 100px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          border-radius: 50%;
          animation: floatUp 4s ease-out infinite;
          opacity: 0;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-60vh) scale(2);
            opacity: 0;
          }
        }

        .vapor-rise {
          background: linear-gradient(
            to top,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 30%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0.9) 70%,
            white 100%
          );
          animation: riseUp 1s ease-out forwards;
        }

        @keyframes riseUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>

      <main
        className={`pt-[128px] min-h-screen bg-white transition-opacity duration-500 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Hero Section */}
        <section
          className={`w-full py-10 md:py-16 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] mb-5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {heroContent.title}
            </h1>
            <p className="text-xs md:text-sm tracking-[0.4em] text-gray-400 mb-10">
              {heroContent.subtitle}
            </p>
            <p className="text-gray-500 leading-relaxed max-w-xl text-center px-6 text-sm md:text-base">
              {heroContent.content}
            </p>
          </div>
        </section>

        {/* Version Mobile - Effet zoom au scroll */}
        <div className="md:hidden px-4 pb-8 space-y-8">
          {artworks.map((artwork, index) => (
            <MobileArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              isLoaded={isLoaded}
              getImageUrl={getImageUrl}
            />
          ))}
        </div>

        {/* Version Desktop - Grille aérée avec animation hover */}
        <div className="hidden md:block max-w-[90rem] mx-auto px-6 lg:px-12 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {artworks.map((artwork, index) => (
              <Link
                key={artwork.id}
                href={`/boutique/${artwork.id}`}
                className={`group relative block overflow-hidden transition-all duration-700 ease-out ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredId(artwork.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Image de l'œuvre */}
                  <Image
                    src={getImageUrl(artwork)}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
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
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
