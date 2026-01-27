import PocketBase from "pocketbase";
import { Artwork, ContactMessage, SiteSettings, PaginatedResponse, ShopFilters } from "@/types";

// Configuration PocketBase
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

// Instance PocketBase singleton
let pb: PocketBase | null = null;

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(POCKETBASE_URL);
    pb.autoCancellation(false);
  }
  return pb;
}

// ============================================
// ARTWORKS / ŒUVRES
// ============================================

/**
 * Récupère toutes les œuvres avec filtres et pagination
 */
export async function getArtworks(
  filters?: ShopFilters,
  page: number = 1,
  perPage: number = 12
): Promise<PaginatedResponse<Artwork>> {
  const pb = getPocketBase();

  // Construction des filtres
  const filterParts: string[] = [];

  if (filters?.category && filters.category !== "Tous") {
    filterParts.push(`category = "${filters.category}"`);
  }

  if (filters?.technique && filters.technique !== "Toutes") {
    filterParts.push(`technique = "${filters.technique}"`);
  }

  if (filters?.available) {
    filterParts.push("available = true");
  }

  if (filters?.priceMin !== undefined) {
    filterParts.push(`price >= ${filters.priceMin}`);
  }

  if (filters?.priceMax !== undefined) {
    filterParts.push(`price <= ${filters.priceMax}`);
  }

  const filter = filterParts.length > 0 ? filterParts.join(" && ") : "";

  // Construction du tri
  let sort = "title";
  switch (filters?.sortBy) {
    case "price_asc":
      sort = "price";
      break;
    case "price_desc":
      sort = "-price";
      break;
    case "title":
      sort = "title";
      break;
  }

  try {
    const response = await pb.collection("artworks").getList(page, perPage, {
      filter,
      sort,
    });

    return {
      items: response.items as unknown as Artwork[],
      page: response.page,
      perPage: response.perPage,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des œuvres:", error);
    return {
      items: [],
      page: 1,
      perPage,
      totalItems: 0,
      totalPages: 0,
    };
  }
}

/**
 * Récupère une œuvre par son ID
 */
export async function getArtwork(id: string): Promise<Artwork | null> {
  const pb = getPocketBase();

  try {
    const record = await pb.collection("artworks").getOne(id);
    return record as unknown as Artwork;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'œuvre ${id}:`, error);
    return null;
  }
}

/**
 * Récupère les œuvres mises en avant (featured)
 */
export async function getFeaturedArtworks(limit: number = 6): Promise<Artwork[]> {
  const pb = getPocketBase();

  try {
    const response = await pb.collection("artworks").getList(1, limit, {
      filter: "featured = true && available = true",
      sort: "title",
    });

    return response.items as unknown as Artwork[];
  } catch (error) {
    console.error("Erreur lors de la récupération des œuvres à la une:", error);
    return [];
  }
}

/**
 * Récupère les œuvres similaires (même catégorie)
 */
export async function getSimilarArtworks(
  artworkId: string,
  category: string,
  limit: number = 3
): Promise<Artwork[]> {
  const pb = getPocketBase();

  try {
    const response = await pb.collection("artworks").getList(1, limit, {
      filter: `id != "${artworkId}" && category = "${category}"`,
      sort: "title",
    });

    return response.items as unknown as Artwork[];
  } catch (error) {
    console.error("Erreur lors de la récupération des œuvres similaires:", error);
    return [];
  }
}

/**
 * Récupère l'URL d'une image depuis PocketBase
 */
export function getImageUrl(record: Artwork, filename: string): string {
  const pb = getPocketBase();
  return pb.files.getUrl(record as unknown as { id: string; collectionId: string }, filename);
}

// ============================================
// MESSAGES DE CONTACT
// ============================================

/**
 * Envoie un message de contact
 */
export async function sendContactMessage(
  data: Omit<ContactMessage, "id" | "read" | "created">
): Promise<boolean> {
  const pb = getPocketBase();

  try {
    await pb.collection("contact_messages").create({
      ...data,
      read: false,
    });
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return false;
  }
}

// ============================================
// PARAMÈTRES DU SITE
// ============================================

/**
 * Récupère les paramètres du site
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const pb = getPocketBase();

  try {
    const records = await pb.collection("site_settings").getList(1, 1);
    if (records.items.length > 0) {
      return records.items[0] as unknown as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres:", error);
    return null;
  }
}

// ============================================
// CATÉGORIES
// ============================================

/**
 * Récupère toutes les catégories uniques
 */
export async function getCategories(): Promise<string[]> {
  const pb = getPocketBase();

  try {
    const response = await pb.collection("artworks").getFullList({
      fields: "category",
    });

    const categories = new Set<string>();
    response.forEach((record) => {
      if (record.category) {
        categories.add(record.category as string);
      }
    });

    return Array.from(categories).sort();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return [];
  }
}

/**
 * Récupère toutes les techniques uniques
 */
export async function getTechniques(): Promise<string[]> {
  const pb = getPocketBase();

  try {
    const response = await pb.collection("artworks").getFullList({
      fields: "technique",
    });

    const techniques = new Set<string>();
    response.forEach((record) => {
      if (record.technique) {
        techniques.add(record.technique as string);
      }
    });

    return Array.from(techniques).sort();
  } catch (error) {
    console.error("Erreur lors de la récupération des techniques:", error);
    return [];
  }
}
