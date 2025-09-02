import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LigneCommandeFournisseurDto } from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailCmdComponent {
  @Input() ligneCommande: LigneCommandeFournisseurDto = {};

  calculerTotal(): number {
    if (this.ligneCommande.quantite && this.ligneCommande.prixUnitaire) {
      return this.ligneCommande.quantite * this.ligneCommande.prixUnitaire;
    }
    return 0;
  }
}
