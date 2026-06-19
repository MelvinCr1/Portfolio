# Portfolio de Melvin Cureau - SysOps & Cloud Engineer

Un portfolio moderne, épuré et de haute fidélité conçu pour présenter l'expertise et la trajectoire de **Melvin Cureau**, futur ingénieur spécialisé en **Ingénierie SysOps & Architectures Cloud** (alternant chez **Cloud Temple**).

Ce projet a subi une refonte complète afin d'éliminer toute information superflue pour se concentrer sur l'essentiel à travers trois sections clés : **CV / Parcours**, **Projets & PoCs interactifs**, et **Formulaire de Contact**. De plus, l'ensemble du contenu est navigable de manière fluide et instantanée en trois langues : **Français (FR)**, **Anglais (EN)** et **Espagnol (ES)**.

---

## 🚀 Fonctionnalités Clés

### 1. Traduction Multilingue Intégrale (Français, Anglais, Espagnol)
* Bascule à la volée entre les trois langues via un sélecteur d'interface minimaliste placé dans le header d'en-tête.
* Dictionnaire de traduction robuste avec alignement parfait de l'expérience utilisateur et des labels techniques.

### 2. Parcours & Curriculum Vitae Interactif
* **Sélecteur par catégories** : visionnez les expériences professionnelles, les formations académiques ou le spectre global des compétences en un seul clic.
* **Système "Voir plus" d'expansion dynamique** : Un accordéon intelligent préserve la compacité de l'affichage initial tout en permettant de déplier la totalité de l'historique et des formations d'un simple clic.
* **Badges de Certifications d'Architecture** : mise en valeur des accréditations professionnelles comme *Microsoft Azure Fundamentals (AZ-900)* en cours d'acquisition.

### 3. Démonstrateurs Technologiques (PoCs) Interactifs
Plutôt que d'aligner de simples descriptions textuelles, le portfolio intègre trois simulations interactives simulant le travail d'architecture de Melvin :
* **Démonstrateur d'Inférence IA Souveraine** : Configurez la VRAM allouée et le modèle (Llama, Mistral ou Phi) pour observer l'empreinte de cache, l'utilisation des cœurs processeur et estimer la latence d'inférence en millisecondes d'une IA locale isolée du réseau public.
* **Générateur IaC Terraform Modulaire** : Modélisez graphiquement les options de redondance multi-région, le durcissement par clés de sécurité physiques HSM et le niveau réglementaire de conformité visé (SecNumCloud de l'ANSSI ou Norme standard d'entreprise). La configuration Terraform (`main.tf`) se met à jour en temps réel avec des blocs décrivant fidèlement l'architecture résultante.
* **Démonstrateur Cryptographique Post-Quantique** : Saisissez un message et simulez un échange de clé robuste basé sur la norme NIST Kyber-1024 dans la sandbox web locale pour illustrer vos compétences en cryptographie asymétrique asynchrone.

### 4. Formulaire d'Acheminement Direct & Contact
* Un formulaire de contact fluide, validé et stylisé permettant d'échanger avec Melvin. Équipé d'indisponibilités simulées d'acheminement, de validations de champs et d'un retour d'état instantané dans le respect de l'identité épurée.

---

## 🛠️ Stack Technique

L'application utilise une architecture Single Page Application (SPA) ultra-rapide et sécurisée :
* **Framework** : [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System** : [Vite](https://vite.dev/) pour un chargement et un bundling optimaux
* **Design & Styles** : [Tailwind CSS](https://tailwindcss.com/) pour une interface sombre (*Cosmic Dark*) soignée, contrastée et entièrement adaptative aux smartphones, tablettes et moniteurs ultra-wide
* **Librairie d'icônes** : [Lucide React](https://lucide.dev/) pour des visuels vectoriels ultra-légers

---

## 📁 Structure des Fichiers

La structure du projet reste extrêmement condensée pour éviter le surpoids tout en restant parfaitement modulaire :
```bash
.
├── metadata.json       # Métadonnées de l'application
├── package.json        # Manifeste npm (dépendances & scripts de build)
├── vite.config.ts      # Configuration avancée de Vite
├── tailwind.config.js  # Thème global Tailwind CSS personnalisés
├── index.html          # Point d'entrée DOM racine
└── src
    ├── main.tsx        # Initialisation React
    ├── index.css       # Fichier CSS d'importation Tailwind CSS & Polices
    └── App.tsx         # Point névralgique contenant le menu, les dicos multilingues, le CV dynamique, les PoCs interactifs et l'interface de contact
```

---

## ⚙️ Démarrage Local

Pour installer et lancer l'application localement, suivez les étapes suivantes :

### 1. Prérequis
Assurez-vous que [Node.js](https://nodejs.org/) (version 18+) et `npm` soient bien installés sur votre machine.

### 2. Installation des dépendances
À la racine de votre répertoire, exécutez la commande suivante :
```bash
npm install
```

### 3. Exécuter l'environnement de développement
Lancez le serveur本地 :
```bash
npm run dev
```
Ouvrez l'adresse `http://localhost:3000` sur votre navigateur web de prédilection.

### 4. Build de Production
Pour compiler l'application de façon optimisée pour la mise en ligne (génération des fichiers statiques dans le dossier `/dist`) :
```bash
npm run build
```

---

## 🎨 Philosophie de Design : Cosmic Dark
Le portfolio respecte scrupuleusement les exigences de design les plus sophistiquées :
* **Précision typographique** : Utilisation soutenue de graisses contrastées pour délimiter les structures sans surcharger l'œil. Une hiérarchie précise entre les composants standard d'interface et les blocs à chasse fixe (fontes monospace) pour souligner un cachet technique "SecOps" hautement professionnel.
* **Zéro Clutter** : Pas de faux journaux serveurs inutiles, de logs simulés artificiels ou de faux pings sur la page. Place à l'essentiel et à un design ultra-propre et lisible.
* **Ergonomie Mobile** : Les cibles de touch tactiles disposent d'un minimum de `44px` réglementaire, et la totalité des grilles s'adapte élégamment selon l'espace horizontal disponible.
