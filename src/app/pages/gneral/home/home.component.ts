import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {UtilisateurDto} from "../../../dto/utilisateur-dto";
import { Router} from "@angular/router";
import {MesServicesService} from "../../../services/mesServices/mes-services.service";






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  connectedUser: UtilisateurDto = {};
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  isConnected: boolean = false;
  mesServices!: any[];
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private  utilisateurService: UtilisateurService,
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




  }








