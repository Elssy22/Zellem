"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import CartPopup from "@/components/CartPopup";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartPopup />
    </CartProvider>
  );
}
