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
  imgUrl: string | ArrayBuffer = 'assets/product.png';
  file: File | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initArticleEnterprise();
    this.loadCategories();
    this.checkEditMode();
  }

  private initArticleEnterprise(): void {
    const idUser = localStorage.getItem('idUser') || localStorage.getItem('id');
    if (idUser) {
      this.article.idEntreprise = Number(idUser);
    }
  }

  private loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (categories) => {
        this.categories = categories || [];
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
          if (article.photo) {
            this.imgUrl = article.photo;
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de l\'article:', error);
          this.errorMsg = 'Erreur lors de la récupération de l\'article';
        }
      });
    }
  }

  calculerTtc(): void {
    if (this.article.prixUnitaireHt && this.article.prixUnitaireHt > 0) {
      const tauxTva = this.article.tauxTva ? Number(this.article.tauxTva) / 100 : 0;
      const ttc = Number(this.article.prixUnitaireHt) * (1 + tauxTva);
      this.article.prixUnitaireTtc = Math.round(ttc * 100) / 100;
    } else {
      this.article.prixUnitaireTtc = 0;
    }
  }

  onFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (e) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
            this.article.photo = fileReader.result as string;
          }
        };
      }
    }
  }

  compareCategory(c1: CategorieDto, c2: CategorieDto): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
      next: () => {
        this.successMsg = this.isEditMode ? 'Article modifié avec succès !' : 'Article enregistré avec succès !';
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
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires (Code, Désignation, Prix HT)';
      return false;
    }
    if (!this.article.categorie) {
      this.errorMsg = 'Veuillez sélectionner une catégorie';
      return false;
    }
    return true;
  }
}
