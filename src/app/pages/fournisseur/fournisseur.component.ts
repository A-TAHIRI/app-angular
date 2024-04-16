import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Fournisseur} from "../../models/fournisseur";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";
import {NotificationService} from "../../services/notification/notification.service";
import {DataService} from "../../services/dataService/data.service";

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
  pageActuel: number;
  receivedData: any;
  allpages: any;

  constructor(
    private router: Router,
    private  fournisseurService: FournisseurService,
    private notificationService: NotificationService,
    private dataService: DataService,

  ) {
    this.dataService.data$.subscribe(data => {
      if (data) {
        this.receivedData = data;
        this.goToPage(data);
      }

    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  ngOnInit(): void {
  this.fournisseurs();
  this.allfournisseur();

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
      this.notificationService.success('La suppression a été effectuée avec succès!');
      this.reload();
      this.fournisseurs();
    }else {this.notificationService.error(event);
    }
  }

  reload() {
    window.location.reload();
  }


  allfournisseur(){
    this.fournisseurService.getAllFournisseur().subscribe(data => {
      this.allpages = data;
      this.pageActuel = this.allpages.number;
    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.fournisseurService.getAllFournisseur(name, pageNumber).subscribe(data => {
      this.allpages = data;
      this.pageActuel = pageNumber;
    }, error => {
      this.notificationService.error(error.error.message);
    })

  }


}
