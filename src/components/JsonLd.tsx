"use client";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Données structurées pour l'organisation
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zellem Art",
  url: "https://zellem.art",
  logo: "https://zellem.art/images/LOGO.png",
  description: "Artiste peintre française proposant des œuvres originales",
  sameAs: [
    "https://www.instagram.com/_zellem_/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@zellem.art",
    availableLanguage: ["French"],
  },
};

// Données structurées pour l'artiste
export const artistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zellem",
  jobTitle: "Artiste Peintre",
  url: "https://zellem.art",
  image: "https://zellem.art/images/zellem-profile.jpg",
  sameAs: [
    "https://www.instagram.com/_zellem_/",
  ],
};

// Données structurées pour une œuvre d'art
export function getArtworkJsonLd(artwork: {
  title: string;
  description?: string;
  price?: number;
  available?: boolean;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    description: artwork.description || `Œuvre originale par Zellem - ${artwork.title}`,
    image: artwork.image,
    url: artwork.url,
    creator: {
      "@type": "Person",
      name: "Zellem",
      url: "https://zellem.art",
    },
    offers: artwork.price
      ? {
          "@type": "Offer",
          price: artwork.price,
          priceCurrency: "EUR",
          availability: artwork.available !== false
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
          seller: {
            "@type": "Person",
            name: "Zellem",
          },
        }
      : undefined,
  };
}

// Données structurées pour le breadcrumb
export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
