# Guide de liaison Spring Boot - Angular

## 🚀 Démarrage rapide

### 1. Configuration Spring Boot

Assurez-vous que votre Spring Boot expose l'API Swagger :

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }
}
```

### 2. Vérifier l'API

Accédez à : http://localhost:8080/swagger-ui.html

### 3. Générer les services Angular

```bash
# Exécuter le script de liaison
.\link-spring-angular.ps1

# Ou manuellement
npx ng-swagger-gen -i http://localhost:8080/api-docs -o src/app/api
```

## 📁 Structure des fichiers

```
src/app/
├── api/                    # Services générés automatiquement
│   ├── models/            # Modèles TypeScript
│   ├── services/          # Services Angular
│   └── api.module.ts      # Module Angular
├── services/
│   └── api.service.ts     # Service de base
└── interceptors/
    └── api.interceptor.ts # Intercepteur HTTP
```

## 🔧 Configuration détaillée

### Spring Boot (pom.xml)

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

### Angular (app.config.ts)

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([ApiInterceptor]))
  ]
};
```

## 💡 Utilisation dans les composants

```typescript
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../api/services/product.service';

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
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (error) => console.error('Erreur:', error)
    });
  }
}
```

## 🔄 Mise à jour automatique

Pour surveiller les changements de l'API :

```bash
.\link-spring-angular.ps1 -Watch
```

## 🛠️ Dépannage

### Erreur CORS
- Vérifiez que `@CrossOrigin` est configuré dans Spring Boot
- Assurez-vous que les headers sont corrects

### API non accessible
- Vérifiez que Spring Boot est démarré sur le port 8080
- Testez l'URL : http://localhost:8080/api-docs

### Services non générés
- Vérifiez que Java est installé
- Utilisez `npx ng-swagger-gen` ou `swagger-codegen`

## 📚 Ressources

- [SpringDoc OpenAPI](https://springdoc.org/)
- [ng-swagger-gen](https://github.com/cyclosproject/ng-swagger-gen)
- [Swagger CodeGen](https://github.com/swagger-api/swagger-codegen) 