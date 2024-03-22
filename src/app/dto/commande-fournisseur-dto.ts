import {FournisseurDto} from "./fournisseur-dto";
import {LigneCommandeFournisseurDto} from "./ligne-commande-fournisseur-dto";

export interface CommandeFournisseurDto {

  id?: number,
  creationDate?: number,
  lastModifiedDate?: number,
  reference?: string,
  dateCommande?: number,
  etatCommande?: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE',
  idEntreprise?: number,
  fournisseur?: FournisseurDto,
  ligneCommandeFournisseurs?: Array<LigneCommandeFournisseurDto>

}
