import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { SearchService } from '../../services/search/search.service';
import { 
  CommandeClientDto, 
  LigneCommandeClientDto
} from '../../../gs-api/src/model/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-commandes-clients',
  templateUrl: './page-commandes-clients.component.html',
  styleUrls: ['./page-commandes-clients.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PageCommandesClientsComponent implements OnInit, OnDestroy {

  listeCommandes: Array<CommandeClientDto> = [];
  filteredCommandes: Array<CommandeClientDto> = [];
  mapLignesCommande = new Map<number, LigneCommandeClientDto[]>();
  mapPrixTotalCommande = new Map<number, number>();
  isLoading = false;
  errorMsg = '';
  searchTerm = '';

  private searchSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmdCltFrsService: CmdcltfrsService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.findAllCommandes();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterCommandes();
    });
  }

  private filterCommandes(): void {
    if (!this.searchTerm) {
      this.filteredCommandes = [...this.listeCommandes];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCommandes = this.listeCommandes.filter(cmd => 
        (cmd.code && cmd.code.toLowerCase().includes(term)) ||
        (cmd.etatCommande && cmd.etatCommande.toLowerCase().includes(term)) ||
        (cmd.client?.nom && cmd.client.nom.toLowerCase().includes(term)) ||
        (cmd.client?.prenom && cmd.client.prenom.toLowerCase().includes(term))
      );
    }
  }

  findAllCommandes(): void {
    this.isLoading = true;
    this.cmdCltFrsService.findAllCommandesClient().subscribe({
      next: (cmd: CommandeClientDto[]) => {
        this.listeCommandes = cmd || [];
        this.filterCommandes();
        this.findAllLignesCommande();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
        this.errorMsg = 'Erreur lors de la récupération des commandes';
        this.isLoading = false;
      }
    });
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach((cmd: CommandeClientDto) => {
      if (cmd.id) {
        this.findLignesCommande(cmd.id);
      }
    });
  }

  nouvelleCommande(): void {
    this.router.navigate(['dashboard', 'nouvellecommandeclt']);
  }

  modifierCommande(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouvellecommandeclt', id]);
    }
  }

  validerCommande(id?: number): void {
    if (id) {
      this.cmdCltFrsService.updateEtatCommandeClient(id, 'VALIDEE').subscribe({
        next: () => {
          this.findAllCommandes();
        },
        error: (err) => {
          console.error('Erreur validation commande:', err);
          this.errorMsg = 'Erreur lors de la validation de la commande';
        }
      });
    }
  }

  isCommandeModifiable(etatCommande?: string): boolean {
    return etatCommande === 'EN_PREPARATION';
  }

  isCommandeValidable(etatCommande?: string): boolean {
    return etatCommande === 'EN_PREPARATION';
  }

  findLignesCommande(idCommande?: number): void {
    if (!idCommande) return;
    
    this.cmdCltFrsService.findAllLigneCommandesClient(idCommande).subscribe({
      next: (list: LigneCommandeClientDto[]) => {
        this.mapLignesCommande.set(idCommande, list);
        const total = this.calculerTotalCmd(list);
        this.mapPrixTotalCommande.set(idCommande, total);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des lignes de commande:', error);
        this.mapLignesCommande.set(idCommande, []);
        this.mapPrixTotalCommande.set(idCommande, 0);
      }
    });
  }

  calculerTotalCmd(list: Array<LigneCommandeClientDto>): number {
    let total = 0;
    list.forEach((ligne: LigneCommandeClientDto) => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }

  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id!) || 0;
  }

  getLignesCommande(id?: number): LigneCommandeClientDto[] {
    return this.mapLignesCommande.get(id!) || [];
  }
}