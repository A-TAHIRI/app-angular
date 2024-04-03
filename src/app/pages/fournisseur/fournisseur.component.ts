import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Fournisseur} from "../../models/fournisseur";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
   liste:Array<Fournisseur>= [];
   errorsMsg= '';
  messageSucces='';
  imgUrl : string | ArrayBuffer ='assets/image/user.png';

  constructor(
    private router: Router,
    private  fournisseurService: FournisseurService

  ) { }

  ngOnInit(): void {
  this.fournisseurs();

  }


  fournisseurs(){
    this.fournisseurService.getAll().subscribe(data=>{
      // @ts-ignore
      this.liste=data.sort((a, b)=>  b.id -a.id);
    })
  }

  nouveauFournisseur(): void {
    this.router.navigate(['dashboard/nouveaufournisseur']);
  }

  handleSuppression(event: any) {
    if( event === 'success'){
      this.fournisseurs();
      this.messageSucces='La suppression a été effectuée avec succès!'
    }else {
      this.errorsMsg=event;
    }
  }

  reload() {
    window.location.reload();
  }
}
