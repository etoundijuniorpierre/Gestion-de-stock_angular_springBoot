import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangerMotDePasseUtilisateurDto } from '../../../../gs-api/src/model/models';
import { UtilisateursService } from '../../../../gs-api/src/api/utilisateurs.service';

@Component({
  selector: 'app-changer-mot-de-passe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './changer-mot-passe.component.html',
  styleUrls: ['./changer-mot-passe.component.scss']
})
export class ChangerMotDePasseComponent implements OnInit {
  changerMotDePasseDto: ChangerMotDePasseUtilisateurDto = {};
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private utilisateursService: UtilisateursService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'entreprise depuis le localStorage
    const entrepriseId = localStorage.getItem('entrepriseId');
    if (entrepriseId) {
      this.changerMotDePasseDto.id = parseInt(entrepriseId);
    }
  }

  onSubmit(): void {
    if (!this.changerMotDePasseDto.motDePasse || !this.changerMotDePasseDto.confirmMotDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.changerMotDePasseDto.motDePasse !== this.changerMotDePasseDto.confirmMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (!this.changerMotDePasseDto.id) {
      this.errorMessage = 'ID de l\'entreprise non trouvé';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.utilisateursService.changerMotDePasse(this.changerMotDePasseDto).subscribe({
      next: (response) => {
        this.successMessage = 'Mot de passe modifié avec succès !';
        // Rediriger vers le dashboard après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Erreur lors de la modification du mot de passe:', error);
        this.errorMessage = 'Erreur lors de la modification du mot de passe. Veuillez réessayer.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
