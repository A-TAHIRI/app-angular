import {Component, Input, OnInit} from '@angular/core';
import {GenererPdfService} from "../../services/genererPdf/generer-pdf.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.css']
})
export class DetailCmdCltFrsComponent  implements OnInit{

  @Input()
  i : number=0;
  @Input()
  origin = '';
  @Input()
  commande:any={};

  imgUrl : string | ArrayBuffer ='assets/image/user.png';

  cltFrs: any={};

  constructor(
    private genererPdfService : GenererPdfService,
    private router :Router
  ) {
  }
  ngOnInit(): void {
    this.extractClientFournisseur()
    this.imgUrl = this.cltFrs ? 'http://localhost:8082/file/image/'+this.cltFrs?.photo :'assets/image/user.png' ;
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
  facture(id:number) {
    if (this.origin=='client'){
      this.router.navigate(['/dashboard/facture/commandesclient' , id])
    }else if (this.origin=='fournisseur'){
      this.router.navigate(['/dashboard/facture/commandesfournisseur' , id])
    }

  }

  modifiercmd(id:number) {
    if (this.origin=='client'){
      this.router.navigate(['/dashboard/nouvellecommandeclt' , id])
    }else if (this.origin=='fournisseur'){
      this.router.navigate(['/dashboard/nouvellecommandefrs' , id])
    }

  }
}
