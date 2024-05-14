import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import { Router} from "@angular/router";
import {MesServicesService} from "../../../services/mesServices/mes-services.service";
import {ContactService} from "../../../services/contact/contact.service";
import {Contact} from "../../../models/contact";
import {Utilisateur} from "../../../models/utilisateur";






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  connectedUser: Utilisateur = {};
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  isConnected: boolean = false;
  mesServices!: any[];
  contact :Contact={};
  msgSucces='';
  errorMsg :Array<string>=[];
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private  utilisateurService: UtilisateurService,
    private  contactSerice :ContactService,
    private  router: Router,
    private  services:MesServicesService



  ) {
  }

  ngOnInit(): void {

    this.connectedUser = this.utilisateurService.getConnectedUser()
    if (this.connectedUser.photo !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.connectedUser.photo;
    }else{
      this.imgUrl= 'assets/image/user.png';
    }
    if(localStorage.getItem('accessToken')){
       this.isConnected =true;
    }else{
       this.isConnected =false;
    }
     this.mesServices   =this.mesServices=this.services.datas();




  }

  contacter(){
    if (this.utilisateurService.getConnectedUser()){
      this.contact.nom= this.utilisateurService.getConnectedUser().nom;
      this.contact.email=this.utilisateurService.getConnectedUser().email;

    }
    this.contactSerice.add(this.contact).subscribe(data=>{
      this.msgSucces='Merci ! Le message à été bien envoyer';
      this.contact={};

    },error =>{
      this.errorMsg= error.error.errors
    });
  }


  details(id :string) {
    this.router.navigate(['service-details', id])
  }
}








