import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {UtilisateurDto} from "../../dto/utilisateur-dto";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  utilisateur: UtilisateurDto={};
  imgUrl : string | ArrayBuffer ='assets/image/user.png';

  constructor(
    private router: Router,
    private utilsateurService : UtilisateurService
  ) { }

  ngOnInit(): void {
    this.utilisateur = this.utilsateurService.getConnectedUser();
    if (this.utilisateur.photo !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.utilisateur.photo;
    }else{
      this.imgUrl= 'assets/image/user.png';
    }
  }

  /**
   * Method pour chager le mot de passe
   */
  modifierMotDePasse(): void {
    this.router.navigate(['changermotdepasse']);
  }

  /**
   * Method de déconection
   */
  deconexion(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('connectedUser')
    this.router.navigate(['login']);
  }
  modifierUser( id ?: number){
    this.router.navigate(['nouvelutilisateur' , id] )
  }

  /**
   * rout pour modifier user
   * @param id
   */
  modifierUtilisateur(id: number | undefined) {
    this.router.navigate(['nouvelutilisateur' , id])
  }
}
