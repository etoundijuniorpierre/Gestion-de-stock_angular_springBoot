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