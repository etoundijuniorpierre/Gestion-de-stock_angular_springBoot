import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { 
  CommandeClientDto, 
  LigneCommandeClientDto
} from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-page-commandes-clients',
  templateUrl: './page-commandes-clients.component.html',
  styleUrls: ['./page-commandes-clients.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PageCommandesClientsComponent implements OnInit {

  listeCommandes: Array<CommandeClientDto> = [];
  mapLignesCommande = new Map<number, LigneCommandeClientDto[]>();
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
    this.cmdCltFrsService.findAllCommandesClient()
      .subscribe({
        next: (cmd: CommandeClientDto[]) => {
          this.listeCommandes = cmd;
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

  findLignesCommande(idCommande?: number): void {
    if (!idCommande) return;
    
    this.cmdCltFrsService.findAllLigneCommandesClient(idCommande)
      .subscribe({
        next: (list: LigneCommandeClientDto[]) => {
          console.log(`🔍 Lignes de commande client ${idCommande} reçues de l'API:`, list);
          this.mapLignesCommande.set(idCommande, list);
          const total = this.calculerTotalCmd(list);
          console.log(`🔍 Total calculé pour la commande client ${idCommande}:`, total);
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