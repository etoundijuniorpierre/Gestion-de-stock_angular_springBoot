import { Component } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { DetailMvtStkComponent } from '../../components/detail-mvt-stk/detail-mvt-stk.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { DetailMvtStkArticleComponent } from '../../components/detail-mvt-stk-article/detail-mvt-stk-article.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mouvements-stocks',
  templateUrl: './mouvements-stocks.component.html',
  styleUrl: './mouvements-stocks.component.scss',
  imports: [CommonModule, PaginationComponent, DetailMvtStkComponent, ButtonActionComponent, DetailMvtStkArticleComponent],
  standalone: true
})
export class MouvementsStocksComponent {
  // Properties to track collapse state
  isCollapseOneOpen = false;
  isCollapseTwoOpen = false;

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
}
