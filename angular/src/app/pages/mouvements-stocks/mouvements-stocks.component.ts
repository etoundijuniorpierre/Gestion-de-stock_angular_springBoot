import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { DetailMvtStkComponent } from '../../components/detail-mvt-stk/detail-mvt-stk.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { DetailMvtStkArticleComponent } from '../../components/detail-mvt-stk-article/detail-mvt-stk-article.component';
import { MvtStkDto, ArticleDto, MvtStkDtoTypeMvtEnum, MvtStkDtoSourceMvtEnum } from '../../../gs-api/src/model/models';
import { MouvementStockService } from '../../services/mouvement-stock/mouvement-stock.service';
import { ArticleService } from '../../services/article/article.service';
import { SearchService } from '../../services/search/search.service';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ArticleWithMvt extends ArticleDto {
  stockActuel?: number;
  mouvements?: any[];
}

@Component({
  selector: 'app-mouvements-stocks',
  templateUrl: './mouvements-stocks.component.html',
  styleUrl: './mouvements-stocks.component.scss',
  imports: [CommonModule, PaginationComponent, DetailMvtStkComponent, ButtonActionComponent, DetailMvtStkArticleComponent],
  standalone: true
})
export class MouvementsStocksComponent implements OnInit, OnDestroy {
  articles: ArticleWithMvt[] = [];
  filteredArticles: ArticleWithMvt[] = [];
  collapseStates: { [key: number]: boolean } = {};
  
  isLoading = true;
  errorMsg = '';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 15;
  searchTerm = '';

  private searchSubscription: Subscription = new Subscription();

  constructor(
    private mouvementStockService: MouvementStockService,
    private articleService: ArticleService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadArticlesWithData();
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
      this.filteredArticles = [...this.articles];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredArticles = this.articles.filter(article =>
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

  get getCurrentPageArticles(): ArticleWithMvt[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredArticles.slice(startIndex, endIndex);
  }

  loadArticlesWithData(): void {
    this.isLoading = true;
    this.articleService.findAllArticles().subscribe({
      next: (articlesData) => {
        if (!articlesData || articlesData.length === 0) {
          this.articles = [];
          this.filteredArticles = [];
          this.isLoading = false;
          return;
        }

        const requests = articlesData.map(article => {
          if (!article.id) return of({ ...article, stockActuel: 0, mouvements: [] });
          
          return forkJoin({
            stock: this.mouvementStockService.getStockReelArticle(article.id).pipe(catchError(() => of(0))),
            mouvements: this.mouvementStockService.getMouvementsArticle(article.id).pipe(catchError(() => of([])))
          }).pipe(
            catchError(() => of({ stock: 0, mouvements: [] }))
          );
        });

        forkJoin(requests).subscribe(results => {
          this.articles = articlesData.map((art, index) => {
            const res = results[index] as any;
            const mouvementsFormatted = Array.isArray(res.mouvements) ? res.mouvements.map((mvt: any) => ({
              date: new Date(mvt.dateMvt).toLocaleDateString('fr-FR'),
              quantite: mvt.quantite,
              type: this.getTypeMvtLabel(mvt.typeMvt),
              source: this.getSourceMvtLabel(mvt.sourceMvt)
            })) : [];

            return {
              ...art,
              stockActuel: res.stock || 0,
              mouvements: mouvementsFormatted
            };
          });

          this.filterArticles();
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Erreur chargement articles movements:', err);
        this.errorMsg = 'Erreur lors du chargement des mouvements de stock';
        this.isLoading = false;
      }
    });
  }

  toggleCollapse(articleId?: number): void {
    if (articleId) {
      this.collapseStates[articleId] = !this.collapseStates[articleId];
    }
  }

  isExpanded(articleId?: number): boolean {
    return articleId ? !!this.collapseStates[articleId] : false;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getTypeMvtLabel(type: string): string {
    switch (type) {
      case MvtStkDtoTypeMvtEnum.entree: return 'Entrée';
      case MvtStkDtoTypeMvtEnum.sortie: return 'Sortie';
      case MvtStkDtoTypeMvtEnum.correctionPos: return 'Correction +';
      case MvtStkDtoTypeMvtEnum.correctionNeg: return 'Correction -';
      default: return type || 'N/A';
    }
  }

  getSourceMvtLabel(source: string): string {
    switch (source) {
      case MvtStkDtoSourceMvtEnum.commandeClient: return 'Commande Client';
      case MvtStkDtoSourceMvtEnum.commandeFournisseur: return 'Commande Fournisseur';
      case MvtStkDtoSourceMvtEnum.vente: return 'Vente';
      default: return source || 'N/A';
    }
  }
}
