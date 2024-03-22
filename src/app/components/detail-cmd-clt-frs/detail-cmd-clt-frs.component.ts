import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.css']
})
export class DetailCmdCltFrsComponent  implements OnInit{


  @Input()
  origin = '';
  @Input()
  commande:any={};

  imgUrl : string | ArrayBuffer ='assets/image/user.png';

  cltFrs: any={};
  constructor() {
  }
  ngOnInit(): void {
    this.extractClientFournisseur()
    this.imgUrl = this.cltFrs ? 'http://localhost:8082/file/image/'+this.cltFrs?.photo :'assets/image/user.png' ;
  }

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande?.fournisseur;
    }
  }

  modifierClick() {

  }
}
