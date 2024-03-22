import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommandeClient} from "../../models/commande-client";
import {Observable, of} from "rxjs";
import {CommandeFournisseur} from "../../models/commande-fournisseur";

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

  findAllLigneCommandesFournisseur(idCommande: number | undefined) {
    if (idCommande){
      const url =this.baseUrl+`/lignesCommande/{idCommande}`;
      this.http.get(url);
    }
    return of();
  }
}
