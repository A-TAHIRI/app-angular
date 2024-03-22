import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.css']
})
export class DetailUtilisateurComponent  implements OnInit {

  @Input()
  utilisateur : Utilisateur ={};
  @Input()
  imgUrl= '';

  @Output()
  suppressionResult = new EventEmitter();
  constructor(
    private  router: Router,
  ) {
  }
  ngOnInit(): void {
  }

  /**
   * rout pour modifier l'utilisateur
   * @param id
   */
  modifierUtilisateur(id: number | undefined) {
    this.router.navigate(['nouvelutilisateur', id])

  }
}
