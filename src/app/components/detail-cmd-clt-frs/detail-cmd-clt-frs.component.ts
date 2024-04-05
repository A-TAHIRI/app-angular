import {Component, Input, OnInit} from '@angular/core';
import {GenererPdfService} from "../../services/genererPdf/generer-pdf.service";

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

  constructor(private genererPdfService : GenererPdfService  ) {
  }
  ngOnInit(): void {
    this.extractClientFournisseur()
    this.imgUrl = this.cltFrs ? 'http://localhost:8082/file/image/'+this.cltFrs?.photo :'assets/image/user.png' ;
  }

  pdf(id :string){
    this.genererPdfService.generatedPDF(id);
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
}
