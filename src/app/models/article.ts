import { Categorie } from "./categirie";
import { LigneCommandeClient } from "./ligne-commande-client";
import { LigneCommandeFournisseur } from "./ligne-commande-fournisseur";
import { LigneVente } from "./ligne-vente";
import { MvtStk } from "./mvt-stk";
import {Photo} from "./photo";

export interface Article {

        id?: number,
        creationDate?: number,
        lastModifiedDate?: number,
        codeArticle?: string,
        designation?: string,
        prixUnitaireHt?: number,
        tauxTva?: number,
        prixUnitaireTtc?: number,
        idEntreprise?: number,
         image?:string;
        categorie?: Categorie,
        ligneVentes?: Array<LigneVente>,
        ligneCommandeClients?: Array<LigneCommandeClient>,
        ligneCommandeFournisseurs?: Array<LigneCommandeFournisseur>,
        mvtStks?: Array<MvtStk>,
        photos?:Array<Photo>,

  }
