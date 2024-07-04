import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Categorie } from 'src/app/models/categirie';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  readonly baseUrl = (environment.production)
                       ? 'https://ws.gestostock.fr/api/v1/categories'
                       : 'http://localhost:8082/api/v1/categories';

  constructor(private http: HttpClient) { }

  /**
   *  service pour récupérer une categorie
   * @param id
   */
  getCategorie(id?: number): Observable<Object> {
    if (id){
      const url =  this.baseUrl+`/${id}`;
      return this.http.get(url);
    }
   return of();
  }

  /**
   * service pour ajouter une categorie
   * @param categirie
   */
  ajouterCategorie(categirie: Categorie): Observable<any> {
    const url =  this.baseUrl;
    return this.http.post(url, categirie);
  }

  /**
   *   Service pour mettre à jour une categorie
   * @param id
   * @param categirie
   */
  mettreAJourCategorie(id: number, categirie: any): Observable<any> {
    const url =  this.baseUrl+`/${id}`;
    return this.http.put(url, categirie);
  }

  /**
   *  Service pour supprimer une categorie
   * @param id
   */
  supprimerCategorie(id?: number): Observable<Object> {
      const url =  this.baseUrl+`/${id}`;
      return this.http.delete(url);
  }

  /**
   *    Service pour récupérer toutes les categories
   */
  getToutesCategories(): Observable<any> {
    const url =  this.baseUrl;
    return this.http.get(url);
  }

  getAllCategories( nom :string='' , page : number=0, size :number=1){
    const url= this.baseUrl+`/cate?nom=${nom}&page=${page}&size=${size}`
    console.log(url);
    return this.http.get(url);
  }


}
