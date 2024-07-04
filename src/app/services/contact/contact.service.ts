import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../../models/contact";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  readonly baseUrl =(environment.production)
      ? 'https://ws.gestostock.fr/contact'
      : 'http://localhost:8082/contact';

  /**
   * Service pour ajouter contact à bdd
   * @param contact
   */
  add( contact: Contact){
    const url= this.baseUrl;
    return  this.http.post(url, contact);
  }
}
