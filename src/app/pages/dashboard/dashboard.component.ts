import { Component, ElementRef, OnInit } from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {UtilisateurDto} from "../../dto/utilisateur-dto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  connectedUser: UtilisateurDto = {};
  constructor(private  utilisateurService: UtilisateurService) {

  }
  ngOnInit(): void {
    this.connectedUser=this.utilisateurService.getConnectedUser();
  }


}
