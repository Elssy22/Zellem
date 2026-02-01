"use client";

import { useState } from "react";
import Link from "next/link";

interface GlossaryItem {
  term: string;
  definition: string;
  example?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const glossaryItems: GlossaryItem[] = [
  {
    term: "Hero",
    definition: "La section principale qui apparaît en haut d'une page, généralement avec un grand titre et une image de fond. C'est la première chose que les visiteurs voient.",
    example: "Sur la page d'accueil, le Hero contient votre nom \"ZELLEM\" et le slogan \"ART . LOVE . LIFE\".",
  },
  {
    term: "Section",
    definition: "Une partie distincte d'une page. Chaque section contient généralement un titre, du texte et parfois une image.",
    example: "La page \"About Me\" est composée de plusieurs sections : une présentation, votre parcours, votre philosophie, etc.",
  },
  {
    term: "En vedette",
    definition: "Les œuvres marquées \"en vedette\" apparaissent sur la page d'accueil dans la galerie principale. C'est un moyen de mettre en avant vos meilleures créations.",
    example: "Si vous cochez \"en vedette\" sur une œuvre, elle sera visible dès l'arrivée sur votre site.",
  },
  {
    term: "Disponible / Vendue",
    definition: "Le statut d'une œuvre. \"Disponible\" signifie qu'elle peut être achetée. \"Vendue\" signifie qu'elle a été acquise par un client.",
    example: "Une œuvre vendue reste visible sur le site mais affiche \"Vendue\" au lieu du prix.",
  },
  {
    term: "Slug",
    definition: "La partie de l'adresse web (URL) qui identifie une page. Il est généré automatiquement à partir du titre.",
    example: "Pour une œuvre \"Coucher de soleil\", le slug sera \"coucher-de-soleil\" et l'URL sera zellem.art/boutique/coucher-de-soleil",
  },
  {
    term: "SEO",
    definition: "\"Search Engine Optimization\" - Optimisation pour les moteurs de recherche. Ce sont les techniques pour que votre site apparaisse dans Google.",
    example: "Ajouter des descriptions et des titres pertinents améliore le SEO.",
  },
  {
    term: "Méta-description",
    definition: "Un court texte (150-160 caractères) qui décrit le contenu d'une page. Il apparaît dans les résultats de recherche Google sous le titre.",
    example: "\"Découvrez les œuvres uniques de Zellem, artiste peintre. Art contemporain, portraits et paysages.\"",
  },
  {
    term: "Catégorie",
    definition: "Un classement pour organiser vos œuvres par type ou style. Aide les visiteurs à filtrer et trouver ce qu'ils cherchent.",
    example: "Figuratif, Abstrait, Portrait, Paysage...",
  },
  {
    term: "Technique",
    definition: "Le médium ou la méthode utilisée pour créer l'œuvre.",
    example: "Acrylique sur toile, Huile sur bois, Aquarelle, Technique mixte...",
  },
  {
    term: "Dimensions",
    definition: "La taille de l'œuvre, généralement en centimètres (largeur x hauteur).",
    example: "60 x 80 cm, 100 x 120 cm...",
  },
  {
    term: "Thumbnail / Vignette",
    definition: "Une version réduite d'une image utilisée pour l'aperçu. Le site génère automatiquement des vignettes pour accélérer le chargement.",
    example: "Dans la grille de la boutique, vous voyez des vignettes. En cliquant, vous voyez l'image en grand.",
  },
  {
    term: "Dashboard",
    definition: "Le tableau de bord d'administration. C'est l'interface où vous gérez votre site (cette page fait partie du dashboard).",
    example: "Depuis le dashboard, vous pouvez ajouter des œuvres, modifier les textes, voir les statistiques...",
  },
  {
    term: "Média",
    definition: "Tout fichier image ou vidéo uploadé sur votre site.",
    example: "Les photos de vos œuvres, votre photo de profil, les images de la page About...",
  },
  {
    term: "Position / Ordre",
    definition: "Le numéro qui détermine l'ordre d'affichage des éléments. Plus le numéro est petit, plus l'élément apparaît en premier.",
    example: "Une œuvre en position 1 apparaîtra avant une œuvre en position 5.",
  },
  {
    term: "CGV",
    definition: "Conditions Générales de Vente. Document légal obligatoire pour tout site e-commerce qui explique les règles d'achat.",
    example: "Modalités de paiement, livraison, retours, garanties...",
  },
  {
    term: "Mentions légales",
    definition: "Informations obligatoires sur l'identité du propriétaire du site, l'hébergeur, etc.",
    example: "Nom, adresse, numéro SIRET, contact...",
  },
  {
    term: "Stock",
    definition: "La quantité d'exemplaires disponibles pour une œuvre. Pour les œuvres uniques, le stock est généralement de 1. Pour les reproductions ou tirages limités, il peut être plus élevé.",
    example: "Une œuvre originale a un stock de 1. Une série de 10 tirages numérotés a un stock de 10.",
  },
  {
    term: "Seuil d'alerte stock",
    definition: "Le niveau de stock en dessous duquel vous recevez une alerte sur le tableau de bord. Permet d'anticiper les ruptures de stock.",
    example: "Si vous définissez un seuil de 3, vous serez alerté quand il ne reste plus que 3 exemplaires ou moins.",
  },
  {
    term: "Rupture de stock",
    definition: "Quand le stock d'une œuvre atteint 0. Vous pouvez choisir d'afficher \"Rupture de stock\" ou \"Bientôt de retour\" selon si vous prévoyez de réapprovisionner.",
    example: "\"Bientôt de retour\" rassure le client qu'une nouvelle série est prévue.",
  },
  {
    term: "Statistiques",
    definition: "Les données de fréquentation et de comportement des visiteurs sur votre site. Inclut le nombre de visiteurs, les pages les plus vues, le temps passé, etc.",
    example: "Voir que 60% des visiteurs viennent de Google vous aide à comprendre l'importance du référencement.",
  },
  {
    term: "Taux de rebond",
    definition: "Le pourcentage de visiteurs qui quittent votre site après avoir vu une seule page, sans interagir. Un taux bas est généralement positif.",
    example: "Un taux de rebond de 30% signifie que 70% des visiteurs explorent plusieurs pages de votre site.",
  },
  {
    term: "Google Analytics",
    definition: "Un outil gratuit de Google qui permet de suivre les statistiques de votre site. Doit être configuré pour voir les données dans l'onglet Statistiques.",
    example: "Google Analytics vous montre d'où viennent vos visiteurs, quelles pages ils consultent, combien de temps ils restent.",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Comment ajouter une nouvelle œuvre ?",
    answer: "Allez dans \"Produits\" puis cliquez sur \"Ajouter un produit\". Remplissez le formulaire avec le titre, la description, le prix, et uploadez les photos. N'oubliez pas de cliquer sur \"Enregistrer\".",
  },
  {
    question: "Comment mettre une œuvre en vedette sur l'accueil ?",
    answer: "Allez dans \"Page d'accueil\" et dans la section \"Œuvres en vedette\", cliquez sur les œuvres que vous souhaitez mettre en avant. Vous pouvez en sélectionner jusqu'à 6.",
  },
  {
    question: "Comment modifier le texte de la page About Me ?",
    answer: "Allez dans \"About Me\" dans le menu. Vous verrez toutes les sections de la page. Cliquez sur une section pour modifier son titre, texte ou image. N'oubliez pas de sauvegarder.",
  },
  {
    question: "Comment changer l'ordre des œuvres dans la boutique ?",
    answer: "Allez dans \"Organiser\". Vous pouvez glisser-déposer les œuvres pour changer leur ordre, ou utiliser les flèches. Cliquez sur \"Sauvegarder les positions\" quand vous avez terminé.",
  },
  {
    question: "Comment marquer une œuvre comme vendue ?",
    answer: "Allez dans \"Produits\", trouvez l'œuvre concernée et cliquez sur le bouton \"Disponible\" pour le changer en \"Indisponible\". L'œuvre affichera alors \"Vendue\" sur le site.",
  },
  {
    question: "Comment supprimer une œuvre ?",
    answer: "Allez dans \"Produits\", trouvez l'œuvre et cliquez sur l'icône poubelle. Confirmez la suppression. Attention : cette action est irréversible.",
  },
  {
    question: "Les modifications sont-elles visibles immédiatement ?",
    answer: "Oui, dès que vous sauvegardez une modification, elle est visible sur le site public. Pensez à vérifier le rendu sur le site après vos modifications.",
  },
  {
    question: "Comment accéder au site public ?",
    answer: "Cliquez sur \"Voir le site\" dans le menu du dashboard, ou allez directement sur zellem.art dans votre navigateur.",
  },
  {
    question: "Comment gérer le stock d'une œuvre ?",
    answer: "Dans la fiche produit (Produits > cliquez sur une œuvre), vous trouverez une section \"Gestion du stock\". Indiquez la quantité en stock, le seuil d'alerte, et choisissez le message à afficher en cas de rupture.",
  },
  {
    question: "Comment voir les alertes de stock bas ?",
    answer: "Les alertes de stock apparaissent directement sur le tableau de bord (Dashboard) quand des produits ont un stock inférieur ou égal au seuil que vous avez défini. Vous pouvez aussi filtrer par \"Stock bas\" dans la liste des Produits.",
  },
  {
    question: "Comment voir les statistiques de mon site ?",
    answer: "Allez dans \"Statistiques\" dans le menu. Si Google Analytics n'est pas encore configuré, vous verrez un guide d'installation. Une fois configuré, vous verrez le nombre de visiteurs, les pages populaires, les sources de trafic, etc.",
  },
  {
    question: "Quelle est la différence entre \"Rupture de stock\" et \"Bientôt de retour\" ?",
    answer: "\"Rupture de stock\" indique simplement que l'œuvre n'est plus disponible. \"Bientôt de retour\" suggère qu'un réapprovisionnement est prévu (par exemple pour des reproductions ou tirages). Choisissez selon votre situation.",
  },
  {
    question: "Les œuvres originales sont-elles toujours en stock 1 ?",
    answer: "Généralement oui, car une œuvre originale est unique. Mais si vous vendez des reproductions, tirages numérotés ou prints, vous pouvez mettre un stock plus élevé. Le système s'adapte à votre modèle de vente.",
  },
];

export default function AidePage() {
  const [activeTab, setActiveTab] = useState<"glossaire" | "faq" | "guide">("glossaire");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredGlossary = glossaryItems.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light tracking-wide">Aide & Documentation</h1>
        <p className="text-gray-500 text-sm mt-1">
          Tout ce que vous devez savoir pour gérer votre site
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab("glossaire")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeTab === "glossaire"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Glossaire
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeTab === "faq"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Questions fréquentes
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeTab === "guide"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Guide rapide
        </button>
      </div>

      {/* Search */}
      {(activeTab === "glossaire" || activeTab === "faq") && (
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
          />
        </div>
      )}

      {/* Glossaire Tab */}
      {activeTab === "glossaire" && (
        <div className="space-y-4">
          {filteredGlossary.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucun terme trouvé pour "{searchTerm}"
            </div>
          ) : (
            filteredGlossary.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <h3 className="font-medium text-lg mb-2">{item.term}</h3>
                <p className="text-gray-600 mb-3">{item.definition}</p>
                {item.example && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <span className="font-medium text-gray-500">Exemple : </span>
                    <span className="text-gray-600">{item.example}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="space-y-3">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucune question trouvée pour "{searchTerm}"
            </div>
          ) : (
            filteredFAQ.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-5 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Guide Tab */}
      {activeTab === "guide" && (
        <div className="space-y-6">
          {/* Quick Start */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-medium text-lg mb-4">Démarrage rapide</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ajoutez vos œuvres</h3>
                  <p className="text-gray-600 text-sm">
                    Allez dans <Link href="/admin/produits" className="text-black underline">Produits</Link> et
                    cliquez sur "Ajouter un produit". Remplissez les informations et uploadez de belles photos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Personnalisez votre page d'accueil</h3>
                  <p className="text-gray-600 text-sm">
                    Dans <Link href="/admin/home" className="text-black underline">Page d'accueil</Link>,
                    modifiez le texte du Hero et sélectionnez les œuvres à mettre en vedette.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Racontez votre histoire</h3>
                  <p className="text-gray-600 text-sm">
                    Complétez la page <Link href="/admin/about" className="text-black underline">About Me</Link> avec
                    votre parcours, votre philosophie artistique et vos photos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-1">Organisez votre galerie</h3>
                  <p className="text-gray-600 text-sm">
                    Utilisez la page <Link href="/admin/organiser" className="text-black underline">Organiser</Link> pour
                    définir l'ordre d'affichage de vos œuvres dans la boutique.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  5
                </div>
                <div>
                  <h3 className="font-medium mb-1">Gérez vos stocks</h3>
                  <p className="text-gray-600 text-sm">
                    Dans chaque fiche produit, définissez le stock disponible et le seuil d'alerte.
                    Les alertes apparaissent sur le <Link href="/admin" className="text-black underline">Dashboard</Link>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  6
                </div>
                <div>
                  <h3 className="font-medium mb-1">Suivez vos statistiques</h3>
                  <p className="text-gray-600 text-sm">
                    Consultez les <Link href="/admin/stats" className="text-black underline">Statistiques</Link> pour
                    voir le nombre de visiteurs, les pages populaires et comprendre votre audience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="font-medium text-lg mb-4 text-blue-800">Conseils pour un site réussi</h2>
            <ul className="space-y-3 text-blue-700 text-sm">
              <li className="flex gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Photos de qualité :</strong> Utilisez des photos bien éclairées et nettes de vos œuvres. C'est ce qui attire les acheteurs.</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Descriptions détaillées :</strong> Décrivez l'histoire derrière chaque œuvre, votre inspiration, les techniques utilisées.</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Mettez à jour régulièrement :</strong> Ajoutez de nouvelles œuvres et actualisez les statuts (vendu/disponible).</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Page About authentique :</strong> Les collectionneurs aiment connaître l'artiste. Partagez votre histoire personnelle.</span>
              </li>
            </ul>
          </div>

          {/* Navigation du dashboard */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-medium text-lg mb-4">Navigation du Dashboard</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/admin" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Tableau de bord</h3>
                <p className="text-gray-500 text-sm">Vue d'ensemble, alertes de stock et accès rapide aux fonctions principales.</p>
              </Link>
              <Link href="/admin/stats" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Statistiques</h3>
                <p className="text-gray-500 text-sm">Visiteurs, pages populaires, sources de trafic et données Google Analytics.</p>
              </Link>
              <Link href="/admin/home" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Page d'accueil</h3>
                <p className="text-gray-500 text-sm">Modifiez le Hero et sélectionnez les œuvres en vedette.</p>
              </Link>
              <Link href="/admin/about" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">About Me</h3>
                <p className="text-gray-500 text-sm">Gérez les sections de votre page de présentation.</p>
              </Link>
              <Link href="/admin/produits" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Produits</h3>
                <p className="text-gray-500 text-sm">Ajoutez, modifiez vos œuvres et gérez les stocks.</p>
              </Link>
              <Link href="/admin/organiser" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Organiser</h3>
                <p className="text-gray-500 text-sm">Changez l'ordre d'affichage des œuvres par glisser-déposer.</p>
              </Link>
              <Link href="/admin/media" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Médias</h3>
                <p className="text-gray-500 text-sm">Gérez toutes vos images et vidéos.</p>
              </Link>
              <Link href="/admin/legales" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium mb-1">Pages légales</h3>
                <p className="text-gray-500 text-sm">Modifiez les CGV, mentions légales et politique de confidentialité.</p>
              </Link>
              <div className="block p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium mb-1 text-green-800">Aide (vous êtes ici)</h3>
                <p className="text-green-600 text-sm">Glossaire, FAQ et guide d'utilisation.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact support */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <h3 className="font-medium mb-2">Besoin d'aide supplémentaire ?</h3>
        <p className="text-gray-500 text-sm mb-4">
          Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à contacter le support.
        </p>
        <a
          href="mailto:support@zellem.art"
          className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contacter le support
        </a>
      </div>
    </div>
  );
}
