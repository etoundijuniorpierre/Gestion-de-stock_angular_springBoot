import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UtilisateurDto } from '../../../gs-api/src/model/models';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailUtilisateurComponent implements OnInit {
  @Input() utilisateur: UtilisateurDto = {};
  @Output() suppressionResult = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  modifierUtilisateur(): void {
    if (this.utilisateur.id) {
      this.router.navigate(['dashboard', 'nouvelutilisateur', this.utilisateur.id]);
    }
  }

  voirDetailsUtilisateur(): void {
    if (this.utilisateur.id) {
      this.router.navigate(['dashboard', 'utilisateur-details', this.utilisateur.id]);
    }
  }

  supprimerUtilisateur(): void {
    if (this.utilisateur.id && confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.delete(this.utilisateur.id).subscribe({
        next: () => this.suppressionResult.emit('success'),
        error: (err) => this.suppressionResult.emit(err.error?.message || 'Erreur lors de la suppression')
      });
    }
  }
}