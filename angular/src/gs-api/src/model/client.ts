import { Adresse } from './adresse';
import { CommandeClient } from './commandeClient';


export interface Client { 
    id?: number;
    creationDate?: string;
    lastModifiedDate?: string;
    nom?: string;
    prenom?: string;
    adresse?: Adresse;
    photo?: string;
    mail?: string;
    numTel?: string;
    idEntreprise?: number;
    commandeClients?: Array<CommandeClient>;
}

