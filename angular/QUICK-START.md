# 🚀 Démarrage Rapide - Spring Boot + Angular

## ✅ Configuration mise à jour pour votre API

Votre API Spring Boot est configurée sur :
- **Port**: 2035
- **Base URL**: http://localhost:2035/gestionDeStock
- **Swagger**: http://localhost:2035/v3/api-docs

## ✅ Étape 1: Vérifier que Spring Boot est démarré

Assurez-vous que votre application Spring Boot est en cours d'exécution sur `http://localhost:2035`

### Test de l'API :
```bash
# Testez l'URL de l'API
curl http://localhost:2035/v3/api-docs
```

## ✅ Étape 2: Services Angular créés

Les services suivants ont été créés automatiquement :
```
src/app/api/
├── api.module.ts                    # Module Angular
├── services/
│   ├── api.service.ts              # Service de base
│   └── product.service.ts          # Service pour les produits
└── interfaces/
    └── api.interfaces.ts           # Interfaces TypeScript
```

## ✅ Étape 3: Utiliser les services dans un composant

```typescript
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../api/services/product.service';
import { Product } from '../api/interfaces/api.interfaces';

@Component({
  selector: 'app-products',
  template: `
    <div *ngFor="let product of products">
      <h3>{{ product.name }}</h3>
      <p>Prix: {{ product.price }}€</p>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Produits chargés:', data);
      },
      error: (error) => {
        console.error('Erreur:', error);
      }
    });
  }
}
```

## ✅ Étape 4: Tester l'application

```bash
# Démarrer Angular
ng serve

# Ouvrir http://localhost:4200
```

## 🔧 Dépannage

### Erreur CORS
- Vérifiez que Spring Boot a `@CrossOrigin(origins = "http://localhost:4200")`
- Assurez-vous que les headers sont corrects

### API non accessible
- Vérifiez que Spring Boot est sur le port 2035
- Testez : http://localhost:2035/swagger-ui.html

### Services non générés
- Les services sont déjà créés dans `src/app/api/`
- Vous pouvez les adapter selon vos besoins

## 📝 Exemple de contrôleur Spring Boot

```java
@RestController
@RequestMapping("/gestionDeStock")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        // Votre logique métier
        return ResponseEntity.ok(products);
    }
    
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Votre logique métier
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }
}
```

## 🎯 URLs importantes

- **Swagger UI**: http://localhost:2035/swagger-ui.html
- **API Docs**: http://localhost:2035/v3/api-docs
- **Base API**: http://localhost:2035/gestionDeStock
- **Angular App**: http://localhost:4200

## 🚀 Test rapide

Pour tester rapidement la liaison :

1. **Démarrer Spring Boot** sur le port 2035
2. **Démarrer Angular**: `ng serve`
3. **Ouvrir**: http://localhost:4200
4. **Tester** les appels API dans la console du navigateur

## 📋 Services disponibles

- `ApiService`: Service de base pour les requêtes HTTP
- `ProductService`: Service spécifique pour les produits
- Interfaces: `Product`, `Category`, `ApiResponse`, `PaginatedResponse` 