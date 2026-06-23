# Workflow CI/CD — Déploiement Continu sur IONOS

Ce dossier contient le workflow de Déploiement Continu (**CI/CD**) automatisé via **GitHub Actions** pour le site.

Le fichier principal de configuration est [`deploy.yml`](./deploy.yml).

---

## 🚀 Fonctionnement du Workflow (`deploy.yml`)

À chaque fois qu'un commit ou une Pull Request est fusionné(e) sur la branche principale **`main`**, GitHub Actions déclenche automatiquement ce processus pour mettre le site en production.

### Les Étapes du Pipeline

1. **Extraction du Code (`Get latest code`)** : Charge l'intégralité du code source depuis le dépôt GitHub à l'aide de l'action `actions/checkout@v3`.
2. **Configuration de Node.js (`Setup Node.js`)** : Initialise un environnement d'exécution Node.js en version stable et standardisée **`20`** (via `actions/setup-node@v3`).
3. **Installation des Dépendances (`Install dependencies`)** : Lance un cycle d'installation propre (`npm install`) pour télécharger toutes les dépendances requises (React, Tailwind CSS, Motion, etc.).
4. **Compilation (`Build project`)** : Execute la commande d'optimisation de production (`npm run build`). Cette tâche compile l'application TypeScript/Vite et génère des actifs minifiés, hautement performants et compatibles avec tous les navigateurs modernes au sein du dossier `./dist`.
5. **Synchronisation SFTP vers IONOS (`Sync files via SFTP`)** : Utilise l'action sécurisée `wlixcc/SFTP-Deploy-Action@v1.2.4` pour transférer uniquement le contenu compilé (`./dist/*`) vers le dossier cible `/public` du serveur IONOS.

---

## 🔑 Configuration des Variables Secrètes (Secrets GitHub)

Pour que la synchronisation SFTP s'effectue de manière sécurisée sans exposer les identifiants dans le code, j'ai mise en place la configuration des **GitHub Secrets** sur le dépôt. (Settingds > **Secrets and variables** > **Actions**)

| Clé Secrète | Description | Exemple / Format typique |
| :--- | :--- | :--- |
| **`FTP_SERVER`** | L'adresse de l'hôte SFTP d'IONOS | `homeXXXXXX.1and1-data.host` ou `accessXXXXXX.webspace.ionos.fr` |
| **`FTP_USERNAME`** | L'identifiant utilisateur SFTP | `uXXXXXXXX` |
| **`FTP_PASSWORD`** | Le mot de passe de l'utilisateur SFTP | `********` |

*Note: Le workflow est configuré par défaut à l'aide de la directive `sftp_only: true` sur le port sécurisé **`22`** pour garantir un chiffrement optimal des flux lors du déploiement.*

---

## 🛠️ Maintenance & Bonnes Pratiques

- **Zéro Déchet** : Seul le dossier `./dist` de destination finale de compilation est déployé sur le serveur distant IONOS. Le code source de développement, les fichiers de configuration de l'éditeur et le dossier brut `node_modules` ne polluent pas votre espace d'hébergement.
- **Cache & Performance** : Les scripts d'intégration tournent sur une image Ubuntu à jour (`ubuntu-latest`) pour assurer des temps de construction optimaux (généralement moins de 1m30s).
- **Vérification** : Le status de l'état d'exécution est disponible en temps réel dans l'onglet **Actions** du dépôt GitHub.
