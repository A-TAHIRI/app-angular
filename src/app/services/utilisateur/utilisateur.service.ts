import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { AuthRequestDto } from 'src/app/dto/auth-request';
import { Utilisateur } from 'src/app/models/utilisateur';
import {Router} from "@angular/router";
import {ChangerMotDePasseUtilisateurDto} from "../../dto/changer-mot-de-passe-utilisateur-dto";
import {AuthReponse} from "../../dto/auth-reponse";
import {UtilisateurDto} from "../../dto/utilisateur-dto";
import {ApiResponse} from "../../models/api-response";
import {Page} from "../../models/page";

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
      const  base = "http://localhost:8082/email"
      const  url= `${base}/?email=${email}`;
      return  this.http.get<UtilisateurDto>(url);
    } return of();
  }
  getUtilisateurByToken( token  ?: string ):Observable<Utilisateur> {
    if (token !== undefined){
      const  base = `http://localhost:8082/token?token=${token}`
      return  this.http.get<Utilisateur>(base);
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

  /**
   * service poiur supprimer utilisateur par son id
   * @param id
   */
  delet(id?: number) {
    if (id){
      const url = this.baseUrl+`/api/v1/utilisateurs/${id}`;
      return  this.http.delete(url);
    }
    return of();
  }


  users$ = (nom: string = '', page: number = 0, size: number = 3): Observable<ApiResponse<Page>> =>
    this.http.get<ApiResponse<Page>>(this.baseUrl+`/api/v1/utilisateurs/users?nom=${nom}&page=${page}&size=${size}`);

  /**
   * Services pour ruciper les utilisateur par page
   * @param nom
   * @param page
   * @param size
   */

  getUsers( nom :string='' , page : number=0, size :number=1){
    const url= this.baseUrl+`/api/v1/utilisateurs?nom=${nom}&page=${page}&size=${size}`
    console.log(url);
    return this.http.get(url);
  }

  /**
   * Service qui retourne les utilisateur de mois passer
   */
  getByMonth(){
    const url = this.baseUrl+`/api/v1/utilisateurs/bymonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les utilisateur de mois actuel
   */
  getByThisMonth(){
    const url = this.baseUrl+`/api/v1/utilisateurs/bythismonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les utilisateur de l'année actuel
   */
  getByYear(){
    const url = this.baseUrl+`/api/v1/utilisateurs/byyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les utilisateur de l'année actuel
   */
  getByLastYear(){
    const url = this.baseUrl+`/api/v1/utilisateurs/bylastyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les utilisateur de ce jour actuel
   */
  getByDay(){
    const url = this.baseUrl+`/api/v1/utilisateurs/byday`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les utilisateur de ced'hier
   */
  getByLastDay(){
    const url = this.baseUrl+`/api/v1/utilisateurs/bylastday`;
    return this.http.get(url);
  }



}
