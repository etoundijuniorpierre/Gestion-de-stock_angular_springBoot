import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { FournisseurDto } from '../../api/interfaces/client.interface';

@Component({
  selector: 'app-nouveau-fournisseur',
  templateUrl: './nouveau-fournisseur.component.html',
  styleUrls: ['./nouveau-fournisseur.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class NouveauFournisseurComponent implements OnInit {
  
  fournisseur: FournisseurDto = {
    nom: '',
    prenom: '',
    numTel: '',
    email: '',
    codeFiscal: '',
    adresse: {
      adresse1: '',
      adresse2: '',
      ville: '',
      codePostale: '',
      pays: ''
    }
  };
  
  errorMsg = '';
  isEditMode = false;
  fournisseurId?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cltFrsService: CltfrsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.fournisseurId = +params['id'];
        this.loadFournisseur(this.fournisseurId);
      }
    });
  }

  loadFournisseur(id: number): void {
    this.cltFrsService.findFournisseurById(id).subscribe({
      next: (fournisseur) => {
        this.fournisseur = fournisseur;
      },
      error: (error) => {
        this.errorMsg = 'Erreur lors du chargement du fournisseur';
        console.error('Erreur:', error);
      }
    });
  }

  enregistrer(): void {
    if (this.isEditMode && this.fournisseurId) {
      this.cltFrsService.updateFournisseur(this.fournisseurId, this.fournisseur).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'fournisseurs']);
        },
        error: (error) => {
          this.errorMsg = 'Erreur lors de la mise à jour du fournisseur';
          console.error('Erreur:', error);
        }
      });
    } else {
      this.cltFrsService.saveFournisseur(this.fournisseur).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'fournisseurs']);
        },
        error: (error) => {
          this.errorMsg = 'Erreur lors de la sauvegarde du fournisseur';
          console.error('Erreur:', error);
        }
      });
    }
  }

  annuler(): void {
    this.router.navigate(['dashboard', 'fournisseurs']);
  }
}
