export interface ClientDto {
  id?: number;
  nom?: string;
  prenom?: string;
  numTel?: string;
  photo?: string;
  adresse?: {
    adresse1?: string;
    adresse2?: string;
    ville?: string;
    codePostale?: string;
    pays?: string;
  };
  email?: string;
  codeFiscal?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FournisseurDto {
  id?: number;
  nom?: string;
  prenom?: string;
  numTel?: string;
  photo?: string;
  adresse?: {
    adresse1?: string;
    adresse2?: string;
    ville?: string;
    codePostale?: string;
    pays?: string;
  };
  email?: string;
  codeFiscal?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdresseDto {
  adresse1?: string;
  adresse2?: string;
  ville?: string;
  codePostale?: string;
  pays?: string;
}

export interface CommandeClientDto {
  id?: number;
  code?: string;
  dateCommande?: Date;
  client?: ClientDto;
  etatCommande?: string;
  totalPrix?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LigneCommandeClientDto {
  id?: number;
  article?: any;
  quantite?: number;
  prixUnitaire?: number;
  total?: number;
  commandeClient?: CommandeClientDto;
}

export interface CommandeFournisseurDto {
  id?: number;
  code?: string;
  dateCommande?: Date;
  fournisseur?: FournisseurDto;
  etatCommande?: string;
  totalPrix?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LigneCommandeFournisseurDto {
  id?: number;
  article?: any;
  quantite?: number;
  prixUnitaire?: number;
  total?: number;
  commandeFournisseur?: CommandeFournisseurDto;
}
