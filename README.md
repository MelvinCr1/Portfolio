# 💻 Portfolio

Ce dépôt héberge le code complet de mon site portfolio. Conçu pour être ultra-rapide, moderne et accessible, ce portfolio me permet de présenter mes compétences en ingénierie système, cloud computing et DevOps, tout en servant de vitrine interactive pour mes réalisations.

---

## Fonctionnalités Majeures du Site

1. **Double Système de Thème** : Mode sombre soigné (*Cosmic Dark*) pour une esthétique technique, et un mode clair enrichi avec un excellent taux de contraste pour une lisibilité et une accessibilité optimales (conforme aux normes d'accessibilité WCAG).
2. **Traduction Instantanée Multilingue** : Choix dynamique à la volée entre trois langues (**Français**, **Anglais**, **Espagnol**) avec une gestion rigoureuse des polices et de l'alignement pour une expérience fluide.
3. **Intégration Active avec l'API GitHub** : Requêtes asynchrones en temps réel pour récupérer automatiquement mes dépôts publics épinglés et les afficher de manière interactive.
4. **Parcours Interactif Réduit & Extensible** : Une vue du parcours condensée et claire (optimale pour les recruteurs), extensible d'un simple clic pour lire les détails des expériences et cursus académiques.
5. **Formulaire de Contact Réactif** : Formulaire interactif en direct qui préremplit et ouvre automatiquement votre messagerie pour un acheminement direct et sécurisé vers `portfolio@melvincureau.com`.

---

## Stack Technique

* **Framework** : React (v19) avec **TypeScript** pour un typage strict et une robustesse accrue.
* **Build Tool** : **Vite** pour un démarrage instantané en développement et une mise en groupe hautement optimisée pour la production.
* **Design & Animations** : **Tailwind CSS (v4)** pour le design réactif et **motion** pour les transitions physiques fluides et interactives.
* **Icônes** : **Lucide React** pour des icônes vectorielles légères et personnalisables sans impact sur le temps de chargement.

---

## Structure du Projet

```bash
.
├── .github/workflows/deploy.yml # Pipeline de déploiement automatique via GitHub Actions (SFTP)
├── public
│   └── .htaccess                # Règles de redirection HTTPS et routage pour Apache/IONOS
├── src
│   ├── main.tsx                 # Point de montage de l'application React
│   ├── App.tsx                  # Composant maître, logique d'état et animations
│   ├── translations.ts          # Dictionnaires statiques multilingues (FR / EN / ES)
│   ├── types.ts                 # Contrats de types de données
│   └── index.css                # Base de styles Tailwind CSS et intégration de Google Fonts
├── package.json                 # Gestion des scripts et des paquets npm
└── vite.config.ts               # Configuration du build de l'application
```

---

## Configuration & Bonnes Pratiques du Serveur

Pour garantir un fonctionnement maximal sur l'environnement de production, deux aspects majeurs d'infrastructure ont été intégrés :

### 1. Routage SPA & Redirection HTTPS (`.htaccess`)
Comme le portfolio est une Single Page Application (SPA), le routage côté client nécessite que toutes les requêtes soient renvoyées vers le fichier `index.html`. Le fichier `/public/.htaccess` configure automatiquement ce comportement sous Apache (idéal pour un hébergement chez IONOS) tout en forçant l'usage de connexions sécurisées HTTPS.

Il assure les réglages indispensables suivants :
* **Forçage HTTPS** de toutes les requêtes HTTP entravées.
* **Routage de secours** (`RewriteRule . /index.html [L]`) pour éviter les erreurs de type 404 lors du rechargement d'une page consultée.
* **En-têtes de Sécurité Recommandés** (à ajouter directement sur l'hébergeur ou via configurations supplémentaires).

### 2. Déploiement Automatique (Workflows GitHub Actions)
Le fichier `.github/workflows/deploy.yml` est configuré pour déployer automatiquement le code compilé dès qu'un push est effectué sur la branche `main`.
* Il installe les dépendances et compile le projet en production via `npm run build`.
* Il synchronise le répertoire de build `/dist` vers le dossier cible de l'hébergeur par protocole sécurisé **SFTP** en utilisant des secrets chiffrés.

---

## Démarrage Local

Pour exécuter et tester le projet dans votre environnement :

### 1. Prérequis
Disposer de [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée) et de npm.

### 2. Installation des Dépendances
```bash
npm install
```

### 3. Exécuter en Mode Développement
```bash
npm run dev
```
Ouvrez votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

### 4. Compiler pour la Production
```bash
npm run build
```
Les fichiers statiques optimisés seront produits dans le répertoire `/dist` et seront prêts pour le déploiement sur votre hébergement.
