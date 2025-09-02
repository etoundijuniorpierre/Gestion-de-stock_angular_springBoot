import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { EntrepriseDto } from '../../../gs-api/src/model/models';
import { EntreprisesService } from '../../../gs-api/src/api/entreprises.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private entreprisesService: EntreprisesService) { }

  // Inscription d'une entreprise
  sinscrire(entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    return this.entreprisesService.save3(entreprise).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'inscription de l\'entreprise:', error);
        return of(entreprise);
      })
    );
  }

  // Récupérer toutes les entreprises
  findAll(): Observable<EntrepriseDto[]> {
    return this.entreprisesService.findAll3().pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        }
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des entreprises:', error);
        return of([]);
      })
    );
  }

  // Récupérer une entreprise par ID
  findById(id: number): Observable<EntrepriseDto> {
    return this.entreprisesService.findById3(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'entreprise:', error);
        return of({});
      })
    );
  }

  // Mettre à jour une entreprise
  update(id: number, entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    // Note: update3 n'existe pas dans l'API, on lance une erreur
    const error = new Error('Méthode update non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  // Supprimer une entreprise
  delete(id: number): Observable<any> {
    return this.entreprisesService.delete3(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de l\'entreprise:', error);
        return of({ success: false, error });
      })
    );
  }
}
