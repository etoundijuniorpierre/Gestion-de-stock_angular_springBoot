import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentUrl: string = '';
  private previousUrl: string = '';

  constructor(private router: Router) {
    // Écouter les changements de navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      
      // Sauvegarder l'historique dans sessionStorage
      if (this.previousUrl && this.previousUrl !== '/') {
        sessionStorage.setItem('previousUrl', this.previousUrl);
      }
      
      // Sauvegarder l'URL actuelle si elle est valide
      if (this.currentUrl && this.currentUrl !== '/' && this.currentUrl !== '/dashboard') {
        sessionStorage.setItem('currentUrl', this.currentUrl);
      }
    });
  }

  // Obtenir l'URL actuelle
  getCurrentUrl(): string {
    return this.currentUrl;
  }

  // Obtenir l'URL précédente
  getPreviousUrl(): string {
    return sessionStorage.getItem('previousUrl') || this.previousUrl;
  }

  // Naviguer vers une URL spécifique
  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  // Naviguer vers l'URL précédente
  navigateBack(): void {
    const previousUrl = this.getPreviousUrl();
    if (previousUrl && previousUrl !== '/') {
      this.router.navigate([previousUrl]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  // Vérifier si on est sur une page spécifique
  isOnPage(pageUrl: string): boolean {
    return this.currentUrl.includes(pageUrl);
  }

  // Empêcher la redirection vers la racine
  preventRootRedirect(): void {
    // Si on est sur une page valide, ne pas rediriger vers la racine
    if (this.currentUrl && this.currentUrl !== '/' && this.currentUrl !== '/dashboard') {
      // Sauvegarder l'URL actuelle
      sessionStorage.setItem('currentUrl', this.currentUrl);
      return;
    }
  }

  // Restaurer l'URL sauvegardée
  restoreSavedUrl(): void {
    const savedUrl = sessionStorage.getItem('currentUrl');
    if (savedUrl && savedUrl !== '/' && savedUrl !== '/dashboard') {
      // Vérifier si l'URL sauvegardée est valide
      if (this.isValidDashboardUrl(savedUrl)) {
        this.router.navigate([savedUrl]);
      }
    }
  }

  // Vérifier si une URL est valide pour le dashboard
  private isValidDashboardUrl(url: string): boolean {
    const validPaths = [
      '/dashboard/statistiques',
      '/dashboard/articles',
      '/dashboard/categories',
      '/dashboard/mouvementsStock',
      '/dashboard/clients',
      '/dashboard/commandesClient',
      '/dashboard/fournisseurs',
      '/dashboard/commandesFournisseur',
      '/dashboard/utilisateurs',
      '/dashboard/vueDensemble'
    ];
    
    return validPaths.some(path => url.includes(path));
  }

  // Gérer la navigation après actualisation
  handlePageRefresh(): void {
    const currentPath = window.location.pathname;
    if (currentPath && currentPath !== '/' && currentPath !== '/dashboard') {
      // Si on est sur une page valide, sauvegarder l'URL
      sessionStorage.setItem('currentUrl', currentPath);
    }
  }
} 