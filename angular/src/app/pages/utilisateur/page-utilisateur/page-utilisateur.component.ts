import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { DetailUtilisateurComponent } from '../../../components/detail-utilisateur/detail-utilisateur.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { UserService } from '../../../services/user/user.service';
import { SearchService } from '../../../services/search/search.service';
import { UtilisateurDto } from '../../../../gs-api/src/model/models';
import { Subscription } from 'rxjs';

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
export class PageUtilisateurComponent implements OnInit, OnDestroy {
  listUtilisateurs: Array<UtilisateurDto> = [];
  filteredUtilisateurs: Array<UtilisateurDto> = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 15;
  isLoading = false;
  errorMsg = '';
  searchTerm = '';

  private searchSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private userService: UserService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.findAllUtilisateurs();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.filterUtilisateurs();
    });
  }

  private filterUtilisateurs(): void {
    if (!this.searchTerm) {
      this.filteredUtilisateurs = [...this.listUtilisateurs];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUtilisateurs = this.listUtilisateurs.filter(u =>
        (u.nom && u.nom.toLowerCase().includes(term)) ||
        (u.prenom && u.prenom.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term))
      );
    }
    this.calculatePagination();
  }

  private calculatePagination(): void {
    const total = Math.ceil(this.filteredUtilisateurs.length / this.itemsPerPage);
    this.totalPages = total > 0 ? total : 1;
  }

  get getCurrentPageUtilisateurs(): Array<UtilisateurDto> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUtilisateurs.slice(startIndex, endIndex);
  }

  findAllUtilisateurs(): void {
    this.isLoading = true;
    this.userService.findAll().subscribe({
      next: (utilisateurs) => {
        this.listUtilisateurs = utilisateurs || [];
        this.filterUtilisateurs();
        this.errorMsg = '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.errorMsg = 'Erreur lors de la récupération des utilisateurs';
        this.listUtilisateurs = [];
        this.filteredUtilisateurs = [];
        this.isLoading = false;
      }
    });
  }

  nouvelUtilisateur(): void {
    this.router.navigate(['dashboard', 'nouvelutilisateur']);
  }

  modifierUtilisateur(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouvelutilisateur', id]);
    }
  }

  voirDetailsUtilisateur(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'utilisateur-details', id]);
    }
  }

  handleSuppression(result: string): void {
    if (result === 'success') {
      this.findAllUtilisateurs();
    } else {
      this.errorMsg = result;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}