"use client";

import { useState, useEffect } from "react";
import { getPocketBase } from "@/lib/pocketbase";
import Link from "next/link";

interface Artwork {
  id: string;
  collectionId: string;
  title: string;
  technique: string;
  dimensions: string;
  price: number;
  available: boolean;
  featured: boolean;
  images: string | string[];
  category: string;
}

export default function AdminProduitsPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "available" | "sold">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    const pb = getPocketBase();

    try {
      const response = await pb.collection("artworks").getFullList();

      setArtworks(
        response.map((item) => ({
          id: item.id,
          collectionId: item.collectionId as string,
          title: item.title as string,
          technique: item.technique as string,
          dimensions: item.dimensions as string,
          price: item.price as number,
          available: item.available as boolean,
          featured: item.featured as boolean,
          images: item.images as string | string[],
          category: item.category as string,
        }))
      );
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailable = async (id: string, currentValue: boolean) => {
    const pb = getPocketBase();

    try {
      await pb.collection("artworks").update(id, {
        available: !currentValue,
      });

      setArtworks((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, available: !currentValue } : a
        )
      );
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const deleteArtwork = async (id: string) => {
    const pb = getPocketBase();

    try {
      await pb.collection("artworks").delete(id);
      setArtworks((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const filteredArtworks = artworks.filter((a) => {
    if (filter === "available") return a.available;
    if (filter === "sold") return !a.available;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Produits</h1>
          <p className="text-gray-500 text-sm mt-1">
            {artworks.length} œuvre{artworks.length > 1 ? "s" : ""} au total
          </p>
        </div>

        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter un produit
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "Tout" },
          { key: "available", label: "Disponibles" },
          { key: "sold", label: "Vendues" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === f.key
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
            >
              {/* Image */}
              <Link href={`/admin/produits/${artwork.id}`}>
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {artwork.images ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"}/api/files/${artwork.collectionId}/${artwork.id}/${Array.isArray(artwork.images) ? artwork.images[0] : artwork.images}?thumb=400x400`}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Status badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {artwork.featured && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded">
                        ★ Vedette
                      </span>
                    )}
                    {!artwork.available && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Vendue
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="p-4">
                <Link href={`/admin/produits/${artwork.id}`}>
                  <h3 className="font-medium mb-1 hover:text-gray-600 transition-colors">
                    {artwork.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">
                  {artwork.technique} • {artwork.dimensions}
                </p>
                <p className="text-lg font-medium">
                  {artwork.price?.toLocaleString("fr-FR")} €
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleAvailable(artwork.id, artwork.available)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                      artwork.available
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {artwork.available ? "Disponible" : "Indisponible"}
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/produits/${artwork.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>

                    <button
                      onClick={() => setDeleteConfirm(artwork.id)}
                      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 mb-4">Aucun produit trouvé</p>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter votre premier produit
          </Link>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-medium mb-2">Confirmer la suppression</h3>
            <p className="text-gray-500 text-sm mb-6">
              Cette action est irréversible. L&apos;œuvre et toutes ses images seront définitivement supprimées.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteArtwork(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
