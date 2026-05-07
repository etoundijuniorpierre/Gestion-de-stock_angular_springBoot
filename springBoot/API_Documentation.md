# API Documentation - Gestion de Stock

## Vue d'ensemble
API REST complète pour la gestion de stock d'entreprise avec authentification, gestion des articles, commandes clients/fournisseurs, utilisateurs et mouvements de stock.

**Base URL :** `http://localhost:8085/api/gestionDeStock`

## Table des matières
- [Authentification](#authentification)
- [Articles](#articles)
- [Catégories](#catégories)
- [Clients](#clients)
- [Commandes Clients](#commandes-clients)
- [Commandes Fournisseurs](#commandes-fournisseurs)
- [Fournisseurs](#fournisseurs)
- [Entreprises](#entreprises)
- [Utilisateurs](#utilisateurs)
- [Ventes](#ventes)
- [Mouvements de Stock](#mouvements-de-stock)
- [Photos](#photos)
- [DTOs](#dtos)

---

## Authentification

### Connexion
```http
POST /api/gestionDeStock/authenticate
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Réponse :**
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "userDto": {
    "id": "integer",
    "nom": "string",
    "prenom": "string",
    "email": "string",
    "dateDeNaissance": "2025-01-01",
    "motDePasse": "string",
    "adresse": {...},
    "photo": "string",
    "entreprise": {...}

### Créer/Modifier un Article
```http
POST /api/gestionDeStock/articles/create
Content-Type: application/json

{
  "codeArticle": "string",
  "designation": "string",
  "prixUnitaireHt": 0,
  "tauxTva": 0,
  "prixUnitaireTtc": 0,
  "photo": "string",
  "categorie": {
    "code": "string",
    "designation": "string"
  },
  "idEntreprise": 0
}
```

### Récupérer un Article par ID
```http
GET /api/gestionDeStock/articles/{idArticle}
```

### Récupérer un Article par Code
```http
GET /api/gestionDeStock/articles/filter/{codeArticle}
```

### Lister tous les Articles
```http
GET /api/gestionDeStock/articles/all
```

### Historique des Ventes d'un Article
```http
GET /api/gestionDeStock/articles/historique/vente/{idArticle}
```

### Historique des Commandes Clients d'un Article
```http
GET /api/gestionDeStock/articles/historique/commandeclient/{idArticle}
```

### Historique des Commandes Fournisseurs d'un Article
```http
GET /api/gestionDeStock/articles/historique/commandefournisseur/{idArticle}
```

### Articles par Catégorie
```http
GET /api/gestionDeStock/articles/filter/category/{idCategory}
```

### Supprimer un Article
```http
DELETE /api/gestionDeStock/articles/delete/{idArticle}
```

### Mettre à jour un Article
```http
PUT /api/gestionDeStock/articles/{id}
Content-Type: application/json

{
  "codeArticle": "string",
  "designation": "string",
  "prixUnitaireHt": 0,
  "tauxTva": 0,
  "prixUnitaireTtc": 0,
  "photo": "string",
  "categorie": {
    "code": "string",
    "designation": "string"
  },
  "idEntreprise": 0
}
```

---

## Catégories

### Créer une Catégorie
```http
POST /api/gestionDeStock/categories/create
Content-Type: application/json

{
  "code": "string",
  "designation": "string",
  "idEntreprise": 0
}
```

### Récupérer une Catégorie par ID
```http
GET /api/gestionDeStock/categories/{idCategorie}
```

### Récupérer une Catégorie par Code
```http
GET /api/gestionDeStock/categories/filter/{codeCategorie}
```

### Lister toutes les Catégories
```http
GET /api/gestionDeStock/categories/all
```

### Supprimer une Catégorie
```http
DELETE /api/gestionDeStock/categories/delete/{idCategorie}
```

---

## Clients

### Créer un Client
```http
POST /api/gestionDeStock/clients/create
Content-Type: application/json

{
  "nom": "string",
  "prenom": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "mail": "string",
  "numTel": "string",
  "idEntreprise": 0
}
```

### Récupérer un Client par ID
```http
GET /api/gestionDeStock/clients/{idClient}
```

### Lister tous les Clients
```http
GET /api/gestionDeStock/clients/all
```

### Supprimer un Client
```http
DELETE /api/gestionDeStock/clients/delete/{idClient}
```

### Mettre à jour un Client
```http
PUT /api/gestionDeStock/clients/{id}
Content-Type: application/json

{
  "nom": "string",
  "prenom": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "mail": "string",
  "numTel": "string",
  "idEntreprise": 0
}
```

---

## Commandes Clients

### Créer une Commande Client
```http
POST /api/gestionDeStock/commandesclients/create
Content-Type: application/json

{
  "code": "string",
  "dateCommande": "2025-01-01",
  "etatCommande": "EN_PREPARATION",
  "client": {
    "nom": "string",
    "prenom": "string",
    "mail": "string",
    "numTel": "string"
  },
  "idEntreprise": 0,
  "ligneCommandeClients": [
    {
      "article": {
        "codeArticle": "string",
        "designation": "string"
      },
      "quantite": 0,
      "prixUnitaire": 0,
      "idEntreprise": 0
    }
  ]
}
```

### Mettre à jour l'État d'une Commande
```http
PATCH /api/gestionDeStock/commandesclients/update/etat/{idCommande}/{etatCommande}
```

### Mettre à jour la Quantité d'une Ligne
```http
PATCH /api/gestionDeStock/commandesclients/update/quantite/{idCommande}/{idLigneCommande}/{quantite}
```

### Mettre à jour le Client d'une Commande
```http
PATCH /api/gestionDeStock/commandesclients/update/client/{idCommande}/{idClient}
```

### Mettre à jour l'Article d'une Ligne
```http
PATCH /api/gestionDeStock/commandesclients/update/article/{idCommande}/{idLigneCommande}/{idArticle}
```

### Supprimer une Ligne de Commande
```http
DELETE /api/gestionDeStock/commandesclients/delete/article/{idCommande}/{idLigneCommande}
```

### Récupérer une Commande par ID
```http
GET /api/gestionDeStock/commandesclients/{idCommandeClient}
```

### Récupérer une Commande par Code
```http
GET /api/gestionDeStock/commandesclients/filter/{codeCommandeClient}
```

### Lister toutes les Commandes
```http
GET /api/gestionDeStock/commandesclients/all
```

### Lister les Lignes d'une Commande
```http
GET /api/gestionDeStock/commandesclients/lignesCommande/{idCommande}
```

### Supprimer une Commande
```http
DELETE /api/gestionDeStock/commandesclients/delete/{idCommandeClient}
```

---

## Commandes Fournisseurs

### Créer une Commande Fournisseur
```http
POST /api/gestionDeStock/commandesfournisseurs/create
Content-Type: application/json

{
  "code": "string",
  "dateCommande": "2025-01-01",
  "etatCommande": "EN_PREPARATION",
  "fournisseur": {
    "nom": "string",
    "prenom": "string",
    "mail": "string",
    "numTel": "string"
  },
  "idEntreprise": 0,
  "ligneCommandeFournisseurs": [
    {
      "article": {
        "codeArticle": "string",
        "designation": "string"
      },
      "quantite": 0,
      "prixUnitaire": 0,
      "idEntreprise": 0
    }
  ]
}
```

### Mettre à jour l'État d'une Commande Fournisseur
```http
PATCH /api/gestionDeStock/commandesfournisseurs/update/etat/{idCommande}/{etatCommande}
```

### Mettre à jour la Quantité d'une Ligne
```http
PATCH /api/gestionDeStock/commandesfournisseurs/update/quantite/{idCommande}/{idLigneCommande}/{quantite}
```

### Mettre à jour le Fournisseur d'une Commande
```http
PATCH /api/gestionDeStock/commandesfournisseurs/update/fournisseur/{idCommande}/{idFournisseur}
```

### Mettre à jour l'Article d'une Ligne
```http
PATCH /api/gestionDeStock/commandesfournisseurs/update/article/{idCommande}/{idLigneCommande}/{idArticle}
```

### Supprimer une Ligne de Commande Fournisseur
```http
DELETE /api/gestionDeStock/commandesfournisseurs/delete/article/{idCommande}/{idLigneCommande}
```

### Récupérer une Commande Fournisseur par ID
```http
GET /api/gestionDeStock/commandesfournisseurs/{idCommandeFournisseur}
```

### Récupérer une Commande Fournisseur par Code
```http
GET /api/gestionDeStock/commandesfournisseurs/filter/{codeCommandeFournisseur}
```

### Lister toutes les Commandes Fournisseurs
```http
GET /api/gestionDeStock/commandesfournisseurs/all
```

### Lister les Lignes d'une Commande Fournisseur
```http
GET /api/gestionDeStock/commandesfournisseurs/lignesCommande/{idCommande}
```

### Supprimer une Commande Fournisseur
```http
DELETE /api/gestionDeStock/commandesfournisseurs/delete/{idCommandeFournisseur}
```

---

## Fournisseurs

### Créer un Fournisseur
```http
POST /api/gestionDeStock/fournisseurs/create
Content-Type: application/json

{
  "nom": "string",
  "prenom": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "mail": "string",
  "numTel": "string",
  "idEntreprise": 0
}
```

### Récupérer un Fournisseur par ID
```http
GET /api/gestionDeStock/fournisseurs/{idFournisseur}
```

### Lister tous les Fournisseurs
```http
GET /api/gestionDeStock/fournisseurs/all
```

### Supprimer un Fournisseur
```http
DELETE /api/gestionDeStock/fournisseurs/delete/{idFournisseur}
```

---

## Entreprises

### Créer une Entreprise
```http
POST /api/gestionDeStock/entreprises/create
Content-Type: application/json

{
  "nom": "string",
  "description": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "codeFiscal": "string",
  "photo": "string",
  "email": "string",
  "numTel": "string",
  "steWeb": "string"
}
```

### Récupérer une Entreprise par ID
```http
GET /api/gestionDeStock/entreprises/{idEntreprise}
```

### Lister toutes les Entreprises
```http
GET /api/gestionDeStock/entreprises/all
```

### Supprimer une Entreprise
```http
DELETE /api/gestionDeStock/entreprises/delete/{idEntreprise}
```

---

## Utilisateurs

### Créer un Utilisateur
```http
POST /api/gestionDeStock/utilisateurs/create
Content-Type: application/json

{
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "dateDeNaissance": "2025-01-01",
  "motDePasse": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "entreprise": {
    "nom": "string",
    "description": "string"
  }
}
```

### Mettre à jour un Utilisateur
```http
PUT /api/gestionDeStock/utilisateurs/update/{id}
Content-Type: application/json

{
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "dateDeNaissance": "2025-01-01",
  "motDePasse": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "entreprise": {
    "nom": "string",
    "description": "string"
  }
}
```

### Changer le Mot de Passe
```http
POST /api/gestionDeStock/utilisateurs/update/password
Content-Type: application/json

{
  "id": 0,
  "ancienMotDePasse": "string",
  "nouveauMotDePasse": "string"
}
```

### Récupérer un Utilisateur par ID
```http
GET /api/gestionDeStock/utilisateurs/{idUtilisateur}
```

### Récupérer un Utilisateur par Email
```http
GET /api/gestionDeStock/utilisateurs/find/{email}
```

### Lister tous les Utilisateurs
```http
GET /api/gestionDeStock/utilisateurs/all
```

### Supprimer un Utilisateur
```http
DELETE /api/gestionDeStock/utilisateurs/delete/{idUtilisateur}
```

---

## Ventes

### Créer une Vente
```http
POST /api/gestionDeStock/ventes/create
Content-Type: application/json

{
  "code": "string",
  "dateVente": "2025-01-01",
  "commentaire": "string",
  "idEntreprise": 0,
  "ligneVentes": [
    {
      "article": {
        "codeArticle": "string",
        "designation": "string"
      },
      "quantite": 0,
      "prixUnitaire": 0,
      "idEntreprise": 0
    }
  ]
}
```

### Récupérer une Vente par ID
```http
GET /api/gestionDeStock/ventes/{idVentes}
```

### Récupérer une Vente par Code
```http
GET /api/gestionDeStock/ventes/filter/{codeVentes}
```

### Lister toutes les Ventes
```http
GET /api/gestionDeStock/ventes/all
```

### Lister les Lignes d'une Vente
```http
GET /api/gestionDeStock/ventes/lignesVente/{idVente}
```

### Supprimer une Vente
```http
DELETE /api/gestionDeStock/ventes/delete/{idVentes}
```

---

## Mouvements de Stock

### Créer un Mouvement de Stock
```http
POST /api/gestionDeStock/mvtstk/create
Content-Type: application/json

{
  "article": {
    "id": 0,
    "codeArticle": "string",
    "designation": "string"
  },
  "dateMvt": "2025-01-01",
  "typeMvt": "ENTREE",
  "sourceMvt": "COMMANDE_FOURNISSEUR",
  "quantite": 0,
  "idEntreprise": 0
}
```

### Récupérer un Mouvement de Stock par ID
```http
GET /api/gestionDeStock/mvtstk/{idMvtStk}
```

### Lister les Mouvements de Stock par Article
```http
GET /api/gestionDeStock/mvtstk/article/{idArticle}
```

### Lister les Mouvements de Stock par Type
```http
GET /api/gestionDeStock/mvtstk/type/{typeMvt}
```

### Lister tous les Mouvements de Stock
```http
GET /api/gestionDeStock/mvtstk/all
```

### Stock Réel d'un Article
```http
GET /api/gestionDeStock/mvtstk/stockreel/{idArticle}
```

### Supprimer un Mouvement de Stock
```http
DELETE /api/gestionDeStock/mvtstk/delete/{idMvtStk}
```

---

## Photos

### Upload de Photo
```http
POST /api/gestionDeStock/photos/{id}/{title}/{context}
Content-Type: multipart/form-data

file: [fichier image]
```

### Télécharger une Photo
```http
GET /api/gestionDeStock/photos/download/{fileName}
```

---

## DTOs

### DTOs Request (pour création/modification)

#### ArticleRequestDto
```json
{
  "codeArticle": "string",
  "designation": "string",
  "prixUnitaireHt": 0,
  "tauxTva": 0,
  "prixUnitaireTtc": 0,
  "photo": "string",
  "categorie": {
    "code": "string",
    "designation": "string"
  },
  "idEntreprise": 0
}
```

#### ClientRequestDto
```json
{
  "nom": "string",
  "prenom": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "mail": "string",
  "numTel": "string",
  "idEntreprise": 0
}
```

#### CommandeClientRequestDto
```json
{
  "code": "string",
  "dateCommande": "2025-01-01",
  "etatCommande": "EN_PREPARATION",
  "client": {
    "nom": "string",
    "prenom": "string",
    "mail": "string",
    "numTel": "string"
  },
  "idEntreprise": 0,
  "ligneCommandeClients": [
    {
      "article": {
        "codeArticle": "string",
        "designation": "string"
      },
      "quantite": 0,
      "prixUnitaire": 0,
      "idEntreprise": 0
    }
  ]
}
```

#### UtilisateurRequestDto
```json
{
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "dateDeNaissance": "2025-01-01",
  "motDePasse": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "entreprise": {
    "nom": "string",
    "description": "string"
  }
}
```

### DTOs Response (pour lecture)

#### ArticleResponseDto
```json
{
  "id": 0,
  "codeArticle": "string",
  "designation": "string",
  "prixUnitaireHt": 0,
  "tauxTva": 0,
  "prixUnitaireTtc": 0,
  "photo": "string",
  "categorie": {
    "id": 0,
    "code": "string",
    "designation": "string"
  },
  "idEntreprise": 0
}
```

#### ClientResponseDto
```json
{
  "id": 0,
  "nom": "string",
  "prenom": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "mail": "string",
  "numTel": "string",
  "idEntreprise": 0
}
```

#### CommandeClientResponseDto
```json
{
  "id": 0,
  "code": "string",
  "dateCommande": "2025-01-01",
  "etatCommande": "EN_PREPARATION",
  "client": {
    "id": 0,
    "nom": "string",
    "prenom": "string"
  },
  "idEntreprise": 0,
  "ligneCommandeClients": [
    {
      "id": 0,
      "article": {
        "id": 0,
        "codeArticle": "string",
        "designation": "string"
      },
      "quantite": 0,
      "prixUnitaire": 0
    }
  ]
}
```

#### UtilisateurResponseDto
```json
{
  "id": 0,
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "dateDeNaissance": "2025-01-01",
  "motDePasse": "string",
  "adresse": {
    "adresse1": "string",
    "adresse2": "string",
    "ville": "string",
    "codePostale": "string",
    "pays": "string"
  },
  "photo": "string",
  "entreprise": {
    "id": 0,
    "nom": "string",
    "description": "string"
  }
}
```

### Énums

#### EtatCommande
- `EN_PREPARATION`
- `VALIDEE`
- `LIVREE_EN_COURS`
- `LIVREE`
- `ANNULEE`

#### TypeMvtStk
- `ENTREE`
- `SORTIE`
- `CORRECTION_POSITIVE`
- `CORRECTION_NEGATIVE`

#### SourceMvtStk
- `COMMANDE_CLIENT`
- `COMMANDE_FOURNISSEUR`
- `VENTE`
- `AJUSTEMENT`

---

## Codes d'Erreur

| Code | Description |
|------|-------------|
| `ARTICLE_NOT_FOUND` | Article non trouvé |
| `ARTICLE_NOT_VALID` | Article invalide |
| `CLIENT_NOT_FOUND` | Client non trouvé |
| `COMMANDE_CLIENT_NOT_FOUND` | Commande client non trouvée |
| `COMMANDE_CLIENT_NOT_VALID` | Commande client invalide |
| `COMMANDE_CLIENT_ALREADY_IN_USE` | Commande client déjà utilisée |
| `COMMANDE_CLIENT_NON_MODIFIABLE` | Commande client non modifiable |
| `CATEGORIE_NOT_FOUND` | Catégorie non trouvée |
| `CATEGORIE_NOT_VALID` | Catégorie invalide |
| `FOURNISSEUR_NOT_FOUND` | Fournisseur non trouvé |
| `UTILISATEUR_NOT_FOUND` | Utilisateur non trouvé |
| `VENTES_NOT_FOUND` | Vente non trouvée |

---

## Notes Techniques

- **Authentification** : Utilise JWT tokens
- **Pagination** : Non implémentée dans cette version
- **Validation** : Validation côté serveur avec messages d'erreur en français
- **Gestion d'erreurs** : Codes d'erreur standardisés
- **Documentation** : Générée automatiquement avec Swagger/OpenAPI

Cette documentation couvre 100% des fonctionnalités du backend de gestion de stock.
