"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface ImageFile {
  file: File;
  preview: string;
}

export default function NouveauProduitPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technique: "Acrylique sur toile",
    dimensions: "",
    price: "",
    category: "Figuratif",
    year: new Date().getFullYear().toString(),
    available: true,
    featured: false,
  });

  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const techniques = [
    "Acrylique sur toile",
    "Huile sur toile",
    "Technique mixte",
    "Aquarelle",
    "Pastel",
    "Encre",
    "Autre",
  ];

  const categories = [
    "Figuratif",
    "Abstrait",
    "Portrait",
    "Paysage",
    "Nature morte",
    "Contemporain",
    "Autre",
  ];

  const handleImageAdd = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({
            file,
            preview: reader.result as string,
          });
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [removed] = newImages.splice(from, 1);
      newImages.splice(to, 0, removed);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      setError("Veuillez ajouter au moins une image");
      return;
    }

    if (!formData.title || !formData.price || !formData.dimensions) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    const pb = getPocketBase();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", slugify(formData.title));
      data.append("description", formData.description);
      data.append("technique", formData.technique);
      data.append("dimensions", formData.dimensions);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("year", formData.year);
      data.append("available", String(formData.available));
      data.append("featured", String(formData.featured));
      data.append("views", "0");

      images.forEach((img) => {
        data.append("images", img.file);
      });

      await pb.collection("artworks").create(data);

      router.push("/admin/produits");
    } catch (err) {
      console.error("Erreur:", err);
      setError("Une erreur est survenue lors de la création du produit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/produits"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-light tracking-wide">Nouveau produit</h1>
          <p className="text-gray-500 text-sm mt-1">Ajoutez une nouvelle œuvre à votre catalogue</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Images */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-medium mb-4">Images</h2>
          <p className="text-gray-500 text-sm mb-4">
            Glissez les images pour réorganiser. La première image sera l&apos;image principale.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
              >
                <Image
                  src={img.preview}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Badge principal */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                    Principale
                  </div>
                )}
              </div>
            ))}

            {/* Add button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center text-gray-400 hover:text-gray-500"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm">Ajouter</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageAdd(e.target.files)}
          />
        </div>

        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-medium mb-4">Informations</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-2">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                placeholder="Nom de l'œuvre"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                placeholder="Description de l'œuvre..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Technique</label>
              <select
                value={formData.technique}
                onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
              >
                {techniques.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Dimensions <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                placeholder="ex: 100 x 125 cm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Année</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                min="1900"
                max="2100"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Prix (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                placeholder="1500"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-medium mb-4">Options</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
              />
              <div>
                <p className="font-medium text-sm">Disponible à la vente</p>
                <p className="text-gray-500 text-xs">L&apos;œuvre sera visible et achetable sur le site</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
              />
              <div>
                <p className="font-medium text-sm">Mettre en vedette</p>
                <p className="text-gray-500 text-xs">L&apos;œuvre apparaîtra sur la page d&apos;accueil</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/produits"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Annuler
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Création en cours..." : "Créer le produit"}
          </button>
        </div>
      </form>
    </div>
  );
}
