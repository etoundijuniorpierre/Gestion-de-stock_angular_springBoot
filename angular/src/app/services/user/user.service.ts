import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { UtilisateurDto } from '../../../gs-api/src/model/models';
import { UtilisateursService } from '../../../gs-api/src/api/utilisateurs.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private utilisateursService: UtilisateursService) { }

  findAll(): Observable<UtilisateurDto[]> {
    return this.utilisateursService.findAll1().pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        }
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return of([]);
      })
    );
  }

  findById(id: number): Observable<UtilisateurDto> {
    return this.utilisateursService.findById1(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return of({});
      })
    );
  }

  save(utilisateur: UtilisateurDto): Observable<UtilisateurDto> {
    return this.utilisateursService.save1(utilisateur).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
        return of(utilisateur);
      })
    );
  }

  update(id: number, utilisateur: UtilisateurDto): Observable<UtilisateurDto> {
    const error = new Error('Méthode update non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  delete(id: number): Observable<any> {
    return this.utilisateursService.delete1(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return of({ success: false, error });
      })
    );
  }

  changerMotDePasse(changerMotDePasseDto: any): Observable<any> {
    return this.utilisateursService.changerMotDePasse(changerMotDePasseDto).pipe(
      catchError((error) => {
        console.error('Erreur lors du changement de mot de passe:', error);
        return of({ success: false, error });
      })
    );
  }
}
