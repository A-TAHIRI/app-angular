import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequestDto } from 'src/app/dto/auth-request';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurDto} from "../../dto/utilisateur-dto";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationResponse} from "../../models/authenticationResponse";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequestDto : AuthRequestDto = {};
  errorMessage = '';
  authenticationResponse:AuthenticationResponse ;

  constructor(
     private router: Router,
     private utilisateurService: UtilisateurService,
     private  notificationService:NotificationService,


     ) { }

  ngOnInit(): void {


  }

  /**
   * login
   */

  login(){
    this.utilisateurService.auth(this.authRequestDto).subscribe(
      (data) => {
        this.getUserByEmail(data.token);
        localStorage.setItem('accessToken' , JSON.stringify(data.token));
        this.router.navigate(['/dashboard']).then(()=>(window.location.reload()));
       this.notificationService.success('Bienvenue ' + this.utilisateurService.getConnectedUser().nom)

        this.authenticationResponse.accessToken=data.token;
      },
      (error) => {
        this.notificationService.error(error.error.message);
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
