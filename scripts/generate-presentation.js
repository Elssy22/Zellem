const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Créer le document PDF
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

// Fichier de sortie
const outputPath = path.join(__dirname, '../Zellem-Presentation.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Couleurs
const colors = {
  black: '#000000',
  gray: '#666666',
  lightGray: '#999999',
  accent: '#333333'
};

// Helper pour ajouter une section
function addSection(title, yOffset = 30) {
  doc.moveDown(1.5);
  doc.fontSize(16).fillColor(colors.black).font('Helvetica-Bold');
  doc.text(title.toUpperCase(), { continued: false });
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
}

// Helper pour ajouter un item de liste
function addListItem(text, indent = 20) {
  doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
  doc.text(`• ${text}`, { indent: indent });
}

// ===== PAGE 1: COUVERTURE =====
doc.fontSize(12).fillColor(colors.lightGray).font('Helvetica');
doc.text('PRÉSENTATION DE PROJET', 50, 100, { align: 'center' });

doc.fontSize(48).fillColor(colors.black).font('Helvetica-Bold');
doc.text('ZELLEM', 50, 200, { align: 'center' });

doc.fontSize(14).fillColor(colors.lightGray).font('Helvetica');
doc.text('ART . LOVE . LIFE', 50, 270, { align: 'center' });

doc.fontSize(12).fillColor(colors.gray).font('Helvetica');
doc.text('Site Portfolio & E-commerce pour Artiste', 50, 350, { align: 'center' });

doc.fontSize(10).fillColor(colors.lightGray);
doc.text('Document généré le ' + new Date().toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}), 50, 700, { align: 'center' });

// ===== PAGE 2: PRÉSENTATION GÉNÉRALE =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Présentation Générale', 50, 50);

doc.moveDown(1);
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
doc.text(
  'Zellem est un site web moderne conçu pour mettre en valeur le travail artistique et permettre la vente directe d\'œuvres d\'art. Le site combine une vitrine élégante avec une boutique en ligne complète et un système d\'administration puissant.',
  { lineGap: 5 }
);

addSection('Objectifs du Projet');
addListItem('Créer une présence en ligne professionnelle pour l\'artiste');
addListItem('Permettre la vente directe d\'œuvres originales');
addListItem('Offrir une expérience utilisateur fluide et immersive');
addListItem('Faciliter la gestion du catalogue et des contenus');
addListItem('Optimiser le référencement (SEO) pour une meilleure visibilité');

addSection('Public Cible');
addListItem('Collectionneurs d\'art contemporain');
addListItem('Amateurs d\'art à la recherche d\'œuvres originales');
addListItem('Galeries et professionnels du monde de l\'art');
addListItem('Grand public intéressé par l\'art et la décoration');

// ===== PAGE 3: FONCTIONNALITÉS =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Fonctionnalités', 50, 50);

addSection('Site Public (Frontend)');
addListItem('Page d\'accueil avec animation d\'introduction et effet vapeur');
addListItem('Galerie d\'œuvres avec effet de zoom au scroll (mobile)');
addListItem('Effet de survol élégant sur desktop');
addListItem('Fiche produit détaillée avec informations complètes');
addListItem('Panier d\'achat avec persistance locale');
addListItem('Page de checkout pour finaliser les commandes');
addListItem('Page À propos pour présenter l\'artiste');
addListItem('Formulaire de contact');
addListItem('Pages légales (CGV, Mentions légales, Confidentialité)');

addSection('Panneau d\'Administration (Backend)');
addListItem('Dashboard avec statistiques et actions rapides');
addListItem('Gestion complète des produits (CRUD)');
addListItem('Upload d\'images multiples par œuvre');
addListItem('Organisateur drag-and-drop pour réordonner les œuvres');
addListItem('Bibliothèque de médias centralisée');
addListItem('Édition des contenus des pages (Accueil, À propos)');
addListItem('Système de tags pour le SEO');
addListItem('Authentification sécurisée');

// ===== PAGE 4: ARCHITECTURE TECHNIQUE =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Architecture Technique', 50, 50);

addSection('Stack Technologique');

doc.fontSize(12).fillColor(colors.accent).font('Helvetica-Bold');
doc.text('Frontend', { indent: 20 });
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
addListItem('Next.js 16 - Framework React avec App Router', 40);
addListItem('React 18 - Bibliothèque UI', 40);
addListItem('TypeScript - Typage statique', 40);
addListItem('Tailwind CSS 3 - Styling utilitaire', 40);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(colors.accent).font('Helvetica-Bold');
doc.text('Backend', { indent: 20 });
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
addListItem('PocketBase - Backend as a Service (BaaS)', 40);
addListItem('SQLite - Base de données intégrée', 40);
addListItem('API REST automatique', 40);
addListItem('Système de fichiers pour les médias', 40);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(colors.accent).font('Helvetica-Bold');
doc.text('Infrastructure', { indent: 20 });
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
addListItem('Cloudflare Tunnels - Accès distant sécurisé', 40);
addListItem('Hébergement flexible (Vercel, Netlify, VPS)', 40);

addSection('Structure des Données');
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
doc.text('Collections PocketBase :', { indent: 20 });
addListItem('artworks - Œuvres d\'art (titre, images, prix, description, tags, position)', 40);
addListItem('page_contents - Contenus éditables des pages', 40);
addListItem('media - Bibliothèque de médias centralisée', 40);
addListItem('users - Administrateurs', 40);

// ===== PAGE 5: PAGES DU SITE =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Structure du Site', 50, 50);

addSection('Pages Publiques');

const pages = [
  { url: '/', name: 'Accueil', desc: 'Page principale avec hero, intro animée et galerie d\'œuvres' },
  { url: '/boutique', name: 'Boutique', desc: 'Catalogue complet de toutes les œuvres disponibles' },
  { url: '/boutique/[id]', name: 'Détail Œuvre', desc: 'Fiche complète avec image, prix, description et achat' },
  { url: '/about', name: 'À propos', desc: 'Présentation de l\'artiste et de sa démarche' },
  { url: '/contact', name: 'Contact', desc: 'Formulaire pour contacter l\'artiste' },
  { url: '/checkout', name: 'Checkout', desc: 'Finalisation de commande' },
  { url: '/cgv', name: 'CGV', desc: 'Conditions générales de vente' },
  { url: '/mentions-legales', name: 'Mentions légales', desc: 'Informations légales obligatoires' },
  { url: '/confidentialite', name: 'Confidentialité', desc: 'Politique de confidentialité RGPD' },
];

pages.forEach(page => {
  doc.fontSize(11).fillColor(colors.accent).font('Helvetica-Bold');
  doc.text(`${page.name}`, { indent: 20, continued: true });
  doc.fillColor(colors.lightGray).font('Helvetica');
  doc.text(` (${page.url})`, { continued: false });
  doc.fillColor(colors.gray);
  doc.text(page.desc, { indent: 40 });
  doc.moveDown(0.3);
});

addSection('Pages Administration');

const adminPages = [
  { url: '/admin', name: 'Dashboard', desc: 'Tableau de bord avec statistiques et raccourcis' },
  { url: '/admin/produits', name: 'Produits', desc: 'Liste et gestion de toutes les œuvres' },
  { url: '/admin/produits/nouveau', name: 'Nouveau Produit', desc: 'Création d\'une nouvelle œuvre' },
  { url: '/admin/organiser', name: 'Organiser', desc: 'Réorganisation par glisser-déposer' },
  { url: '/admin/media', name: 'Médias', desc: 'Bibliothèque de tous les fichiers' },
  { url: '/admin/home', name: 'Page Accueil', desc: 'Édition du contenu de la page d\'accueil' },
  { url: '/admin/about', name: 'Page À propos', desc: 'Édition de la page de présentation' },
];

adminPages.forEach(page => {
  doc.fontSize(11).fillColor(colors.accent).font('Helvetica-Bold');
  doc.text(`${page.name}`, { indent: 20, continued: true });
  doc.fillColor(colors.lightGray).font('Helvetica');
  doc.text(` (${page.url})`, { continued: false });
  doc.fillColor(colors.gray);
  doc.text(page.desc, { indent: 40 });
  doc.moveDown(0.3);
});

// ===== PAGE 6: DESIGN & UX =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Design & Expérience Utilisateur', 50, 50);

addSection('Identité Visuelle');
addListItem('Style minimaliste et épuré inspiré de Squarespace');
addListItem('Palette monochrome : noir, blanc, gris');
addListItem('Typographie élégante avec espacement généreux');
addListItem('Mise en valeur maximale des œuvres d\'art');
addListItem('Animations subtiles et fluides');

addSection('Expérience Mobile');
addListItem('Design responsive adapté à tous les écrans');
addListItem('Navigation simplifiée sur mobile');
addListItem('Effet de zoom au scroll sur les œuvres');
addListItem('Titres encadrés sous chaque œuvre');
addListItem('Touch-friendly : boutons et zones de clic adaptés');

addSection('Expérience Desktop');
addListItem('Grille de 3 colonnes pour la galerie');
addListItem('Effet de survol avec overlay et titre centré');
addListItem('Zoom subtil sur les images au survol');
addListItem('Navigation fluide entre les pages');

addSection('Performance');
addListItem('Chargement progressif des images');
addListItem('Animation d\'introduction avec effet vapeur');
addListItem('Transitions CSS optimisées');
addListItem('Rendu côté client pour une interactivité maximale');

// ===== PAGE 7: SEO =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Référencement (SEO)', 50, 50);

addSection('Optimisations Mises en Place');
addListItem('Meta tags dynamiques par page (title, description)');
addListItem('Open Graph pour le partage sur les réseaux sociaux');
addListItem('Twitter Cards pour une meilleure visibilité');
addListItem('Système de tags personnalisés par œuvre');
addListItem('URLs propres et descriptives');
addListItem('Structure HTML sémantique (h1, h2, article, etc.)');
addListItem('Textes alternatifs sur toutes les images');

addSection('Métadonnées Générées');
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
doc.text('Pour chaque page produit, les métadonnées suivantes sont générées automatiquement :', { indent: 20 });
doc.moveDown(0.5);
addListItem('og:title - Titre de l\'œuvre | Zellem Art', 40);
addListItem('og:description - Description ou texte par défaut', 40);
addListItem('og:image - Image principale de l\'œuvre', 40);
addListItem('og:type - "product" pour les œuvres', 40);
addListItem('twitter:card - "summary_large_image"', 40);
addListItem('keywords - Tags de l\'œuvre', 40);

// ===== PAGE 8: DÉPLOIEMENT =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Déploiement & Maintenance', 50, 50);

addSection('Prérequis');
addListItem('Node.js 18+ installé');
addListItem('PocketBase installé et configuré');
addListItem('Compte Cloudflare (optionnel, pour les tunnels)');

addSection('Installation');
doc.fontSize(10).fillColor(colors.accent).font('Courier');
doc.text('# Cloner le projet', { indent: 20 });
doc.text('git clone [repository-url]', { indent: 20 });
doc.text('cd zellem', { indent: 20 });
doc.moveDown(0.3);
doc.text('# Installer les dépendances', { indent: 20 });
doc.text('npm install', { indent: 20 });
doc.moveDown(0.3);
doc.text('# Lancer en développement', { indent: 20 });
doc.text('npm run dev', { indent: 20 });
doc.moveDown(0.3);
doc.text('# Lancer PocketBase', { indent: 20 });
doc.text('./pocketbase serve', { indent: 20 });

addSection('Variables d\'Environnement');
doc.fontSize(10).fillColor(colors.accent).font('Courier');
doc.text('# .env.local', { indent: 20 });
doc.text('NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090', { indent: 20 });
doc.text('NEXT_PUBLIC_SITE_URL=http://localhost:3000', { indent: 20 });

addSection('Commandes Utiles');
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
addListItem('npm run dev - Lancer le serveur de développement');
addListItem('npm run build - Construire pour la production');
addListItem('npm run start - Lancer en production');

// ===== PAGE 9: CONTACT =====
doc.addPage();

doc.fontSize(24).fillColor(colors.black).font('Helvetica-Bold');
doc.text('Contact & Support', 50, 50);

doc.moveDown(2);
doc.fontSize(14).fillColor(colors.gray).font('Helvetica');
doc.text('Pour toute question technique ou demande de modification,', { align: 'center' });
doc.text('n\'hésitez pas à me contacter.', { align: 'center' });

doc.moveDown(3);
doc.fontSize(12).fillColor(colors.black).font('Helvetica-Bold');
doc.text('ZELLEM', { align: 'center' });
doc.fontSize(11).fillColor(colors.gray).font('Helvetica');
doc.text('Site Portfolio & E-commerce', { align: 'center' });

doc.moveDown(4);
doc.fontSize(10).fillColor(colors.lightGray).font('Helvetica');
doc.text('Document créé avec PDFKit', { align: 'center' });
doc.text('Projet développé avec Next.js, React & PocketBase', { align: 'center' });

// Finaliser le PDF
doc.end();

console.log(`\n✅ PDF généré avec succès !`);
console.log(`📄 Fichier : ${outputPath}\n`);
