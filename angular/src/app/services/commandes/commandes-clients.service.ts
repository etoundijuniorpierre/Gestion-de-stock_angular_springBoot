import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { CommandeClientDto, LigneCommandeClientDto } from '../../../gs-api/src/model/models';
import { CommandesClientsService } from '../../../gs-api/src/api/commandesClients.service';

@Injectable({
  providedIn: 'root'
})
export class CommandesClientsServiceLocal {

  constructor(private commandesClientsService: CommandesClientsService) { }

  // Récupérer toutes les commandes clients
  findAll(): Observable<CommandeClientDto[]> {
    return this.commandesClientsService.findAll5().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des commandes clients:', error);
        return of([]);
      })
    );
  }

  // Récupérer une commande client par ID
  findById(id: number): Observable<CommandeClientDto> {
    return this.commandesClientsService.findById5(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de la commande client:', error);
        return of({});
      })
    );
  }

  // Sauvegarder une commande client
  save(commande: CommandeClientDto): Observable<CommandeClientDto> {
    return this.commandesClientsService.save5(commande).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la commande client:', error);
        return of(commande);
      })
    );
  }

  // Mettre à jour une commande client
  update(id: number, commande: CommandeClientDto): Observable<CommandeClientDto> {
    return this.commandesClientsService.update5(id, commande).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de la commande client:', error);
        return of(commande);
      })
    );
  }

  // Supprimer une commande client
  delete(id: number): Observable<any> {
    return this.commandesClientsService.delete5(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la commande client:', error);
        return of({ success: false, error });
      })
    );
  }

  // Récupérer les lignes de commande d'une commande client
  findLignesCommandeByCommandeId(idCommande: number): Observable<LigneCommandeClientDto[]> {
    return this.commandesClientsService.findAllLignesCommandesClientByCommandeClientId(idCommande).pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des lignes de commande:', error);
        return of([]);
      })
    );
  }
}
