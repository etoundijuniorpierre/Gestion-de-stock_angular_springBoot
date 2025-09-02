# Configuration de l'API Gestion de Stock

## 📋 Vue d'ensemble

Ce projet utilise les interfaces TypeScript générées manuellement basées sur le fichier `swagger.json` fourni dans le dossier `import_api`.

## 🚀 Scripts disponibles

### Scripts principaux

```bash
# Démarrer l'application avec proxy configuré
npm run start:local

# Démarrer l'application standard
npm run start

# Construire l'application
npm run build
```

### Scripts de configuration de l'API

```bash
# Configuration complète de l'API
npm run gs-api

# Créer les dossiers de distribution
npm run gs-api:create-dist

# Copier les fichiers d'API
npm run gs-api:copy-files
```

## 📁 Structure des fichiers

```
src/
├── gs-api/
│   └── src/
│       └── models/
│           ├── index.ts                    # Export de toutes les interfaces
│           ├── adresse-dto.ts              # Interface AdresseDto
│           ├── article-dto.ts              # Interface ArticleDto
│           ├── category-dto.ts             # Interface CategoryDto
│           ├── client-dto.ts               # Interface ClientDto
│           ├── fournisseur-dto.ts          # Interface FournisseurDto
│           ├── commande-client-dto.ts      # Interface CommandeClientDto
│           ├── commande-fournisseur-dto.ts # Interface CommandeFournisseurDto
│           ├── ligne-commande-client-dto.ts # Interface LigneCommandeClientDto
│           ├── ligne-commande-fournisseur-dto.ts # Interface LigneCommandeFournisseurDto
│           ├── utilisateur-dto.ts          # Interface UtilisateurDto
│           ├── authentication-request.ts   # Interface AuthenticationRequest
│           ├── authentication-response.ts  # Interface AuthenticationResponse
│           ├── mouvement-stock-dto.ts      # Interface MouvementStockDto
│           └── ventes-dto.ts               # Interface VentesDto
```

## 🔧 Configuration du proxy

Le fichier `proxy.conf.json` est configuré pour rediriger les appels `/api` vers `http://localhost:8080` (serveur Spring Boot).

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

## 📊 Interfaces disponibles

### Entités principales
- **ArticleDto** : Gestion des articles avec catégories
- **CategoryDto** : Gestion des catégories d'articles
- **ClientDto** : Gestion des clients
- **FournisseurDto** : Gestion des fournisseurs
- **UtilisateurDto** : Gestion des utilisateurs

### Commandes
- **CommandeClientDto** : Commandes des clients
- **CommandeFournisseurDto** : Commandes des fournisseurs
- **LigneCommandeClientDto** : Lignes de commande client
- **LigneCommandeFournisseurDto** : Lignes de commande fournisseur

### Stock et ventes
- **MouvementStockDto** : Mouvements de stock
- **VentesDto** : Gestion des ventes
- **LigneVenteDto** : Lignes de vente

### Authentification
- **AuthenticationRequest** : Demande d'authentification
- **AuthenticationResponse** : Réponse d'authentification

## 🎯 Utilisation

### 1. Importer les interfaces

```typescript
import { ArticleDto, ClientDto, CategoryDto } from 'src/gs-api/src/models';
```

### 2. Utiliser dans les composants

```typescript
export class MonComposant {
  articles: ArticleDto[] = [];
  clients: ClientDto[] = [];
  
  // Logique métier...
}
```

### 3. Utiliser dans les services

```typescript
@Injectable({
  providedIn: 'root'
})
export class MonService {
  saveArticle(article: ArticleDto): Observable<ArticleDto> {
    // Logique de sauvegarde...
  }
}
```

## ⚠️ Notes importantes

1. **Interfaces manuelles** : Les interfaces sont créées manuellement et non générées automatiquement
2. **Compatibilité** : Toutes les interfaces sont compatibles avec Angular 19.2.0
3. **Proxy** : Assurez-vous que le serveur Spring Boot fonctionne sur le port 8080
4. **Types optionnels** : Toutes les propriétés sont optionnelles (`?`) pour la flexibilité

## 🔄 Mise à jour

Pour mettre à jour les interfaces :
1. Modifier le fichier `swagger.json` dans `import_api/`
2. Exécuter `npm run gs-api:copy-files`
3. Mettre à jour manuellement les interfaces TypeScript si nécessaire

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'API
npm run gs-api

# 3. Démarrer l'application
npm run start:local

# 4. Ouvrir http://localhost:4200
```
