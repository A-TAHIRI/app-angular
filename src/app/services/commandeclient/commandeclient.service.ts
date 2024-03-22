import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommandeClient} from "../../models/commande-client";
import {Observable, of} from "rxjs";

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

  findAllLigneCommandesClient(idCommande: number | undefined) {
    if (idCommande){
      const url =this.baseUrl+`/lignesCommande/{idCommande}`;
      this.http.get(url);
    }
    return of();
  }



}
