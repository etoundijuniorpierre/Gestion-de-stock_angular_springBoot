import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieDto } from '../../../../gs-api/src/model/models';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-nouvelle-categorie',
  templateUrl: './nouvelle-categorie.component.html',
  styleUrls: ['./nouvelle-categorie.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NouvelleCategorieComponent implements OnInit {

  category: CategorieDto = {};
  isEditMode = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.findById(Number(id));
    }
  }

  findById(id: number): void {
    this.categoryService.findById(id).subscribe(
      category => {
        this.category = category;
      }
    );
  }

  save(): void {
    if (this.validateForm()) {
      this.categoryService.save(this.category).subscribe(
        () => {
          this.router.navigate(['dashboard', 'categories']);
        },
        error => {
          this.errorMsg = error.error?.message || 'Erreur lors de la sauvegarde';
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['dashboard', 'categories']);
  }

  private validateForm(): boolean {
    if (!this.category.code || !this.category.designation) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }
    this.errorMsg = '';
    return true;
  }
}
