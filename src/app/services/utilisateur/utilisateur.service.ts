import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { AuthRequestDto } from 'src/app/dto/auth-request';
import { Utilisateur } from 'src/app/models/utilisateur';
import {Router} from "@angular/router";
import {ChangerMotDePasseUtilisateurDto} from "../../dto/changer-mot-de-passe-utilisateur-dto";
import {AuthReponse} from "../../dto/auth-reponse";
import {UtilisateurDto} from "../../dto/utilisateur-dto";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  readonly baseUrl = 'http://localhost:8082';

  constructor(
    private http: HttpClient,
    private  router:Router
  ) { }

  /**
   * service pour ajouter un user à la bdd
   * @param utilisateur
   * @constructor
   */
  add(utilisateur: Utilisateur): Observable<Object> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, utilisateur);
  }
save(utilisateur : Utilisateur){
    const url = this.baseUrl+`/api/v1/utilisateurs`;
  return this.http.post(url, utilisateur);
}
update(id : number , utilisateur: Utilisateur){
  const url = this.baseUrl+`/api/v1/utilisateurs/${id}`;
  return this.http.put(url, utilisateur);
}

  /**
   * methode de l'etentifiant
   * @param authRequestDto
   */
  auth(authRequestDto: AuthRequestDto) {
    const url = `${this.baseUrl}/login`;
   return this.http.post<any>(url ,authRequestDto)

  }

  /**
   * Service qui retourn un utilisateur par son id
   * @param id
   */
  getUtilisateur(id?: number):Observable<UtilisateurDto>{
    if (id){
      const url = this.baseUrl+`/api/v1/utilisateurs/${id}`;
      return  this.http.get(url);
    }
   return of();
  }


  /**
   * retourne  l'utilisateur  récupiré par son email
   * @param email
   */
  getUtilisateurByEmail( email  ?: string ):Observable<UtilisateurDto> {
    if (email !== undefined){
      const  base = "http://localhost:8082/api/v1/utilisateurs/email"
      const  url= `${base}/${email}`;
      console.log(url)
      return  this.http.get<UtilisateurDto>(url);
    } return of();
  }

  /**
   * methode qui retourne tous les utilisateurs
   */
  getAll():Observable<Utilisateur[]> {
    const  url= `${this.baseUrl}/api/v1/utilisateurs`;
    return this.http.get<Utilisateur[]>(url)
  }


  changerMotDePasse(changerMotDePasseDto: ChangerMotDePasseUtilisateurDto) {
    const url = ` ${this.baseUrl}/api/v1/utilisateurs/update/password`;
   return  this.http.put<any>(url,changerMotDePasseDto )
  }

/*
  setAccessTken(authReponse: any) {
    localStorage.setItem('accessToken', JSON.stringify(authReponse))
  }
*/
  /**
   * ajouter user connécté au localeStorage
   * @param utilisateur
   */
  setConnectedUser( utilisateur : Utilisateur ):void{
    localStorage.setItem('connectedUser', JSON.stringify(utilisateur));

  }

  /**
   * recupirer user connecté à partire de localStorage
   */
  getConnectedUser(): Utilisateur{
    if ( localStorage.getItem('connectedUser') ){
     return  JSON.parse(localStorage.getItem('connectedUser') as  string);
    }
      return {};

  }


  /**
   * method de tester le login et la validité de tocken
   */
  isUserLogedAndAccessTokenValide() :boolean{
    if (localStorage.getItem('accessToken')){
      //TODO il fout verifier si le acces token est valid
      return true;
    }
     this.router.navigate(['login']);
    return false;

  }
}
