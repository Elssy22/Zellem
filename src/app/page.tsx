"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Données temporaires pour les œuvres à la une (seront remplacées par PocketBase)
const featuredWorks = [
  {
    id: "1",
    title: "Infini",
    image: "/images/placeholder-1.jpg",
    category: "Portrait",
  },
  {
    id: "2",
    title: "Vision",
    image: "/images/placeholder-2.jpg",
    category: "Abstrait",
  },
  {
    id: "3",
    title: "Renaissance",
    image: "/images/placeholder-3.jpg",
    category: "Portrait",
  },
  {
    id: "4",
    title: "Énergie",
    image: "/images/placeholder-4.jpg",
    category: "Abstrait",
  },
  {
    id: "5",
    title: "Human",
    image: "/images/placeholder-5.jpg",
    category: "Portrait",
  },
  {
    id: "6",
    title: "Moi",
    image: "/images/placeholder-6.jpg",
    category: "Portrait",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-light via-white to-white" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo animation - placeholder */}
            <div className="mb-8 animate-fade-in">
              <div className="w-32 h-32 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-display text-5xl font-bold">Z</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 animate-slide-up">
              ZELLEM
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl tracking-[0.4em] text-muted uppercase mb-8 animate-slide-up stagger-1">
              Art . Love . Life
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12 animate-slide-up stagger-2">
              Bienvenue dans mon univers artistique. Chaque œuvre raconte une
              histoire, capture une émotion, révèle une part de l&apos;âme.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
              <Link
                href="/boutique"
                className="px-8 py-4 bg-primary text-white font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
              >
                Découvrir la galerie
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-primary text-primary font-medium tracking-wide hover:bg-primary hover:text-white transition-colors duration-300"
              >
                En savoir plus
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section ref={worksRef} className="py-24 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Œuvres à la une
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Une sélection de mes créations les plus récentes, où couleurs et
              émotions se rencontrent.
            </p>
          </div>

          {/* Works Grid - Novo Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <Link
                key={work.id}
                href={`/boutique/${work.id}`}
                className={`group reveal-on-scroll opacity-0 stagger-${index + 1}`}
              >
                <article className="relative">
                  {/* Image Container */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-light">
                    {/* Placeholder for actual images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{work.title}</span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>

                  {/* Info */}
                  <div className="mt-4">
                    <span className="text-xs tracking-wider text-muted uppercase">
                      {work.category}
                    </span>
                    <h3 className="font-display text-xl font-medium mt-1 group-hover:text-accent transition-colors duration-300">
                      {work.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-16 reveal-on-scroll opacity-0">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 font-medium"
            >
              Voir toutes les œuvres
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="reveal-on-scroll opacity-0">
              <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-200 to-gray-300">
                {/* Placeholder for artist photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Photo de l&apos;artiste</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="reveal-on-scroll opacity-0 stagger-2">
              <span className="text-xs tracking-[0.3em] text-muted uppercase">
                L&apos;artiste
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-6">
                Qui est Zellem ?
              </h2>
              <p className="text-secondary mb-6 leading-relaxed">
                Passionnée par l&apos;art depuis toujours, je crée des œuvres qui
                explorent les profondeurs de l&apos;âme humaine. Chaque coup de
                pinceau est une conversation entre la toile et mes émotions.
              </p>
              <p className="text-secondary mb-8 leading-relaxed">
                Mon travail se concentre sur les portraits et les compositions
                abstraites, où les couleurs vibrent et les formes racontent des
                histoires silencieuses.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 font-medium"
              >
                Découvrir mon histoire
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto reveal-on-scroll opacity-0">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Envie d&apos;une œuvre unique ?
            </h2>
            <p className="text-gray-300 mb-8">
              Commandes personnalisées, questions sur une œuvre ou simplement
              envie d&apos;échanger sur l&apos;art ? N&apos;hésitez pas à me
              contacter.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-medium tracking-wide hover:bg-light transition-colors duration-300"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
