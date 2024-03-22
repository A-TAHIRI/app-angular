import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ClientService} from "../../services/client/client.service";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";

@Component({
  selector: 'app-detail-clt-frs',
  templateUrl: './detail-clt-frs.component.html',
  styleUrls: ['./detail-clt-frs.component.css']
})
export class DetailCltFrsComponent  implements OnInit{

  @Input()
  origin = '';
  @Input()
  clientFournisseur : any= {};
  @Input()
  imgUrl='';

  deletCltFrsById? =-1;


  @Output()
  suppritionResult = new EventEmitter();

  constructor(
    private  router: Router,
    private  activatedRouter : ActivatedRoute,
    private  clientService : ClientService,
    private  fournisseurService: FournisseurService,
  ) { }

  ngOnInit(): void {
    };

  /**
   * rout pour modifier client/fournisseur
   * @param id
   */
  modifierClientFournisseur():void {
    if (this.origin === 'client') {
      this.router.navigate(['nouveauclient', this.clientFournisseur.id])
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouveaufournisseur',this.clientFournisseur.id ])
    }
  }

  selectCltFrsPourSupprimer(id) {
    this.deletCltFrsById= id;

  }

  annulerSuppression() {
    this.deletCltFrsById=-1;
  }

  confirmerEtSupprimer() {
    if(this.deletCltFrsById !== -1){
      if (this.origin === 'client') {
      this.clientService.delet(this.deletCltFrsById).subscribe(res=>{
        this.suppritionResult.emit('success')
      },error => {
        this.suppritionResult.emit(error.error.error)
      })
      } else if (this.origin === 'fournisseur') {
        this.fournisseurService.delet(this.deletCltFrsById).subscribe(res=>{
          this.suppritionResult.emit('success')
        },error => {
          this.suppritionResult.emit(error.error.error)
        })
      }

    }

  }
}





