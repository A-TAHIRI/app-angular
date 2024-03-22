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
  getClinet(id?: number){
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



}
