import { CategorieDto } from "./categorie-dto";
import { LigneCommandeClientDto } from "./ligne-commande-client-dto";
import { LigneCommandeFournisseurDto } from "./ligne-commande-fournisseur-dto";
import { LigneVenteDto } from "./ligne-vent-dto";
import {PhotoDto} from "./photo-dto";


export interface ArticleDto{

        id?: number,
        pcreationDate?: number,
         lastModifiedDate?: number,
         codeArticle?: string,
         designation?: string,
         prixUnitaireHt?: number,
         tauxTva?: number,
         prixUnitaireTtc?: number,
         idEntreprise?: number,
         image?: string,
         categorie?: CategorieDto,
         ligneVentes?: Array<LigneVenteDto>,
         ligneCommandeClients?: Array<LigneCommandeClientDto>,
         ligneCommandeFournisseurs?: Array<LigneCommandeFournisseurDto>
         photos?:Array<PhotoDto>,
}
