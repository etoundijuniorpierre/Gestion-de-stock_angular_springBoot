import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { DetailArticleComponent } from '../../../components/detail-article/detail-article.component';
import { ButtonActionComponent } from '../../../components/button-action/button-action.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  imports: [CommonModule, DetailArticleComponent, ButtonActionComponent, PaginationComponent],
  standalone: true
})
export class ArticleComponent {

  constructor(private router: Router) {}

  nouvelArticle() {
    this.router.navigate(['dashboard', 'nouvel-article']);
  }


}
