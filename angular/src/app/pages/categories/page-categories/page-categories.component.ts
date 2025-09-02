import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategorieDto } from '../../../../gs-api/src/model/models';
import { CategoryService } from '../../../services/category/category.service';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonActionComponent, PaginationComponent]
})
export class PageCategoriesComponent implements OnInit {

  listCategories: Array<CategorieDto> = [];
  selectedCatIdToDelete: number = -1;
  errorMsgs = '';

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.findAllCategories();
  }

  findAllCategories(): void {
    this.categoryService.findAll()
    .subscribe(res => {
      this.listCategories = res;
    });
  }

  nouvelleCategory(): void {
    this.router.navigate(['dashboard', 'nouvellecategorie']);
  }

  modifierCategory(id?: number): void {
    this.router.navigate(['dashboard', 'nouvellecategorie', id]);
  }

  confirmerEtSupprimerCat(): void {
    if (this.selectedCatIdToDelete !== -1) {
      this.categoryService.delete(this.selectedCatIdToDelete)
      .subscribe(res => {
        this.findAllCategories();
        this.selectedCatIdToDelete = -1;
      }, error => {
        this.errorMsgs = error.error?.message || 'Erreur lors de la suppression';
      });
    }
  }

  annulerSuppressionCat(): void {
    this.selectedCatIdToDelete = -1;
  }

  selectCatPourSupprimer(id?: number): void {
    if (id) {
      this.selectedCatIdToDelete = id;
    }
  }
}