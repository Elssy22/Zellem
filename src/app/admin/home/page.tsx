"use client";

import { useState, useEffect } from "react";
import { getPocketBase } from "@/lib/pocketbase";

interface HomeSection {
  id: string;
  section: string;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
}

interface FeaturedArtwork {
  id: string;
  collectionId: string;
  title: string;
  images: string | string[];
  featured: boolean;
}

export default function AdminHomePage() {
  const [heroContent, setHeroContent] = useState({
    title: "ZELLEM",
    subtitle: "ART . LOVE . LIFE",
    description: "Bienvenue dans mon univers artistique. Chaque œuvre raconte une histoire, capture une émotion, révèle une part de l'âme.",
  });
  const [featuredArtworks, setFeaturedArtworks] = useState<FeaturedArtwork[]>([]);
  const [allArtworks, setAllArtworks] = useState<FeaturedArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const fetchData = async () => {
      const pb = getPocketBase();

      try {
        // Charger le contenu du hero
        try {
          const settings = await pb.collection("page_contents").getList(1, 10, {
            filter: 'page = "home"',
          });

          settings.items.forEach((item) => {
            if (item.section === "hero") {
              setHeroContent({
                title: (item.title as string) || "ZELLEM",
                subtitle: (item.subtitle as string) || "ART . LOVE . LIFE",
                description: (item.content as string) || "",
              });
            }
          });
        } catch {
          // Collection n'existe pas, utiliser les valeurs par défaut
        }

        // Charger tous les produits
        const artworks = await pb.collection("artworks").getFullList();

        const allArtworksData = artworks.map((a) => ({
          id: a.id,
          collectionId: a.collectionId as string,
          title: a.title as string,
          images: a.images as string | string[],
          featured: (a.featured as boolean) || false,
        }));

        setAllArtworks(allArtworksData);
        setFeaturedArtworks(allArtworksData.filter((a) => a.featured));
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveHero = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    const pb = getPocketBase();

    try {
      // Chercher si un enregistrement existe
      const existing = await pb.collection("page_contents").getList(1, 1, {
        filter: 'page = "home" && section = "hero"',
      });

      if (existing.items.length > 0) {
        await pb.collection("page_contents").update(existing.items[0].id, {
          title: heroContent.title,
          subtitle: heroContent.subtitle,
          content: heroContent.description,
        });
      } else {
        await pb.collection("page_contents").create({
          page: "home",
          section: "hero",
          title: heroContent.title,
          subtitle: heroContent.subtitle,
          content: heroContent.description,
          order: 1,
        });
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFeatured = async (artworkId: string, currentFeatured: boolean) => {
    const pb = getPocketBase();

    try {
      await pb.collection("artworks").update(artworkId, {
        featured: !currentFeatured,
      });

      // Mettre à jour l'état local
      setAllArtworks((prev) =>
        prev.map((a) =>
          a.id === artworkId ? { ...a, featured: !currentFeatured } : a
        )
      );

      if (!currentFeatured) {
        const artwork = allArtworks.find((a) => a.id === artworkId);
        if (artwork) {
          setFeaturedArtworks((prev) => [...prev, { ...artwork, featured: true }]);
        }
      } else {
        setFeaturedArtworks((prev) => prev.filter((a) => a.id !== artworkId));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light tracking-wide">Page d&apos;accueil</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez le contenu de votre page d&apos;accueil
        </p>
      </div>

      {/* Hero Section Editor */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-medium">Section Hero</h2>
          <button
            onClick={handleSaveHero}
            disabled={isSaving}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              saveStatus === "success"
                ? "bg-green-100 text-green-700"
                : saveStatus === "error"
                ? "bg-red-100 text-red-700"
                : "bg-black text-white hover:bg-gray-800"
            } disabled:opacity-50`}
          >
            {isSaving
              ? "Enregistrement..."
              : saveStatus === "success"
              ? "✓ Enregistré"
              : saveStatus === "error"
              ? "Erreur"
              : "Enregistrer"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Titre principal</label>
            <input
              type="text"
              value={heroContent.title}
              onChange={(e) =>
                setHeroContent({ ...heroContent, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Sous-titre</label>
            <input
              type="text"
              value={heroContent.subtitle}
              onChange={(e) =>
                setHeroContent({ ...heroContent, subtitle: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Description</label>
            <textarea
              value={heroContent.description}
              onChange={(e) =>
                setHeroContent({ ...heroContent, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="font-medium">Œuvres en vedette</h2>
          <p className="text-gray-500 text-sm mt-1">
            Sélectionnez les 6 œuvres à afficher sur l&apos;accueil
          </p>
        </div>

        {/* Currently featured */}
        {featuredArtworks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm text-gray-500 mb-3">
              Actuellement en vedette ({featuredArtworks.length}/6)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="relative group rounded-lg overflow-hidden border-2 border-black"
                >
                  <div className="aspect-square bg-gray-100">
                    {artwork.images && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"}/api/files/${artwork.collectionId}/${artwork.id}/${Array.isArray(artwork.images) ? artwork.images[0] : artwork.images}?thumb=200x200`}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => toggleFeatured(artwork.id, true)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <span className="text-white text-sm">Retirer</span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs p-2 truncate">
                    {artwork.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All artworks */}
        <div>
          <h3 className="text-sm text-gray-500 mb-3">Toutes les œuvres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className={`relative group rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                  artwork.featured ? "border-black" : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => toggleFeatured(artwork.id, artwork.featured)}
              >
                <div className="aspect-square bg-gray-100">
                  {artwork.images && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"}/api/files/${artwork.collectionId}/${artwork.id}/${Array.isArray(artwork.images) ? artwork.images[0] : artwork.images}?thumb=200x200`}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {artwork.featured && (
                  <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                    ★
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs truncate">{artwork.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {allArtworks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Aucune œuvre disponible</p>
            <p className="text-sm mt-1">Ajoutez des produits pour les afficher ici</p>
          </div>
        )}
      </div>
    </div>
  );
}
