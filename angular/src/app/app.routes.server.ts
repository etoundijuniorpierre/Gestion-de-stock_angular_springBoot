import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'login',
    renderMode: RenderMode.Server
  },
  {
    path: 'register',
    renderMode: RenderMode.Server
  },
  // Routes dashboard avec tous les composants enfants
  {
    path: 'dashboard',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/statistiques',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/articles',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouvel-article',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/categories',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/mouvementsStock',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/clients',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouveauclient',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouveauclient/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/commandesClient',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/commandesclient',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouvellecommandeclt',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/fournisseurs',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouveaufournisseur',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouveaufournisseur/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/commandesFournisseur',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/commandesfournisseur',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouvellecommandefrs',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/utilisateurs',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/nouvelutilisateur',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/vueDensemble',
    renderMode: RenderMode.Server
  }
];
