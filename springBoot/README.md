# Backend Spring Boot - Gestion de Stock

Application backend Spring Boot pour la gestion de stock avec API REST complète.

## Vue d'ensemble

Cette application Spring Boot offre une API REST complète pour la gestion de stock avec :
- Authentification JWT sécurisée
- Gestion des articles et catégories
- Gestion des clients et fournisseurs
- Gestion des commandes et ventes
- Suivi des mouvements de stock
- Gestion multi-entreprises
- Upload de photos avec Unsplash

## Technologies

- **Spring Boot**: 3.4.4
- **Java**: 21
- **Spring Security**: Authentification et autorisation JWT
- **Spring Data JPA**: Accès aux données avec Hibernate
- **PostgreSQL**: Base de données principale
- **Swagger/OpenAPI 3**: Documentation API automatique
- **Lombok**: Réduction de code boilerplate
- **Unsplash API**: Intégration photos

## Structure du projet

```
src/main/java/com/example/Gestion/de/stock/
├── GestionDeStockApplication.java    # Classe principale Spring Boot
├── configuration/                    # Configuration Spring
│   ├── JwtAuthenticationFilter.java
│   ├── SecurityConfig.java
│   └── SwaggerConfig.java
├── controler/                      # Contrôleurs REST
│   ├── AuthenticationController.java   # Authentification
│   ├── ArticleController.java        # Gestion articles
│   ├── ClientController.java          # Gestion clients
│   ├── FournisseurController.java     # Gestion fournisseurs
│   ├── CommandeClientController.java  # Commandes clients
│   ├── CommandeFournisseurController.java # Commandes fournisseurs
│   ├── MvtStkController.java        # Mouvements stock
│   ├── UtilisateurController.java     # Gestion utilisateurs
│   ├── EntrepriseController.java     # Gestion entreprises
│   ├── CategorieController.java      # Gestion catégories
│   └── VentesController.java        # Gestion ventes
├── dto/                           # Data Transfer Objects
│   ├── auth/                       # DTOs authentification
│   ├── article/                    # DTOs articles
│   ├── client/                     # DTOs clients
│   └── ...                        # Autres DTOs
├── model/                          # Modèles de données
│   ├── entity/                     # Entités JPA
│   │   ├── Article.java             # Entité Article
│   │   ├── Client.java              # Entité Client
│   │   ├── Fournisseur.java        # Entité Fournisseur
│   │   ├── Utilisateur.java          # Entité Utilisateur
│   │   ├── Entreprise.java          # Entité Entreprise
│   │   ├── MvtStk.java             # Mouvements stock
│   │   ├── CommandeClient.java       # Commandes clients
│   │   ├── CommandeFournisseur.java # Commandes fournisseurs
│   │   ├── Ventes.java             # Ventes
│   │   └── Categorie.java          # Catégories
│   ├── auth/                       # Modèles d'authentification
│   └── enumElem/                   # Énumérations
├── repository/                     # Interfaces Spring Data JPA
├── service/                        # Logique métier
├── utils/                          # Utilitaires (JWT, etc.)
├── validator/                      # Validateurs personnalisés
├── handlers/                       # Gestion d'exceptions
└── interceptor/                    # Intercepteurs HTTP
```

## Configuration

### Base de données

Configuration dans `src/main/resources/application.properties` :

```properties
# Configuration de la base de données PostgreSQL
spring.datasource.url=jdbc:postgresql://postgres:5432/gestionstock
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuration JPA & Hibernate
spring.jpa.database=postgresql
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### Configuration du serveur

```properties
# Port du serveur
server.port=6001

# Nom de l'application
spring.application.name=Gestion-de-stock
```

### Configuration JWT

```properties
# Secret JWT (encodé en Base64)
jwt.secret=LS0tLS1CRUdJTiBQRVJTT05BTElRVUVSR0VUQ0xFVkVTLU9yZy5zaWcuc2VjcmV0LS0tLS0K...

# Durée de validité (1 heure)
jwt.expiration=3600000
```

### Configuration Swagger

```properties
# Documentation API
springdoc.show-actuator=true
springdoc.swagger-ui.url=/v3/api-docs/rest-api-v1
logging.level.org.springdoc=DEBUG
```

### Configuration Unsplash

```properties
# Clés API Unsplash pour les photos
unsplash.apiKey=JLaKs2UcNW87SM71Ki_XmcvNW3ZgWd0zxZ5L9alKJ_g
unsplash.apiSecret=WxRujlxFns34xPgQQEbsgRL_o24tbnaAH5GYpRxO2Yw

# Répertoire upload photos
photo.static.upload.subdirectory=my-uploaded-files
```

## Installation et démarrage

### Prérequis

- Java 21+ installé
- Maven 3.6+ installé
- PostgreSQL 15+ (ou Docker)

### Avec Maven

```bash
# Compiler le projet
mvn clean compile

# Démarrer l'application
mvn spring-boot:run
```

### Avec Docker

```bash
# Construire l'image Docker
docker build -t gestion-stock-backend .

# Démarrer avec Docker Compose
docker-compose up spring-boot
```

## API Endpoints

### Authentification
- `POST /api/gestionDeStock/authenticate` - Connexion utilisateur
- `POST /api/gestionDeStock/logout` - Déconnexion

### Gestion des articles
- `GET /api/gestionDeStock/articles` - Lister tous les articles
- `POST /api/gestionDeStock/articles/create` - Créer un article
- `GET /api/gestionDeStock/articles/{idArticle}` - Détails article
- `PUT /api/gestionDeStock/articles/{id}` - Mettre à jour article
- `DELETE /api/gestionDeStock/articles/delete/{idArticle}` - Supprimer article

### Gestion des catégories
- `GET /api/gestionDeStock/categories` - Lister catégories
- `POST /api/gestionDeStock/categories/create` - Créer catégorie

### Gestion des clients
- `GET /api/gestionDeStock/clients` - Lister clients
- `POST /api/gestionDeStock/clients/create` - Créer client
- `GET /api/gestionDeStock/clients/{idClient}` - Détails client

### Gestion des fournisseurs
- `GET /api/gestionDeStock/fournisseurs` - Lister fournisseurs
- `POST /api/gestionDeStock/fournisseurs/create` - Créer fournisseur

### Gestion des commandes
- `GET /api/gestionDeStock/commandeclients` - Commandes clients
- `POST /api/gestionDeStock/commandeclients/create` - Créer commande client
- `GET /api/gestionDeStock/commandefournisseurs` - Commandes fournisseurs
- `POST /api/gestionDeStock/commandefournisseurs/create` - Créer commande fournisseur

### Mouvements de stock
- `POST /api/gestionDeStock/mvtstk/entree` - Entrée de stock
- `POST /api/gestionDeStock/mvtstk/sortie` - Sortie de stock
- `POST /api/gestionDeStock/mvtstk/correctionpos` - Correction positive
- `POST /api/gestionDeStock/mvtstk/correctionneg` - Correction négative
- `GET /api/gestionDeStock/mvtstk/stockreel/{idArticle}` - Stock réel article

### Gestion des utilisateurs
- `GET /api/gestionDeStock/utilisateurs` - Lister utilisateurs
- `POST /api/gestionDeStock/utilisateurs/create` - Créer utilisateur
- `GET /api/gestionDeStock/utilisateurs/{id}` - Détails utilisateur
- `PUT /api/gestionDeStock/utilisateurs/{id}` - Mettre à jour utilisateur
- `DELETE /api/gestionDeStock/utilisateurs/{id}` - Supprimer utilisateur

### Gestion des entreprises
- `GET /api/gestionDeStock/entreprises` - Lister entreprises
- `POST /api/gestionDeStock/entreprises/create` - Créer entreprise

### Gestion des ventes
- `GET /api/gestionDeStock/ventes` - Lister ventes
- `POST /api/gestionDeStock/ventes/create` - Créer vente

### Photos
- `POST /api/gestionDeStock/photos/upload` - Upload photo

## Documentation API

La documentation complète est disponible via Swagger UI :
- **Local**: http://localhost:6001/swagger-ui.html
- **Spécification OpenAPI**: http://localhost:6001/v3/api-docs

## Sécurité

### Authentification JWT

L'application utilise JWT pour l'authentification :

1. **Connexion**: POST `/api/gestionDeStock/authenticate` avec identifiants
2. **Réponse**: Token JWT valide pour 1 heure
3. **Utilisation**: Inclure le token dans l'en-tête des requêtes :
   ```
   Authorization: Bearer <token>
   ```

### Endpoints sécurisés

La plupart des endpoints nécessitent une authentification JWT, sauf :
- `/api/gestionDeStock/authenticate`
- Endpoints publics Swagger

## Déploiement

### Variables d'environnement

Les variables suivantes peuvent être configurées :

- `SPRING_PROFILES_ACTIVE`: Profile Spring (dev, prod)
- `SPRING_DATASOURCE_URL`: URL base de données
- `SPRING_DATASOURCE_USERNAME`: Utilisateur BDD
- `SPRING_DATASOURCE_PASSWORD`: Mot de passe BDD
- `JWT_SECRET`: Secret JWT
- `UNSPLASH_API_KEY`: Clé API Unsplash
- `UNSPLASH_API_SECRET`: Secret API Unsplash

### Docker

L'application est configurée pour fonctionner avec Docker :

```bash
# Build multi-stage
docker build -t gestion-stock-backend .

# Démarrage avec variables d'environnement
docker run -p 6001:6001 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/gestionstock \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=password \
  gestion-stock-backend
```

## Logs

La configuration des logs dans `application.properties` :

```properties
# Logs SQL et sécurité
spring.jpa.show-sql=true
logging.level.org.springdoc=DEBUG
```

## Notes importantes

- Le port configuré est **6001** (cohérent avec Docker Compose)
- La base de données PostgreSQL utilise le nom de service `postgres` pour Docker
- Le mode `ddl-auto=update` met à jour automatiquement le schéma
- Les photos sont uploadées dans `my-uploaded-files/`
- L'API Unsplash est intégrée pour la gestion des photos
