"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Artwork } from "@/data/artworks";

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem("zellem-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erreur lors du chargement du panier:", e);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("zellem-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (artwork: Artwork) => {
    setItems((currentItems) => {
      // Vérifier si l'article est déjà dans le panier
      const existingItem = currentItems.find(
        (item) => item.artwork.id === artwork.id
      );

      if (existingItem) {
        // Pour les œuvres d'art, on ne peut avoir qu'un seul exemplaire
        return currentItems;
      }

      return [...currentItems, { artwork, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (artworkId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.artwork.id !== artworkId)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.length;
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.artwork.price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
