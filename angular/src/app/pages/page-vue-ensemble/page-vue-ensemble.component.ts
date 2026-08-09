import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-page-vue-ensemble',
  imports: [CommonModule],
  templateUrl: './page-vue-ensemble.component.html',
  styleUrl: './vue-ensemble.scss',
  standalone: true
})
export class PageVueEnsembleComponent implements OnInit {
  stats: DashboardStats = {
    totalArticles: 0,
    totalClients: 0,
    totalFournisseurs: 0,
    totalCommandesClients: 0,
    totalCommandesFournisseurs: 0,
    totalVentes: 0
  };
  loading: boolean = true;
  error: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.loading = true;
    this.dashboardService.getStatistiques().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement stats vue d\'ensemble:', err);
        this.error = 'Impossible de charger les statistiques pour le moment.';
        this.loading = false;
      }
    });
  }
}
