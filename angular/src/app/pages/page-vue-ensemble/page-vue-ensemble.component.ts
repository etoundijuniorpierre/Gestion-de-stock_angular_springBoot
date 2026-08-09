import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stats {
  totalArticles: number;
  totalClients: number;
  totalFournisseurs: number;
  totalCommandesClients: number;
  totalCommandesFournisseurs: number;
  totalVentes: number;
}

@Component({
  selector: 'app-page-vue-ensemble',
  imports: [CommonModule],
  templateUrl: './page-vue-ensemble.component.html',
  styleUrl: './vue-ensemble.scss',
  standalone: true
})
export class PageVueEnsembleComponent implements OnInit {
  stats: Stats = {
    totalArticles: 0,
    totalClients: 0,
    totalFournisseurs: 0,
    totalCommandesClients: 0,
    totalCommandesFournisseurs: 0,
    totalVentes: 0
  };
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    // Simulate API call
    setTimeout(() => {
      this.stats = {
        totalArticles: 150,
        totalClients: 45,
        totalFournisseurs: 12,
        totalCommandesClients: 23,
        totalCommandesFournisseurs: 8,
        totalVentes: 67
      };
      this.loading = false;
    }, 1500);
  }
}
