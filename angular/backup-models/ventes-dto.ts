import { ClientDto } from './client-dto';
import { ArticleDto } from './article-dto';

export interface VentesDto {
  id?: number;
  code?: string;
  dateVente?: string;
  commentaire?: string;
  client?: ClientDto;
  ligneVentes?: LigneVenteDto[];
  idEntreprise?: number;
}

export interface LigneVenteDto {
  id?: number;
  article?: ArticleDto;
  quantite?: number;
  prixUnitaire?: number;
  idEntreprise?: number;
}
