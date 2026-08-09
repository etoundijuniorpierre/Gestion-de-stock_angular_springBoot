import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-page-statistiques',
  imports: [CommonModule],
  templateUrl: './page-statistiques.component.html',
  styleUrl: './page-statistiques.component.scss',
  standalone: true
})
export class PageStatistiquesComponent implements OnInit {
  stats: DashboardStats = {
    totalArticles: 0,
    totalClients: 0,
    totalFournisseurs: 0,
    totalCommandesClients: 0,
    totalCommandesFournisseurs: 0,
    totalVentes: 0
  };
  loading = true;
  errorMsg = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.loading = true;
    this.dashboardService.getStatistiques().subscribe({
      next: (data) => {
        this.stats = data;
        this.errorMsg = '';
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement statistiques:', err);
        this.errorMsg = 'Impossible de charger les statistiques pour le moment.';
        this.loading = false;
      }
    });
  }
}
