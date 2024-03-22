import { ArticleDto } from './article-dto';
import { CommandeClientDto } from './commande-client-dto';

export interface LigneCommandeClientDto {
 
     id?: number,
     creationDate?: number,
     lastModifiedDate?: number,
     article?: ArticleDto,
     commandeClient?: CommandeClientDto,
     quantite?: number,
     prixUnitaire?: number,
     idEntreprise?: number

}
