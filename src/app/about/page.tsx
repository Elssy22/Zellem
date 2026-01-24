"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
      <section className="relative pt-32 pb-16 bg-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] text-muted uppercase animate-fade-in">
              L&apos;artiste
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 animate-slide-up">
              Qui est Zellem ?
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto animate-slide-up stagger-1">
              Art . Love . Life — Une philosophie de vie qui guide chaque création
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Artist Photo */}
            <div className="reveal-on-scroll opacity-0">
              <div className="sticky top-32">
                <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-200 to-gray-300 mb-6">
                  {/* Placeholder for artist photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">Portrait de Zellem</span>
                  </div>
                </div>
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/_zellem_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">@_zellem_</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Biography Content */}
            <div className="reveal-on-scroll opacity-0 stagger-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Une passion née de l&apos;émotion
                </h2>
                <p className="text-secondary leading-relaxed mb-6">
                  L&apos;art a toujours été mon refuge, mon langage silencieux.
                  Depuis mon plus jeune âge, je trouve dans la peinture un moyen
                  d&apos;exprimer ce que les mots ne peuvent capturer — les nuances
                  de l&apos;âme, les vibrations de l&apos;instant.
                </p>

                <h2 className="font-display text-2xl font-semibold mb-6 mt-12">
                  Mon approche artistique
                </h2>
                <p className="text-secondary leading-relaxed mb-6">
                  Chaque toile est une conversation intime entre la matière et
                  l&apos;émotion. Je travaille principalement les portraits et les
                  compositions abstraites, explorant les frontières entre le
                  visible et l&apos;invisible.
                </p>
                <p className="text-secondary leading-relaxed mb-6">
                  Les couleurs sont mes mots, les textures mes phrases. Je laisse
                  souvent l&apos;œuvre me guider, acceptant que le résultat final
                  soit une surprise autant pour moi que pour le spectateur.
                </p>

                <h2 className="font-display text-2xl font-semibold mb-6 mt-12">
                  Techniques et inspirations
                </h2>
                <p className="text-secondary leading-relaxed mb-6">
                  Je travaille essentiellement à l&apos;acrylique et à l&apos;huile,
                  parfois en technique mixte pour créer des effets de profondeur
                  uniques. Mes inspirations puisent dans la nature humaine, les
                  émotions brutes et la beauté de l&apos;imperfection.
                </p>

                <blockquote className="border-l-4 border-accent pl-6 my-12 italic text-secondary">
                  &ldquo;Chaque œuvre porte en elle une part de mon âme. Quand
                  quelqu&apos;un acquiert une de mes créations, c&apos;est un peu de
                  moi qui continue à vivre ailleurs.&rdquo;
                </blockquote>

                <h2 className="font-display text-2xl font-semibold mb-6 mt-12">
                  Art . Love . Life
                </h2>
                <p className="text-secondary leading-relaxed mb-6">
                  Cette devise résume ma philosophie : l&apos;art comme expression de
                  l&apos;amour pour la vie. Chaque création est un acte d&apos;amour,
                  une célébration de l&apos;existence dans toute sa complexité.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-12 border-t border-gray-200">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Envie d&apos;acquérir une œuvre ?
                </h3>
                <p className="text-secondary mb-6">
                  Découvrez ma collection dans la boutique ou contactez-moi pour
                  une commande personnalisée.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/boutique"
                    className="px-6 py-3 bg-primary text-white font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
                  >
                    Voir la boutique
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border border-primary text-primary font-medium tracking-wide hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    Me contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-24 bg-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-center mb-16 reveal-on-scroll opacity-0">
              Parcours artistique
            </h2>

            <div className="space-y-12">
              {[
                {
                  year: "2020",
                  title: "Premiers pas",
                  description:
                    "Début de mon aventure artistique, exploration des techniques de base.",
                },
                {
                  year: "2021",
                  title: "Développement du style",
                  description:
                    "Affirmation de mon identité artistique, premiers portraits.",
                },
                {
                  year: "2022",
                  title: "Premières ventes",
                  description:
                    "Mes œuvres trouvent leurs premiers admirateurs.",
                },
                {
                  year: "2023",
                  title: "Expansion",
                  description:
                    "Lancement de la galerie en ligne, diversification des techniques.",
                },
                {
                  year: "2024",
                  title: "Aujourd'hui",
                  description:
                    "Continue de créer, d'explorer et de partager ma passion.",
                },
              ].map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex gap-8 reveal-on-scroll opacity-0 stagger-${index + 1}`}
                >
                  <div className="flex-shrink-0 w-20">
                    <span className="font-display text-2xl font-semibold text-accent">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-12 border-l border-gray-300 pl-8 relative">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-accent rounded-full -translate-x-1/2" />
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-secondary">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
