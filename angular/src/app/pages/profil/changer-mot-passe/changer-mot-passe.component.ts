import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-changer-mot-passe',
  templateUrl: './changer-mot-passe.component.html',
  styleUrls: ['./changer-mot-passe.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ChangerMotPasseComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  message: { type: string; text: string } = { type: '', text: '' };
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  onSubmit(): void {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.message = { type: 'error', text: 'Veuillez remplir tous les champs' };
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = { type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' };
      return;
    }

    if (this.newPassword.length < 6) {
      this.message = { type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères' };
      return;
    }

    this.isLoading = true;
    this.message = { type: '', text: '' };

    // TODO: Implémenter l'appel API pour changer le mot de passe
    // Pour l'instant, nous simulons une réussite
    setTimeout(() => {
      this.isLoading = false;
      this.message = { type: 'success', text: 'Mot de passe changé avec succès!' };
      
      // Supprimer l'indicateur de changement de mot de passe
      localStorage.removeItem('mustChangePassword');
      
      // Rediriger vers le dashboard après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    }, 1500);
  }

  togglePasswordVisibility(field: string): void {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
