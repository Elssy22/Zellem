// Données centralisées des œuvres - utilisées sur toutes les pages
export interface Artwork {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  technique?: string;
  dimensions?: string;
  year?: number;
  price?: number;
  available?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Nymphéa",
    slug: "nymphea",
    image: "/images/artworks/NYMPHÉA.jpg",
    description: "Une œuvre représentant deux figures symétriques en harmonie.",
    technique: "Acrylique sur toile",
    dimensions: "100 x 125 cm",
    year: 2024,
    available: true,
  },
  {
    id: "2",
    title: "Infini",
    slug: "infini",
    image: "/images/artworks/INFINI.jpg",
    description: "Une figure centrale embrassant l'infini sur fond vert.",
    technique: "Acrylique sur toile",
    dimensions: "100 x 125 cm",
    year: 2024,
    available: true,
  },
  {
    id: "3",
    title: "Énergie",
    slug: "energie",
    image: "/images/artworks/ÉNERGIE.jpg",
    description: "Composition dynamique en bleu et vert avec des mains expressives.",
    technique: "Acrylique sur toile",
    dimensions: "100 x 125 cm",
    year: 2024,
    available: true,
  },
  {
    id: "4",
    title: "Care",
    slug: "care",
    image: "/images/artworks/CARE.jpg",
    description: "Figure méditative avec mandala détaillé sur fond orange.",
    technique: "Acrylique sur toile",
    dimensions: "100 x 125 cm",
    year: 2024,
    available: true,
  },
  {
    id: "5",
    title: "Libération, Bienveillance et Progrès",
    slug: "liberation-bienveillance-progres",
    image: "/images/artworks/LIBÉRATION, BIENVEILLANCE ET PROGRÈS .jpg",
    description: "Figure puissante aux bras levés portant un arc céleste.",
    technique: "Acrylique sur toile",
    dimensions: "100 x 125 cm",
    year: 2024,
    available: true,
  },
  {
    id: "6",
    title: "Moi",
    slug: "moi",
    image: "/images/artworks/MOI.jpg",
    description: "Trois figures superposées en totem, symbolisant l'évolution personnelle.",
    technique: "Acrylique sur toile",
    dimensions: "100 x 125 cm",
    year: 2024,
    available: true,
  },
];

// Fonctions utilitaires
export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAllArtworks(): Artwork[] {
  return artworks;
}

export function getAvailableArtworks(): Artwork[] {
  return artworks.filter((a) => a.available);
}
