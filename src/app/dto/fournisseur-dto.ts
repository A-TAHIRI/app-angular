import { CommandeFournisseurDto } from "./commande-fournisseur-dto";
import {AdresseDto} from "./adresse-dto";

export interface FournisseurDto {

        id?: number,
        creationDate?: number,
        lastModifiedDate?: number,
        nom?: string,
        prenom?: string,
        adresse?: AdresseDto,
        photo?: string,
        email?: string,
        numTel?: string,
        idEntreprise?: number,
        commandesFournisseurs?: Array<CommandeFournisseurDto>

}
