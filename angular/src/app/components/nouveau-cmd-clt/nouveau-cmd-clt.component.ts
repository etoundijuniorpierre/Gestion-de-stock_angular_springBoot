import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CltfrsService } from '../../services/cltfrs/cltfrs.service';
import { CmdcltfrsService } from '../../services/cmdcltfrs.service';

// Interfaces simplifiées pour le développement
interface ArticleDto {
  id?: number;
  codeArticle?: string;
  designation?: string;
  prixUnitaireTtc?: number;
}

interface LigneCommandeClientDto {
  article?: ArticleDto;
  prixUnitaire?: number;
  quantite?: number;
}

interface CommandeClientDto {
  client?: any;
  code?: string;
  dateCommande?: number;
  etatCommande?: string;
  ligneCommandeClients?: LigneCommandeClientDto[];
}

@Component({
  selector: 'app-nouveau-cmd-clt',
  templateUrl: './nouveau-cmd-clt.component.html',
  styleUrls: ['./nouveau-cmd-clt.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NouveauCmdCltComponent implements OnInit {

  selectedClient: any = {};
  listClients: Array<any> = [];
  searchedArticle: ArticleDto = {};
  listArticle: Array<ArticleDto> = [];
  codeArticle = '';
  quantite = '';
  codeCommande = '';

  lignesCommande: Array<any> = [];
  totalCommande = 0;
  articleNotYetSelected = false;
  errorMsg: Array<string> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cltFrsService: CltfrsService,
    private cmdCltFrsService: CmdcltfrsService
  ) { }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllArticles();
  }

  findAllClients(): void {
    this.cltFrsService.findAllClients()
      .subscribe((clients: any[]) => {
        this.listClients = clients;
      });
  }

  findAllArticles(): void {
    // Simulation de données pour le développement
    this.listArticle = [
      { id: 1, codeArticle: 'ART001', designation: 'Article 1', prixUnitaireTtc: 10.00 },
      { id: 2, codeArticle: 'ART002', designation: 'Article 2', prixUnitaireTtc: 15.00 },
      { id: 3, codeArticle: 'ART003', designation: 'Article 3', prixUnitaireTtc: 20.00 }
    ];
  }

  filtrerArticle(): void {
    if (this.codeArticle.length === 0) {
      this.findAllArticles();
    }
    this.listArticle = this.listArticle
      .filter(art => art.codeArticle?.includes(this.codeArticle) || art.designation?.includes(this.codeArticle));
  }

  ajouterLigneCommande(): void {
    this.checkLigneCommande();
    this.calculerTotalCommande();

    this.searchedArticle = {};
    this.quantite = '';
    this.codeArticle = '';
    this.articleNotYetSelected = false;
    this.findAllArticles();
  }

  calculerTotalCommande(): void {
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite;
      }
    });
  }

  private checkLigneCommande(): void {
    const ligneCmdAlreadyExists = this.lignesCommande.find(lig => lig.article?.codeArticle === this.searchedArticle.codeArticle);
    if (ligneCmdAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig && lig.article?.codeArticle === this.searchedArticle.codeArticle) {
          // @ts-ignore
          lig.quantite = lig.quantite + +this.quantite;
        }
      });
    } else {
      const ligneCmd: LigneCommandeClientDto = {
        article: this.searchedArticle,
        prixUnitaire: this.searchedArticle.prixUnitaireTtc,
        quantite: +this.quantite
      };
      this.lignesCommande.push(ligneCmd);
    }
  }

  selectArticleClick(article: ArticleDto): void {
    this.searchedArticle = article;
    this.codeArticle = article.codeArticle ? article.codeArticle : '';
    this.articleNotYetSelected = true;
  }

  enregistrerCommande(): void {
    const commande = this.preparerCommande();
    // Simulation de sauvegarde pour le développement
    console.log('Commande client à sauvegarder:', commande);
    this.router.navigate(['commandesclient']);
  }

  private preparerCommande(): CommandeClientDto {
    return {
      client: this.selectedClient,
      code: this.codeCommande,
      dateCommande: new Date().getTime(),
      etatCommande: 'EN_PREPARATION',
      ligneCommandeClients: this.lignesCommande
    };
  }
}