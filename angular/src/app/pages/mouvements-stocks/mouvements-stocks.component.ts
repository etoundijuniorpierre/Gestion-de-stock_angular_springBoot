import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { DetailMvtStkComponent } from '../../components/detail-mvt-stk/detail-mvt-stk.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { DetailMvtStkArticleComponent } from '../../components/detail-mvt-stk-article/detail-mvt-stk-article.component';
import { CommonModule } from '@angular/common';
import { MvtStkDto, MvtStkDtoTypeMvtEnum, MvtStkDtoSourceMvtEnum } from '../../../gs-api/src/model/models';
import { MouvementStockService } from '../../services/mouvement-stock/mouvement-stock.service';
import { ArticleService } from '../../services/article/article.service';
import { ArticleDto } from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-mouvements-stocks',
  templateUrl: './mouvements-stocks.component.html',
  styleUrl: './mouvements-stocks.component.scss',
  imports: [CommonModule, PaginationComponent, DetailMvtStkComponent, ButtonActionComponent, DetailMvtStkArticleComponent],
  standalone: true
})
export class MouvementsStocksComponent implements OnInit {
  // Properties to track collapse state
  isCollapseOneOpen = false;
  isCollapseTwoOpen = false;

  // Données des mouvements
  mouvementsStock: MvtStkDto[] = [];
  articles: ArticleDto[] = [];
  selectedArticle: ArticleDto | null = null;
  stockReel: number = 0;
  isLoading = false;
  errorMsg = '';

  constructor(
    private mouvementStockService: MouvementStockService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  // Charger les articles
  loadArticles(): void {
    this.articleService.findAllArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des articles:', error);
        this.errorMsg = 'Erreur lors du chargement des articles';
      }
    });
  }

  // Charger les mouvements d'un article
  loadMouvementsArticle(articleId: number): void {
    this.isLoading = true;
    this.mouvementStockService.getMouvementsArticle(articleId).subscribe({
      next: (mouvements) => {
        this.mouvementsStock = mouvements;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des mouvements:', error);
        this.errorMsg = 'Erreur lors du chargement des mouvements';
        this.isLoading = false;
      }
    });
  }

  // Charger le stock réel d'un article
  loadStockReel(articleId: number): void {
    this.mouvementStockService.getStockReelArticle(articleId).subscribe({
      next: (stock) => {
        this.stockReel = stock;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du stock:', error);
        this.stockReel = 0;
      }
    });
  }

  // Sélectionner un article
  onArticleSelect(article: ArticleDto): void {
    this.selectedArticle = article;
    if (article.id) {
      this.loadMouvementsArticle(article.id);
      this.loadStockReel(article.id);
    }
  }

  // Créer une entrée en stock
  creerEntreeStock(quantite: number): void {
    if (this.selectedArticle?.id && quantite > 0) {
      this.mouvementStockService.creerEntreeStock(
        this.selectedArticle.id, 
        quantite, 
        MvtStkDtoSourceMvtEnum.commandeFournisseur
      ).subscribe({
        next: (mouvement) => {
          console.log('Entrée en stock créée:', mouvement);
          // Recharger les données
          this.loadMouvementsArticle(this.selectedArticle!.id!);
          this.loadStockReel(this.selectedArticle!.id!);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'entrée:', error);
          this.errorMsg = 'Erreur lors de la création de l\'entrée en stock';
        }
      });
    }
  }

  // Créer une sortie de stock
  creerSortieStock(quantite: number): void {
    if (this.selectedArticle?.id && quantite > 0) {
      this.mouvementStockService.creerSortieStock(
        this.selectedArticle.id, 
        quantite, 
        MvtStkDtoSourceMvtEnum.vente
      ).subscribe({
        next: (mouvement) => {
          console.log('Sortie de stock créée:', mouvement);
          // Recharger les données
          this.loadMouvementsArticle(this.selectedArticle!.id!);
          this.loadStockReel(this.selectedArticle!.id!);
        },
        error: (error) => {
          console.error('Erreur lors de la création de la sortie:', error);
          this.errorMsg = 'Erreur lors de la création de la sortie de stock';
        }
      });
    }
  }

  // Toggle methods for each accordion section
  toggleCollapseOne(): void {
    this.isCollapseOneOpen = !this.isCollapseOneOpen;
  }

  toggleCollapseTwo(): void {
    this.isCollapseTwoOpen = !this.isCollapseTwoOpen;
  }

  // Get CSS classes for collapse animation
  getCollapseOneClass(): string {
    return this.isCollapseOneOpen ? 'collapse show' : 'collapse';
  }

  getCollapseTwoClass(): string {
    return this.isCollapseTwoOpen ? 'collapse show' : 'collapse';
  }

  // Get aria-expanded attribute
  getAriaExpandedOne(): string {
    return this.isCollapseOneOpen ? 'true' : 'false';
  }

  getAriaExpandedTwo(): string {
    return this.isCollapseTwoOpen ? 'true' : 'false';
  }

  // Formater la date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  // Obtenir le type de mouvement en français
  getTypeMvtLabel(type: string): string {
    switch (type) {
      case MvtStkDtoTypeMvtEnum.entree: return 'Entrée';
      case MvtStkDtoTypeMvtEnum.sortie: return 'Sortie';
      case MvtStkDtoTypeMvtEnum.correctionPos: return 'Correction +';
      case MvtStkDtoTypeMvtEnum.correctionNeg: return 'Correction -';
      default: return type;
    }
  }

  // Obtenir la source du mouvement en français
  getSourceMvtLabel(source: string): string {
    switch (source) {
      case MvtStkDtoSourceMvtEnum.commandeClient: return 'Commande Client';
      case MvtStkDtoSourceMvtEnum.commandeFournisseur: return 'Commande Fournisseur';
      case MvtStkDtoSourceMvtEnum.vente: return 'Vente';
      default: return source;
    }
  }
}
