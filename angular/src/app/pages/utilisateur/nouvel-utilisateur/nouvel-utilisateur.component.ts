import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurDto } from '../../../../gs-api/src/model/models';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NouvelUtilisateurComponent implements OnInit {

  utilisateur: UtilisateurDto = {};
  isEditMode = false;
  isLoading = false;
  errorMsg = '';
  successMsg = '';
  telephone: string = ''; // Propriété pour le téléphone

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Initialiser l'objet adresse
    if (!this.utilisateur.adresse) {
      this.utilisateur.adresse = {};
    }
    
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.findById(Number(id));
    }
  }

  findById(id: number): void {
    this.userService.findById(id).subscribe({
      next: (utilisateur) => {
        this.utilisateur = utilisateur;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        this.errorMsg = 'Erreur lors de la récupération de l\'utilisateur';
      }
    });
  }

  save(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      
      if (this.isEditMode) {
        // Mode édition - Méthode non implémentée dans l'API
        this.errorMsg = 'La fonctionnalité de modification n\'est pas encore disponible. Veuillez créer un nouvel utilisateur.';
        this.isLoading = false;
        return;
      } else {
        this.userService.save(this.utilisateur).subscribe({
          next: (utilisateurCree) => {
            this.successMsg = 'Utilisateur créé avec succès !';
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['dashboard', 'utilisateurs']);
            }, 2000);
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.errorMsg = 'Erreur lors de la création de l\'utilisateur';
            this.isLoading = false;
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['dashboard', 'utilisateurs']);
  }

  private validateForm(): boolean {
    if (!this.utilisateur.nom || !this.utilisateur.prenom || !this.utilisateur.email) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires (nom, prénom, email)';
      return false;
    }
    
    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.utilisateur.email!)) {
      this.errorMsg = 'Veuillez saisir une adresse email valide';
      return false;
    }
    
    this.errorMsg = '';
    return true;
  }
}