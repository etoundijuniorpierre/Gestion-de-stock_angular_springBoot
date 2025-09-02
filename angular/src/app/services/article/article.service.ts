import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { GestionDesArticlesService } from '../../../gs-api/src/api/gestionDesArticles.service';
import { ArticleDto } from '../../../gs-api/src/model/models';
import { Observable, of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private userService: UserService,
    private gestionDesArticlesService: GestionDesArticlesService
  ) { }

  enregistrerArticle(articleDto: ArticleDto): Observable<ArticleDto> {
    // Note: idEntreprise sera géré par le backend
    return this.gestionDesArticlesService.save8(articleDto).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de l\'article:', error);
        return of(articleDto);
      })
    );
  }

  findAllArticles(): Observable<ArticleDto[]> {
    return this.gestionDesArticlesService.findAll8().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des articles:', error);
        return of([]);
      })
    );
  }

  findArticleById(idArticle?: number): Observable<ArticleDto> {
    if (idArticle) {
      return this.gestionDesArticlesService.findById8(idArticle).pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération de l\'article:', error);
          return of({});
        })
      );
    }
    return of({});
  }

  deleteArticle(idArticle: number): Observable<any> {
    if (idArticle) {
      return this.gestionDesArticlesService.delete8(idArticle).pipe(
        catchError((error) => {
          console.error('Erreur lors de la suppression de l\'article:', error);
          return of({ success: false, error });
        })
      );
    }
    return of({ success: false });
  }

  findArticleByCode(codeArticle: string): Observable<ArticleDto> {
    return this.gestionDesArticlesService.findArticleByCodeArticle(codeArticle).pipe(
      catchError((error) => {
        console.error('Erreur lors de la recherche de l\'article par code:', error);
        return of({});
      })
    );
  }
}
