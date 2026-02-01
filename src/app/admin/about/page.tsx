"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";
import { usePocketBaseUrl } from "@/hooks/usePocketBaseUrl";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import UnsavedChangesModal from "@/components/UnsavedChangesModal";

interface AboutSection {
  id?: string;
  collectionId?: string;
  section: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  imageFile?: File;
  imagePreview?: string;
  order: number;
  isNew?: boolean;
}

export default function AdminAboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [originalSections, setOriginalSections] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<Record<string, "success" | "error" | null>>({});
  const [deletingSection, setDeletingSection] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const pbUrl = usePocketBaseUrl();

  // Check for unsaved changes
  const hasUnsavedChanges = JSON.stringify(sections.map(s => ({
    section: s.section,
    title: s.title,
    subtitle: s.subtitle,
    content: s.content,
    imageFile: s.imageFile ? true : false,
  }))) !== originalSections;

  const {
    showModal,
    handleConfirmLeave,
    handleCancelLeave,
  } = useUnsavedChanges(hasUnsavedChanges);

  const getSectionImageUrl = useCallback((section: AboutSection) => {
    if (section.imagePreview) return section.imagePreview;
    if (section.image && section.id && section.collectionId) {
      return `${pbUrl}/api/files/${section.collectionId}/${section.id}/${section.image}`;
    }
    return null;
  }, [pbUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const pb = getPocketBase();

      try {
        const contents = await pb.collection("page_contents").getList(1, 50, {
          filter: 'page = "about"',
          sort: "order",
        });

        if (contents.items.length > 0) {
          const loadedSections: AboutSection[] = contents.items.map((item, index) => ({
            id: item.id,
            collectionId: item.collectionId,
            section: item.section as string,
            title: (item.title as string) || "",
            subtitle: (item.subtitle as string) || "",
            content: (item.content as string) || "",
            image: item.image as string | undefined,
            order: (item.order as number) || index + 1,
          }));
          setSections(loadedSections);
          // Store original state for comparison
          setOriginalSections(JSON.stringify(loadedSections.map(s => ({
            section: s.section,
            title: s.title,
            subtitle: s.subtitle,
            content: s.content,
            imageFile: false,
          }))));
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveSection = async (sectionKey: string) => {
    setSavingSection(sectionKey);
    setSaveStatus((prev) => ({ ...prev, [sectionKey]: null }));
    const pb = getPocketBase();

    const section = sections.find((s) => s.section === sectionKey);
    if (!section) return;

    try {
      const formData = new FormData();
      formData.append("page", "about");
      formData.append("section", section.section);
      formData.append("title", section.title);
      formData.append("subtitle", section.subtitle || "");
      formData.append("content", section.content);
      formData.append("order", String(section.order));

      if (section.imageFile) {
        formData.append("image", section.imageFile);
      }

      if (section.id && !section.isNew) {
        await pb.collection("page_contents").update(section.id, formData);
      } else {
        const created = await pb.collection("page_contents").create(formData);
        setSections((prev) =>
          prev.map((s) =>
            s.section === sectionKey
              ? { ...s, id: created.id, collectionId: created.collectionId, isNew: false }
              : s
          )
        );
      }

      setSaveStatus((prev) => ({ ...prev, [sectionKey]: "success" }));
      // Update original state after successful save
      setOriginalSections(JSON.stringify(sections.map(s => ({
        section: s.section,
        title: s.title,
        subtitle: s.subtitle,
        content: s.content,
        imageFile: false,
      }))));
      setTimeout(() => {
        setSaveStatus((prev) => ({ ...prev, [sectionKey]: null }));
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setSaveStatus((prev) => ({ ...prev, [sectionKey]: "error" }));
    } finally {
      setSavingSection(null);
    }
  };

  const handleDeleteSection = async (sectionKey: string) => {
    const section = sections.find((s) => s.section === sectionKey);
    if (!section || !section.id) return;

    if (!confirm(`Êtes-vous sûr de vouloir supprimer la section "${section.title}" ?`)) {
      return;
    }

    setDeletingSection(sectionKey);
    const pb = getPocketBase();

    try {
      await pb.collection("page_contents").delete(section.id);
      setSections((prev) => prev.filter((s) => s.section !== sectionKey));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression de la section");
    } finally {
      setDeletingSection(null);
    }
  };

  const handleAddSection = () => {
    const newOrder = sections.length > 0 ? Math.max(...sections.map(s => s.order)) + 1 : 1;
    const newSectionKey = `section_${Date.now()}`;

    setSections((prev) => [
      ...prev,
      {
        section: newSectionKey,
        title: "Nouvelle section",
        subtitle: "",
        content: "",
        order: newOrder,
        isNew: true,
      },
    ]);
  };

  const handleImageChange = (sectionKey: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSections((prev) =>
        prev.map((s) =>
          s.section === sectionKey
            ? { ...s, imageFile: file, imagePreview: reader.result as string }
            : s
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const updateSection = (sectionKey: string, field: "title" | "subtitle" | "content" | "section", value: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.section === sectionKey ? { ...s, [field]: value } : s
      )
    );
  };

  const moveSection = (sectionKey: string, direction: "up" | "down") => {
    const index = sections.findIndex((s) => s.section === sectionKey);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];

    // Update order values
    const updatedSections = newSections.map((s, i) => ({ ...s, order: i + 1 }));
    setSections(updatedSections);
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
      {/* Unsaved Changes Modal */}
      <UnsavedChangesModal
        isOpen={showModal}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />

      {/* Unsaved Changes Banner */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-800 text-sm">
            <strong>Modifications non enregistrées</strong> - N&apos;oubliez pas de cliquer sur &quot;Enregistrer&quot; pour chaque section modifiée.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Page About Me</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gérez le contenu de votre page &quot;About Me&quot; - {sections.length} section(s)
          </p>
        </div>
        <button
          onClick={handleAddSection}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 mb-4">Aucune section trouvée</p>
          <button
            onClick={handleAddSection}
            className="px-6 py-3 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Créer la première section
          </button>
        </div>
      ) : (
        /* Sections */
        sections.map((section, index) => (
          <div
            key={section.section}
            className="bg-white rounded-xl border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {/* Move buttons */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveSection(section.section, "up")}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Monter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveSection(section.section, "down")}
                    disabled={index === sections.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Descendre"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h2 className="font-medium">{section.title || "Sans titre"}</h2>
                  <p className="text-xs text-gray-400">Section {index + 1} • {section.section}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteSection(section.section)}
                  disabled={deletingSection === section.section}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {deletingSection === section.section ? "Suppression..." : "Supprimer"}
                </button>
                <button
                  onClick={() => handleSaveSection(section.section)}
                  disabled={savingSection === section.section}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    saveStatus[section.section] === "success"
                      ? "bg-green-100 text-green-700"
                      : saveStatus[section.section] === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-black text-white hover:bg-gray-800"
                  } disabled:opacity-50`}
                >
                  {savingSection === section.section
                    ? "Enregistrement..."
                    : saveStatus[section.section] === "success"
                    ? "✓ Enregistré"
                    : saveStatus[section.section] === "error"
                    ? "Erreur"
                    : "Enregistrer"}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Text fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Identifiant de section</label>
                  <input
                    type="text"
                    value={section.section}
                    onChange={(e) => updateSection(section.section, "section", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors bg-gray-50 text-sm"
                    placeholder="ex: hero, qui_suis_je, debut..."
                  />
                  <p className="text-xs text-gray-400 mt-1">Utilisez &quot;hero&quot; pour la section d&apos;en-tête principale</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Titre</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.section, "title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Sous-titre (optionnel)</label>
                  <input
                    type="text"
                    value={section.subtitle || ""}
                    onChange={(e) => updateSection(section.section, "subtitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="Affiché en italique sous le titre"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Contenu</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(section.section, "content", e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Vous pouvez utiliser du HTML pour le formatage (ex: <p>...</p>, <br>, <strong>...)"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Image</label>
                <div
                  onClick={() => fileInputRefs.current[section.section]?.click()}
                  className="aspect-[4/5] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer overflow-hidden relative"
                >
                  {getSectionImageUrl(section) ? (
                    <Image
                      src={getSectionImageUrl(section)!}
                      alt={section.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Cliquez pour ajouter une image</span>
                    </div>
                  )}
                </div>
                <input
                  ref={(el) => {
                    fileInputRefs.current[section.section] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageChange(section.section, file);
                  }}
                />
                {(section.imagePreview || section.image) && (
                  <p className="text-xs text-gray-500 mt-2">
                    Cliquez sur l&apos;image pour la remplacer
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
        <strong>Conseils :</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>La section avec l&apos;identifiant <code className="bg-blue-100 px-1 rounded">hero</code> s&apos;affiche en haut de la page</li>
          <li>Les autres sections s&apos;affichent avec une alternance texte/image</li>
          <li>Utilisez les flèches pour réorganiser l&apos;ordre des sections</li>
          <li>N&apos;oubliez pas de cliquer sur &quot;Enregistrer&quot; après chaque modification</li>
        </ul>
      </div>
    </div>
  );
}
