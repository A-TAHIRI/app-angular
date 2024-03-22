import { ArticleDto } from "./article-dto";

export interface MvtStkDto {
  
      id?: number,
      creationDate?: number,
      lastModifiedDate?: number,
      dateMvt?: number,
      quantite?: number,
      article?: ArticleDto,
      typeMvt?: 'ENTREE' | 'SORTIE' | 'CORRECTION_POS' | 'CORRECTION_NEG',
      sourceMvt?: 'COMMANDE_CLIENT' | 'COMMANDE_FOURNISSEUR' | 'VENTE',
      idEntreprise?: number
   
  }
  