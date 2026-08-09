import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { ArticleService } from '../../../services/article/article.service';
import { CategorieDto, ArticleDto } from '../../../../gs-api/src/model/models';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CategorieDetailsComponent implements OnInit {
  category: CategorieDto = {};
  articles: ArticleDto[] = [];
  loading = true;
  error = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.loadCategoryDetails(Number(id));
    } else {
      this.error = 'Identifiant de catégorie invalide';
      this.loading = false;
    }
  }

  loadCategoryDetails(id: number): void {
    this.loading = true;
    this.categoryService.findById(id).subscribe({
      next: (category) => {
        this.category = category;
        this.loadArticlesForCategory(id);
      },
      error: (err) => {
        console.error('Erreur récupération catégorie:', err);
        this.error = 'Impossible de charger la catégorie';
        this.loading = false;
      }
    });
  }

  loadArticlesForCategory(categoryId: number): void {
    this.articleService.findAllArticlesByCategory(categoryId).subscribe({
      next: (articles) => {
        this.articles = articles || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur récupération articles catégorie:', err);
        this.loading = false;
      }
    });
  }

  retour(): void {
    this.router.navigate(['/dashboard', 'categories']);
  }

  modifier(): void {
    if (this.category.id) {
      this.router.navigate(['/dashboard', 'nouvellecategorie', this.category.id]);
    }
  }

  onImageError(event: any): void {
    event.target.src = 'assets/product.png';
  }
}
