import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Email} from "../../models/email";
import {ChangerMotDePasseUtilisateurDto} from "../../dto/changer-mot-de-passe-utilisateur-dto";
import {Utilisateur} from "../../models/utilisateur";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  readonly baseUrl = 'http://localhost:8082/email/send';
  constructor(private  http: HttpClient) { }

  /**
   * Service pour envoyer email
   * @param email
   */
  sendEmail( email :Email){
    const  url = this.baseUrl;
   return  this.http.post(url, email);
  }

  validateToken(token :any ){
    const url =this.baseUrl+`/validToken`
    return   this.http.get(url, token);
  }

  readToken(token : any){
    const  url = this.baseUrl+`/userByToken`
    return this.http.get(url, token)
  }
resetPassword(dto: ChangerMotDePasseUtilisateurDto, token :string){
    const url=`http://localhost:8082/reset-password?token=${token}`;

  return this.http.put(url,dto );
}

}
