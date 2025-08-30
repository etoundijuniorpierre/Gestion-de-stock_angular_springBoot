import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-register',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule, RouterLink],
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css'],
  standalone: true
})
export class PageRegisterComponent {
  // Propriétés du formulaire
  nom: string = '';
  codeFiscal: string = '';
  email: string = '';
  adresse1: string = '';
  adresse2: string = '';
  ville: string = '';
  codePostal: string = '';
  pays: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Formulaire d\'inscription soumis:', {
      nom: this.nom,
      codeFiscal: this.codeFiscal,
      email: this.email,
      adresse1: this.adresse1,
      adresse2: this.adresse2,
      ville: this.ville,
      codePostal: this.codePostal,
      pays: this.pays,
      password: this.password,
      confirmPassword: this.confirmPassword,
      acceptTerms: this.acceptTerms
    });

    // Ici vous pouvez ajouter la logique d'inscription
    // Par exemple : this.authService.register(userData);
  }
}
