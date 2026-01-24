# Zellem - Site Portfolio Artiste Peintre

Site web portfolio pour l'artiste peintre Zellem.

**Art . Love . Life**

## 🎨 Fonctionnalités

- **Page d'accueil** : Présentation de l'artiste avec œuvres à la une
- **Qui est Zellem** : Biographie et parcours artistique
- **Boutique** : Galerie en mosaïque avec filtres (catégorie, technique, disponibilité)
- **Fiches produits** : Détail des œuvres avec photos, description, technique, prix
- **Contact** : Formulaire de contact et FAQ

## 🛠 Technologies

- **Frontend** : Next.js 15, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Backend** : PocketBase (à configurer)
- **Déploiement** : Vercel (recommandé)

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/Elssy22/Zellem.git
cd zellem

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration PocketBase

### Installation de PocketBase

1. Télécharger PocketBase depuis [pocketbase.io](https://pocketbase.io/)
2. Extraire et lancer PocketBase :

```bash
./pocketbase serve
```

PocketBase sera accessible sur [http://127.0.0.1:8090](http://127.0.0.1:8090)

### Collections à créer

#### `artworks` (Œuvres)

| Champ | Type | Description |
|-------|------|-------------|
| title | Text | Titre de l'œuvre |
| description | Text (long) | Description détaillée |
| technique | Text | Technique utilisée |
| dimensions | Text | Dimensions (ex: "65 x 92 cm") |
| price | Number | Prix en euros |
| available | Boolean | Disponible à la vente |
| images | File (multiple) | Images de l'œuvre |
| category | Text | Catégorie (Portrait, Abstrait, etc.) |
| year | Number | Année de création |
| featured | Boolean | Mise en avant |

#### `contact_messages` (Messages)

| Champ | Type | Description |
|-------|------|-------------|
| name | Text | Nom du visiteur |
| email | Email | Email |
| subject | Text | Sujet |
| message | Text (long) | Message |
| read | Boolean | Lu par l'admin |

#### `site_settings` (Paramètres)

| Champ | Type | Description |
|-------|------|-------------|
| siteName | Text | Nom du site |
| tagline | Text | Slogan |
| description | Text (long) | Description SEO |
| email | Email | Email de contact |
| instagram | URL | Lien Instagram |
| aboutText | Text (long) | Texte de présentation |

## 📁 Structure du projet

```
zellem/
├── public/
│   └── images/          # Images statiques
├── src/
│   ├── app/             # Pages Next.js (App Router)
│   │   ├── about/       # Page "Qui est Zellem"
│   │   ├── boutique/    # Galerie et fiches produits
│   │   ├── contact/     # Page de contact
│   │   ├── layout.tsx   # Layout principal
│   │   └── page.tsx     # Page d'accueil
│   ├── components/      # Composants React
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/             # Utilitaires et services
│   │   ├── pocketbase.ts
│   │   └── utils.ts
│   ├── styles/          # Styles globaux
│   └── types/           # Types TypeScript
└── ...
```

## 🚀 Déploiement

### Vercel (recommandé)

1. Pusher le code sur GitHub
2. Connecter le repository à Vercel
3. Configurer les variables d'environnement
4. Déployer

### Variables d'environnement

```env
NEXT_PUBLIC_POCKETBASE_URL=https://votre-pocketbase.com
NEXT_PUBLIC_SITE_URL=https://votre-site.com
```

## 📝 TODO

- [ ] Configurer PocketBase en production
- [ ] Ajouter les vraies images des œuvres
- [ ] Intégrer un système de paiement (Stripe)
- [ ] Ajouter le dashboard admin
- [ ] Optimiser le SEO
- [ ] Ajouter les analytics

## 🎨 Design

Le design s'inspire du template Squarespace "Novo" avec :
- Navigation minimaliste
- Galerie en mosaïque responsive
- Animations subtiles au scroll
- Typographie élégante (Inter + Playfair Display)

## 📄 Licence

© 2024 Zellem. Tous droits réservés.

---

Développé avec ❤️ pour Zellem
