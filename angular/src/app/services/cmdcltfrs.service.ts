import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { 
  CommandeClientDto, 
  CommandeFournisseurDto, 
  LigneCommandeClientDto, 
  LigneCommandeFournisseurDto 
} from '../../gs-api/src/model/models';
import { CommandesClientsService } from '../../gs-api/src/api/commandesClients.service';
import { GestionDeStockCommandefournisseurService } from '../../gs-api/src/api/gestionDeStockCommandefournisseur.service';

@Injectable({
  providedIn: 'root'
})
export class CmdcltfrsService {

  constructor(
    private commandesClientsService: CommandesClientsService,
    private commandesFournisseursService: GestionDeStockCommandefournisseurService
  ) { }

  // ===== COMMANDES CLIENTS =====

  // Récupérer toutes les commandes clients
  findAllCommandesClient(): Observable<CommandeClientDto[]> {
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
  findByIdCommandeClient(id: number): Observable<CommandeClientDto> {
    // Note: findById5 n'existe pas dans l'API, on filtre depuis findAll5
    return this.commandesClientsService.findAll5().pipe(
      map((response: any) => {
        const commandes = Array.isArray(response) ? response : response?.content || response?.data || [response] || [];
        return commandes.find((cmd: CommandeClientDto) => cmd.id === id) || {};
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération de la commande client:', error);
        return of({});
      })
    );
  }

  // Sauvegarder une commande client
  saveCommandeClient(commande: CommandeClientDto): Observable<CommandeClientDto> {
    return this.commandesClientsService.save5(commande).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la commande client:', error);
        return of(commande);
      })
    );
  }

  // Mettre à jour une commande client
  updateCommandeClient(id: number, commande: CommandeClientDto): Observable<CommandeClientDto> {
    // Note: update5 n'existe pas dans l'API, on lance une erreur
    const error = new Error('Méthode updateCommandeClient non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  // Supprimer une commande client
  deleteCommandeClient(id: number): Observable<any> {
    return this.commandesClientsService.delete5(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la commande client:', error);
        return of({ success: false, error });
      })
    );
  }

  // Récupérer les lignes de commande d'une commande client
  findAllLigneCommandesClient(idCommande?: number): Observable<LigneCommandeClientDto[]> {
    if (!idCommande) {
      return of([]);
    }
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

  // ===== COMMANDES FOURNISSEURS =====

  // Récupérer toutes les commandes fournisseurs
  findAllCommandesFournisseur(): Observable<CommandeFournisseurDto[]> {
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
  findByIdCommandeFournisseur(id: number): Observable<CommandeFournisseurDto> {
    return this.commandesFournisseursService.findById4(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de la commande fournisseur:', error);
        return of({});
      })
    );
  }

  // Sauvegarder une commande fournisseur
  saveCommandeFournisseur(commande: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    return this.commandesFournisseursService.save4(commande).pipe(
      catchError((error) => {
        console.error('Erreur lors de la sauvegarde de la commande fournisseur:', error);
        return of(commande);
      })
    );
  }

  // Mettre à jour une commande fournisseur
  updateCommandeFournisseur(id: number, commande: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    // Note: update4 n'existe pas dans l'API, on lance une erreur
    const error = new Error('Méthode updateCommandeFournisseur non implémentée dans l\'API. Implémentation backend requise.');
    console.error(error.message);
    throw error;
  }

  // Supprimer une commande fournisseur
  deleteCommandeFournisseur(id: number): Observable<any> {
    return this.commandesFournisseursService.delete4(id).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la commande fournisseur:', error);
        return of({ success: false, error });
      })
    );
  }

  // Récupérer les lignes de commande d'une commande fournisseur
  findAllLigneCommandesFournisseur(idCommande?: number): Observable<LigneCommandeFournisseurDto[]> {
    if (!idCommande) {
      return of([]);
    }
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
        console.error('Erreur lors de la récupération des lignes de commande fournisseur:', error);
        return of([]);
      })
    );
  }

  // ===== MÉTHODES DE CALCUL =====

  // Calculer le total d'une commande
  calculerTotalCommande(lignes: LigneCommandeClientDto[] | LigneCommandeFournisseurDto[]): number {
    let total = 0;
    lignes.forEach((ligne: any) => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }
}
