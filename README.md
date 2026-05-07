# Gestion de Stock

Application de gestion de stock complète avec Angular et Spring Boot, conteneurisée avec Docker.

## Vue d'ensemble

Ce projet combine une application frontend Angular et une API backend Spring Boot pour offrir une solution complète de gestion de stock avec authentification, gestion des articles, des entreprises et des utilisateurs.

## Architecture

- **Frontend**: Angular 19 avec Bootstrap 5 et MDB Angular UI Kit
- **Backend**: Spring Boot 3.4.4 avec Java 21 et Spring Security
- **Base de données**: PostgreSQL 15
- **Conteneurisation**: Docker & Docker Compose
- **Authentification**: JWT tokens

## Ports d'application

Pour éviter les conflits avec d'autres projets, l'application utilise des ports non standards :

- **Frontend Angular**: `http://localhost:6002`
- **Backend Spring Boot**: `http://localhost:6001`
- **Base de données PostgreSQL**: `localhost:6003`
- **API Documentation (Swagger)**: `http://localhost:6001/swagger-ui.html`

## Prérequis

- Docker Desktop installé et en cours d'exécution
- Docker Compose

## Démarrage rapide

### 1. Cloner le projet

```bash
git clone <repository-url>
cd Gestion-de-stock_angular_springBoot
```

### 2. Démarrer les conteneurs

```bash
docker-compose up --build
```

Ou pour démarrer en arrière-plan :

```bash
docker-compose up --build -d
```

### 3. Accéder à l'application

- **Frontend** : http://localhost:6002
- **Backend API** : http://localhost:6001
- **Documentation API** : http://localhost:6001/swagger-ui.html

## Arrêter l'application

```bash
docker-compose down
```

Pour supprimer également les volumes :

```bash
docker-compose down -v
```

## Structure du projet

```
├── angular/                 # Application Angular (voir angular/README.md)
│   ├── src/               # Code source Angular
│   ├── Dockerfile         # Configuration Docker pour Angular
│   ├── package.json       # Dépendances Node.js
│   └── README.md         # Documentation spécifique au frontend
├── springBoot/            # Application Spring Boot (voir springBoot/README.md)
│   ├── src/               # Code source Java
│   ├── Dockerfile         # Configuration Docker pour Spring Boot
│   ├── pom.xml           # Dépendances Maven
│   ├── src/main/resources/application.properties
│   └── README.md         # Documentation spécifique au backend
├── docker-compose.yml     # Configuration Docker Compose
└── README.md             # Ce fichier
```

## Configuration de la base de données

La base de données PostgreSQL est automatiquement configurée avec :

- **Nom de la base**: `gestionstock`
- **Utilisateur**: `postgres`
- **Mot de passe**: `password`

Les données sont persistées dans un volume Docker.

## Développement

Pour le développement local, consultez les README spécifiques :

### Frontend (Angular)
Voir [angular/README.md](./angular/README.md) pour :
- Installation des dépendances
- Scripts disponibles
- Configuration du proxy
- Génération de l'API client

### Backend (Spring Boot)
Voir [springBoot/README.md](./springBoot/README.md) pour :
- Configuration Maven
- Structure de l'API
- Tests et monitoring
- Déploiement Docker

## API Endpoints principaux

L'API expose les endpoints suivants :

- **Authentification**: `/api/gestionDeStock/authenticate`
- **Utilisateurs**: `/api/gestionDeStock/utilisateurs`
- **Entreprises**: `/api/gestionDeStock/entreprises`
- **Articles**: `/api/gestionDeStock/articles`

La documentation complète est disponible via Swagger UI à http://localhost:6001/swagger-ui.html.

## Technologies utilisées

### Frontend
- Angular 19.2.0
- Bootstrap 5.3.7
- MDB Angular UI Kit 8.0.0
- Font Awesome 7.0.0

### Backend
- Spring Boot 3.4.4
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI 3
- Lombok

### Infrastructure
- Docker
- Docker Compose
- Eclipse Temurin JDK 21

## Notes importantes

- L'application utilise des ports dans la plage 6000 pour éviter les conflits
- La configuration de la base de données est gérée par Docker Compose
- Les conteneurs sont configurés pour communiquer entre eux via le réseau Docker
- Le frontend Angular utilise le serveur de développement pour le développement
- Le backend Spring Boot est configuré pour le port 6001 et communique avec PostgreSQL via le nom de service Docker

## Documentation détaillée

Pour plus d'informations sur chaque composant :
- **Frontend**: [Documentation Angular](./angular/README.md)
- **Backend**: [Documentation Spring Boot](./springBoot/README.md)
