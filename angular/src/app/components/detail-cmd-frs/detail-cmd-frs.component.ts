import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface simplifiée pour le développement
interface CommandeFournisseurDto {
  id?: number;
  code?: string;
  dateCommande?: number;
  etatCommande?: string;
  fournisseur?: {
    nom?: string;
    prenom?: string;
    photo?: string;
    numTel?: string;
    email?: string;
    adresse?: {
      adresse1?: string;
      adresse2?: string;
      codePostale?: string;
      ville?: string;
      pays?: string;
    };
  };
}

@Component({
  selector: 'app-detail-cmd-frs',
  templateUrl: './detail-cmd-frs.component.html',
  styleUrls: ['./detail-cmd-frs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailCmdFrsComponent implements OnInit {

  @Input()
  commande: CommandeFournisseurDto = {};

  constructor() { }

  ngOnInit(): void {
  }

  getDateCommande(): string {
    if (this.commande.dateCommande) {
      return new Date(this.commande.dateCommande).toLocaleDateString('fr-FR');
    }
    return '';
  }

  getNomFournisseur(): string {
    if (this.commande.fournisseur) {
      return `${this.commande.fournisseur.nom || ''} ${this.commande.fournisseur.prenom || ''}`.trim();
    }
    return '';
  }
}
