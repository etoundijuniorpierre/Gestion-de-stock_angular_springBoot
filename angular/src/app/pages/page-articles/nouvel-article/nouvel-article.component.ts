import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleDto, CategorieDto } from '../../../../gs-api/src/model/models';
import { ArticleService } from '../../../services/article/article.service';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-nouvel-article',
  imports: [CommonModule, FormsModule],
  templateUrl: './nouvel-article.component.html',
  styleUrl: './nouvel-article.component.scss',
  standalone: true
})
export class NouvelArticleComponent implements OnInit {
  article: ArticleDto = {};
  categories: CategorieDto[] = [];
  errorMsg: string = '';
  successMsg: string = '';
  isLoading = false;
  isEditMode = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.checkEditMode();
  }

  private loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
        this.errorMsg = 'Erreur lors du chargement des catégories';
      }
    });
  }

  private checkEditMode(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.articleService.findArticleById(Number(id)).subscribe({
        next: (article) => {
          this.article = article;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de l\'article:', error);
          this.errorMsg = 'Erreur lors de la récupération de l\'article';
        }
      });
    }
  }

  annuler(): void {
    this.router.navigate(['dashboard', 'articles']);
  }

  enregistrer(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.articleService.enregistrerArticle(this.article).subscribe({
      next: (article) => {
        this.successMsg = 'Article enregistré avec succès !';
        setTimeout(() => {
          this.router.navigate(['dashboard', 'articles']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'article:', error);
        this.errorMsg = 'Erreur lors de l\'enregistrement de l\'article';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.article.codeArticle || !this.article.designation || !this.article.prixUnitaireHt) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }
    return true;
  }
}
