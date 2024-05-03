import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommandeClient} from "../../models/commande-client";
import {Observable, of} from "rxjs";
import {CommandeFournisseur} from "../../models/commande-fournisseur";
import {CommandeClientStats} from "../../models/CommandeClientStats";

@Injectable({
  providedIn: 'root'
})
export class CommandefournisseurService {

  readonly baseUrl = 'http://localhost:8082/api/v1/commandFournisseurs';
  constructor( private http: HttpClient) { }

  /**
   * Service pour ajouter une commande fournisseur
   * @param commandeFournisseur
   */
  add(commandeFournisseur :CommandeFournisseur): Observable<any>{
    const url = this.baseUrl;
    return this.http.post(url, commandeFournisseur)
  }

  /**
   * Service qui retourne toutes les commandes fournisseurs
   */
  getAll(): Observable<any[]> {
    const url = this.baseUrl;
    return this.http.get<any>(url)
  }
  /**
   * Service qui retourne les ligneCommande fournisseur par id de commade
   * @param idCommande
   */
  findAllLigneCommandesFournisseur(idCommande?: number):Observable<any[]> {
    if (idCommande){
      const url =this.baseUrl+`/lignesCommande/${idCommande}`;
     return this.http.get<any>(url);
    }
    return of();
  }

  /**
   * Service qui retourne la commande  fournisseur par son id
   * @param id
   */
  getById(id?:number):Observable<any>{
    if(id){
      const  url = this.baseUrl+`/${id}`;
      return this.http.get(url);
    }
    return of()
  }
  /**
   * Service qui modifier la commande  client par son id
   * @param id
   */
  updatById( commandeFournisseur: CommandeFournisseur, id?:number):Observable<any>{
    if(id){
      const  url = this.baseUrl+`/${id}`;
      return this.http.put(url, commandeFournisseur);
    }
    return of()
  }


  getAllCommandes( nom :string='' , page : number=0, size :number=5){
    const url= this.baseUrl+`/commandes?nom=${nom}&page=${page}&size=${size}`
    console.log(url);
    return this.http.get(url);
  }

  /**
   * Service pour supprimer une ligne de commande
   * @param id
   */
  delet(id ?:number){
    const  url = this.baseUrl+`/lignecommande/delet?id=${id}`;
    return  this.http.delete(url);
  }

  /**********************************************nombre de commande******************************************************************/
  /**
   * Service qui retourne les CommendeFournisseur de mois passer
   */
  getByMonth(){
    const url = this.baseUrl+`/bymonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les CommendeFournisseur de mois actuel
   */
  getByThisMonth(){
    const url = this.baseUrl+`/bythismonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les CommendeFournisseur de l'année actuel
   */
  getByYear(){
    const url = this.baseUrl+`/byyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les CommendeFournisseur de l'année actuel
   */
  getByLastYear(){
    const url = this.baseUrl+`/bylastyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les CommendeFournisseur de ce jour actuel
   */
  getByDay(){
    const url = this.baseUrl+`/byday`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les CommendeFournisseur de ced'hier
   */
  getByLastDay(){
    const url = this.baseUrl+`/bylastday`;
    return this.http.get(url);
  }


  /************************************************REVENUE***********************************************************/
  /**
   * Service qui retourne  les revenue CommendeFournisseur de mois actuel
   */
  getSumByMonth(){
    const url = this.baseUrl+`/sumbymonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les revenue CommendeFournisseur de mois president
   */
  getSumByLastMonth(){
    const url = this.baseUrl+`/sumbylastmonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les revenues CommendeFournisseur de l'année actuel
   */
  getSumByYear(){
    const url = this.baseUrl+`/sumbyyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les revenues CommendeFournisseur de l'année actuel
   */
  getSumByLastYear(){
    const url = this.baseUrl+`/sumbylastyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les revenues CommendeFournisseur de ce jour actuel
   */
  getSumByDay(){
    const url = this.baseUrl+`/sumbyday`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les revenues CommendeFournisseur de ced'hier
   */
  getSumByLastDay(){
    const url = this.baseUrl+`/sumbylastday`;
    return this.http.get(url);
  }

  /************************************COMMANDE PAR ORDER DESC TOTALPRIX *******************************************************/

  /**
   * Service qui retourne  les CommandeFournisseur par order dec totalprix dans le mois actuel
   */
  getCmdFrsByMonthByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbymoth`;
    return this.http.get<any>(url);
  }

  /**
   * Service qui retourne les CommandeFournisseur par order dec totalprix dans le mois president
   */
  getCmdFrsByLastMonthByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbylastmoth`;
    return this.http.get<any>(url);
  }

  /**
   * Service qui retourne les CommandeFournisseur par order dec totalprixdans l'anné actuel
   */
  getCmdFrsByYearByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbyyear`;
    return this.http.get<any>(url);
  }
  /**
   * Service qui retourne les CommandeFournisseur par order dec totalprixdans l'anné président
   */
  getCmdFrsByLastYearByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbylastyear`;
    return this.http.get<any>(url);
  }
  /**
   * Service qui retourne  les CommandeFournisseur par order dec totalprix le jour actuelle
   */
  getCmdFrsByDayByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbyday`;
    return this.http.get<any>(url);
  }
  /**
   * Service qui retourne les CommandeFournisseur par order dec totalprix le jour président
   */
  getCmdFrsByLastDayByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbylastday`;
    return this.http.get<any>(url);
  }
}
