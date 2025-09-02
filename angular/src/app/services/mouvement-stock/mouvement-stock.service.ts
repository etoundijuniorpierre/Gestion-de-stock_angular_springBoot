import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { MvtStkDto, MvtStkDtoTypeMvtEnum, MvtStkDtoSourceMvtEnum } from '../../../gs-api/src/model/models';
import { MouvementsDeStockService } from '../../../gs-api/src/api/mouvementsDeStock.service';

@Injectable({
  providedIn: 'root'
})
export class MouvementStockService {

  constructor(private mouvementsDeStockService: MouvementsDeStockService) { }

  // Entrée en stock
  entreeStock(mvtStkDto: MvtStkDto): Observable<MvtStkDto> {
    return this.mouvementsDeStockService.entreeStock(mvtStkDto).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'entrée en stock:', error);
        return of(mvtStkDto);
      })
    );
  }

  // Sortie de stock
  sortieStock(mvtStkDto: MvtStkDto): Observable<MvtStkDto> {
    return this.mouvementsDeStockService.sortieStock(mvtStkDto).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sortie de stock:', error);
        return of(mvtStkDto);
      })
    );
  }

  // Correction positive de stock
  correctionStockPos(mvtStkDto: MvtStkDto): Observable<MvtStkDto> {
    return this.mouvementsDeStockService.correctionStockPos(mvtStkDto).pipe(
      catchError((error) => {
        console.error('Erreur lors de la correction positive:', error);
        return of(mvtStkDto);
      })
    );
  }

  // Correction négative de stock
  correctionStockNeg(mvtStkDto: MvtStkDto): Observable<MvtStkDto> {
    return this.mouvementsDeStockService.correctionStockNeg(mvtStkDto).pipe(
      catchError((error) => {
        console.error('Erreur lors de la correction négative:', error);
        return of(mvtStkDto);
      })
    );
  }

  // Mouvements de stock d'un article
  getMouvementsArticle(idArticle: number): Observable<MvtStkDto[]> {
    return this.mouvementsDeStockService.mvtStkArticle(idArticle).pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des mouvements:', error);
        return of([]);
      })
    );
  }

  // Stock réel d'un article
  getStockReelArticle(idArticle: number): Observable<number> {
    return this.mouvementsDeStockService.stockReelArticle(idArticle).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération du stock réel:', error);
        return of(0);
      })
    );
  }

  // Créer un mouvement d'entrée
  creerEntreeStock(articleId: number, quantite: number, sourceMvt: MvtStkDtoSourceMvtEnum = MvtStkDtoSourceMvtEnum.commandeFournisseur): Observable<MvtStkDto> {
    const mvtStk: MvtStkDto = {
      dateMvt: new Date().toISOString(),
      quantite: quantite,
      article: { id: articleId },
      typeMvt: MvtStkDtoTypeMvtEnum.entree,
      sourceMvt: sourceMvt
    };
    return this.entreeStock(mvtStk);
  }

  // Créer un mouvement de sortie
  creerSortieStock(articleId: number, quantite: number, sourceMvt: MvtStkDtoSourceMvtEnum = MvtStkDtoSourceMvtEnum.vente): Observable<MvtStkDto> {
    const mvtStk: MvtStkDto = {
      dateMvt: new Date().toISOString(),
      quantite: quantite,
      article: { id: articleId },
      typeMvt: MvtStkDtoTypeMvtEnum.sortie,
      sourceMvt: sourceMvt
    };
    return this.sortieStock(mvtStk);
  }

  // Créer une correction positive
  creerCorrectionPositive(articleId: number, quantite: number): Observable<MvtStkDto> {
    const mvtStk: MvtStkDto = {
      dateMvt: new Date().toISOString(),
      quantite: quantite,
      article: { id: articleId },
      typeMvt: MvtStkDtoTypeMvtEnum.correctionPos,
      sourceMvt: MvtStkDtoSourceMvtEnum.commandeFournisseur
    };
    return this.correctionStockPos(mvtStk);
  }

  // Créer une correction négative
  creerCorrectionNegative(articleId: number, quantite: number): Observable<MvtStkDto> {
    const mvtStk: MvtStkDto = {
      dateMvt: new Date().toISOString(),
      quantite: quantite,
      article: { id: articleId },
      typeMvt: MvtStkDtoTypeMvtEnum.correctionNeg,
      sourceMvt: MvtStkDtoSourceMvtEnum.commandeFournisseur
    };
    return this.correctionStockNeg(mvtStk);
  }
}
