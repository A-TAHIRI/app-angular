import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MvtStk} from "../../models/mvt-stk";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MvtstkService {
  readonly baseUrl = (environment.production)
                      ? 'https://ws.gestostock.fr/api/v1/mvtstk'
                      : 'http://localhost:8082/api/v1/mvtstk';
  constructor(private  http: HttpClient) { }

  /**
   * Serice qui retourne tous les mvtstks
   */
  getAll():Observable<MvtStk[]>{
    const  url = this.baseUrl;
    return this.http.get<MvtStk[]>(url);
  }

  /**
   * Service qui retourne les mvtstk par Article(id)
   * @param id
   */
  getAllByArticle(id ?: number) :Observable<MvtStk[]>{
    const url = this.baseUrl+`/${id}`
    return this.http.get<MvtStk[]>(url);
  }

  /**
   * Service qui retourn le stock réel par id de l'article
   * @param id
   */
  getStock(id ?:number){
    const url =this.baseUrl+`/stock/${id}`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne mvstk group By Id Article
   */
  getMvtstkGroupByAricle(){
    const  url = this.baseUrl+`/byarticle`;
    return this.http.get<MvtStk[]>(url);

  }

  getAllMvtstkByArticle( nom :string='' , page : number=0, size :number=1){
    const url= this.baseUrl+`/mvtstkcontaining?nom=${nom}&page=${page}&size=${size}`
    return this.http.get(url);
  }

  delet(id:number){
    const url = this.baseUrl+`/delet?id=${id}`;
   return this.http.delete(url) ;
  }


}
