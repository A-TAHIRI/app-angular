import { ArticleDto } from "./article-dto";
import { VenteDto } from "./vente-dto";

export interface LigneVenteDto {
  
      id?: number,
      creationDate?: number,
      lastModifiedDate?: number,
      vente?: VenteDto,
      article?: ArticleDto,
      quantite?: number,
      prixUnitaire?: number,
      idEntreprise?: number
  
  }
  