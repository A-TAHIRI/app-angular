import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from 'src/app/models/entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  readonly baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }


  add(entreprise: Entreprise): Observable<Object> {
    const url = `${this.baseUrl}/entreprises`;
    return this.http.post(url, entreprise);
  }

  /**
   * Service pour récupiré l'entreprise par son id
   * @param id
   */
  getById(id:number){
    const url = `${this.baseUrl}/entreprises/${id}`;
    return this.http.get(url);
  }
}
