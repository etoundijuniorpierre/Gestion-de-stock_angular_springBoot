import { ClientDto } from './client-dto';
import { LigneCommandeClientDto } from './ligne-commande-client-dto';

export interface CommandeClientDto {
  id?: number;
  code?: string;
  dateCommande?: string;
  etatCommande?: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  client?: ClientDto;
  idEntreprise?: number;
  ligneCommandeClients?: LigneCommandeClientDto[];
  commandeLivree?: boolean;
}
