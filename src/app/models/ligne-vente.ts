import { Article } from './article';
import { Vente } from './vente';

export interface LigneVente {
 
    id?: number,
    creationDate?: number,
    lastModifiedDate?: number,
    vente?: Vente,
    article?: Article,
    quantite?: number,
    prixUnitaire?: number,
    idEntreprise?: number

}
