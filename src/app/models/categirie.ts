import {Article} from './article';

export interface Categorie {

  id?: number,
  creationDate?: number,
  lastModifiedDate?: number,
  code?: string,
  designation?: string,
  image?: string,
  idEntreprise?: number,
  articles?: Array<Article>,

}
