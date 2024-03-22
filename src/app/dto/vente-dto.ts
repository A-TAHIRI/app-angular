import { LigneVenteDto } from "./ligne-vent-dto";

export interface VenteDto {

        id?: number,
        creationDate?: number,
        lastModifiedDate?: number,
        code?: string,
        dateVente?: number,
        commentaire?: string,
        idEntreprise?: number,
        ligneVentes?: Array<LigneVenteDto>
   
}