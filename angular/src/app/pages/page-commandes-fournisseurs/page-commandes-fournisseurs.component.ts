import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { SearchService } from '../../services/search/search.service';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { DetailCmdFrsComponent } from '../../components/detail-cmd-frs/detail-cmd-frs.component';
import { DetailCmdComponent } from '../../components/detail-cmd/detail-cmd.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { 
  CommandeFournisseurDto, 
  LigneCommandeFournisseurDto
} from '../../../gs-api/src/model/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-commandes-fournisseurs',
  templateUrl: './page-commandes-fournisseurs.component.html',
  styleUrls: ['./page-commandes-fournisseurs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonActionComponent,
    DetailCmdFrsComponent,
    DetailCmdComponent,
    PaginationComponent
  ]
})
export class PageCommandesFournisseursComponent implements OnInit, OnDestroy {

  listeCommandes: Array<CommandeFournisseurDto> = [];
  filteredCommandes: Array<CommandeFournisseurDto> = [];
  mapLignesCommande = new Map<number, LigneCommandeFournisseurDto[]>();
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
        (cmd.fournisseur?.nom && cmd.fournisseur.nom.toLowerCase().includes(term)) ||
        (cmd.fournisseur?.prenom && cmd.fournisseur.prenom.toLowerCase().includes(term))
      );
    }
  }

  findAllCommandes(): void {
    this.isLoading = true;
    this.cmdCltFrsService.findAllCommandesFournisseur().subscribe({
      next: (cmd: CommandeFournisseurDto[]) => {
        this.listeCommandes = cmd || [];
        this.filterCommandes();
        this.findAllLignesCommande();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes fournisseurs:', error);
        this.errorMsg = 'Erreur lors de la récupération des commandes fournisseurs';
        this.isLoading = false;
      }
    });
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach((cmd: CommandeFournisseurDto) => {
      if (cmd.id) {
        this.findLignesCommande(cmd.id);
      }
    });
  }

  nouvelleCommande(): void {
    this.router.navigate(['dashboard', 'nouvellecommandefrs']);
  }

  modifierCommande(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouvellecommandefrs', id]);
    }
  }

  validerCommande(id?: number): void {
    if (id) {
      this.cmdCltFrsService.updateEtatCommandeFournisseur(id, 'VALIDEE').subscribe({
        next: () => {
          this.findAllCommandes();
        },
        error: (err) => {
          console.error('Erreur validation commande fournisseur:', err);
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
    
    this.cmdCltFrsService.findAllLigneCommandesFournisseur(idCommande).subscribe({
      next: (list: LigneCommandeFournisseurDto[]) => {
        this.mapLignesCommande.set(idCommande, list);
        const total = this.calculerTotalCmd(list);
        this.mapPrixTotalCommande.set(idCommande, total);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des lignes de commande fournisseur:', error);
        this.mapLignesCommande.set(idCommande, []);
        this.mapPrixTotalCommande.set(idCommande, 0);
      }
    });
  }

  calculerTotalCmd(list: Array<LigneCommandeFournisseurDto>): number {
    let total = 0;
    list.forEach((ligne: LigneCommandeFournisseurDto) => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }

  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id!) || 0;
  }

  getLignesCommande(id?: number): LigneCommandeFournisseurDto[] {
    return this.mapLignesCommande.get(id!) || [];
  }
}