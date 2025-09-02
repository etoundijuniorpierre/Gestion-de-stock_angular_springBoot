import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';
import { ArticleService } from '../../services/article/article.service';
import { 
  CommandeClientDto, 
  LigneCommandeClientDto,
  ClientDto,
  ArticleDto,
  CommandeClientDtoEtatCommandeEnum
} from '../../../gs-api/src/model/models';

@Component({
  selector: 'app-nouveau-cmd-clt',
  templateUrl: './nouveau-cmd-clt.component.html',
  styleUrls: ['./nouveau-cmd-clt.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NouveauCmdCltComponent implements OnInit {

  selectedClient: ClientDto = {};
  listClients: Array<ClientDto> = [];
  searchedArticle: ArticleDto = {};
  listArticle: Array<ArticleDto> = [];
  codeArticle = '';
  quantite = '';
  codeCommande = '';

  lignesCommande: Array<LigneCommandeClientDto> = [];
  totalCommande = 0;
  articleNotYetSelected = false;
  errorMsg: Array<string> = [];
  isLoading = false;
  successMsg = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cltFrsService: CltfrsService,
    private cmdCltFrsService: CmdcltfrsService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllArticles();
  }

  findAllClients(): void {
    this.cltFrsService.findAllClients()
      .subscribe({
        next: (clients: ClientDto[]) => {
          this.listClients = clients;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des clients:', error);
          this.errorMsg.push('Erreur lors du chargement des clients');
        }
      });
  }

  findAllArticles(): void {
    this.articleService.findAllArticles()
      .subscribe({
        next: (articles: ArticleDto[]) => {
          this.listArticle = articles;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des articles:', error);
          this.errorMsg.push('Erreur lors du chargement des articles');
        }
      });
  }

  filtrerArticle(): void {
    if (this.codeArticle.length === 0) {
      this.findAllArticles();
    } else {
      this.listArticle = this.listArticle
        .filter(art => art.codeArticle?.includes(this.codeArticle) || art.designation?.includes(this.codeArticle));
    }
  }

  ajouterLigneCommande(): void {
    this.checkLigneCommande();
    if (this.errorMsg.length === 0) {
      this.calculerTotalCommande();
      this.searchedArticle = {};
      this.quantite = '';
      this.codeArticle = '';
      this.articleNotYetSelected = false;
      this.findAllArticles();
    }
  }

  checkLigneCommande(): void {
    this.errorMsg = [];
    
    if (!this.searchedArticle.id) {
      this.errorMsg.push('Veuillez sélectionner un article');
    }
    
    if (!this.quantite || +this.quantite <= 0) {
      this.errorMsg.push('Veuillez saisir une quantité valide');
    }
    
    if (this.lignesCommande.some(ligne => ligne.article?.id === this.searchedArticle.id)) {
      this.errorMsg.push('Cet article est déjà dans la commande');
    }
  }

  calculerTotalCommande(): void {
    this.totalCommande = 0;
    this.lignesCommande.forEach((ligne: LigneCommandeClientDto) => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
  }

  enregistrerCommande(): void {
    if (this.validateCommande()) {
      this.isLoading = true;
      
      const commande: CommandeClientDto = {
        code: this.codeCommande,
        dateCommande: new Date().toISOString(),
        client: this.selectedClient,
        etatCommande: CommandeClientDtoEtatCommandeEnum.enPreparation,
        ligneCommandeClients: this.lignesCommande
      };

      this.cmdCltFrsService.saveCommandeClient(commande)
        .subscribe({
          next: (commandeSauvegardee) => {
            this.successMsg = 'Commande enregistrée avec succès !';
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['dashboard', 'commandesclients']);
            }, 2000);
          },
          error: (error) => {
            console.error('Erreur lors de l\'enregistrement:', error);
            this.errorMsg.push('Erreur lors de l\'enregistrement de la commande');
            this.isLoading = false;
          }
        });
    }
  }

  validateCommande(): boolean {
    this.errorMsg = [];
    
    if (!this.selectedClient.id) {
      this.errorMsg.push('Veuillez sélectionner un client');
    }
    
    if (!this.codeCommande) {
      this.errorMsg.push('Veuillez saisir un code de commande');
    }
    
    if (this.lignesCommande.length === 0) {
      this.errorMsg.push('Veuillez ajouter au moins une ligne de commande');
    }
    
    return this.errorMsg.length === 0;
  }

  annuler(): void {
    this.router.navigate(['dashboard', 'commandesclients']);
  }

  supprimerLigne(index: number): void {
    this.lignesCommande.splice(index, 1);
    this.calculerTotalCommande();
  }

  selectArticleClick(article: ArticleDto): void {
    this.searchedArticle = article;
    this.codeArticle = article.codeArticle || '';
    this.articleNotYetSelected = true;
  }
}