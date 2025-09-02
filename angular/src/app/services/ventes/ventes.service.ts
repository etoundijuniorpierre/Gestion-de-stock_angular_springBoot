import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { VentesDto, LigneVenteDto } from '../../../gs-api/src/model/models';
import { VentesService } from '../../../gs-api/src/api/ventes.service';

@Injectable({
  providedIn: 'root'
})
export class VentesServiceLocal {

  constructor(private ventesService: VentesService) { }

  // Récupérer toutes les ventes
  findAll(): Observable<VentesDto[]> {
    return this.ventesService.findAll().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des ventes:', error);
        return of([]);
      })
    );
  }

  // Récupérer une vente par ID
  findById(id: number): Observable<VentesDto> {
    return this.ventesService.findById(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de la vente:', error);
        return of({});
      })
    );
  }

  // Sauvegarder une vente
  save(vente: VentesDto): Observable<VentesDto> {
    return this.ventesService.save(vente).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la vente:', error);
        return of(vente);
      })
    );
  }

  // Mettre à jour une vente
  update(id: number, vente: VentesDto): Observable<VentesDto> {
    return this.ventesService.update(id, vente).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de la vente:', error);
        return of(vente);
      })
    );
  }

  // Supprimer une vente
  delete(id: number): Observable<any> {
    return this.ventesService._delete(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la vente:', error);
        return of({ success: false, error });
      })
    );
  }

  // Récupérer les lignes de vente d'une commande
  findLignesVenteByCommandeId(idCommande: number): Observable<LigneVenteDto[]> {
    return this.ventesService.findLignesVenteByCommandeId(idCommande).pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des lignes de vente:', error);
        return of([]);
      })
    );
  }
}
