import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { CategorieDto } from '../../../gs-api/src/model/models';
import { CategoriesService } from '../../../gs-api/src/api/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoriesService: CategoriesService) { }

  findAll(): Observable<CategorieDto[]> {
    // L'API retourne un seul objet, on le convertit en tableau
    return this.categoriesService.findAll7().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
        return of([]);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.categoriesService.delete7(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la catégorie:', error);
        return of({ success: false, error });
      })
    );
  }

  save(category: CategorieDto): Observable<CategorieDto> {
    return this.categoriesService.save7(category).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la catégorie:', error);
        return of(category);
      })
    );
  }

  findById(id: number): Observable<CategorieDto> {
    return this.categoriesService.findById7(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de la catégorie:', error);
        return of({});
      })
    );
  }
}
