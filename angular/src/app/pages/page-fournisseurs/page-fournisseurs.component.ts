import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { SearchService } from '../../services/search/search.service';
import { DetailFrsComponent } from '../../components/detail-frs/detail-frs.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-fournisseurs',
  templateUrl: './page-fournisseurs.component.html',
  styleUrls: ['./page-fournisseurs.component.scss'],
  standalone: true,
  imports: [CommonModule, DetailFrsComponent, PaginationComponent, ButtonActionComponent]
})
export class PageFournisseursComponent implements OnInit, OnDestroy {
  listFournisseurs: Array<any> = [];
  filteredFournisseurs: Array<any> = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 15;
  errorMsg = '';
  loading = true;
  searchTerm = '';

  private searchSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.findAllFournisseurs();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.filterFournisseurs();
    });
  }

  private filterFournisseurs(): void {
    if (!this.searchTerm) {
      this.filteredFournisseurs = [...this.listFournisseurs];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredFournisseurs = this.listFournisseurs.filter(frs =>
        (frs.nom && frs.nom.toLowerCase().includes(term)) ||
        (frs.prenom && frs.prenom.toLowerCase().includes(term)) ||
        (frs.mail && frs.mail.toLowerCase().includes(term)) ||
        (frs.numTel && frs.numTel.toLowerCase().includes(term))
      );
    }
    this.calculatePagination();
  }

  private calculatePagination(): void {
    const total = Math.ceil(this.filteredFournisseurs.length / this.itemsPerPage);
    this.totalPages = total > 0 ? total : 1;
  }

  get getCurrentPageFournisseurs(): Array<any> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFournisseurs.slice(startIndex, endIndex);
  }

  findAllFournisseurs(): void {
    this.loading = true;
    this.cltFrsService.findAllFournisseurs().subscribe({
      next: (fournisseurs) => {
        this.listFournisseurs = fournisseurs || [];
        this.filterFournisseurs();
        this.errorMsg = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
        this.errorMsg = 'Erreur lors de la récupération des fournisseurs';
        this.listFournisseurs = [];
        this.filteredFournisseurs = [];
        this.loading = false;
      }
    });
  }

  nouveauFournisseur(): void {
    this.router.navigate(['dashboard', 'nouveaufournisseur']);
  }

  modifierFournisseur(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouveaufournisseur', id]);
    }
  }

  handleSuppression(result: string): void {
    if (result === 'success') {
      this.findAllFournisseurs();
    } else {
      this.errorMsg = result;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}