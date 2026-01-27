import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique - Œuvres d'Art Originales",
  description: "Parcourez la collection d'œuvres d'art originales de Zellem. Peintures, portraits et créations uniques disponibles à la vente avec certificat d'authenticité.",
  keywords: ["boutique art", "acheter tableau", "œuvres originales", "peintures à vendre", "art contemporain", "galerie en ligne"],
  openGraph: {
    title: "Boutique Zellem - Œuvres d'Art Originales",
    description: "Découvrez et achetez des œuvres d'art originales de l'artiste Zellem.",
    type: "website",
  },
  alternates: {
    canonical: "https://zellem.art/boutique",
  },
};

export default function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
