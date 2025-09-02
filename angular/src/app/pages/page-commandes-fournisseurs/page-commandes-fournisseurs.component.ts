import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { DetailCmdFrsComponent } from '../../components/detail-cmd-frs/detail-cmd-frs.component';
import { DetailCmdComponent } from '../../components/detail-cmd/detail-cmd.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { 
  CommandeFournisseurDto, 
  LigneCommandeFournisseurDto
} from '../../../gs-api/src/model/models';

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
export class PageCommandesFournisseursComponent implements OnInit {

  listeCommandes: Array<CommandeFournisseurDto> = [];
  mapLignesCommande = new Map<number, LigneCommandeFournisseurDto[]>();
  mapPrixTotalCommande = new Map<number, number>();
  isLoading = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmdCltFrsService: CmdcltfrsService
  ) { }

  ngOnInit(): void {
    this.findAllCommandes();
  }

  findAllCommandes(): void {
    this.isLoading = true;
    this.cmdCltFrsService.findAllCommandesFournisseur()
      .subscribe({
        next: (cmd: CommandeFournisseurDto[]) => {
          this.listeCommandes = cmd;
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

  findLignesCommande(idCommande?: number): void {
    if (!idCommande) return;
    
    this.cmdCltFrsService.findAllLigneCommandesFournisseur(idCommande)
      .subscribe({
        next: (list: LigneCommandeFournisseurDto[]) => {
          console.log(`🔍 Lignes de commande fournisseur ${idCommande} reçues de l'API:`, list);
          this.mapLignesCommande.set(idCommande, list);
          const total = this.calculerTotalCmd(list);
          console.log(`🔍 Total calculé pour la commande ${idCommande}:`, total);
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