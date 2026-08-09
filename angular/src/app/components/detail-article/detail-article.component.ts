import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleDto } from '../../../gs-api/src/model/models';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-detail-article',
  imports: [CommonModule],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss',
  standalone: true
})
export class DetailArticleComponent {
  @Input() article: ArticleDto = {};
  @Output() suppressionResult = new EventEmitter<string>();

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {}

  modifierArticle(): void {
    if (this.article.id) {
      this.router.navigate(['dashboard', 'nouvel-article', this.article.id]);
    }
  }

  confirmerEtSupprimerArticle(): void {
    if (this.article.id) {
      this.articleService.deleteArticle(this.article.id).subscribe({
        next: () => {
          this.suppressionResult.emit('success');
        },
        error: (err) => {
          console.error('Erreur suppression article:', err);
          this.suppressionResult.emit(err.error?.message || 'Erreur lors de la suppression de l\'article');
        }
      });
    }
  }
}