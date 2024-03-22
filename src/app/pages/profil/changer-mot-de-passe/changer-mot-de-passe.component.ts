import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {UtilisateurDto} from "../../../dto/utilisateur-dto";
import {ChangerMotDePasseUtilisateurDto} from "../../../dto/changer-mot-de-passe-utilisateur-dto";
import {of} from "rxjs";

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.css']
})
export class ChangerMotDePasseComponent implements OnInit {
  utilisateur: UtilisateurDto = {};
  changerMotDePasseUtilisateurDto: ChangerMotDePasseUtilisateurDto = {};
  ancienMotDePasse = '';
  errorMsg ='';
  imgUrl : string | ArrayBuffer ='assets/image/user.png';

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService
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
    this.router.navigate(['profil']);
  }

  chagerMotDePasseUtilisateur() {
    this.changerMotDePasseUtilisateurDto.id= this.utilisateurService.getConnectedUser().id;
    this.utilisateurService.changerMotDePasse(this.changerMotDePasseUtilisateurDto).subscribe((data) => {
      this.router.navigate([''])
    },error => {
      this.errorMsg=error.error.message;
    })

  }

}
