"use client";

import { useState, useEffect } from "react";
import { getPocketBase } from "@/lib/pocketbase";

interface LegalPage {
  id?: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated?: string;
}

const defaultPages: LegalPage[] = [
  {
    slug: "cgv",
    title: "Conditions Générales de Vente",
    content: "",
  },
  {
    slug: "mentions-legales",
    title: "Mentions Légales",
    content: "",
  },
  {
    slug: "confidentialite",
    title: "Politique de Confidentialité",
    content: "",
  },
];

export default function AdminLegalesPage() {
  const [pages, setPages] = useState<LegalPage[]>(defaultPages);
  const [activePage, setActivePage] = useState<string>("cgv");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const fetchPages = async () => {
      const pb = getPocketBase();

      try {
        const results = await pb.collection("legal_pages").getFullList();

        const loadedPages = defaultPages.map((defaultPage) => {
          const found = results.find((r) => r.slug === defaultPage.slug);
          if (found) {
            return {
              id: found.id,
              slug: defaultPage.slug,
              title: (found.title as string) || defaultPage.title,
              content: (found.content as string) || "",
              lastUpdated: found.updated,
            };
          }
          return defaultPage;
        });

        setPages(loadedPages);
      } catch (error) {
        // Collection n'existe pas encore, utiliser les valeurs par défaut
        console.log("Legal pages collection not found, using defaults");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    const pb = getPocketBase();

    const currentPage = pages.find((p) => p.slug === activePage);
    if (!currentPage) return;

    try {
      if (currentPage.id) {
        await pb.collection("legal_pages").update(currentPage.id, {
          title: currentPage.title,
          content: currentPage.content,
        });
      } else {
        const created = await pb.collection("legal_pages").create({
          slug: currentPage.slug,
          title: currentPage.title,
          content: currentPage.content,
        });

        setPages((prev) =>
          prev.map((p) =>
            p.slug === activePage ? { ...p, id: created.id } : p
          )
        );
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

  const updatePageContent = (content: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.slug === activePage ? { ...p, content } : p
      )
    );
  };

  const currentPage = pages.find((p) => p.slug === activePage);

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
      <div>
        <h1 className="text-2xl font-light tracking-wide">Pages Légales</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez le contenu de vos pages légales
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        {pages.map((page) => (
          <button
            key={page.slug}
            onClick={() => setActivePage(page.slug)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activePage === page.slug
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page.title}
          </button>
        ))}
      </div>

      {/* Editor */}
      {currentPage && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-medium">{currentPage.title}</h2>
              {currentPage.lastUpdated && (
                <p className="text-gray-500 text-xs mt-1">
                  Dernière modification:{" "}
                  {new Date(currentPage.lastUpdated).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`/${currentPage.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Voir la page →
              </a>

              <button
                onClick={handleSave}
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
          </div>

          {/* Content editor */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Contenu (HTML supporté)
              </label>
              <textarea
                value={currentPage.content}
                onChange={(e) => updatePageContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-sm resize-none"
                placeholder={`Entrez le contenu de la page "${currentPage.title}"...

Vous pouvez utiliser du HTML pour mettre en forme le texte.

Exemple:
<h2>Section 1</h2>
<p>Texte de la section...</p>

<h2>Section 2</h2>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
</ul>`}
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Aide HTML</h3>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600">
                <div>
                  <p className="font-medium mb-1">Titres</p>
                  <code className="text-gray-800">&lt;h2&gt;Titre&lt;/h2&gt;</code>
                </div>
                <div>
                  <p className="font-medium mb-1">Paragraphe</p>
                  <code className="text-gray-800">&lt;p&gt;Texte...&lt;/p&gt;</code>
                </div>
                <div>
                  <p className="font-medium mb-1">Gras</p>
                  <code className="text-gray-800">&lt;strong&gt;texte&lt;/strong&gt;</code>
                </div>
                <div>
                  <p className="font-medium mb-1">Liste</p>
                  <code className="text-gray-800">&lt;ul&gt;&lt;li&gt;item&lt;/li&gt;&lt;/ul&gt;</code>
                </div>
                <div>
                  <p className="font-medium mb-1">Lien</p>
                  <code className="text-gray-800">&lt;a href=&quot;url&quot;&gt;texte&lt;/a&gt;</code>
                </div>
                <div>
                  <p className="font-medium mb-1">Saut de ligne</p>
                  <code className="text-gray-800">&lt;br /&gt;</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Note importante</p>
            <p>
              Les pages légales actuelles utilisent des composants React. Les modifications effectuées ici
              ne seront visibles que si vous connectez cette interface à un système de rendu dynamique.
              Pour l&apos;instant, modifiez directement les fichiers source dans <code className="bg-blue-100 px-1 rounded">src/app/cgv/page.tsx</code>, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
