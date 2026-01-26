"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPopup() {
  const { items, isCartOpen, closeCart, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeCart}
      />

      {/* Popup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-light tracking-[0.1em]">
            Votre panier
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-black transition-colors"
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
        </div>

        {/* Content */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Votre panier est vide</p>
              <button
                onClick={closeCart}
                className="text-black hover:underline"
              >
                Continuer la visite
              </button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.artwork.id}
                    className="flex gap-4 pb-4 border-b border-gray-100"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <img
                        src={item.artwork.image}
                        alt={item.artwork.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-light tracking-wide text-sm mb-1 truncate">
                        {item.artwork.title}
                      </h3>
                      {item.artwork.technique && (
                        <p className="text-xs text-gray-400 mb-1">
                          {item.artwork.technique}
                        </p>
                      )}
                      {item.artwork.dimensions && (
                        <p className="text-xs text-gray-400 mb-2">
                          {item.artwork.dimensions}
                        </p>
                      )}
                      <p className="text-sm font-medium">
                        {item.artwork.price?.toLocaleString("fr-FR")} €
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.artwork.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors self-start"
                      aria-label="Retirer du panier"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t border-gray-200 mb-6">
                <span className="text-gray-500">Total</span>
                <span className="text-xl font-light">
                  {totalPrice.toLocaleString("fr-FR")} €
                </span>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full px-6 py-4 bg-black text-white text-sm tracking-[0.1em] text-center hover:bg-gray-800 transition-colors duration-300"
                >
                  Payer mes achats
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full px-6 py-4 border border-black text-sm tracking-[0.1em] text-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  Continuer la visite
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
