import { ArticleDto } from './article-dto';

export interface MouvementStockDto {
  id?: number;
  dateMouvement?: string;
  quantite?: number;
  typeMouvement?: 'ENTREE' | 'SORTIE';
  sourceMouvement?: 'VENTE' | 'COMMANDE_CLIENT' | 'COMMANDE_FOURNISSEUR' | 'CORRECTION';
  article?: ArticleDto;
  idEntreprise?: number;
}
