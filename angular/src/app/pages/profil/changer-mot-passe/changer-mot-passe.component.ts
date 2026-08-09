import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

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
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  onSubmit(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.message = { type: 'error', text: 'Veuillez remplir tous les champs' };
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = { type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' };
      return;
    }

    const connectedUserStr = localStorage.getItem('connectedUser');
    let userId: number | undefined;
    if (connectedUserStr) {
      try {
        const u = JSON.parse(connectedUserStr);
        userId = u.id;
      } catch (e) {}
    }

    const dto = {
      id: userId,
      motDePasse: this.newPassword,
      confirmMotDePasse: this.confirmPassword
    };

    this.isLoading = true;
    this.message = { type: '', text: '' };

    this.userService.changerMotDePasse(dto).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.error) {
          this.message = { type: 'error', text: 'Erreur lors de la modification du mot de passe' };
        } else {
          this.message = { type: 'success', text: 'Mot de passe changé avec succès !' };
          localStorage.removeItem('mustChangePassword');
          setTimeout(() => {
            this.router.navigate(['/dashboard', 'vue-ensemble']);
          }, 2000);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.message = { type: 'error', text: err.error?.message || 'Erreur lors du changement de mot de passe' };
      }
    });
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
    this.router.navigate(['/dashboard', 'vue-ensemble']);
  }
}
