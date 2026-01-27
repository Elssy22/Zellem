import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site Zellem.art. Informations sur l'éditeur, l'hébergement et la propriété intellectuelle.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://zellem.art/mentions-legales",
  },
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
