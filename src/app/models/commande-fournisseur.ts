import {Fournisseur} from "./fournisseur";
import {LigneCommandeFournisseur} from "./ligne-commande-fournisseur";

export interface CommandeFournisseur {

  id?: number,
  creationDate?: number,
  lastModifiedDate?: number,
  reference?: string,
  dateCommande?: Date,
  etatCommande?: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE',
  idEntreprise?: number,
  fournisseur?: Fournisseur,
  ligneCommandeFournisseurs?: Array<LigneCommandeFournisseur>

}
