import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-article',
  imports: [CommonModule],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.scss',
  standalone: true
})
export class DetailArticleComponent {

  confirmerEtSupprimerArticle() {
    console.log('Article supprimé');
  }

} 