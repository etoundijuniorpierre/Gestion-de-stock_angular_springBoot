import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { DetailUtilisateurComponent } from '../../../components/detail-utilisateur/detail-utilisateur.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { UserService } from '../../../services/user/user.service';
import { UtilisateurDto } from '../../../../gs-api/src/model/models';

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonActionComponent,
    DetailUtilisateurComponent,
    PaginationComponent
  ]
})
export class PageUtilisateurComponent implements OnInit {

  listUtilisateurs: Array<UtilisateurDto> = [];
  isLoading = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.findAllUtilisateurs();
  }

  findAllUtilisateurs(): void {
    this.isLoading = true;
    this.userService.findAll().subscribe({
      next: (utilisateurs) => {
        this.listUtilisateurs = utilisateurs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.errorMsg = 'Erreur lors de la récupération des utilisateurs';
        this.isLoading = false;
      }
    });
  }

  nouvelUtilosateur(): void {
    this.router.navigate(['dashboard', 'nouvelutilisateur']);
  }
}