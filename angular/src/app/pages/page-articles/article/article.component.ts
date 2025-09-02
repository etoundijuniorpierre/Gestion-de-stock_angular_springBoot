import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailArticleComponent } from '../../../components/detail-article/detail-article.component';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../services/article/article.service';
import { ArticleDto } from '../../../../gs-api/src/model/models';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  imports: [CommonModule, DetailArticleComponent, ButtonActionComponent, PaginationComponent],
  standalone: true
})
export class ArticleComponent implements OnInit {

  listArticles: Array<ArticleDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.findAllArticles();
  }

  findAllArticles(): void {
    this.articleService.findAllArticles().subscribe({
      next: (articles) => {
        this.listArticles = articles;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
        this.errorMsg = 'Erreur lors de la récupération des articles';
      }
    });
  }

  nouvelArticle() {
    this.router.navigate(['dashboard', 'nouvel-article']);
  }
}
