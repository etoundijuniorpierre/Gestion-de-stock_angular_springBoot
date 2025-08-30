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
