import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { DetailUtilisateurComponent } from '../../../components/detail-utilisateur/detail-utilisateur.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  nouvelUtilosateur(): void {
    this.router.navigate(['dashboard', 'nouvelutilisateur']);
  }
}