# Frontend Angular - Gestion de Stock

Application frontend Angular pour la gestion de stock avec authentification et interface complète.

## Vue d'ensemble

Cette application Angular offre une interface moderne pour la gestion de stock avec :
- Gestion des articles et catégories
- Gestion des clients et fournisseurs  
- Gestion des commandes clients et fournisseurs
- Suivi des mouvements de stock
- Tableau de bord et statistiques
- Gestion des utilisateurs avec rôles

## Technologies

- **Angular**: 19.2.0 avec SSR (Server-Side Rendering)
- **Node.js**: 18+
- **Bootstrap**: 5.3.7
- **MDB Angular UI Kit**: 8.0.0
- **Font Awesome**: 7.0.0
- **Express**: 4.18.2 (pour SSR)
- **TypeScript**: 5.7.2

## Structure de l'application

```
src/
├── app/
│   ├── api/                    # Services API générés automatiquement
│   ├── components/              # Composants réutilisables
│   │   ├── header/            # En-tête de l'application
│   │   ├── menu/              # Menu de navigation
│   │   ├── loader/            # Composant de chargement
│   │   ├── pagination/        # Composant de pagination
│   │   ├── detail-article/     # Détail d'un article
│   │   ├── detail-clt/        # Détail d'un client
│   │   ├── detail-frs/        # Détail d'un fournisseur
│   │   ├── detail-utilisateur/  # Détail d'un utilisateur
│   │   └── ...               # Autres composants de détail
│   ├── pages/                  # Pages principales de l'application
│   │   ├── page-login/         # Page de connexion
│   │   ├── page-register/      # Page d'inscription
│   │   ├── page-dashboard/     # Tableau de bord
│   │   ├── page-articles/     # Gestion des articles
│   │   ├── page-clients/       # Gestion des clients
│   │   ├── page-fournisseurs/  # Gestion des fournisseurs
│   │   ├── page-commandes-clients/     # Commandes clients
│   │   ├── page-commandes-fournisseurs/  # Commandes fournisseurs
│   │   ├── mouvements-stocks/   # Mouvements de stock
│   │   ├── page-statistiques/  # Statistiques
│   │   └── utilisateur/        # Gestion utilisateurs
│   ├── services/               # Services métier
│   ├── interceptors/           # Intercepteurs HTTP
│   └── environments/           # Configurations d'environnement
├── assets/                   # Ressources statiques
├── gs-api/                   # API client générée depuis OpenAPI
└── tools/swagger/             # Configuration pour génération API
```

## Scripts disponibles

```bash
# Démarrer le serveur de développement (port 4200)
npm start

# Démarrer avec proxy vers l'API backend (port 8080)
npm run start:local

# Construire pour la production
npm run build

# Construire en mode watch pour le développement
npm run watch

# Exécuter les tests unitaires
npm test

# Démarrer le serveur SSR
npm run serve:ssr:Gestion-de-stock
```

## Configuration du proxy

Le fichier `proxy.conf.json` configure le proxy pour rediriger les requêtes API :

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

## Génération de l'API client

L'API client est générée automatiquement depuis la spécification OpenAPI du backend :

```bash
npm run gs-api
```

Cette commande effectue les étapes suivantes :
1. Crée les répertoires nécessaires dans `tools/swagger/dist` et `tools/swagger/src`
2. Copie le JAR et le fichier swagger depuis `import_api/`
3. Génère le client TypeScript Angular dans `src/gs-api/src`

**Note**: Le backend doit être compilé et le JAR disponible dans `import_api/` avant d'exécuter cette commande.

## Fonctionnalités principales

### 🏠 Tableau de bord
- Vue d'ensemble des statistiques
- Indicateurs clés de performance

### 📦 Gestion des articles
- Création, modification, suppression d'articles
- Gestion des catégories
- Suivi du stock en temps réel

### 👥 Gestion des utilisateurs
- Création de comptes utilisateurs
- Gestion des rôles et permissions
- Profils utilisateurs

### 🏢 Gestion des entreprises
- Informations sur l'entreprise
- Configuration multi-entreprises

### 📊 Mouvements de stock
- Entrées et sorties de stock
- Corrections de stock
- Historique complet des mouvements

### 📋 Commandes
- Commandes clients et fournisseurs
- Suivi des commandes
- Gestion des détails de commandes

## Accès à l'application

- **Développement local**: http://localhost:4200
- **Avec Docker**: http://localhost:6002

## Déploiement avec Docker

### Construction de l'image

```bash
# Construire l'image Docker
docker build -t gestion-stock-frontend .
```

### Démarrage avec Docker Compose

```bash
# Démarrer uniquement le frontend
docker-compose up angular

# Démarrer toute l'application (frontend + backend + BDD)
docker-compose up --build
```

## Configuration des environnements

Les fichiers d'environnement se trouvent dans `src/environments/` :

- `environment.ts`: Configuration de développement
- `environment.prod.ts`: Configuration de production

## Développement

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Démarrer le développement
npm run start:local
```

### Notes importantes
- Le proxy est configuré pour rediriger `/api` vers `http://localhost:8080`
- Pour utiliser avec Docker, le backend doit être accessible sur le port 6001
- L'API client doit être régénérée après modification des endpoints backend
