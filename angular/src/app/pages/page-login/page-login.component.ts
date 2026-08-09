import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-login',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule, CommonModule],
  templateUrl: './page-login.component.html',
  styleUrl: './login.scss',
  standalone: true
})
export class PageLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: string = '';
  isLoading: boolean = false;
  rememberMe: boolean = false;
  showPassword: boolean = false;
  message: { type: string; text: string } = { type: '', text: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Charger les données sauvegardées au montage du composant
    const rememberedCredentials = this.authService.getRememberedCredentials();
    
    if (rememberedCredentials.rememberMe && rememberedCredentials.email) {
      this.email = rememberedCredentials.email;
      this.password = rememberedCredentials.password || '';
      this.rememberMe = true;
    }
    
    // Check if user is already authenticated
    if (this.authService.isLoggedIn()) {
      // Vérifier si l'utilisateur doit changer son mot de passe
      if (this.authService.mustChangePassword()) {
        this.router.navigate(['/dashboard', 'changer-mot-passe']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.loginError = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.loginError = '';
    this.message = { type: '', text: '' };

    this.authService.login(this.email, this.password, this.rememberMe).subscribe({
      next: (response) => {
        if (response.accessToken) {
          // Vérifier si l'utilisateur doit changer son mot de passe
          if (this.authService.mustChangePassword()) {
            this.message = { type: 'success', text: 'Connexion réussie ! Redirection vers le changement de mot de passe...' };
            setTimeout(() => {
              this.router.navigate(['/dashboard', 'changer-mot-passe']);
            }, 1500);
          } else {
            this.message = { type: 'success', text: 'Connexion réussie !' };
            // Rediriger vers le dashboard après 1 seconde
            setTimeout(() => {
              this.router.navigate(['/dashboard', 'statistiques']);
            }, 1000);
          }
        } else {
          this.loginError = 'Email ou mot de passe incorrect';
        }
      },
      error: (error) => {
        console.error('Erreur lors de la connexion:', error);
        this.loginError = 'Erreur de connexion au serveur';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onRegister() {
    console.log('Redirection vers la page d\'inscription');
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
