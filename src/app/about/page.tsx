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
    <main className="pt-[128px] min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-16 reveal-on-scroll opacity-0">
        <div className="w-full flex flex-col items-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] mb-8 text-center"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            L&apos;ART DE L&apos;INVISIBLE
          </h1>
          <p className="text-sm md:text-base tracking-[0.2em] text-gray-500 mb-10 italic">
            Je peins ce que les mots taisent. Ce que l&apos;on ressent sans toujours savoir dire.
          </p>
          <p className="text-gray-500 leading-relaxed max-w-2xl text-center px-6 text-sm md:text-base">
            À travers la peinture, j&apos;explore ce lien invisible qui unit les êtres, ce qui vibre entre les mondes, ce qui relie l&apos;humanité à l&apos;univers. Entre corps et esprit, matière et énergie, visible et invisible.
          </p>
        </div>
      </section>

      {/* Section 1 - Introduction + Image dessin */}
      <section className="px-[3vw] py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal-on-scroll opacity-0 order-2 lg:order-1">
              <div className="relative overflow-hidden flex items-center justify-center">
                <img
                  src="/images/Zellem.jpeg"
                  alt="Zellem"
                  className="w-full h-auto max-h-[500px] object-contain grayscale"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="reveal-on-scroll opacity-0 order-1 lg:order-2">
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
          </div>
        </div>
      </section>

      {/* Section 2 - Mes débuts + Image profil */}
      <section className="px-[3vw] py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte */}
            <div className="reveal-on-scroll opacity-0">
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

            {/* Image */}
            <div className="reveal-on-scroll opacity-0">
              <div className="relative overflow-hidden flex items-center justify-center">
                <img
                  src="/images/Début.jpeg"
                  alt="Zellem - Mes débuts"
                  className="w-full h-auto max-h-[500px] object-contain grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Renaissance + Image canvas */}
      <section className="px-[3vw] py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal-on-scroll opacity-0 order-2 lg:order-1">
              <div className="relative overflow-hidden flex items-center justify-center">
                <img
                  src="/images/Renaissance.jpeg"
                  alt="Zellem - Renaissance"
                  className="w-full h-auto max-h-[500px] object-contain grayscale"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="reveal-on-scroll opacity-0 order-1 lg:order-2">
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
          </div>
        </div>
      </section>

      {/* Section 4 - Aujourd'hui + Image studio */}
      <section className="px-[3vw] py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte */}
            <div className="reveal-on-scroll opacity-0">
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
                Je privilégie la forme générale, je gomme les visages, j&apos;efface les détails de la peau… pour mieux faire émerger l&apos;essentiel : ce lien invisible, profond, universel.
              </p>
            </div>

            {/* Image */}
            <div className="reveal-on-scroll opacity-0">
              <div className="relative overflow-hidden flex items-center justify-center">
                <img
                  src="/images/zellem-studio.jpg"
                  alt="Zellem dans son atelier"
                  className="w-full h-auto max-h-[500px] object-contain grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Invitation à la réflexion */}
      <section className="px-[3vw] py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal-on-scroll opacity-0 order-2 lg:order-1">
              <div className="relative overflow-hidden flex items-center justify-center">
                <img
                  src="/images/Art-We-Trust.jpeg"
                  alt="In Art We Trust"
                  className="w-full h-auto max-h-[500px] object-contain grayscale"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="reveal-on-scroll opacity-0 order-1 lg:order-2">
              <h3 className="text-xl font-light tracking-[0.1em] mb-6">Une invitation à la réflexion</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depuis la nuit des temps, l&apos;humanité cherche à comprendre ce qui la dépasse, à repousser les limites de son propre horizon. Par le biais de la peinture, je m&apos;interroge sur les grandes questions de l&apos;existence.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                L&apos;art, pour moi, est un moyen d&apos;explorer ces mystères et de tisser des ponts : entre le visible et l&apos;invisible, entre les sciences et la spiritualité, entre le soi profond et l&apos;univers infini.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Il ne s&apos;agit pas simplement de représenter, mais de révéler. Révéler ce qui relie, ce qui transcende, ce qui élève l&apos;humanité.
              </p>
            </div>
          </div>
        </div>
      </section>

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
