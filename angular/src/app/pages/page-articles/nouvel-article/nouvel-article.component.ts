import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nouvel-article',
  imports: [CommonModule],
  templateUrl: './nouvel-article.component.html',
  styleUrl: './nouvel-article.component.scss',
  standalone: true
})
export class NouvelArticleComponent {
  errorMsg: string = '';

  constructor(private router: Router) {}

  annuler(): void {
    this.router.navigate(['dashboard', 'articles']);
  }

  enregistrer(): void {
    console.log('Enregistrement de l\'article...');
    this.router.navigate(['dashboard', 'articles']);
  }
}
