import { Article } from "./article";
import { CommandeFournisseur } from "./commande-fournisseur";

export interface LigneCommandeFournisseur {

        id?: number,
        creationDate?: number,
        lastModifiedDate?: number,
        quantite?: number,
        prixUnitaire?: number,
        tva?: number,
        idEntreprise?: number,
        article?: Article,
        commandeFournisseur?: CommandeFournisseur

}
