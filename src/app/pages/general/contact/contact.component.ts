import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../../services/contact/contact.service";
import {Contact} from "../../../models/contact";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements  OnInit{

  userConnect:any={};
  contact :Contact={};
  msgSucces='';
   errorMsg :Array<string>=[];
  constructor(
    private  contactSerice :ContactService,
    private  utilisateurService : UtilisateurService,
    private  reouter : Router,
    private  notificationService: NotificationService
  ) {
  }
  ngOnInit(): void {
   this.userConnect= this.utilisateurService.getConnectedUser();
  }
  contacter(){
    if (this.utilisateurService.getConnectedUser()){
      this.contact.nom= this.utilisateurService.getConnectedUser().nom;
      this.contact.email=this.utilisateurService.getConnectedUser().email;

    }
    this.contactSerice.add(this.contact).subscribe(data=>{
      this.notificationService.success(' Le message à été bien envoyer !')
     this.contact={};

    },error =>{
      this.notificationService.showErrors(error.error.errors);
    });
  }

}
