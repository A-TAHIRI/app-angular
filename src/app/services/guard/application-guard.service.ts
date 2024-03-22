import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UtilisateurService} from "../utilisateur/utilisateur.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuardService  implements CanActivate {

  constructor( private utilisateurService: UtilisateurService  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  return this.utilisateurService.isUserLogedAndAccessTokenValide();
  }
}
