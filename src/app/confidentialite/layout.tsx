import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et protection des données personnelles sur le site Zellem.art. Conforme au RGPD.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://zellem.art/confidentialite",
  },
};

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
