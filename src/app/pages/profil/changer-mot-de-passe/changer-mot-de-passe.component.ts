import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";

import {NotificationService} from "../../../services/notification/notification.service";
import {Utilisateur} from "../../../models/utilisateur";
import {ChangerMotDePasseUtilisateur} from "../../../models/changer-mot-de-passe-utilisateur";

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.css']
})
export class ChangerMotDePasseComponent implements OnInit {
  utilisateur: Utilisateur = {};
  changerMotDePasseUtilisateur: ChangerMotDePasseUtilisateur = {};
  ancienMotDePasse = '';
  errorMsg ='';
  imgUrl : string | ArrayBuffer ='assets/image/user.png';

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('origin') && localStorage.getItem('origin')==='inscription') {
      this.ancienMotDePasse = "som3R@nd0mP@$$word";
      localStorage.removeItem('origin');
    }
    this.utilisateur = this.utilisateurService.getConnectedUser();


    if (this.utilisateur.photo !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.utilisateur.photo;
    }else{
      this.imgUrl= 'assets/image/user.png';
    }
  }

  cancel(): void {
    this.router.navigate(['dashboard/profil']);
  }

  chagerMotDePasseUtilisateur() {
    this.changerMotDePasseUtilisateur.id= this.utilisateurService.getConnectedUser().id;
    this.utilisateurService.changerMotDePasse(this.changerMotDePasseUtilisateur).subscribe((data) => {

      this.router.navigate(['/dashboard']).then(()=>{

        location.reload();
      })
    },error => {
      this.notificationService.error(error.error.message);

    })

  }

}
