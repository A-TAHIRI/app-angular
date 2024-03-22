import { LigneVente } from "./ligne-vente";

export class Vente {
    constructor(
        id?: number,
        creationDate?: number,
        lastModifiedDate?: number,
        code?: string,
        dateVente?: number,
        commentaire?: string,
        idEntreprise?: number,
        ligneVentes?: Array<LigneVente>
    ) {}
}