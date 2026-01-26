"use client";

import { useState, useEffect, useRef } from "react";
import { getPocketBase } from "@/lib/pocketbase";

interface AboutSection {
  id?: string;
  section: string;
  title: string;
  content: string;
  image?: string;
  imageFile?: File;
  imagePreview?: string;
}

const defaultSections: AboutSection[] = [
  {
    section: "hero",
    title: "L'ART DE L'INVISIBLE",
    content: "Je peins ce que les mots taisent. Ce que l'on ressent sans toujours savoir dire.",
  },
  {
    section: "qui_suis_je",
    title: "QUI SUIS-JE",
    content: "Je suis une artiste passionnée...",
  },
  {
    section: "debut",
    title: "LE DÉBUT",
    content: "Mon parcours artistique a commencé...",
  },
  {
    section: "renaissance",
    title: "LA RENAISSANCE",
    content: "Après une période de réflexion...",
  },
  {
    section: "invitation",
    title: "UNE INVITATION À LA RÉFLEXION",
    content: "Chaque œuvre est une invitation...",
  },
];

export default function AdminAboutPage() {
  const [sections, setSections] = useState<AboutSection[]>(defaultSections);
  const [isLoading, setIsLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<Record<string, "success" | "error" | null>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      const pb = getPocketBase();

      try {
        const contents = await pb.collection("page_contents").getList(1, 50, {
          filter: 'page = "about"',
        });

        if (contents.items.length > 0) {
          const loadedSections = defaultSections.map((defaultSection) => {
            const found = contents.items.find(
              (item) => item.section === defaultSection.section
            );
            if (found) {
              return {
                id: found.id,
                section: defaultSection.section,
                title: (found.title as string) || defaultSection.title,
                content: (found.content as string) || defaultSection.content,
                image: found.image as string | undefined,
              };
            }
            return defaultSection;
          });
          setSections(loadedSections);
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
      formData.append("content", section.content);

      if (section.imageFile) {
        formData.append("image", section.imageFile);
      }

      if (section.id) {
        await pb.collection("page_contents").update(section.id, formData);
      } else {
        formData.append("order", String(defaultSections.findIndex((s) => s.section === sectionKey) + 1));
        const created = await pb.collection("page_contents").create(formData);
        setSections((prev) =>
          prev.map((s) =>
            s.section === sectionKey ? { ...s, id: created.id } : s
          )
        );
      }

      setSaveStatus((prev) => ({ ...prev, [sectionKey]: "success" }));
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

  const updateSection = (sectionKey: string, field: "title" | "content", value: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.section === sectionKey ? { ...s, [field]: value } : s
      )
    );
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
        <h1 className="text-2xl font-light tracking-wide">Page À propos</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez le contenu de votre page &quot;Qui est Zellem&quot;
        </p>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.section}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium">{section.title}</h2>
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* Text fields */}
            <div className="space-y-4">
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
                <label className="block text-sm text-gray-600 mb-2">Contenu</label>
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.section, "content", e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Image</label>
              <div
                onClick={() => fileInputRefs.current[section.section]?.click()}
                className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer overflow-hidden"
              >
                {section.imagePreview || section.image ? (
                  <img
                    src={
                      section.imagePreview ||
                      `${process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"}/api/files/page_contents/${section.id}/${section.image}`
                    }
                    alt={section.title}
                    className="w-full h-full object-cover"
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
      ))}
    </div>
  );
}
