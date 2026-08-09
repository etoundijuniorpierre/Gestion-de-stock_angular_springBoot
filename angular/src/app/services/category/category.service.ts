import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { CategorieDto } from '../../../gs-api/src/model/models';
import { CategoriesService } from '../../../gs-api/src/api/categories.service';
import { GestionDesArticlesService } from '../../../gs-api/src/api/gestionDesArticles.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private categoriesService: CategoriesService,
    private gestionDesArticlesService: GestionDesArticlesService
  ) { }

  findAll(): Observable<CategorieDto[]> {
    return this.categoriesService.findAll7().pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        }
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

  isCategoryUsed(idCategory: number): Observable<boolean> {
    return this.gestionDesArticlesService.findAllArticleByIdCategorie(idCategory).pipe(
      map((articles: any) => {
        if (Array.isArray(articles)) {
          return articles.length > 0;
        }
        return (articles?.content?.length || 0) > 0;
      }),
      catchError(() => of(false))
    );
  }
}
