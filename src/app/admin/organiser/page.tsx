"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";
import Link from "next/link";

interface Artwork {
  id: string;
  collectionId: string;
  title: string;
  images: string | string[];
  position: number;
}

export default function OrganiserPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    const pb = getPocketBase();
    try {
      const records = await pb.collection("artworks").getList<Artwork>(1, 50, {
        sort: "position,title",
      });
      setArtworks(records.items);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur lors du chargement des œuvres");
    }
    setIsLoading(false);
  };

  const getImageUrl = (artwork: Artwork) => {
    const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
    const image = Array.isArray(artwork.images) ? artwork.images[0] : artwork.images;
    return `${pbUrl}/api/files/${artwork.collectionId}/${artwork.id}/${image}`;
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== draggedId) {
      setDragOverId(id);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);

    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = artworks.findIndex((a) => a.id === draggedId);
    const targetIndex = artworks.findIndex((a) => a.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Réorganiser le tableau
    const newArtworks = [...artworks];
    const [draggedItem] = newArtworks.splice(draggedIndex, 1);
    newArtworks.splice(targetIndex, 0, draggedItem);

    // Mettre à jour les positions
    const updatedArtworks = newArtworks.map((artwork, index) => ({
      ...artwork,
      position: index + 1,
    }));

    setArtworks(updatedArtworks);
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const savePositions = async () => {
    setIsSaving(true);
    setMessage(null);

    const pb = getPocketBase();

    try {
      // Sauvegarder chaque position
      for (const artwork of artworks) {
        await pb.collection("artworks").update(artwork.id, {
          position: artwork.position,
        });
      }
      setMessage("Positions sauvegardées avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur lors de la sauvegarde. Vérifiez que vous êtes connecté à PocketBase.");
    }

    setIsSaving(false);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArtworks = [...artworks];
    [newArtworks[index - 1], newArtworks[index]] = [newArtworks[index], newArtworks[index - 1]];
    const updatedArtworks = newArtworks.map((artwork, i) => ({
      ...artwork,
      position: i + 1,
    }));
    setArtworks(updatedArtworks);
  };

  const moveDown = (index: number) => {
    if (index === artworks.length - 1) return;
    const newArtworks = [...artworks];
    [newArtworks[index], newArtworks[index + 1]] = [newArtworks[index + 1], newArtworks[index]];
    const updatedArtworks = newArtworks.map((artwork, i) => ({
      ...artwork,
      position: i + 1,
    }));
    setArtworks(updatedArtworks);
  };

  // Touch handlers for mobile
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchedId, setTouchedId] = useState<string | null>(null);

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchedId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartY || !touchedId) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;

    // Si on a bougé de plus de 50px, on échange
    if (Math.abs(diff) > 50) {
      const currentIndex = artworks.findIndex(a => a.id === touchedId);
      if (diff > 0 && currentIndex < artworks.length - 1) {
        moveDown(currentIndex);
        setTouchStartY(currentY);
      } else if (diff < 0 && currentIndex > 0) {
        moveUp(currentIndex);
        setTouchStartY(currentY);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
    setTouchedId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide">
            Organiser les œuvres
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Glissez-déposez pour changer l&apos;ordre d&apos;affichage
          </p>
        </div>
        <button
          onClick={savePositions}
          disabled={isSaving}
          className="px-6 py-2 bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 rounded-lg"
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder les positions"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("succès")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        <strong>Instructions :</strong> Glissez les images pour réorganiser.
        Sur mobile, maintenez et faites glisser vers le haut ou le bas.
        Utilisez les flèches pour un positionnement précis.
        <br />
        <strong>N&apos;oubliez pas de cliquer sur &quot;Sauvegarder&quot; !</strong>
      </div>

      {/* Grille des œuvres */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            draggable
            onDragStart={(e) => handleDragStart(e, artwork.id)}
            onDragOver={(e) => handleDragOver(e, artwork.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, artwork.id)}
            onDragEnd={handleDragEnd}
            onTouchStart={(e) => handleTouchStart(e, artwork.id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`relative bg-white rounded-lg shadow-sm overflow-hidden cursor-move transition-all duration-200 select-none ${
              draggedId === artwork.id || touchedId === artwork.id ? "opacity-50 scale-95 ring-2 ring-blue-400" : ""
            } ${
              dragOverId === artwork.id
                ? "ring-2 ring-blue-500 ring-offset-2"
                : ""
            }`}
          >
            {/* Position badge */}
            <div className="absolute top-2 left-2 z-10 w-7 h-7 bg-black text-white text-xs font-bold flex items-center justify-center rounded-full shadow-lg">
              {index + 1}
            </div>

            {/* Boutons de déplacement */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  moveUp(index);
                }}
                disabled={index === 0}
                className="w-7 h-7 bg-white/95 hover:bg-white rounded-full shadow-lg text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                title="Monter"
              >
                ↑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  moveDown(index);
                }}
                disabled={index === artworks.length - 1}
                className="w-7 h-7 bg-white/95 hover:bg-white rounded-full shadow-lg text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                title="Descendre"
              >
                ↓
              </button>
            </div>

            {/* Image */}
            <div className="aspect-[4/5] relative">
              <Image
                src={getImageUrl(artwork)}
                alt={artwork.title}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
                unoptimized
              />
            </div>

            {/* Titre */}
            <div className="p-2 text-center bg-white">
              <p className="text-xs font-medium truncate">{artwork.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Aperçu de l'ordre */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-sm font-medium mb-3">Ordre actuel sur le site :</h2>
        <div className="flex flex-wrap gap-2">
          {artworks.map((artwork, index) => (
            <span
              key={artwork.id}
              className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium"
            >
              {index + 1}. {artwork.title}
            </span>
          ))}
        </div>
      </div>

      {/* Lien retour */}
      <div className="flex justify-center pt-4">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          ← Retour au dashboard
        </Link>
      </div>
    </div>
  );
}
