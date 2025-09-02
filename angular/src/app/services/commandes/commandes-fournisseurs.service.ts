import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { CommandeFournisseurDto, LigneCommandeFournisseurDto } from '../../../gs-api/src/model/models';
import { GestionDeStockCommandefournisseurService } from '../../../gs-api/src/api/gestionDeStockCommandefournisseur.service';

@Injectable({
  providedIn: 'root'
})
export class CommandesFournisseursServiceLocal {

  constructor(private commandesFournisseursService: GestionDeStockCommandefournisseurService) { }

  // Récupérer toutes les commandes fournisseurs
  findAll(): Observable<CommandeFournisseurDto[]> {
    return this.commandesFournisseursService.findAll4().pipe(
      map((response: any) => {
        // Si la réponse est un tableau, on le retourne tel quel
        if (Array.isArray(response)) {
          return response;
        }
        // Sinon, on essaie d'extraire le tableau de la réponse
        return response?.content || response?.data || [response] || [];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des commandes fournisseurs:', error);
        return of([]);
      })
    );
  }

  // Récupérer une commande fournisseur par ID
  findById(id: number): Observable<CommandeFournisseurDto> {
    return this.commandesFournisseursService.findById4(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de la commande fournisseur:', error);
        return of({});
      })
    );
  }

  // Sauvegarder une commande fournisseur
  save(commande: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    return this.commandesFournisseursService.save4(commande).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la commande fournisseur:', error);
        return of(commande);
      })
    );
  }

  // Mettre à jour une commande fournisseur
  update(id: number, commande: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    return this.commandesFournisseursService.update4(id, commande).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de la commande fournisseur:', error);
        return of(commande);
      })
    );
  }

  // Supprimer une commande fournisseur
  delete(id: number): Observable<any> {
    return this.commandesFournisseursService.delete4(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la commande fournisseur:', error);
        return of({ success: false, error });
      })
    );
  }

  // Récupérer les lignes de commande d'une commande fournisseur
  findLignesCommandeByCommandeId(idCommande: number): Observable<LigneCommandeFournisseurDto[]> {
    return this.commandesFournisseursService.findAllLignesCommandesFournisseurByCommandeFournisseurId(idCommande).pipe(
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
