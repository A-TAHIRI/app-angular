import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Email} from "../../models/email";

import {ChangerMotDePasseUtilisateur} from "../../models/changer-mot-de-passe-utilisateur";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  readonly baseUrl = (environment.production)
                      ? 'https://ws.gestostock.fr'
                      : 'http://localhost:8082';
  constructor(private  http: HttpClient) { }

  /**
   * Service pour envoyer email
   * @param email
   */
  sendEmail( email :Email){
    const  url = this.baseUrl+`/email/send`;
   return  this.http.post(url, email);
  }

  validateToken(token :any ){
    const url =this.baseUrl+`/email/send/validToken`
    return   this.http.get(url, token);
  }

  readToken(token : any){
    const  url = this.baseUrl+`/email/send/userByToken`
    return this.http.get(url, token)
  }
resetPassword(dto: ChangerMotDePasseUtilisateur, token :string){
    const url= this.baseUrl+`/reset-password?token=${token}`;

  return this.http.put(url,dto );
}

}
