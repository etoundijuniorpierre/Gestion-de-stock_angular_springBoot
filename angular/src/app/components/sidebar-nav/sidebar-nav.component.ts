import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

export interface NavItem {
  path: string;
  icon: string;
  text: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class SidebarNavComponent {
  navItems: NavItem[] = [
    {
      path: '/dashboard',
      icon: 'fas fa-home',
      text: 'Vue d\'ensemble',
      exact: true
    },
    {
      path: '/dashboard/statistiques',
      icon: 'fas fa-chart-bar',
      text: 'Statistiques'
    },
    {
      path: '/dashboard/article',
      icon: 'fas fa-box',
      text: 'Articles'
    },
    {
      path: '/dashboard/nouvel-article',
      icon: 'fas fa-plus-circle',
      text: 'Nouvel Article'
    },
    {
      path: '/dashboard/mouvementsStock',
      icon: 'fas fa-exchange-alt',
      text: 'Mouvements Stocks'
    },
    {
      path: '/dashboard/clients',
      icon: 'fas fa-users',
      text: 'Clients'
    },
    {
      path: '/dashboard/nouveauclient',
      icon: 'fas fa-user-plus',
      text: 'Nouveau Client'
    },
    {
      path: '/dashboard/fournisseurs',
      icon: 'fas fa-truck',
      text: 'Fournisseurs'
    },
    {
      path: '/dashboard/nouveaufournisseur',
      icon: 'fas fa-truck-loading',
      text: 'Nouveau Fournisseur'
    },
    {
      path: '/dashboard/categories',
      icon: 'fas fa-tags',
      text: 'Catégories'
    },
    {
      path: '/dashboard/nouvellecategorie',
      icon: 'fas fa-tag',
      text: 'Nouvelle Catégorie'
    },
    {
      path: '/dashboard/utilisateurs',
      icon: 'fas fa-user-cog',
      text: 'Utilisateurs'
    },
    {
      path: '/dashboard/nouvelutilisateur',
      icon: 'fas fa-user-plus',
      text: 'Nouvel Utilisateur'
    },
    {
      path: '/dashboard/commandesclient',
      icon: 'fas fa-shopping-cart',
      text: 'Commandes Clients'
    },
    {
      path: '/dashboard/commandesfournisseur',
      icon: 'fas fa-truck-loading',
      text: 'Commandes Fournisseurs'
    },
    {
      path: '/dashboard/changer-mot-passe',
      icon: 'fas fa-key',
      text: 'Changer Mot de Passe'
    }
  ];

  currentPath: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath = event.urlAfterRedirects;
    });
  }

  isCustomActive(item: NavItem): boolean {
    if (item.exact) {
      return this.currentPath === item.path || 
             this.currentPath === item.path + '/' || 
             this.currentPath === item.path + '/vue-ensemble';
    }
    return this.currentPath.startsWith(item.path);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
