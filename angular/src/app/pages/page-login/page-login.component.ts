import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-login',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule, CommonModule],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
  standalone: true
})
export class PageLoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.loginError = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    try {
      const success = await this.authService.login(this.email, this.password);
      
      if (success) {
        this.router.navigate(['/dashboard', 'statistiques']);
      } else {
        this.loginError = 'Email ou mot de passe incorrect';
      }
    } catch (error) {
      this.loginError = 'Erreur lors de la connexion';
    } finally {
      this.isLoading = false;
    }
  }

  onRegister() {
    console.log('Redirection vers la page d\'inscription');
    this.router.navigate(['/register']);
  }
}
