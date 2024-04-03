import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  liste ! : Utilisateur[];
  errorMsg ='';
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  messageSucces='';

  constructor(
    private router: Router,
    private  utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
  this.tousUtilisateurs()
  }



  /**
   * naviger vers la page nouvelUtilisateur
   */
  nouvelUtilisateur(): void {
    this.router.navigate(['dashboard/nouvelutilisateur']);
  }

  /**
   * récupirer tous les utilisateurs
   */
  tousUtilisateurs(){
    this.utilisateurService.getAll().subscribe((data)=>{
      // @ts-ignore
      this.liste= data.sort((a, b)=>  b.id -a.id);
    },(error)=>{
      this.errorMsg=error.error.errors
    })
  }

  handleSuppression(event: any) {
    if( event === 'success'){
      this.messageSucces='La suppression a été effectuée avec succès!';
      this.tousUtilisateurs();
    }else {
      this.errorMsg=event;


    }
  }


  reload(){
    window.location.reload();
  }
}
