"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";

interface PageContent {
  id: string;
  collectionId: string;
  page: string;
  section: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  order: number;
}

export default function AboutPage() {
  const [sections, setSections] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const pb = getPocketBase();
      try {
        const records = await pb.collection("page_contents").getList<PageContent>(1, 50, {
          filter: 'page = "about"',
          sort: "order",
        });
        setSections(records.items);
      } catch (error) {
        console.error("Erreur lors du chargement du contenu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (!isLoading && sections.length > 0) {
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
    }
  }, [isLoading, sections]);

  const getImageUrl = (section: PageContent) => {
    if (!section.image) return null;
    const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
    return `${pbUrl}/api/files/${section.collectionId}/${section.id}/${section.image}`;
  };

  const heroSection = sections.find((s) => s.section === "hero");
  const contentSections = sections.filter((s) => s.section !== "hero");

  if (isLoading) {
    return (
      <main className="pt-[128px] min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="pt-[128px] min-h-screen bg-white">
      {/* Hero Section */}
      {heroSection && (
        <section className="w-full py-10 md:py-16 reveal-on-scroll opacity-0">
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] mb-8 text-center"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {heroSection.title}
            </h1>
            {heroSection.subtitle && (
              <p className="text-sm md:text-base tracking-[0.2em] text-gray-500 mb-10 italic">
                {heroSection.subtitle}
              </p>
            )}
            {heroSection.content && (
              <p className="text-gray-500 leading-relaxed max-w-2xl text-center px-6 text-sm md:text-base">
                {heroSection.content}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content Sections */}
      {contentSections.map((section, index) => {
        const isEven = index % 2 === 0;
        const imageUrl = getImageUrl(section);

        return (
          <section
            key={section.id}
            className={`px-[3vw] py-16 ${isEven ? "bg-gray-50" : ""}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image - alternance gauche/droite */}
                {imageUrl && (
                  <div
                    className={`reveal-on-scroll opacity-0 ${
                      isEven ? "order-2 lg:order-1" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden flex items-center justify-center aspect-[4/5]">
                      <Image
                        src={imageUrl}
                        alt={section.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain grayscale"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {/* Texte */}
                <div
                  className={`reveal-on-scroll opacity-0 ${
                    isEven && imageUrl ? "order-1 lg:order-2" : ""
                  }`}
                >
                  <h3 className="text-xl font-light tracking-[0.1em] mb-6">
                    {section.title}
                  </h3>
                  <div
                    className="text-gray-600 leading-relaxed space-y-4 [&>p]:mb-4 [&>p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Signature + CTA */}
      <section className="px-[3vw] py-16">
        <div className="max-w-3xl mx-auto text-center reveal-on-scroll opacity-0">
          <p className="text-xs md:text-sm tracking-[0.4em] text-gray-400 mb-4">
            ART . LOVE . LIFE
          </p>
          <p
            className="text-4xl md:text-5xl tracking-[0.15em] mb-12"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Zellem
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/boutique"
              className="px-10 py-4 bg-black text-white text-sm tracking-[0.1em] text-center hover:bg-gray-800 transition-colors duration-300"
            >
              Découvrir mes œuvres
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border border-black text-sm tracking-[0.1em] text-center hover:bg-black hover:text-white transition-all duration-300"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
