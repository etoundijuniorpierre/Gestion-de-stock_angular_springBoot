import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { DetailCmdFrsComponent } from '../../components/detail-cmd-frs/detail-cmd-frs.component';
import { DetailCmdComponent } from '../../components/detail-cmd/detail-cmd.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

// Interfaces simplifiées pour le développement
interface LigneCommandeFournisseurDto {
  prixUnitaire?: number;
  quantite?: number;
}

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

  listeCommandes: Array<any> = [];
  mapLignesCommande = new Map();
  mapPrixTotalCommande = new Map();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmdCltFrsService: CmdcltfrsService
  ) { }

  ngOnInit(): void {
    this.findAllCommandes();
  }

  findAllCommandes(): void {
    this.cmdCltFrsService.findAllCommandesFournisseur()
      .subscribe((cmd: any[]) => {
        this.listeCommandes = cmd;
        this.findAllLignesCommande();
      });
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach(cmd => {
      this.findLignesCommande(cmd.id);
    });
  }

  nouvelleCommande(): void {
    this.router.navigate(['dashboard', 'nouvellecommandefrs']);
  }

  findLignesCommande(idCommande?: number): void {
    this.cmdCltFrsService.findAllLigneCommandesFournisseur(idCommande)
      .subscribe((list: any[]) => {
        this.mapLignesCommande.set(idCommande, list);
        this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
      });
  }

  calculerTatalCmd(list: Array<LigneCommandeFournisseurDto>): number {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }

  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id);
  }
}