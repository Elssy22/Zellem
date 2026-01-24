// Types pour les œuvres/produits
export interface Artwork {
  id: string;
  title: string;
  description: string;
  technique: string; // Acrylique, Huile, Technique mixte, etc.
  dimensions: string; // ex: "65x92 cm"
  price: number;
  available: boolean;
  images: string[]; // URLs des images
  category: string; // Portrait, Abstrait, etc.
  year: number;
  created: string;
  updated: string;
}

// Types pour les catégories
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// Types pour les commandes
export interface Order {
  id: string;
  artworkId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  totalPrice: number;
  created: string;
  updated: string;
}

// Types pour les messages de contact
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created: string;
}

// Types pour les paramètres du site
export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  aboutText: string;
  artistPhoto?: string;
}

// Types pour la pagination
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

// Types pour les filtres de la boutique
export interface ShopFilters {
  category?: string;
  technique?: string;
  priceMin?: number;
  priceMax?: number;
  available?: boolean;
  sortBy?: "price_asc" | "price_desc" | "date_asc" | "date_desc" | "title";
}
