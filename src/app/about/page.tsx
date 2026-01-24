"use client";

import { useEffect } from "react";
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
    <main className="pt-[160px] min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-[3vw] pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="reveal-on-scroll opacity-0">
              <div className="sticky top-[200px]">
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                  <img
                    src="/images/zellem-portrait.jpg"
                    alt="Zellem - Dualité"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-4 italic">Dualité</p>
              </div>
            </div>

            {/* Content */}
            <div className="reveal-on-scroll opacity-0">
              {/* Main Title */}
              <div className="mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.05em] leading-tight">
                  ZELLEM,
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.05em] text-gray-600">
                  L&apos;ART DE L&apos;INVISIBLE
                </h2>
                <p className="mt-4 text-sm tracking-[0.15em] text-gray-500 uppercase">
                  Expression artistique de l&apos;être
                </p>
              </div>

              {/* Introduction */}
              <div className="mb-12">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Je peins ce que les mots taisent. Ce que l&apos;on ressent sans toujours savoir dire.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  À travers la peinture, j&apos;explore ce lien invisible qui unit les êtres, ce qui vibre entre les mondes, ce qui relie l&apos;humanité à l&apos;univers. Entre corps et esprit, matière et énergie, visible et invisible.
                </p>
              </div>

              {/* Qui suis-je */}
              <div className="mb-12 py-8 border-t border-gray-200">
                <h3 className="text-xl font-light tracking-[0.1em] mb-6">Qui suis-je ?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Depuis mon enfance, j&apos;ai toujours ressenti un besoin profond de créer. Le dessin, la peinture, la danse et la poésie ont été mes premiers langages.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Pendant mes études – de la gestion au marketing, en passant par la communication et le web design – je me suis toujours sentie en décalage. Quelque chose de plus profond bouillonnait en moi, sans pouvoir encore prendre pleinement sa place.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Ce quelque chose, c&apos;était l&apos;art : un besoin vital de dire, de provoquer, de susciter, d&apos;éveiller, de faire bouger le monde… le mien, pour commencer.
                </p>
              </div>

              {/* Mes débuts */}
              <div className="mb-12 py-8 border-t border-gray-200">
                <h3 className="text-xl font-light tracking-[0.1em] mb-6">Mes débuts</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  C&apos;est en 2016, à l&apos;âge de 27 ans, après avoir été percutée de plein fouet par le rejet et le mépris, que je réalise ma première toile. Elle marque un tournant. La peinture devient alors mon refuge, mon exutoire.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  À travers elle, je comprends que si le monde me rejette, l&apos;art, lui, me renverra cet amour que je lui porte et ne m&apos;abandonnera jamais.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Si un jour les mots manquent, peu importe ce qui sera enfoui et bloqué en moi — laideur ou beauté — la peinture restera toujours un moyen de libération puissant.
                </p>
              </div>

              {/* Une renaissance */}
              <div className="mb-12 py-8 border-t border-gray-200">
                <h3 className="text-xl font-light tracking-[0.1em] mb-6">Une renaissance</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  La vie active m&apos;emporte loin de mes rêves et m&apos;éloigne de moi-même… jusqu&apos;à ce qu&apos;au bord du précipice, la peinture me rattrape. Plus je me perds, plus elle m&apos;appelle. Chaque toile devient une exploration intérieure, un pas vers une version plus consciente de moi-même.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  En 2019, en parallèle d&apos;un travail thérapeutique, je peins <em>Moi</em>. Une œuvre-passerelle entre passé, présent et futur. Elle révèle une vérité essentielle : je suis toutes ces temporalités à la fois.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Cette prise de conscience m&apos;a ancrée, recentrée et a réveillé en moi un élan vital : le désir sincère de créer pour contribuer à un monde meilleur, plus équilibré, plus beau, plus conscient.
                </p>
              </div>

              {/* Et aujourd'hui */}
              <div className="mb-12 py-8 border-t border-gray-200">
                <h3 className="text-xl font-light tracking-[0.1em] mb-6">Et aujourd&apos;hui ?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mon travail est en constante évolution. Il s&apos;enracine dans des thématiques profondes : la santé mentale, la spiritualité, la physique quantique, l&apos;astronomie… Autant de dimensions qui nourrissent ma quête de sens et s&apos;expriment au fil de mes toiles.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Il n&apos;en reste pas moins, au cœur de mon art : la femme, l&apos;essence de mon être. Je la représente dans toute sa puissance et sa beauté.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Le corps devient un langage universel — un langage en mouvement, en lien avec l&apos;espace qui l&apos;entoure. En jouant avec la symétrie, je fusionne les corps pour exprimer la connexion profonde qui nous relie les uns aux autres, dans l&apos;unité de l&apos;humanité.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Je privilégie la forme générale, je gomme les visages, j&apos;efface les détails de la peau… pour mieux faire émerger l&apos;essentiel : ce lien invisible, profond, universel. Au-delà des apparences, c&apos;est cette présence commune, cette énergie invisible, que je cherche à révéler. Un langage sans mots, qui parle à chacun selon sa propre histoire. Une invitation à ressentir la puissance de notre humanité partagée à travers le prisme de la femme.
                </p>
              </div>

              {/* Une invitation */}
              <div className="mb-12 py-8 border-t border-gray-200">
                <h3 className="text-xl font-light tracking-[0.1em] mb-6">Une invitation à la réflexion</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Depuis la nuit des temps, l&apos;humanité cherche à comprendre ce qui la dépasse, à repousser les limites de son propre horizon. Par le biais de la peinture, je m&apos;interroge sur les grandes questions de l&apos;existence.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  L&apos;art, pour moi, est un moyen d&apos;explorer ces mystères et de tisser des ponts :
                </p>
                <ul className="text-gray-600 leading-relaxed mb-4 space-y-1 pl-4">
                  <li>entre le visible et l&apos;invisible,</li>
                  <li>entre les sciences et la spiritualité,</li>
                  <li>entre le soi profond et l&apos;univers infini.</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Il ne s&apos;agit pas simplement de représenter, mais de révéler. Révéler ce qui relie, ce qui transcende, ce qui élève l&apos;humanité.
                </p>
              </div>

              {/* Signature */}
              <div className="py-12 border-t border-gray-200 text-center">
                <p className="text-lg tracking-[0.2em] font-light mb-6">
                  ART . LOVE . LIFE
                </p>
                <p className="text-2xl font-light tracking-[0.1em] italic">
                  Zellem
                </p>
              </div>

              {/* CTA */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/boutique"
                    className="flex-1 px-8 py-4 bg-black text-white text-sm tracking-[0.1em] text-center hover:bg-gray-800 transition-colors duration-300"
                  >
                    Découvrir mes œuvres
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 px-8 py-4 border border-black text-sm tracking-[0.1em] text-center hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Me contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
