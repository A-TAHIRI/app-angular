import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequestDto } from 'src/app/dto/auth-request';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurDto} from "../../dto/utilisateur-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequestDto : AuthRequestDto = {};
  errorMessage = '';

  constructor(
     private router: Router,
     private utilisateurService: UtilisateurService

     ) { }

  ngOnInit(): void {
  }

  /**
   * login
   */

  login(){
    this.utilisateurService.auth(this.authRequestDto).subscribe(
      (data) => {
       console.log(data)
       // Stockage du jeton d'accès dans le stockage local (localStorage)
        localStorage.setItem('accessToken' , JSON.stringify(data.token));
       this.getUserByEmail();
       this.router.navigate(['']);
      },
      (error) => {
        this.errorMessage = 'Email ou mot de passe invalide';
        this.router.navigate(['login']);
      }
    );
  }

  /**
   * recupérer l'user connécté
   */
  getUserByEmail():void{
    this.utilisateurService.getUtilisateurByEmail(this.authRequestDto.email).subscribe((user)=>{
      console.log(user)
      this.utilisateurService.setConnectedUser(user);
    });
  }

}
