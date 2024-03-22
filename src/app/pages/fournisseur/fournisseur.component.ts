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
      this.liste=data;
    })
  }

  nouveauFournisseur(): void {
    this.router.navigate(['nouveaufournisseur']);
  }

  handleSuppression(event: any) {
    if( event === 'success'){
      this.fournisseurs();
    }else {
      this.errorsMsg=event;
    }
  }

}
