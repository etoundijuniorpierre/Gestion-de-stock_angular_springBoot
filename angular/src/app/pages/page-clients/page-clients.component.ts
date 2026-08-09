import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { DetailCltComponent } from '../../components/detail-clt/detail-clt.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { SearchService } from '../../services/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-clients',
  templateUrl: './page-clients.component.html',
  styleUrls: ['./page-clients.component.scss'],
  standalone: true,
  imports: [CommonModule, DetailCltComponent, PaginationComponent, ButtonActionComponent]
})
export class PageClientsComponent implements OnInit, OnDestroy {
  listClient: Array<any> = [];
  filteredClients: Array<any> = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 15;
  errorMsg = '';
  loading = true;
  
  private searchSubscription: Subscription = new Subscription();
  searchTerm = '';

  constructor(
    private router: Router,
    private cltFrsService: CltfrsService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.findAllClients();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.filterClients();
    });
  }

  private filterClients(): void {
    if (!this.searchTerm) {
      this.filteredClients = [...this.listClient];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredClients = this.listClient.filter(client => 
        (client.nom && client.nom.toLowerCase().includes(term)) ||
        (client.prenom && client.prenom.toLowerCase().includes(term)) ||
        (client.mail && client.mail.toLowerCase().includes(term)) ||
        (client.numTel && client.numTel.toLowerCase().includes(term))
      );
    }
    this.calculatePagination();
  }

  private calculatePagination(): void {
    const total = Math.ceil(this.filteredClients.length / this.itemsPerPage);
    this.totalPages = total > 0 ? total : 1;
  }

  get getCurrentPageClients(): Array<any> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredClients.slice(startIndex, endIndex);
  }

  findAllClients(): void {
    this.loading = true;
    this.cltFrsService.findAllClients()
      .subscribe({
        next: (clients) => {
          this.listClient = clients || [];
          this.filterClients();
          this.errorMsg = '';
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des clients:', error);
          this.errorMsg = 'Erreur lors de la récupération des clients';
          this.listClient = [];
          this.filteredClients = [];
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  nouveauClient(): void {
    this.router.navigate(['dashboard', 'nouveauclient']);
  }

  modifierClient(id?: number): void {
    if (id) {
      this.router.navigate(['dashboard', 'nouveauclient', id]);
    }
  }

  handleSuppression(result: string): void {
    if (result === 'success') {
      this.findAllClients();
    } else {
      this.errorMsg = result;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // Scroll to top
    const element = document.querySelector('.clients-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  get hasNoClients(): boolean {
    return this.listClient.length === 0 && !this.loading;
  }

  get hasNoSearchResults(): boolean {
    return this.filteredClients.length === 0 && this.listClient.length > 0 && !this.loading;
  }

  get showPagination(): boolean {
    return this.listClient.length > 0;
  }
}
