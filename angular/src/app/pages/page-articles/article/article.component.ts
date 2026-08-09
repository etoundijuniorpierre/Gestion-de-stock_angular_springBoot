import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailArticleComponent } from '../../../components/detail-article/detail-article.component';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../services/article/article.service';
import { SearchService } from '../../../services/search/search.service';
import { ArticleDto } from '../../../../gs-api/src/model/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  imports: [CommonModule, DetailArticleComponent, ButtonActionComponent, PaginationComponent],
  standalone: true
})
export class ArticleComponent implements OnInit, OnDestroy {
  listArticles: Array<ArticleDto> = [];
  filteredArticles: Array<ArticleDto> = [];
  errorMsg = '';
  loading = true;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 15;
  
  private searchSubscription: Subscription = new Subscription();
  searchTerm = '';

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.findAllArticles();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.filterArticles();
    });
  }

  private filterArticles(): void {
    if (!this.searchTerm) {
      this.filteredArticles = [...this.listArticles];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredArticles = this.listArticles.filter(article => 
        (article.codeArticle && article.codeArticle.toLowerCase().includes(term)) ||
        (article.designation && article.designation.toLowerCase().includes(term)) ||
        (article.categorie?.designation && article.categorie.designation.toLowerCase().includes(term))
      );
    }
    this.calculatePagination();
  }

  private calculatePagination(): void {
    const total = Math.ceil(this.filteredArticles.length / this.itemsPerPage);
    this.totalPages = total > 0 ? total : 1;
  }

  get getCurrentPageArticles(): Array<ArticleDto> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredArticles.slice(startIndex, endIndex);
  }

  findAllArticles(): void {
    this.loading = true;
    this.articleService.findAllArticles().subscribe({
      next: (articles) => {
        this.listArticles = articles || [];
        this.filterArticles();
        this.errorMsg = '';
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
        this.errorMsg = 'Erreur lors de la récupération des articles';
        this.listArticles = [];
        this.filteredArticles = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  nouvelArticle(): void {
    this.router.navigate(['dashboard', 'nouvel-article']);
  }

  modifierArticle(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouvel-article', id]);
    }
  }

  supprimerArticle(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          this.findAllArticles();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.errorMsg = 'Erreur lors de la suppression de l\'article';
        }
      });
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    const element = document.querySelector('.article-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  get hasNoArticles(): boolean {
    return this.listArticles.length === 0 && !this.loading;
  }

  get hasNoSearchResults(): boolean {
    return this.filteredArticles.length === 0 && this.listArticles.length > 0 && !this.loading;
  }

  get showPagination(): boolean {
    return this.listArticles.length > 0;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/product.png';
  }
}
