# Portfolio

Portfolio moderne, épuré, ultra-performant et de haute fidélité conçu pour présenter l'expertise et ma trajectoire, futur ingénieur spécialisé en **Ingénierie SysOps & Architectures Cloud** (alternant chez **Cloud Temple**).

Ce projet respecte les meilleurs standards en ingénierie logicielle : séparation stricte des préoccupations (segmentation de code experte), conformité absolue d'accessibilité (WCAG), métadonnées SEO complètes facilitant la classification par les moteurs de recherche et les passerelles de filtrage web, et une interface fluide traduisible à la volée en **Français (FR)**, **Anglais (EN)** et **Espagnol (ES)**.

---

## 🔒 Résolution du Filtrage Sophos Web Protection / "Sans catégorie"

Si des utilisateurs ou des passerelles de sécurité réseau rencontrent une alerte **Sophos Web Protection** indiquant que le domaine `http://melvincureau.com/` appartient à la catégorie **"Sans catégorie" (Uncategorized)**, cela est dû à l'absence d'historique de réputation d'un nom de domaine récent sur les bases de données d'analyse (Sophos Labs, FortiGuard, Palo Alto URL Filtering, etc.).

Pour y remédier définitivement, suivez cette démarche officielle de soumission :

1. **Soumission chez Sophos Labs** :
   * Rendez-vous sur le portail officiel : [Sophos Intelix / Submission Portal](https://support.sophos.com/) ou directly [Sophos Web Security Request](https://www.sophos.com/en-us/support/submit-a-sample.aspx).
   * Sélectionnez **"URL / Web Rating"**.
   * Saisissez `http://melvincureau.com/` et `https://melvincureau.com/`.
   * Suggérez les catégories appropriées : **"Personal / Portfolio"**, **"Information Technology"**, ou **"Business / Professional"**.
   * Indiquez une brève description : *"My professional student portfolio website presenting resume, cloud engineering skills, and contact form."*
   * Soumettez. Sophos procède généralement à la re-classification automatique sous 24 à 48 heures.

2. **Soumission multi-moteurs complémentaires** :
   * **FortiGuard Labs** : [fortiguard.com/faq/wrating](https://www.fortiguard.com/faq/wrating) (Catégorie : *Personal Vehicles/Websites* ou *Information Technology*).
   * **Palo Alto Networks** : [urlfiltering.paloaltonetworks.com](https://urlfiltering.paloaltonetworks.com/) (Catégorie : *Computer and Internet Info*).
   * **Symantec / Broadcom WebPulse** : [sitereview.bluecoat.com](https://sitereview.bluecoat.com/).

*Note : Les balises de metadata complètes (Dublin Core, OpenGraph et Rich Schema.org Person JSON-LD) ont été injectées à la tête de la page html pour aider les robots de crawling de Sophos à classifier instantanément le site comme un portfolio technologique sûr.*

---

## 🚀 Fonctionnalités Clés

### 1. Traduction Multilingue Intégrale (Français, Anglais, Espagnol)
* Basculer à la volée entre les trois langues via un sélecteur d'interface minimaliste placé dans le header d'en-tête.
* Dictionnaire de traduction robuste avec alignement parfait de l'expérience utilisateur et des labels techniques.

### 2. Parcours & Curriculum Vitae Interactif
* **Sélecteur par catégories** : visionnez les expériences professionnelles, les formations académiques ou le spectre global des compétences en un seul clic.
* **Système "Voir plus" d'expansion dynamique** : Un accordéon intelligent préserve la compacité de l'affichage initial tout en permettant de déplier la totalité de l'historique et des formations d'un simple clic.
* **Badges de Certifications d'Architecture** : mise en valeur des accréditations professionnelles comme *Microsoft Azure Fundamentals (AZ-900)* en cours d'acquisition.

### 3. Intégration Dynamique des Dépôts Publics GitHub
* L'application récupère en temps réel les **Pinned Repositories (Dépôts épinglés)** de Melvin via l'API REST de GitHub et les affiche sous forme de cartes d'ingénierie soignées, complétées par leurs badges de langages de programmation, le nombre d'étoiles, et des liens vers les dépôts.

### 4. Formulaire d'Acheminement Direct & Contact
* Un formulaire de contact fluide, validé et stylisé permettant d'échanger avec Melvin. Équipé d'indisponibilités simulées d'acheminement, de validations de champs et d'un retour d'état instantané dans le respect de l'identité épurée.

---

## 🛠️ Stack Technique & Segmentation de Code

L'application utilise une architecture Single Page Application (SPA) ultra-rapide, modulaire et structurée pour maximiser la propreté du code :

* **Framework** : [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System** : [Vite](https://vite.dev/) pour un chargement et un bundling optimaux.
* **Design & Styles** : [Tailwind CSS v4](https://tailwindcss.com/) pour une interface sombre (*Cosmic Dark*) soignée, contrastée et entièrement adaptative.
* **Librairie d'icônes** : [Lucide React](https://lucide.dev/) pour des visuels vectoriels légers.

### Segmentation Modulaire :
* **`/src/types.ts`** : Contient toutes les déclarations de types TypeScript strictes (`Language`, `ExperienceItem`, `EducationItem`, `TranslationSet`, `GithubRepo`) pour garantir la robustesse du typage du projet.
* **`/src/translations.ts`** : Gère l'intégralité du catalogue des textes traduits en FR, EN et ES. Cette séparation de données améliore la lisibilité de la logique d'affichage.
* **`/src/App.tsx`** : Contient uniquement l'UI dynamique, les hooks d'effets utilisateur, les animations fluides `motion` et les gestionnaires d'événements interactifs.

---

## 📁 Structure des Fichiers

```bash
.
├── metadata.json       # Métadonnées de l'application Cloud-native
├── package.json        # Manifeste npm (dépendances & scripts de build)
├── vite.config.ts      # Configuration avancée de Vite
├── index.html          # Point d'entrée DOM racine avec SEO, OpenGraph & JSON-LD
└── src
    ├── main.tsx        # Initialisation du framework React
    ├── index.css       # Styles généraux & intégration Tailwind CSS v4
    ├── types.ts        # Segmentation : Déclarations de types et interfaces TypeScript strictes
    ├── translations.ts # Segmentation : Dictionnaires de traduction multilingue FR/EN/ES
    └── App.tsx         # Interface utilisateur interactive (CV, Projets GitHub, Contact)
```

---

## ⚙️ Démarrage Local

Pour installer et lancer l'application localement :

### 1. Prérequis
Assurez-vous que [Node.js](https://nodejs.org/) (version 18+) et `npm` soient bien installés sur votre machine.

### 2. Installation des dépendances
À la racine de votre répertoire, exécutez la commande suivante :
```bash
npm install
```

### 3. Exécuter l'environnement de développement
Lancez le serveur :
```bash
npm run dev
```
Ouvrez l'adresse `http://localhost:3000` sur votre navigateur web.

### 4. Build de Production
Pour compiler l'application de façon optimisée pour la mise en ligne (génération des fichiers statiques dans le dossier `/dist`) :
```bash
npm run build
```

---

## 🎨 Philosophie de Design : Cosmic Dark
Le portfolio respecte scrupuleusement les exigences de design les plus sophistiquées :
* **Précision typographique** : Utilisation de graisses contrastées pour délimiter les structures sans fatiguer la vue. Une hiérarchie forte entre les composants standard d'interface et les blocs monospace pour souligner le cachet technique SecOps hautement professionnel.
* **Zéro Clutter** : Pas de faux journaux serveurs inutiles, de logs simulés artificiels ou de faux pings sur la page. Place à l'essentiel et à un design ultra-propre et lisible.
* **Ergonomie Mobile** : Les cibles de touch tactiles disposent d'un minimum de `44px` réglementaire, et la totalité des grilles s'adapte élégamment selon l'espace horizontal disponible.
