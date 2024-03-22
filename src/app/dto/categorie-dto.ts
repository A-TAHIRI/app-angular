import { ArticleDto } from './article-dto';

export interface CategorieDto {
  id?: number;
  creationDate?: number;
  lastModifiedDate?: number;
  code?: string;
  designation?: string;
  image?: string;
  idEntreprise?: number;
  articles?: Array<ArticleDto>;
}
