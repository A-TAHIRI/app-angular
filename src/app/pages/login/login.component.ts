import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationResponse} from "../../models/authenticationResponse";
import {HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../../models/auth-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequest : AuthRequest = {};
  errorMessage = '';
  authenticationResponse:AuthenticationResponse ;
  user:any;

  constructor(
     private router: Router,
     private utilisateurService: UtilisateurService,
     private  notificationService:NotificationService,


     ) { }

  ngOnInit(): void {
   this.user= this.utilisateurService.getConnectedUser();
    console.log(this.user);
    console.log(this.user.nom);

  }

  /**
   * login
   */

  login(){
    this.utilisateurService.auth(this.authRequest).subscribe(
      (data) => {
        this.getUserByEmail(data.token);
        localStorage.setItem('accessToken' , JSON.stringify(data.token));
        this.router.navigate(['/dashboard']).then(()=>(window.location.reload()));
       this.notificationService.success('Bienvenue ' );
        this.authenticationResponse.accessToken=data.token;
      },
      (error) => {
        this.notificationService.error(error.error.detail);
        this.router.navigate(['login']);

      }
    );
  }

  /**
   * recupérer l'user connécté
   */
  getUserByEmail(token:string):void{
    this.utilisateurService.getUtilisateurByToken(token).subscribe((user)=>{
      this.utilisateurService.setConnectedUser(user);
    },error => this.notificationService.error('Impossible de récupérer les informations de l’utilisateur'));
  }

}
