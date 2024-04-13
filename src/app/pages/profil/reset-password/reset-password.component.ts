import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SendEmailService} from "../../../services/sendEmail/send-email.service";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {ChangerMotDePasseUtilisateurDto} from "../../../dto/changer-mot-de-passe-utilisateur-dto";
import {Utilisateur} from "../../../models/utilisateur";
import * as jwt_decode from 'jwt-decode';
import {NotificationService} from "../../../services/notification/notification.service";


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
             private utilisateurService: UtilisateurService,
              private notificationService: NotificationService
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
    if (this.changerMotDePasseUtilisateurDto.motDePasse === this.changerMotDePasseUtilisateurDto.confirmMotDePasse) {
      this.sendEmailService.resetPassword(this.changerMotDePasseUtilisateurDto, this.extrerToken).subscribe(data => {
        this.notificationService.success('Le mot de passe à été changer avec succès')
          this.router.navigate(['/login'])
      }, error => {
        this.notificationService.error(error.error.message);

      })
    }else {
      this.notificationService.error("le mot passe n'est pas compatible  Veuillez essayé")
      this.router.navigate(['/reset-password']);

    }

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
