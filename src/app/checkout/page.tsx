"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-[160px] min-h-screen bg-white">
        <div className="px-[3vw] py-16 text-center">
          <h1 className="text-2xl font-light tracking-[0.1em] mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-500 mb-8">
            Découvrez nos œuvres disponibles
          </p>
          <Link
            href="/boutique"
            className="inline-block px-8 py-4 bg-black text-white text-sm tracking-[0.1em] hover:bg-gray-800 transition-colors duration-300"
          >
            Voir la boutique
          </Link>
        </div>
      </main>
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
          <span className="text-black">Paiement</span>
        </nav>
      </div>

      <div className="px-[3vw] pb-16">
        <h1 className="text-3xl font-light tracking-[0.1em] mb-12">
          Finaliser votre commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Récapitulatif */}
          <div>
            <h2 className="text-xl font-light tracking-[0.05em] mb-6 pb-4 border-b border-gray-200">
              Récapitulatif
            </h2>

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.artwork.id}
                  className="flex gap-4 pb-6 border-b border-gray-100"
                >
                  {/* Image */}
                  <div className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden relative">
                    <Image
                      src={item.artwork.image}
                      alt={item.artwork.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-light tracking-wide mb-1">
                      {item.artwork.title}
                    </h3>
                    {item.artwork.technique && (
                      <p className="text-sm text-gray-400 mb-1">
                        {item.artwork.technique}
                      </p>
                    )}
                    {item.artwork.dimensions && (
                      <p className="text-sm text-gray-400 mb-2">
                        {item.artwork.dimensions}
                      </p>
                    )}
                    <p className="font-medium">
                      {item.artwork.price?.toLocaleString("fr-FR")} €
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.artwork.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                    aria-label="Retirer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-lg">
                <span>Total</span>
                <span className="font-medium">
                  {totalPrice.toLocaleString("fr-FR")} €
                </span>
              </div>
            </div>
          </div>

          {/* Formulaire de contact (temporaire - sera remplacé par Stripe) */}
          <div>
            <h2 className="text-xl font-light tracking-[0.05em] mb-6 pb-4 border-b border-gray-200">
              Vos informations
            </h2>

            <div className="bg-gray-50 p-6 mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Le paiement en ligne sera bientôt disponible. En attendant,
                remplissez ce formulaire et je vous contacterai pour finaliser
                votre achat de manière sécurisée.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Prénom *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Nom *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Adresse de livraison *</label>
                <textarea
                  rows={3}
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors resize-none"
                  placeholder="Adresse complète..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Message (optionnel)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors resize-none"
                  placeholder="Questions ou précisions..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-black text-white text-sm tracking-[0.1em] hover:bg-gray-800 transition-colors duration-300 mt-6"
              >
                Envoyer ma demande d&apos;achat
              </button>
            </form>

            {/* Garanties */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Œuvres originales signées</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Certificat d&apos;authenticité inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Livraison soignée et sécurisée</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
