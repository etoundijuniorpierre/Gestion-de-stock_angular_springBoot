import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategorieDto } from '../../../../gs-api/src/model/models';
import { CategoryService } from '../../../services/category/category.service';
import { SearchService } from '../../../services/search/search.service';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { ConfirmationPopupComponent } from '../../../components/confirmation-popup/confirmation-popup.component';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonActionComponent, PaginationComponent, ConfirmationPopupComponent]
})
export class PageCategoriesComponent implements OnInit, OnDestroy {
  listCategories: Array<CategorieDto> = [];
  filteredCategories: Array<CategorieDto> = [];
  usedCategories = new Set<number>();
  selectedCatIdToDelete: number = -1;
  errorMsgs = '';
  loading = false;
  showDeleteModal = false;

  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 15;
  searchTerm = '';

  private searchSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.findAllCategories();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.filterCategories();
    });
  }

  filterCategories(): void {
    if (!this.searchTerm) {
      this.filteredCategories = [...this.listCategories];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCategories = this.listCategories.filter(cat =>
        (cat.code && cat.code.toLowerCase().includes(term)) ||
        (cat.designation && cat.designation.toLowerCase().includes(term))
      );
    }
    this.calculatePagination();
  }

  calculatePagination(): void {
    const total = Math.ceil(this.filteredCategories.length / this.itemsPerPage);
    this.totalPages = total > 0 ? total : 1;
  }

  get getCurrentPageCategories(): Array<CategorieDto> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCategories.slice(startIndex, endIndex);
  }

  findAllCategories(): void {
    this.loading = true;
    this.categoryService.findAll().subscribe({
      next: (res) => {
        this.listCategories = res || [];
        this.filterCategories();
        this.checkUsedCategories(this.listCategories);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur récupération catégories:', err);
        this.errorMsgs = 'Erreur lors de la récupération des catégories';
        this.loading = false;
      }
    });
  }

  checkUsedCategories(categories: Array<CategorieDto>): void {
    if (!categories || categories.length === 0) return;

    const observables = categories.map(cat => 
      cat.id ? this.categoryService.isCategoryUsed(cat.id).pipe(catchError(() => of(false))) : of(false)
    );

    forkJoin(observables).subscribe(results => {
      const set = new Set<number>();
      results.forEach((isUsed, index) => {
        if (isUsed && categories[index].id) {
          set.add(categories[index].id!);
        }
      });
      this.usedCategories = set;
    });
  }

  nouvelleCategory(): void {
    this.router.navigate(['dashboard', 'nouvellecategorie']);
  }

  voirDetailsCategorie(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'categorie-details', id]);
    }
  }

  modifierCategory(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouvellecategorie', id]);
    }
  }

  selectCatPourSupprimer(id?: number): void {
    if (id && !this.usedCategories.has(id)) {
      this.selectedCatIdToDelete = id;
      this.showDeleteModal = true;
    }
  }

  confirmerEtSupprimerCat(): void {
    if (this.selectedCatIdToDelete !== -1) {
      this.categoryService.delete(this.selectedCatIdToDelete).subscribe({
        next: () => {
          this.findAllCategories();
          this.selectedCatIdToDelete = -1;
          this.showDeleteModal = false;
          this.errorMsgs = '';
        },
        error: (error) => {
          this.errorMsgs = error.error?.message || 'Erreur lors de la suppression de la catégorie';
          this.showDeleteModal = false;
        }
      });
    }
  }

  annulerSuppressionCat(): void {
    this.selectedCatIdToDelete = -1;
    this.showDeleteModal = false;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}