import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { 
  CommandeClientDto, 
  LigneCommandeClientDto
} from '../../api/interfaces/client.interface';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmdCltFrsService: CmdcltfrsService
  ) { }

  ngOnInit(): void {
    this.findAllCommandes();
  }

  findAllCommandes(): void {
    this.cmdCltFrsService.findAllCommandesClient()
      .subscribe((cmd: CommandeClientDto[]) => {
        this.listeCommandes = cmd;
        this.findAllLignesCommande();
      });
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach((cmd: CommandeClientDto) => {
      this.findLignesCommande(cmd.id);
    });
  }

  nouvelleCommande(): void {
    this.router.navigate(['dashboard', 'nouvellecommandeclt']);
  }

  findLignesCommande(idCommande?: number): void {
    this.cmdCltFrsService.findAllLigneCommandesClient(idCommande)
      .subscribe((list: LigneCommandeClientDto[]) => {
        this.mapLignesCommande.set(idCommande!, list);
        this.mapPrixTotalCommande.set(idCommande!, this.calculerTatalCmd(list));
      });
  }

  calculerTatalCmd(list: Array<LigneCommandeClientDto>): number {
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
}