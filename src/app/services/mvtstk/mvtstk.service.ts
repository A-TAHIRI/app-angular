import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MvtStk} from "../../models/mvt-stk";

@Injectable({
  providedIn: 'root'
})
export class MvtstkService {
  readonly baseUrl = 'http://localhost:8082/api/v1/mvtstk';
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


}
