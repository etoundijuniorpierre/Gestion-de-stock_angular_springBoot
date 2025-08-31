import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface simplifiée pour le développement
interface LigneCommandeDto {
  article?: {
    designation?: string;
  };
  quantite?: number;
  prixUnitaire?: number;
}

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailCmdComponent {
  @Input() ligneCommande: LigneCommandeDto = {};

  calculerTotal(): number {
    if (this.ligneCommande.quantite && this.ligneCommande.prixUnitaire) {
      return this.ligneCommande.quantite * this.ligneCommande.prixUnitaire;
    }
    return 0;
  }
}
