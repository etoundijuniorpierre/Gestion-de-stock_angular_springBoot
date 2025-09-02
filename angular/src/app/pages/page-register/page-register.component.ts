import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntrepriseDto, AdresseDto, AuthenticationRequest } from '../../../gs-api/src/model/models';
import { EntrepriseService } from '../../services/entreprise/entreprise.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-register',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css'],
  standalone: true
})
export class PageRegisterComponent implements OnInit {
  // Structure conforme aux DTOs générés
  entrepriseDto: EntrepriseDto = {
    nom: '',
    description: '',
    adresse: {
      adresse1: '',
      adresse2: '',
      ville: '',
      codePostale: '',
      pays: ''
    },
    codeFiscal: '',
    email: '',
    numTel: '',
    steWeb: ''
  };

  // Messages d'erreur
  errorsMsg: Array<string> = [];

  constructor(
    private router: Router,
    private entrepriseService: EntrepriseService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  inscrire(): void {
    // Réinitialiser les messages d'erreur
    this.errorsMsg = [];

    // Validation des champs obligatoires
    if (!this.entrepriseDto.nom?.trim()) {
      this.errorsMsg.push('Le nom est obligatoire');
    }
    if (!this.entrepriseDto.codeFiscal?.trim()) {
      this.errorsMsg.push('Le code fiscal est obligatoire');
    }
    if (!this.entrepriseDto.email?.trim()) {
      this.errorsMsg.push('L\'email est obligatoire');
    }
    if (!this.entrepriseDto.adresse?.adresse1?.trim()) {
      this.errorsMsg.push('L\'adresse 1 est obligatoire');
    }
    if (!this.entrepriseDto.adresse?.ville?.trim()) {
      this.errorsMsg.push('La ville est obligatoire');
    }
    if (!this.entrepriseDto.adresse?.codePostale?.trim()) {
      this.errorsMsg.push('Le code postal est obligatoire');
    }
    if (!this.entrepriseDto.adresse?.pays?.trim()) {
      this.errorsMsg.push('Le pays est obligatoire');
    }

    // Si il y a des erreurs, ne pas continuer
    if (this.errorsMsg.length > 0) {
      return;
    }

    // Validation de l'email
    if (!this.isValidEmail(this.entrepriseDto.email!)) {
      this.errorsMsg.push('Format d\'email invalide');
      return;
    }

    // Procéder à l'inscription via le service entreprise
    this.entrepriseService.sinscrire(this.entrepriseDto).subscribe({
      next: (entreprise: EntrepriseDto) => {
        console.log('✅ Inscription réussie:', entreprise);
        
        // Stocker l'ID de l'entreprise pour la modification du mot de passe
        if (entreprise.id) {
          localStorage.setItem('entrepriseId', entreprise.id.toString());
          console.log('🏢 ID entreprise stocké:', entreprise.id);
        }
        
        // Connecter automatiquement l'entreprise
        this.connectEntreprise();
      },
      error: (error: any) => {
        console.error('❌ Erreur lors de l\'inscription:', error);
        
        if (error.error?.errors) {
          this.errorsMsg = error.error.errors;
        } else if (error.status === 400) {
          this.errorsMsg.push('Données invalides. Vérifiez vos informations.');
        } else if (error.status === 409) {
          this.errorsMsg.push('Une entreprise avec cet email ou code fiscal existe déjà.');
        } else {
          this.errorsMsg.push('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
      }
    });
  }

  connectEntreprise(): void {
    if (!this.entrepriseDto.email) {
      this.errorsMsg.push('Email manquant pour la connexion automatique');
      return;
    }

    const authenticationRequest: AuthenticationRequest = {
      login: this.entrepriseDto.email,
      password: 'som3R@nd0mP@$$word' // Mot de passe temporaire comme dans l'exemple
    };

    // Utiliser le service d'authentification
    this.authService.login(this.entrepriseDto.email, 'som3R@nd0mP@$$word').subscribe({
      next: (response) => {
        if (response.accessToken) {
          console.log('🔐 Connexion automatique réussie');
          
          // Stocker l'origine pour la redirection
          localStorage.setItem('origin', 'inscription');
          
          // Rediriger vers le changement de mot de passe
          this.router.navigate(['/dashboard', 'changermotdepasse']);
        } else {
          this.errorsMsg.push('Erreur lors de la connexion automatique');
        }
      },
      error: (error: any) => {
        console.error('❌ Erreur lors de la connexion automatique:', error);
        this.errorsMsg.push('Erreur lors de la connexion automatique');
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
