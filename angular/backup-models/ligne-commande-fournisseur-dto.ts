import { ArticleDto } from './article-dto';

export interface LigneCommandeFournisseurDto {
  id?: number;
  article?: ArticleDto;
  quantite?: number;
  prixUnitaire?: number;
  idEntreprise?: number;
}
