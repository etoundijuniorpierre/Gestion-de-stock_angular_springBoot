import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientDto, FournisseurDto } from '../../api/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class CltfrsService {

  constructor() { }

  // Méthodes pour les clients
  findAllClients(): Observable<ClientDto[]> {
    // Simulation de données pour le développement
    const mockClients: ClientDto[] = [
      {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        numTel: '0123456789',
        email: 'jean.dupont@email.com',
        photo: 'assets/client1.jpg',
        adresse: {
          adresse1: '123 Rue de la Paix',
          adresse2: 'Appartement 4A',
          ville: 'Paris',
          codePostale: '75001',
          pays: 'France'
        }
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        numTel: '0987654321',
        email: 'marie.martin@email.com',
        photo: 'assets/client2.jpg',
        adresse: {
          adresse1: '456 Avenue des Champs',
          adresse2: 'Bâtiment B',
          ville: 'Lyon',
          codePostale: '69001',
          pays: 'France'
        }
      },
      {
        id: 3,
        nom: 'Bernard',
        prenom: 'Sophie',
        numTel: '0555666777',
        email: 'sophie.bernard@email.com',
        photo: 'assets/client3.jpg',
        adresse: {
          adresse1: '789 Boulevard Central',
          adresse2: 'Étage 3',
          ville: 'Bordeaux',
          codePostale: '33000',
          pays: 'France'
        }
      },
      {
        id: 4,
        nom: 'Petit',
        prenom: 'Pierre',
        numTel: '0444555666',
        email: 'pierre.petit@email.com',
        photo: 'assets/client4.jpg',
        adresse: {
          adresse1: '321 Rue de la République',
          adresse2: 'Bureau 12',
          ville: 'Nantes',
          codePostale: '44000',
          pays: 'France'
        }
      }
    ];
    return of(mockClients);
  }

  findClientById(id: number): Observable<ClientDto> {
    // Simulation de recherche par ID
    const mockClients: ClientDto[] = [
      {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        numTel: '0123456789',
        email: 'jean.dupont@email.com',
        photo: 'assets/client1.jpg',
        adresse: {
          adresse1: '123 Rue de la Paix',
          adresse2: 'Appartement 4A',
          ville: 'Paris',
          codePostale: '75001',
          pays: 'France'
        }
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        numTel: '0987654321',
        email: 'marie.martin@email.com',
        photo: 'assets/client2.jpg',
        adresse: {
          adresse1: '456 Avenue des Champs',
          adresse2: 'Bâtiment B',
          ville: 'Lyon',
          codePostale: '69001',
          pays: 'France'
        }
      },
      {
        id: 3,
        nom: 'Bernard',
        prenom: 'Sophie',
        numTel: '0555666777',
        email: 'sophie.bernard@email.com',
        photo: 'assets/client3.jpg',
        adresse: {
          adresse1: '789 Boulevard Central',
          adresse2: 'Étage 3',
          ville: 'Bordeaux',
          codePostale: '33000',
          pays: 'France'
        }
      },
      {
        id: 4,
        nom: 'Petit',
        prenom: 'Pierre',
        numTel: '0444555666',
        email: 'pierre.petit@email.com',
        photo: 'assets/client4.jpg',
        adresse: {
          adresse1: '321 Rue de la République',
          adresse2: 'Bureau 12',
          ville: 'Nantes',
          codePostale: '44000',
          pays: 'France'
        }
      }
    ];
    
    const foundClient = mockClients.find(c => c.id === id);
    if (foundClient) {
      return of(foundClient);
    }
    
    // Retourner un client par défaut si l'ID n'est pas trouvé
    return of({
      id: id,
      nom: 'Client Inconnu',
      prenom: 'Prénom',
      numTel: '0000000000',
      email: 'client@email.com',
      photo: 'assets/client-default.jpg',
      adresse: {
        adresse1: 'Adresse inconnue',
        adresse2: '',
        ville: 'Ville inconnue',
        codePostale: '00000',
        pays: 'Pays inconnu'
      }
    });
  }

  // Alias pour la compatibilité
  enregistrerClient(client: ClientDto): Observable<ClientDto> {
    return this.saveClient(client);
  }

  saveClient(client: ClientDto): Observable<ClientDto> {
    // Simulation de sauvegarde avec validation
    if (!client.nom || !client.prenom || !client.email) {
      throw new Error('Les champs nom, prénom et email sont obligatoires');
    }
    
    // Générer un nouvel ID unique
    const newId = Math.floor(Math.random() * 10000) + 1000;
    const savedClient = { ...client, id: newId, createdAt: new Date(), updatedAt: new Date() };
    
    return of(savedClient);
  }

  updateClient(id: number, client: ClientDto): Observable<ClientDto> {
    // Simulation de mise à jour avec validation
    if (!client.nom || !client.prenom || !client.email) {
      throw new Error('Les champs nom, prénom et email sont obligatoires');
    }
    
    const updatedClient = { ...client, id: id, updatedAt: new Date() };
    return of(updatedClient);
  }

  deleteClient(id: number): Observable<void> {
    // Simulation de suppression avec validation
    if (!id || id <= 0) {
      throw new Error('ID de client invalide');
    }
    
    // Simulation de suppression réussie
    return of(void 0);
  }

  // Méthodes pour les fournisseurs
  findAllFournisseurs(): Observable<FournisseurDto[]> {
    // Simulation de données pour le développement
    const mockFournisseurs: FournisseurDto[] = [
      {
        id: 1,
        nom: 'Fournisseur1',
        prenom: 'Contact1',
        numTel: '0123456789',
        email: 'contact1@fournisseur.com',
        photo: 'assets/fournisseur1.jpg',
        adresse: {
          adresse1: '789 Rue du Commerce',
          adresse2: 'Zone Industrielle A',
          ville: 'Marseille',
          codePostale: '13001',
          pays: 'France'
        }
      },
      {
        id: 2,
        nom: 'Fournisseur2',
        prenom: 'Contact2',
        numTel: '0987654321',
        email: 'contact2@fournisseur.com',
        photo: 'assets/fournisseur2.jpg',
        adresse: {
          adresse1: '321 Avenue de l\'Industrie',
          adresse2: 'Parc Technologique',
          ville: 'Toulouse',
          codePostale: '31000',
          pays: 'France'
        }
      },
      {
        id: 3,
        nom: 'Fournisseur3',
        prenom: 'Contact3',
        numTel: '0666777888',
        email: 'contact3@fournisseur.com',
        photo: 'assets/fournisseur3.jpg',
        adresse: {
          adresse1: '654 Rue de la Production',
          adresse2: 'Hangar 7',
          ville: 'Lille',
          codePostale: '59000',
          pays: 'France'
        }
      },
      {
        id: 4,
        nom: 'Fournisseur4',
        prenom: 'Contact4',
        numTel: '0777888999',
        email: 'contact4@fournisseur.com',
        photo: 'assets/fournisseur4.jpg',
        adresse: {
          adresse1: '987 Avenue des Services',
          adresse2: 'Bâtiment C',
          ville: 'Strasbourg',
          codePostale: '67000',
          pays: 'France'
        }
      }
    ];
    return of(mockFournisseurs);
  }

  findFournisseurById(id: number): Observable<FournisseurDto> {
    // Simulation de recherche par ID
    const mockFournisseurs: FournisseurDto[] = [
      {
        id: 1,
        nom: 'Fournisseur1',
        prenom: 'Contact1',
        numTel: '0123456789',
        email: 'contact1@fournisseur.com',
        photo: 'assets/fournisseur1.jpg',
        adresse: {
          adresse1: '789 Rue du Commerce',
          adresse2: 'Zone Industrielle A',
          ville: 'Marseille',
          codePostale: '13001',
          pays: 'France'
        }
      },
      {
        id: 2,
        nom: 'Fournisseur2',
        prenom: 'Contact2',
        numTel: '0987654321',
        email: 'contact2@fournisseur.com',
        photo: 'assets/fournisseur2.jpg',
        adresse: {
          adresse1: '321 Avenue de l\'Industrie',
          adresse2: 'Parc Technologique',
          ville: 'Toulouse',
          codePostale: '31000',
          pays: 'France'
        }
      },
      {
        id: 3,
        nom: 'Fournisseur3',
        prenom: 'Contact3',
        numTel: '0666777888',
        email: 'contact3@fournisseur.com',
        photo: 'assets/fournisseur3.jpg',
        adresse: {
          adresse1: '654 Rue de la Production',
          adresse2: 'Hangar 7',
          ville: 'Lille',
          codePostale: '59000',
          pays: 'France'
        }
      },
      {
        id: 4,
        nom: 'Fournisseur4',
        prenom: 'Contact4',
        numTel: '0777888999',
        email: 'contact4@fournisseur.com',
        photo: 'assets/fournisseur4.jpg',
        adresse: {
          adresse1: '987 Avenue des Services',
          adresse2: 'Bâtiment C',
          ville: 'Strasbourg',
          codePostale: '67000',
          pays: 'France'
        }
      }
    ];
    
    const foundFournisseur = mockFournisseurs.find(f => f.id === id);
    if (foundFournisseur) {
      return of(foundFournisseur);
    }
    
    // Retourner un fournisseur par défaut si l'ID n'est pas trouvé
    return of({
      id: id,
      nom: 'Fournisseur Inconnu',
      prenom: 'Contact',
      numTel: '0000000000',
      email: 'contact@fournisseur.com',
      photo: 'assets/fournisseur-default.jpg',
      adresse: {
        adresse1: 'Adresse inconnue',
        adresse2: '',
        ville: 'Ville inconnue',
        codePostale: '00000',
        pays: 'Pays inconnu'
      }
    });
  }

  // Alias pour la compatibilité
  enregistrerFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    return this.saveFournisseur(fournisseur);
  }

  saveFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    // Simulation de sauvegarde avec validation
    if (!fournisseur.nom || !fournisseur.prenom || !fournisseur.email) {
      throw new Error('Les champs nom, prénom et email sont obligatoires');
    }
    
    // Générer un nouvel ID unique
    const newId = Math.floor(Math.random() * 10000) + 1000;
    const savedFournisseur = { ...fournisseur, id: newId, createdAt: new Date(), updatedAt: new Date() };
    
    return of(savedFournisseur);
  }

  updateFournisseur(id: number, fournisseur: FournisseurDto): Observable<FournisseurDto> {
    // Simulation de mise à jour avec validation
    if (!fournisseur.nom || !fournisseur.prenom || !fournisseur.email) {
      throw new Error('Les champs nom, prénom et email sont obligatoires');
    }
    
    const updatedFournisseur = { ...fournisseur, id: id, updatedAt: new Date() };
    return of(updatedFournisseur);
  }

  deleteFournisseur(id: number): Observable<void> {
    // Simulation de suppression avec validation
    if (!id || id <= 0) {
      throw new Error('ID de fournisseur invalide');
    }
    
    // Simulation de suppression réussie
    return of(void 0);
  }
}
