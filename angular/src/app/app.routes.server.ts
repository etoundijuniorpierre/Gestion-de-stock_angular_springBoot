import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/statistiques',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/articles',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/nouvel-article',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/categories',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/mouvementsStock',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/clients',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/nouveauclient',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/nouveauclient/:id',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/commandesClient',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/fournisseurs',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/nouveaufournisseur',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/nouveaufournisseur/:id',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/commandesFournisseur',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/utilisateurs',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/vueDensemble',
    renderMode: RenderMode.Prerender
  }
];
