import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Consultez les conditions générales de vente pour l'achat d'œuvres d'art sur le site Zellem. Livraison, paiement, retours et garanties.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://zellem.art/cgv",
  },
};

export default function CGVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
