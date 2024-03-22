import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {  ArticleDto } from 'src/app/dto/article-dto';
import { Article } from 'src/app/models/article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {


readonly baseUrl = 'http://localhost:8082/api/v1/articles';

  constructor(private http: HttpClient

    ) { }

  /**
   *  Service pour récupérer un article
   * @param id
   */
  getArticle(id: number): Observable<any> {
    const url =  this.baseUrl+`/${id}`;
    return this.http.get(url);
  }

  /**
   * Service pour ajouter un article
   * @param article
   */
  add(article: Article): Observable<Article> {
    const url=this.baseUrl;
    return this.http.post(url, article);
  }

  /**
   *  Service pour mettre à jour un article
   * @param id
   * @param article
   */
  update(id: number, article: Article): Observable<ArticleDto> {
    const url =  this.baseUrl+`/${id}`;
    return this.http.put(url, article);
  }

  /**
   * Service pour supprimer un article
   * @param id
   */
  delet(id?: number){
    const url= this.baseUrl+`/${id}`;
    return  this.http.delete(url);
  }

  /**
   * Service pour récupérer toutes les articles
   */
  getAll():  Observable<any[]> {
    const url =  this.baseUrl;
    console.log(url);

    return this.http.get<any[]>(url);
  }


  findArticleByCode(codeArticle: string) {
    const  url = this.baseUrl+`/filter/${codeArticle}`;
     return  this.http.get(url);
  }
}
