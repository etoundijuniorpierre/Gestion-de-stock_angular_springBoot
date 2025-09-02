import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDto } from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-detail-article',
  imports: [CommonModule],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss',
  standalone: true
})
export class DetailArticleComponent {
  @Input() article: ArticleDto = {};

  confirmerEtSupprimerArticle() {
    console.log('Article supprimé');
  }
} 