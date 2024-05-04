import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommandeClient} from "../../models/commande-client";
import {Observable, of} from "rxjs";
import {CommandeClientStats} from "../../models/CommandeClientStats";

@Injectable({
  providedIn: 'root'
})
export class CommandeclientService {
  readonly baseUrl = 'http://localhost:8082/api/v1/commadeClients';

  constructor(private http: HttpClient) {
  }

  /**
   * Service pour ajouter une commande client
   * @param commandeClient
   */
  add(commandeClient: CommandeClient): Observable<any> {
    const url = this.baseUrl;
    return this.http.post(url, commandeClient)
  }

  /**
   * Service qui retourne toutes les commandes clients
   */
  getAll(): Observable<any[]> {
    const url = this.baseUrl;
    return this.http.get<any>(url)
  }

  /**
   * Service qui retourne les ligneCommande client par id de commade
   * @param idCommande
   */
  findAllLigneCommandesClient(idCommande?: number):Observable<any[]> {
    if (idCommande){
      const url =this.baseUrl+`/lignesCommande/${idCommande}`;
     return this.http.get<any>(url);
    }
    return of();
  }

  /**
   * Service qui retourne la commande  client par son id
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
  updatById( commandeClient: CommandeClient, id?:number):Observable<any>{
    if(id){
      const  url = this.baseUrl+`/${id}`;
      return this.http.put(url, commandeClient);
    }
    return of()
  }



  getAllCommandes( nom :string='' , page : number=0, size :number=10){
    const url= this.baseUrl+`/commandes?nom=${nom}&page=${page}&size=${size}`
    return this.http.get(url);
  }

  /**
   * Service pour supprimer une ligne de commande
   * @param id
   */
  delet(id?:number){
    const  url = this.baseUrl+`/lignecommande/delet?id=${id}`
    return this.http.delete(url);
  }


  /************************************************NOMBRE DE COMMADE *******************************************************/


  /**
   * Service qui retourne les CommendClient de mois passer
   */
  getByMonth(){
    const url = this.baseUrl+`/bymonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les CommendClient de mois actuel
   */
  getByThisMonth(){
    const url = this.baseUrl+`/bythismonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les CommendClient de l'année actuel
   */
  getByYear(){
    const url = this.baseUrl+`/byyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les CommendClient de l'année actuel
   */
  getByLastYear(){
    const url = this.baseUrl+`/bylastyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les CommendClient de ce jour actuel
   */
  getByDay(){
    const url = this.baseUrl+`/byday`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les fourniCommendClientseur de ced'hier
   */
  getByLastDay(){
    const url = this.baseUrl+`/bylastday`;
    return this.http.get(url);
  }



  /*************************************************REVENUE**************************************************************/
  /**
   * Service qui retourne  les revenue CommendClient de mois actuel
   */
  getSumByMonth(){
    const url = this.baseUrl+`/sumbymonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les revenue CommendClient de mois president
   */
  getSumByLastMonth(){
    const url = this.baseUrl+`/sumbylastmonth`;
    return this.http.get(url);
  }

  /**
   * Service qui retourne les revenues CommendClient de l'année actuel
   */
  getSumByYear(){
    const url = this.baseUrl+`/sumbyyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les revenues CommendClient de l'année actuel
   */
  getSumByLastYear(){
    const url = this.baseUrl+`/sumbylastyear`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les revenues CommendClient de ce jour actuel
   */
  getSumByDay(){
    const url = this.baseUrl+`/sumbyday`;
    return this.http.get(url);
  }
  /**
   * Service qui retourne les revenues CommendClient de ced'hier
   */
  getSumByLastDay(){
    const url = this.baseUrl+`/sumbylastday`;
    return this.http.get(url);
  }


  /****************************************COMMANDE CLIENT PAR ORDER DESC TOTALPRIX *******************************************************/

  /**
   * Service qui retourne  les CommandeClients par order dec totalprix dans le mois actuel
   */
  getCmdCltByMonthByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbymoth`;
    return this.http.get<any>(url);
  }

  /**
   * Service qui retourne les CommandeClients par order dec totalprix dans le mois president
   */
  getCmdCltByLastMonthByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbylastmoth`;
    return this.http.get<any>(url);
  }

  /**
   * Service qui retourne les CommandeClients par order dec totalprixdans l'anné actuel
   */
  getCmdCltByYearByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbyyear`;
    return this.http.get<any>(url);
  }
  /**
   * Service qui retourne les CommandeClients par order dec totalprixdans l'anné président
   */
  getCmdCltByLastYearByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbylastyear`;
    return this.http.get<any>(url);
  }
  /**
   * Service qui retourne  les CommandeClients par order dec totalprix le jour actuelle
   */
  getCmdCltByDayByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbyday`;
    return this.http.get<any>(url);
  }
  /**
   * Service qui retourne les CommandeClients par order dec totalprix le jour président
   */
  getCmdCltByLastDayByOrderByTotalPrixDesc(): Observable<CommandeClientStats[]>{
    const url = this.baseUrl+`/cmdorderbytotlbylastday`;
    return this.http.get<any>(url);
  }

/********************************************************Top articles ***********************************************************************/


  /**
   * Service qui retourne top articles de aujourd'huit
   * @return
   */


getTopArticlesByCommandesToDay(): Observable<any[]>{
  const url = this.baseUrl+`/toparticlethisday`;
  return this.http.get<any>(url);

}

  /**
   * Service qui retourne top articles de mois actuel
   * @return
   */

  getTopArticlesByCommandesToMonth(): Observable<any[]>{
    const url = this.baseUrl+`/toparticlethismonth`;
    return this.http.get<any>(url);
  }


  /**
   * Service qui retourne top articles de cette année
   * @return
   */

  getTopArticlesByCommandesToYear(): Observable<any[]>{
    const url = this.baseUrl+`/toparticlethisyear`;
    return this.http.get<any>(url);
  }
}
