import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos - L'Artiste Zellem",
  description: "Découvrez l'univers et le parcours artistique de Zellem, artiste peintre française. Son histoire, sa démarche créative et sa passion pour l'art.",
  keywords: ["artiste peintre", "biographie artiste", "parcours artistique", "Zellem", "art contemporain français"],
  openGraph: {
    title: "À Propos de Zellem - Artiste Peintre",
    description: "Découvrez l'univers et le parcours artistique de Zellem.",
    type: "profile",
  },
  alternates: {
    canonical: "https://zellem.art/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
