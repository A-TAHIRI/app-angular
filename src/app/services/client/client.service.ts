import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../../models/client";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService  {

  readonly baseUrl = 'http://localhost:8082/api/v1/clients';
  constructor( private http: HttpClient) { }

  /**
   * Service pour ajouter un Client
   * @param client
   */

  add( client : Client){
    const  url = this.baseUrl;
    return  this.http.post(url, client);
  }

  /**
   * Service qui retourne un Client
   * @param id
   */
  getClinet(id?: number):Observable<Client>{
    if (id){
      const url = this.baseUrl+`/${id}`;
      return  this.http.get(url);
    }
   return of();
  }

  /**
   * Service qui retourne tous les articles
   */
  getAll():Observable<Client[]>{
    const  url= this.baseUrl;
   return  this.http.get<Client[]>(url);
  }

  /**
   * Service pour supprimer un Client
   * @param id
   */
   delet(id?: number){
    const url= this.baseUrl+`/${id}`;
   return  this.http.delete(url);
   }

  getAllClients( nom :string='' , page : number=0, size :number=1){
    const url= this.baseUrl+`/clients?nom=${nom}&page=${page}&size=${size}`
    return this.http.get(url);
  }


  /**
   * Service qui retourne les fourniseur de mois passer
   */
  getByMonth(){
    const url = this.baseUrl+`/bymonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les fourniseur de mois actuel
   */
  getByThisMonth(){
    const url = this.baseUrl+`/bythismonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les fourniseur de l'année actuel
   */
  getByYear(){
    const url = this.baseUrl+`/byyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les client de l'année actuel
   */
  getByLastYear(){
    const url = this.baseUrl+`/bylastyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les client de ce jour actuel
   */
  getByDay(){
    const url = this.baseUrl+`/byday`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les client de ced'hier
   */
  getByLastDay(){
    const url = this.baseUrl+`/bylastday`;
    return this.http.get(url);
  }

}
