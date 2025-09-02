import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MvtStkDto } from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-detail-mvt-stk',
  imports: [CommonModule],
  templateUrl: './detail-mvt-stk.component.html',
  styleUrl: './detail-mvt-stk.component.scss',
  standalone: true
})
export class DetailMvtStkComponent {
  @Input() mouvement: MvtStkDto = {};

  getDateMouvement(): string {
    if (this.mouvement.dateMvt) {
      return new Date(this.mouvement.dateMvt).toLocaleDateString('fr-FR');
    }
    return 'N/A';
  }

  getQuantite(): number {
    return this.mouvement.quantite || 0;
  }

  getTypeMouvement(): string {
    if (this.mouvement.typeMvt) {
      switch (this.mouvement.typeMvt) {
        case 'ENTREE': return 'Entrée';
        case 'SORTIE': return 'Sortie';
        case 'CORRECTION_POS': return 'Correction +';
        case 'CORRECTION_NEG': return 'Correction -';
        default: return this.mouvement.typeMvt;
      }
    }
    return 'N/A';
  }

  getSourceMouvement(): string {
    if (this.mouvement.sourceMvt) {
      switch (this.mouvement.sourceMvt) {
        case 'COMMANDE_CLIENT': return 'Commande Client';
        case 'COMMANDE_FOURNISSEUR': return 'Commande Fournisseur';
        case 'VENTE': return 'Vente';
        default: return this.mouvement.sourceMvt;
      }
    }
    return 'N/A';
  }
}
