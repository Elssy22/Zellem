import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zellem.art";

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/boutique`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Récupérer les œuvres dynamiquement depuis PocketBase
  let artworkPages: MetadataRoute.Sitemap = [];

  try {
    const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
    const response = await fetch(`${pbUrl}/api/collections/artworks/records?perPage=500`, {
      next: { revalidate: 3600 }, // Revalider toutes les heures
    });

    if (response.ok) {
      const data = await response.json();
      artworkPages = data.items
        .filter((artwork: { id: string; updated: string }) => {
          const date = new Date(artwork.updated);
          return !isNaN(date.getTime());
        })
        .map((artwork: { id: string; updated: string }) => ({
          url: `${baseUrl}/boutique/${artwork.id}`,
          lastModified: new Date(artwork.updated),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error);
  }

  return [...staticPages, ...artworkPages];
}
