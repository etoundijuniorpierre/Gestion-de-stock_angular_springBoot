import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UtilisateurDto } from '../../../../gs-api/src/model/models';

@Component({
  selector: 'app-utilisateur-details',
  templateUrl: './utilisateur-details.component.html',
  styleUrls: ['./utilisateur-details.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UtilisateurDetailsComponent implements OnInit {
  utilisateur: UtilisateurDto = {};
  loading = true;
  error = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.findUtilisateurById(Number(id));
    } else {
      this.error = 'ID Utilisateur non valide';
      this.loading = false;
    }
  }

  findUtilisateurById(id: number): void {
    this.loading = true;
    this.userService.findById(id).subscribe({
      next: (user: UtilisateurDto) => {
        if (user && user.id) {
          this.utilisateur = user;
        } else {
          this.error = 'Utilisateur non trouvé';
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur récupération utilisateur:', err);
        this.error = 'Erreur lors de la récupération de l\'utilisateur';
        this.loading = false;
      }
    });
  }

  retour(): void {
    this.router.navigate(['/dashboard', 'utilisateurs']);
  }

  modifier(): void {
    if (this.utilisateur.id) {
      this.router.navigate(['/dashboard', 'nouvelutilisateur', this.utilisateur.id]);
    }
  }

  formatAdresse(adresse: any): string {
    if (!adresse) return 'Non renseignée';
    const parts = [
      adresse.adresse1,
      adresse.adresse2,
      adresse.ville,
      adresse.codePostale,
      adresse.pays
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Non renseignée';
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Non renseignée';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  }
}
