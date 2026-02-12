"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";
import { usePocketBaseUrl } from "@/hooks/usePocketBaseUrl";
import Link from "next/link";

interface Media {
  id: string;
  collectionId: string;
  name: string;
  description?: string;
  file: string;
  type: string;
  tags: string[];
  alt_text?: string;
  created: string;
  updated: string;
}

export default function MediaPage() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pbUrl = usePocketBaseUrl();

  // Form state for editing
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editAltText, setEditAltText] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const pb = getPocketBase();
    try {
      const records = await pb.collection("media").getFullList<Media>({
        sort: "name",
      });
      setMediaList(records);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({ type: "error", text: "Erreur lors du chargement des médias" });
    }
    setIsLoading(false);
  };

  const getFileUrl = useCallback((media: Media, thumb?: string) => {
    const thumbParam = thumb ? `?thumb=${thumb}` : "";
    return `${pbUrl}/api/files/${media.collectionId}/${media.id}/${media.file}${thumbParam}`;
  }, [pbUrl]);

  const isVideo = (media: Media) => {
    return media.type === "video" || media.file?.match(/\.(mp4|webm|mov)$/i);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setMessage(null);

    const pb = getPocketBase();
    let uploadedCount = 0;
    let errorCount = 0;

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name.replace(/\.[^/.]+$/, "")); // Nom sans extension
        formData.append("type", file.type.startsWith("video") ? "video" : "image");
        formData.append("tags", "[]");

        await pb.collection("media").create(formData);
        uploadedCount++;
      } catch (error) {
        console.error("Erreur upload:", error);
        errorCount++;
      }
    }

    if (uploadedCount > 0) {
      setMessage({
        type: "success",
        text: `${uploadedCount} fichier(s) uploadé(s) avec succès${errorCount > 0 ? `, ${errorCount} erreur(s)` : ""}`,
      });
      fetchMedia();
    } else {
      setMessage({ type: "error", text: "Erreur lors de l'upload des fichiers" });
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openEditModal = (media: Media) => {
    setSelectedMedia(media);
    setEditName(media.name);
    setEditDescription(media.description || "");
    setEditTags(Array.isArray(media.tags) ? media.tags.join(", ") : "");
    setEditAltText(media.alt_text || "");
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setEditName("");
    setEditDescription("");
    setEditTags("");
    setEditAltText("");
  };

  const saveMedia = async () => {
    if (!selectedMedia) return;

    setIsSaving(true);
    const pb = getPocketBase();

    try {
      const tagsArray = editTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await pb.collection("media").update(selectedMedia.id, {
        name: editName,
        description: editDescription,
        tags: tagsArray,
        alt_text: editAltText,
      });

      setMessage({ type: "success", text: "Média mis à jour avec succès" });
      fetchMedia();
      closeModal();
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({ type: "error", text: "Erreur lors de la mise à jour" });
    }

    setIsSaving(false);
  };

  const deleteMedia = async (media: Media) => {
    if (!confirm(`Supprimer "${media.name}" ? Cette action est irréversible.`)) return;

    const pb = getPocketBase();
    try {
      await pb.collection("media").delete(media.id);
      setMessage({ type: "success", text: "Média supprimé" });
      fetchMedia();
      closeModal();
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({ type: "error", text: "Erreur lors de la suppression" });
    }
  };

  const copyUrl = (media: Media) => {
    const url = getFileUrl(media);
    navigator.clipboard.writeText(url);
    setMessage({ type: "success", text: "URL copiée dans le presse-papier" });
  };

  // Filtrer les médias
  const filteredMedia = mediaList.filter((media) => {
    const matchesSearch =
      media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (media.tags && media.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesType =
      filterType === "all" ||
      (filterType === "video" && isVideo(media)) ||
      (filterType === "image" && !isVideo(media));

    return matchesSearch && matchesType;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Bibliothèque de médias</h1>
          <p className="text-gray-500 text-sm mt-1">
            {mediaList.length} fichier(s) • Gérez vos images et vidéos
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center gap-2 px-6 py-2 bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition-colors rounded-lg cursor-pointer ${
              isUploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter des fichiers
              </>
            )}
          </label>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher par nom ou tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "image", "video"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filterType === type
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type === "all" ? "Tous" : type === "image" ? "Images" : "Vidéos"}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des médias */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500">Aucun média trouvé</p>
          <p className="text-gray-400 text-sm mt-1">
            Uploadez vos premières images ou vidéos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => openEditModal(media)}
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="aspect-square relative bg-gray-100">
                {isVideo(media) ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <video
                      src={getFileUrl(media)}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={getFileUrl(media, "300x300")}
                    alt={media.alt_text || media.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>

                {/* Badge type */}
                {isVideo(media) && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    Vidéo
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-xs font-medium truncate">{media.name}</p>
                {media.tags && media.tags.length > 0 && (
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {media.tags.slice(0, 2).join(", ")}
                    {media.tags.length > 2 && ` +${media.tags.length - 2}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal d'édition */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header modal */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Modifier le média</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Preview */}
              <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                {isVideo(selectedMedia) ? (
                  <video
                    src={getFileUrl(selectedMedia)}
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={getFileUrl(selectedMedia)}
                    alt={selectedMedia.alt_text || selectedMedia.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                )}
              </div>

              {/* URL */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  readOnly
                  value={getFileUrl(selectedMedia)}
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
                <button
                  onClick={() => copyUrl(selectedMedia)}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                  Copier
                </button>
              </div>

              {/* Formulaire */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tags (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="art, peinture, abstrait..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Les tags améliorent le référencement et la recherche
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Texte alternatif (SEO)
                  </label>
                  <input
                    type="text"
                    value={editAltText}
                    onChange={(e) => setEditAltText(e.target.value)}
                    placeholder="Description de l'image pour l'accessibilité..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Important pour l&apos;accessibilité et le référencement
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <button
                onClick={() => deleteMedia(selectedMedia)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                Supprimer
              </button>
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={saveMedia}
                  disabled={isSaving}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm disabled:opacity-50"
                >
                  {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lien retour */}
      <div className="flex justify-center pt-4">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-black transition-colors">
          ← Retour au dashboard
        </Link>
      </div>
    </div>
  );
}
