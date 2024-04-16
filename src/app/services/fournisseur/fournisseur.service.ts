import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Fournisseur} from "../../models/fournisseur";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  readonly baseUrl = 'http://localhost:8082/api/v1/fournisseurs';
  constructor( private  http: HttpClient) { }


  /**
   * Service pour ajouter un fournisseur
   * @param fournisseur
   */

  add( fournisseur : Fournisseur){
    const  url = this.baseUrl;
    return  this.http.post(url, fournisseur);
  }

  /**
   * Service qui retourne un fournisseur
   * @param id
   */
  getFournisseur(id?: number):Observable<Fournisseur>{
    if (id){
      const url = this.baseUrl+`/${id}`;
      return  this.http.get(url)
    }
    return  of();
  }

  /**
   * Service qui retourne tous les fournisseurs
   */
  getAll() :Observable<Fournisseur[]>{
    const  url= this.baseUrl;
    return  this.http.get<Fournisseur[]>(url);
  }

  /**
   * Service pour supprimer un fournisseur
   * @param id
   */
  delet(id?: number){
    const url= this.baseUrl+`/${id}`;
    return  this.http.delete(url);
  }

  getAllFournisseur( nom :string='' , page : number=0, size :number=1){
    const url= this.baseUrl+`/fournisseurs?nom=${nom}&page=${page}&size=${size}`
    console.log(url);
    return this.http.get(url);
  }
}
