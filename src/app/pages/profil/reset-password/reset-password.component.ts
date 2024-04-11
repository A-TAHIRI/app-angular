import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SendEmailService} from "../../../services/sendEmail/send-email.service";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {ChangerMotDePasseUtilisateurDto} from "../../../dto/changer-mot-de-passe-utilisateur-dto";
import {Utilisateur} from "../../../models/utilisateur";
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  changerMotDePasseUtilisateurDto: ChangerMotDePasseUtilisateurDto = {};
  errorMsg ='';
  extrerToken='';
  extraitEmail='';
   valide: any;

  constructor(private  acivatedRoute: ActivatedRoute,
              private  router:Router,
             private sendEmailService : SendEmailService,
             private utilisateurService: UtilisateurService
              ) {
  }
  ngOnInit(): void {
    const token = this.acivatedRoute.snapshot.queryParams['token'];
    if (token){
     this.extrerToken=token;
    }
    const email=this.acivatedRoute.snapshot.queryParams['mail']
    if(email){
      this.extraitEmail=email;
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }


  chagerMotDePasseUtilisateur( ) {
    this.sendEmailService.resetPassword(this.changerMotDePasseUtilisateurDto,this.extrerToken).subscribe(data=>{
      this.router.navigate(['/login'])
    },error => {
      this.errorMsg=error.error.errors
    })
  }


isValid(){
     this.sendEmailService.validateToken(this.extrerToken).subscribe(data=>{
       this.valide = data;
     })
}

  resetPassword(){
    if (this.valide==true){
     let  utilisateur  =this.utilisateurService.getUtilisateurByEmail(this.extraitEmail)
      utilisateur.subscribe(data=>{
        if (this.changerMotDePasseUtilisateurDto.motDePasse===this.changerMotDePasseUtilisateurDto.confirmMotDePasse){
          this.changerMotDePasseUtilisateurDto.id=data.id;
          this.utilisateurService.changerMotDePasse(this.changerMotDePasseUtilisateurDto).subscribe(data=>{
            this.router.navigate(['/login'])
          },error => {
            this.errorMsg=error.error.errors
          });
        }
      })
    }else{
      this.errorMsg='Le token est expiré'
    }

    }




}
