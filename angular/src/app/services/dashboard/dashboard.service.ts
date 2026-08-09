import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GestionDesArticlesService } from '../../../gs-api/src/api/gestionDesArticles.service';
import { ClientsService } from '../../../gs-api/src/api/clients.service';
import { FournisseurService } from '../../../gs-api/src/api/fournisseur.service';
import { CommandesClientsService } from '../../../gs-api/src/api/commandesClients.service';
import { GestionDeStockCommandefournisseurService } from '../../../gs-api/src/api/gestionDeStockCommandefournisseur.service';
import { VentesService } from '../../../gs-api/src/api/ventes.service';

export interface DashboardStats {
  totalArticles: number;
  totalClients: number;
  totalFournisseurs: number;
  totalCommandesClients: number;
  totalCommandesFournisseurs: number;
  totalVentes: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private articlesService: GestionDesArticlesService,
    private clientsService: ClientsService,
    private fournisseursService: FournisseurService,
    private cmdClientsService: CommandesClientsService,
    private cmdFournisseursService: GestionDeStockCommandefournisseurService,
    private ventesService: VentesService
  ) {}

  getStatistiques(): Observable<DashboardStats> {
    return forkJoin({
      articles: this.articlesService.findAll8().pipe(catchError(() => of([]))),
      clients: this.clientsService.findAll6().pipe(catchError(() => of([]))),
      fournisseurs: this.fournisseursService.findAll2().pipe(catchError(() => of([]))),
      cmdClients: this.cmdClientsService.findAll5().pipe(catchError(() => of([]))),
      cmdFournisseurs: this.cmdFournisseursService.findAll4().pipe(catchError(() => of([]))),
      ventes: this.ventesService.findAll().pipe(catchError(() => of([])))
    }).pipe(
      map((res) => ({
        totalArticles: Array.isArray(res.articles) ? res.articles.length : (res.articles as any)?.content?.length || 0,
        totalClients: Array.isArray(res.clients) ? res.clients.length : (res.clients as any)?.content?.length || 0,
        totalFournisseurs: Array.isArray(res.fournisseurs) ? res.fournisseurs.length : (res.fournisseurs as any)?.content?.length || 0,
        totalCommandesClients: Array.isArray(res.cmdClients) ? res.cmdClients.length : (res.cmdClients as any)?.content?.length || 0,
        totalCommandesFournisseurs: Array.isArray(res.cmdFournisseurs) ? res.cmdFournisseurs.length : (res.cmdFournisseurs as any)?.content?.length || 0,
        totalVentes: Array.isArray(res.ventes) ? res.ventes.length : (res.ventes as any)?.content?.length || 0
      }))
    );
  }
}
