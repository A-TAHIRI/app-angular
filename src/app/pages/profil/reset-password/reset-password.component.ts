import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SendEmailService} from "../../../services/sendEmail/send-email.service";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {ChangerMotDePasseUtilisateur} from "../../../models/changer-mot-de-passe-utilisateur";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  changerMotDePasseUtilisateur: ChangerMotDePasseUtilisateur = {};
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
    if (this.changerMotDePasseUtilisateur.motDePasse != this.changerMotDePasseUtilisateur.confirmMotDePasse) {
      this.notificationService.error("le mot passe n'est pas compatible  Veuillez essayé")
      this.router.navigate(['/reset-password']);
    }
      this.sendEmailService.resetPassword(this.changerMotDePasseUtilisateur, this.extrerToken).subscribe(data => {
        this.notificationService.success('Le mot de passe à été changer avec succès')
          this.router.navigate(['/login']).then(()=>{
            window.location.reload();
          })
      }, error => {
        this.notificationService.error(error.error.message);
        this.router.navigate(['/reset-password']);

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
        if (this.changerMotDePasseUtilisateur.motDePasse===this.changerMotDePasseUtilisateur.confirmMotDePasse){
          this.changerMotDePasseUtilisateur.id=data.id;
          this.utilisateurService.changerMotDePasse(this.changerMotDePasseUtilisateur).subscribe(data=>{
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
