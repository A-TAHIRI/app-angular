import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../../models/contact";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'http://localhost:8082/contact';

  /**
   * Service pour ajouter contact à bdd
   * @param contact
   */
  add( contact: Contact){
    const url= this.baseUrl;
    return  this.http.post(url, contact);
  }
}
