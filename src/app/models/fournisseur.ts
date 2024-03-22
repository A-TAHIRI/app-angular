import { CommandeFournisseur } from "./commande-fournisseur";
import {Adresse} from "./adresse";

export interface Fournisseur {

        id?: number,
        creationDate?: number,
        lastModifiedDate?: number,
        nom?: string,
        prenom?: string,
        adresse?: Adresse,
        photo?: string,
        email?: string,
        numTel?: string,
        idEntreprise?: number,
        commandesFournisseurs?: Array<CommandeFournisseur>

}
