import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.css']
})
export class DetailCmdComponent  implements  OnInit{
  @Input()
  i:number=0;

  @Input()
  origin='';

  @Input()
  ligneCommande :any={};
  constructor(private  router : Router) {
  }
  ngOnInit(): void {
  }


  moins() {
    const url= this.router.url;

    if(url== '/dashboard/nouvellecommandeclt' || url=='/dashboard/nouvellecommandefrs'){
      this.ligneCommande.quantite -=1;
    }

  }
  plus(){
    const url= this.router.url;
    if (url== '/dashboard/nouvellecommandeclt'|| url=='/dashboard/nouvellecommandefrs'){
      this.ligneCommande.quantite +=1;
    }

  }
}
