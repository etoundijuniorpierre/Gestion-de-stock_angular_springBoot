# Script alternatif pour générer les services API Angular
Write-Host "=== Génération des services API Angular ===" -ForegroundColor Green

# Créer le dossier de sortie
$outputDir = "src/app/api"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
    Write-Host "✓ Dossier créé: $outputDir" -ForegroundColor Green
}

# Créer la structure des dossiers
$folders = @("models", "services", "interfaces")
foreach ($folder in $folders) {
    $path = "$outputDir/$folder"
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force
        Write-Host "✓ Dossier créé: $path" -ForegroundColor Green
    }
}

# Créer un service de base pour l'API
$apiServiceContent = @"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:2035/gestionDeStock';
  
  constructor(private http: HttpClient) { }
  
  // Méthode générique pour les requêtes GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(\`\${this.baseUrl}\${endpoint}\`);
  }
  
  // Méthode générique pour les requêtes POST
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(\`\${this.baseUrl}\${endpoint}\`, data);
  }
  
  // Méthode générique pour les requêtes PUT
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(\`\${this.baseUrl}\${endpoint}\`, data);
  }
  
  // Méthode générique pour les requêtes DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(\`\${this.baseUrl}\${endpoint}\`);
  }
}
"@

$apiServiceContent | Out-File -FilePath "$outputDir/services/api.service.ts" -Encoding UTF8
Write-Host "✓ Service API de base créé" -ForegroundColor Green

# Créer un module API
$apiModuleContent = @"
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  exports: [
    HttpClientModule
  ]
})
export class ApiModule { }
"@

$apiModuleContent | Out-File -FilePath "$outputDir/api.module.ts" -Encoding UTF8
Write-Host "✓ Module API créé" -ForegroundColor Green

# Créer des interfaces de base
$interfacesContent = @"
// Interfaces génériques pour l'API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Interface pour les produits (exemple)
export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface pour les catégories (exemple)
export interface Category {
  id?: number;
  name: string;
  description?: string;
  products?: Product[];
}
"@

$interfacesContent | Out-File -FilePath "$outputDir/interfaces/api.interfaces.ts" -Encoding UTF8
Write-Host "✓ Interfaces créées" -ForegroundColor Green

# Créer un service pour les produits (exemple)
$productServiceContent = @"
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product, ApiResponse, PaginatedResponse } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = '/products';
  
  constructor(private apiService: ApiService) { }
  
  // Récupérer tous les produits
  getAllProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>(this.endpoint);
  }
  
  // Récupérer un produit par ID
  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(\`\${this.endpoint}/\${id}\`);
  }
  
  // Créer un nouveau produit
  createProduct(product: Product): Observable<Product> {
    return this.apiService.post<Product>(this.endpoint, product);
  }
  
  // Mettre à jour un produit
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.apiService.put<Product>(\`\${this.endpoint}/\${id}\`, product);
  }
  
  // Supprimer un produit
  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(\`\${this.endpoint}/\${id}\`);
  }
  
  // Récupérer les produits avec pagination
  getProductsPaginated(page: number = 0, size: number = 10): Observable<PaginatedResponse<Product>> {
    return this.apiService.get<PaginatedResponse<Product>>(\`\${this.endpoint}?page=\${page}&size=\${size}\`);
  }
}
"@

$productServiceContent | Out-File -FilePath "$outputDir/services/product.service.ts" -Encoding UTF8
Write-Host "✓ Service Product créé" -ForegroundColor Green

Write-Host ""
Write-Host "=== Génération terminée! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Fichiers créés:" -ForegroundColor Cyan
Write-Host "- $outputDir/api.module.ts" -ForegroundColor White
Write-Host "- $outputDir/services/api.service.ts" -ForegroundColor White
Write-Host "- $outputDir/services/product.service.ts" -ForegroundColor White
Write-Host "- $outputDir/interfaces/api.interfaces.ts" -ForegroundColor White
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Importez ApiModule dans votre app.config.ts" -ForegroundColor White
Write-Host "2. Utilisez ProductService dans vos composants" -ForegroundColor White
Write-Host "3. Adaptez les interfaces selon votre API" -ForegroundColor White 