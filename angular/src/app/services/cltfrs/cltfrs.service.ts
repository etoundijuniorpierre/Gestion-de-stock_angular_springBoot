import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { ClientDto, FournisseurDto, AdresseDto } from '../../../gs-api/src/model/models';
import { ClientsService } from '../../../gs-api/src/api/clients.service';
import { FournisseurService } from '../../../gs-api/src/api/fournisseur.service';

@Injectable({
  providedIn: 'root'
})
export class CltfrsService {

  constructor(
    private clientsService: ClientsService,
    private fournisseurService: FournisseurService
  ) { }

  // Méthodes pour les clients
  findAllClients(): Observable<ClientDto[]> {
    // L'API retourne un seul objet, on le convertit en tableau
    return this.clientsService.findAll6().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des clients:', error);
        return of([]);
      })
    );
  }

  findClientById(id: number): Observable<ClientDto> {
    return this.clientsService.findById6(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération du client:', error);
        return of({});
      })
    );
  }

  saveClient(client: ClientDto): Observable<ClientDto> {
    return this.clientsService.save6(client).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde du client:', error);
        return of(client);
      })
    );
  }

  // Méthode temporaire pour update (à implémenter quand l'API sera disponible)
  updateClient(id: number, client: ClientDto): Observable<ClientDto> {
    // Pour l'instant, on lance une erreur car la méthode n'est pas implémentée
    const error = new Error('Méthode updateClient non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  deleteClient(id: number): Observable<any> {
    return this.clientsService.delete6(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression du client:', error);
        return of({ success: false, error });
      })
    );
  }

  // Méthodes pour les fournisseurs
  findAllFournisseurs(): Observable<FournisseurDto[]> {
    // L'API retourne un seul objet, on le convertit en tableau
    return this.fournisseurService.findAll2().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
        return of([]);
      })
    );
  }

  findFournisseurById(id: number): Observable<FournisseurDto> {
    return this.fournisseurService.findById2(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération du fournisseur:', error);
        return of({});
      })
    );
  }

  saveFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    return this.fournisseurService.save2(fournisseur).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde du fournisseur:', error);
        return of(fournisseur);
      })
    );
  }

  // Méthode temporaire pour update (à implémenter quand l'API sera disponible)
  updateFournisseur(id: number, fournisseur: FournisseurDto): Observable<FournisseurDto> {
    // Pour l'instant, on lance une erreur car la méthode n'est pas implémentée
    const error = new Error('Méthode updateFournisseur non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.fournisseurService.delete2(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression du fournisseur:', error);
        return of({ success: false, error });
      })
    );
  }

  // Méthodes de compatibilité (aliases)
  enregistrerClient(client: ClientDto): Observable<ClientDto> {
    return this.saveClient(client);
  }

  enregistrerFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    return this.saveFournisseur(fournisseur);
  }
}
