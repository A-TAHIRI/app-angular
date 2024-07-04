import {Component, Input, OnInit,ViewChild, ElementRef} from '@angular/core';
import {GenererPdfService} from "../../services/genererPdf/generer-pdf.service";
import {Route, Router} from "@angular/router";
import {CommandeclientService} from "../../services/commandeclient/commandeclient.service";
import {CommandefournisseurService} from "../../services/commandefournisseur/commandefournisseur.service";
import {NotificationService} from "../../services/notification/notification.service";
import { environment } from '../../../environments/environment';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.css']
})
export class DetailCmdCltFrsComponent implements OnInit {
  @ViewChild('offcanvasRef') offcanvasRef: ElementRef;

  @Input()
  i: number = 0;
  @Input()
  origin = '';
  @Input()
  commande: any = {};


  imgUrl: string | ArrayBuffer = './assets/image/user.png';

  cltFrs: any = {};
   etatCommande: any;
   newcommande: any;


  constructor(
    private genererPdfService: GenererPdfService,
    private router: Router,
    private commandeClientService : CommandeclientService,
    private commandeFournisseurService: CommandefournisseurService,
    private notificationService:NotificationService
  ) {
  }

  ngOnInit(): void {
    this.extractClientFournisseur()
    this.imgUrl = this.cltFrs.photo ? (( environment.production) ? 'https://ws.gestostock.fr/file/image/'+ this.cltFrs?.photo   : 'http://localhost:8082/file/image/' + this.cltFrs?.photo )
    : './assets/image/user.png';
  }


  extractClientFournisseur(): void {
    if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande?.fournisseur;
    } else if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    }
  }

  modifierClick() {

  }

  /**
   * Method pour retourner la facture  par id de commade
   * @param id
   */
  facture(id: number) {
    if (this.origin === 'client') {
      this.router.navigate(['/dashboard/facture/commandesclient', id])
    } else if (this.origin == 'fournisseur') {
      this.router.navigate(['/dashboard/facture/commandesfournisseur', id])
    }

  }

  modifiercmd(id: number) {
    if (this.origin ==='client') {
      this.router.navigate(['/dashboard/nouvellecommandeclt', id])
    } else if (this.origin == 'fournisseur') {
      this.router.navigate(['/dashboard/nouvellecommandefrs', id])
    }

  }


  changeretat() {
    if (this.commande?.id ) {
      if(this.origin === 'client'){
        this.newcommande=this.commande;
        this.newcommande.etatCommande= this.etatCommande;
         this.commandeClientService.add(this.newcommande).subscribe(data=>{
           this.notificationService.success("L'etat de la commande à été bien changer");
           this.router.navigate(['dashboard/commandesclient']);
           this.etatCommande='';
         },error => {
           this.notificationService.error(error.error.message);

         });

      }else if(this.origin === 'fournisseur'){
        this.newcommande=this.commande;
        this.newcommande.etatCommande= this.etatCommande;

        this.commandeFournisseurService.add(this.newcommande).subscribe(data=>{
        this.notificationService.success("L'etat de la commande à été bien changer");
        this.router.navigate(['dashboard/commandesfournisseur']);
          this.etatCommande='';

      },error => {
        this.notificationService.error(error.error.message);

      });

      }

    }

  }


  /**
  methode pour supprimer la commande
   */
confirmerEtSupprimerCmd(){
 if (this.commande?.id ) {
      if(this.origin === 'client'){

         this.commandeClientService.deletCmd(this.commande.id).subscribe(data=>{
           this.notificationService.success("L'etat de la commande à été bien supprimer");
           this.router.navigate(['dashboard/commandesclient']);

         },error => {
           this.notificationService.error(error.error.message);

         });

      }else if(this.origin === 'fournisseur'){

        this.commandeFournisseurService.deletCmd(this.commande.id).subscribe(data=>{
        this.notificationService.success("L'etat de la commande à été bien supprimer");
        this.router.navigate(['dashboard/commandesfournisseur']);


      },error => {
        this.notificationService.error(error.error.message);

      });

      }

    }

}

}
