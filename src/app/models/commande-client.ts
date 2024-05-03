import {Client} from "./client";
import {LigneCommandeClient} from "./ligne-commande-client";

export interface CommandeClient {

  id?: number,
  creationDate?: number,
  lastModifiedDate?: Date,
  reference?: string,
  dateCommande?: Date,
  totalPrix?:number;
  etatCommande?: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE',
  idEntreprise?: number,
  client?: Client,
  ligneCommandeClients?: Array<LigneCommandeClient>

}
