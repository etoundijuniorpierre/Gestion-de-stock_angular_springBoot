import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { UtilisateurDto } from '../../../gs-api/src/model/models';
import { UtilisateursService } from '../../../gs-api/src/api/utilisateurs.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private utilisateursService: UtilisateursService) { }

  // Récupérer tous les utilisateurs
  findAll(): Observable<UtilisateurDto[]> {
    return this.utilisateursService.findAll1().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return of([]);
      })
    );
  }

  // Récupérer un utilisateur par ID
  findById(id: number): Observable<UtilisateurDto> {
    return this.utilisateursService.findById1(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return of({});
      })
    );
  }

  // Sauvegarder un utilisateur
  save(utilisateur: UtilisateurDto): Observable<UtilisateurDto> {
    return this.utilisateursService.save1(utilisateur).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
        return of(utilisateur);
      })
    );
  }

  // Mettre à jour un utilisateur
  update(id: number, utilisateur: UtilisateurDto): Observable<UtilisateurDto> {
    // Note: update1 n'existe pas dans l'API, on lance une erreur
    const error = new Error('Méthode update non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  // Supprimer un utilisateur
  delete(id: number): Observable<any> {
    return this.utilisateursService.delete1(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return of({ success: false, error });
      })
    );
  }

  // Changer le mot de passe d'un utilisateur
  changerMotDePasse(changerMotDePasseDto: any): Observable<any> {
    return this.utilisateursService.changerMotDePasse(changerMotDePasseDto).pipe(
      catchError((error) => {
        console.error('Erreur lors du changement de mot de passe:', error);
        return of({ success: false, error });
      })
    );
  }
}
