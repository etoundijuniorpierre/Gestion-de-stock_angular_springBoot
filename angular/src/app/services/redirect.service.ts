import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) {}

  // Gérer les redirections lors de l'actualisation
  handleRefreshRedirect(): void {
    const currentPath = window.location.pathname;
    
    // Si on est sur une page valide du dashboard, ne pas rediriger
    if (this.isValidDashboardPath(currentPath)) {
      // Sauvegarder l'URL actuelle
      sessionStorage.setItem('lastValidUrl', currentPath);
      return;
    }
    
    // Si on est sur la racine, rediriger vers dashboard
    if (currentPath === '/' || currentPath === '') {
      this.router.navigate(['/dashboard']);
    }
  }

  // Vérifier si un chemin est valide pour le dashboard
  private isValidDashboardPath(path: string): boolean {
    const validPaths = [
      '/dashboard',
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
    
    return validPaths.some(validPath => path.startsWith(validPath));
  }

  // Restaurer la dernière URL valide
  restoreLastValidUrl(): void {
    const lastValidUrl = sessionStorage.getItem('lastValidUrl');
    if (lastValidUrl && this.isValidDashboardPath(lastValidUrl)) {
      this.router.navigate([lastValidUrl]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  // Empêcher la redirection vers la racine
  preventRootRedirect(): void {
    const currentPath = window.location.pathname;
    if (currentPath && currentPath !== '/' && this.isValidDashboardPath(currentPath)) {
      // Empêcher la redirection vers la racine
      return;
    }
  }
} 