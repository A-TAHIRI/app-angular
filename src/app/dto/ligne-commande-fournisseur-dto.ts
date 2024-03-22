import { ArticleDto } from './article-dto';
import { CommandeFournisseurDto } from './commande-fournisseur-dto';

export interface LigneCommandeFournisseurDto {

     id?: number,
     creationDate?: number,
     lastModifiedDate?: number,
     quantite?: number,
     prixUnitaireHt?: number,
     tva?: number,
     idEntreprise?: number,
     article?: ArticleDto,
     commandeFournisseur?: CommandeFournisseurDto
 
}
