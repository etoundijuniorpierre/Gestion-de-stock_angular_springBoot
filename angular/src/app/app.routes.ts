import { Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { ArticleComponent } from './pages/page-articles/article/article.component';
import { NouvelArticleComponent } from './pages/page-articles/nouvel-article/nouvel-article.component';
import { PageCategoriesComponent } from './pages/categories/page-categories/page-categories.component';
import { PageStatistiquesComponent } from './pages/page-statistiques/page-statistiques.component';
import { PageClientsComponent } from './pages/page-clients/page-clients.component';
import { PageFournisseursComponent } from './pages/page-fournisseurs/page-fournisseurs.component';
import { NouveauClientComponent } from './components/nouveau-client/nouveau-client.component';
import { NouveauFournisseurComponent } from './components/nouveau-fournisseur/nouveau-fournisseur.component';
import { PageCommandesClientsComponent } from './pages/page-commandes-clients/page-commandes-clients.component';
import { PageCommandesFournisseursComponent } from './pages/page-commandes-fournisseurs/page-commandes-fournisseurs.component';
import { NouveauCmdCltComponent } from './components/nouveau-cmd-clt/nouveau-cmd-clt.component';
import { NouveauCmdFrsComponent } from './components/nouveau-cmd-frs/nouveau-cmd-frs.component';
import { MouvementsStocksComponent } from './pages/mouvements-stocks/mouvements-stocks.component';
import { PageVueEnsembleComponent } from './pages/page-vue-ensemble/page-vue-ensemble.component';
import { PageUtilisateurComponent } from './pages/utilisateur/page-utilisateur/page-utilisateur.component';
import { ApplicationGuardService } from './services/guard/application-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent, title: 'Login' },
  { path: 'register', component: PageRegisterComponent, title: 'Register' },
  
  { 
    path: 'dashboard', 
    component: PageDashboardComponent, 
    title: 'Dashboard',
    // canActivate: [ApplicationGuardService], // Temporairement désactivé
    children: [
      { path: '', redirectTo: 'statistiques', pathMatch: 'full' },
      { path: 'statistiques', component: PageStatistiquesComponent, title: 'Statistiques' },
      { path: 'articles', component: ArticleComponent, title: 'Articles' },
      { path: 'nouvel-article', component: NouvelArticleComponent, title: 'Nouvel Article' },
      { path: 'categories', component: PageCategoriesComponent, title: 'Catégories' },
      { path: 'mouvementsStock', component: MouvementsStocksComponent, title: 'MouvementsStock' },
      { path: 'clients', component: PageClientsComponent, title: 'Clients' },
      { path: 'nouveauclient', component: NouveauClientComponent, title: 'Nouveau Client' },
      { path: 'nouveauclient/:id', component: NouveauClientComponent, title: 'Modifier Client' },
      { path: 'commandesClient', component: PageCommandesClientsComponent, title: 'CommandesClient' },
      { path: 'commandesclient', component: PageCommandesClientsComponent, title: 'CommandesClient' },
      { path: 'nouvellecommandeclt', component: NouveauCmdCltComponent, title: 'Nouvelle Commande Client' },
      { path: 'fournisseurs', component: PageFournisseursComponent, title: 'Fournisseurs' },
      { path: 'nouveaufournisseur', component: NouveauFournisseurComponent, title: 'Nouveau Fournisseur' },
      { path: 'nouveaufournisseur/:id', component: NouveauFournisseurComponent, title: 'Modifier Fournisseur' },
      { path: 'commandesFournisseur', component: PageCommandesFournisseursComponent, title: 'CommandesFournisseur' },
      { path: 'commandesfournisseur', component: PageCommandesFournisseursComponent, title: 'CommandesFournisseur' },
      { path: 'nouvellecommandefrs', component: NouveauCmdFrsComponent, title: 'Nouvelle Commande Fournisseur' },
      { path: 'utilisateurs', component: PageUtilisateurComponent, title: 'Utilisateurs' },
      { path: 'nouvelutilisateur', component: PageUtilisateurComponent, title: 'Nouvel Utilisateur' },
      { path: 'vueDensemble', component: PageVueEnsembleComponent, title: 'Vue d\'ensemble' }
    ]
  }
];
