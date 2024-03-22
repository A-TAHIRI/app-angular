import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { CategorieDto } from 'src/app/dto/categorie-dto';
import { Categorie } from 'src/app/models/categirie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  readonly baseUrl = 'http://localhost:8082/api/v1/categories';

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
  ajouterCategorie(categirie: Categorie): Observable<CategorieDto> {
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


}
