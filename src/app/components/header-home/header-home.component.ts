import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../../models/utilisateur";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements  OnInit{
  connectedUser: Utilisateur = {};
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  isConnected: boolean = false;
  constructor(private utilisateurService:UtilisateurService,
              private  router: Router
              ) {
  }
  ngOnInit(): void {
    this.connectedUser = this.utilisateurService.getConnectedUser();
    if (this.connectedUser.photo !== null){
      this.imgUrl= (environment.production) ? 'https://ws.gestostock.fr/file/image/' +this.connectedUser.photo : 'http://localhost:8082/file/image/'+this.connectedUser.photo;
    }else{
      this.imgUrl= 'assets/image/user.png';
    }
    if(localStorage.getItem('accessToken')){
      this.isConnected =true;
    }else{
      this.isConnected =false;
    }

  }
  deconexion(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('connectedUser');

  }


}
