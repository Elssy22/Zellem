import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Parlons de Votre Projet",
  description: "Contactez Zellem pour toute question sur ses œuvres, commandes personnalisées ou collaborations artistiques. Réponse sous 24-48h.",
  keywords: ["contact artiste", "commande personnalisée", "acheter art", "collaboration artistique", "question œuvre"],
  openGraph: {
    title: "Contacter Zellem - Artiste Peintre",
    description: "Une question sur une œuvre ou un projet ? Contactez Zellem directement.",
    type: "website",
  },
  alternates: {
    canonical: "https://zellem.art/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
