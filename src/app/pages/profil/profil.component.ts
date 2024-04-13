import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {UtilisateurDto} from "../../dto/utilisateur-dto";
import {ChangerMotDePasseUtilisateurDto} from "../../dto/changer-mot-de-passe-utilisateur-dto";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  utilisateur: UtilisateurDto={};
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  changerMotDePasseUtilisateurDto: ChangerMotDePasseUtilisateurDto = {};
  ancienMotDePasse = '';
   errorMsg='';

  constructor(
    private router: Router,
    private utilsateurService : UtilisateurService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('origin') && localStorage.getItem('origin')==='inscription') {
      this.ancienMotDePasse = "som3R@nd0mP@$$word";
      localStorage.removeItem('origin');
    }

    this.utilisateur = this.utilsateurService.getConnectedUser();
    if (this.utilisateur.photo !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.utilisateur.photo;
    }else{
      this.imgUrl= 'assets/image/user.png';
    }
  }



  modifierUser( id ?: number){
    this.router.navigate(['dashboard/nouvelutilisateur' , id] )
  }

  /**
   * rout pour modifier user
   * @param id
   */
  modifierUtilisateur(id: number | undefined) {
    this.router.navigate(['dashboard/nouvelutilisateur' , id])
  }


  chagerMotDePasseUtilisateur() {
    this.changerMotDePasseUtilisateurDto.id= this.utilsateurService.getConnectedUser().id;
    this.utilsateurService.changerMotDePasse(this.changerMotDePasseUtilisateurDto).subscribe((data) => {
      this.utilsateurService.getConnectedUser();
      this.router.navigate([''])
    },error => {
      this.notificationService.error(error.error.message);
    })

  }
}
