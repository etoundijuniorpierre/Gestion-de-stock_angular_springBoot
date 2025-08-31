import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { 
  CommandeClientDto, 
  CommandeFournisseurDto, 
  LigneCommandeClientDto, 
  LigneCommandeFournisseurDto 
} from '../api/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class CmdcltfrsService {

  constructor() { }

  // Méthodes pour les commandes clients
  findAllCommandesClient(): Observable<CommandeClientDto[]> {
    // Simulation de données pour le développement
    const mockCommandes: CommandeClientDto[] = [
      {
        id: 1,
        code: 'CMD-CLT-001',
        dateCommande: new Date('2024-01-15'),
        etatCommande: 'EN_COURS',
        totalPrix: 150.00,
        client: {
          id: 1,
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@email.com'
        }
      },
      {
        id: 2,
        code: 'CMD-CLT-002',
        dateCommande: new Date('2024-01-16'),
        etatCommande: 'LIVREE',
        totalPrix: 89.50,
        client: {
          id: 2,
          nom: 'Martin',
          prenom: 'Marie',
          email: 'marie.martin@email.com'
        }
      }
    ];
    return of(mockCommandes);
  }

  findAllLigneCommandesClient(idCommande?: number): Observable<LigneCommandeClientDto[]> {
    // Simulation de données pour le développement
    const mockLignes: LigneCommandeClientDto[] = [
      {
        id: 1,
        quantite: 2,
        prixUnitaire: 75.00,
        total: 150.00,
        article: { id: 1, nom: 'Produit A' }
      },
      {
        id: 2,
        quantite: 1,
        prixUnitaire: 89.50,
        total: 89.50,
        article: { id: 2, nom: 'Produit B' }
      }
    ];
    return of(mockLignes);
  }

  // Méthodes pour les commandes fournisseurs
  findAllCommandesFournisseur(): Observable<CommandeFournisseurDto[]> {
    // Simulation de données pour le développement
    const mockCommandes: CommandeFournisseurDto[] = [
      {
        id: 1,
        code: 'CMD-FRS-001',
        dateCommande: new Date('2024-01-15'),
        etatCommande: 'EN_COURS',
        totalPrix: 250.00,
        fournisseur: {
          id: 1,
          nom: 'Fournisseur1',
          prenom: 'Contact1',
          email: 'contact1@fournisseur.com'
        }
      },
      {
        id: 2,
        code: 'CMD-FRS-002',
        dateCommande: new Date('2024-01-16'),
        etatCommande: 'RECUE',
        totalPrix: 120.00,
        fournisseur: {
          id: 2,
          nom: 'Fournisseur2',
          prenom: 'Contact2',
          email: 'contact2@fournisseur.com'
        }
      }
    ];
    return of(mockCommandes);
  }

  findAllLigneCommandesFournisseur(idCommande?: number): Observable<LigneCommandeFournisseurDto[]> {
    // Simulation de données pour le développement
    const mockLignes: LigneCommandeFournisseurDto[] = [
      {
        id: 1,
        quantite: 5,
        prixUnitaire: 50.00,
        total: 250.00,
        article: { id: 1, nom: 'Matière première A' }
      },
      {
        id: 2,
        quantite: 3,
        prixUnitaire: 40.00,
        total: 120.00,
        article: { id: 2, nom: 'Matière première B' }
      }
    ];
    return of(mockLignes);
  }
}
