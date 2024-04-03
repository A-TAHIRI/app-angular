import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {  Router } from '@angular/router';
import {ClientService} from "../../services/client/client.service";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";

@Component({
  selector: 'app-detail-clt-frs',
  templateUrl: './detail-clt-frs.component.html',
  styleUrls: ['./detail-clt-frs.component.css']
})
export class DetailCltFrsComponent  implements OnInit{
@Input()
i:number=0;
  @Input()
  origin = '';
  @Input()
  clientFournisseur : any= {};
  @Input()
  imgUrl='';




  @Output()
  suppritionResult = new EventEmitter();

  constructor(
    private  router: Router,
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
      this.router.navigate(['dashboard/nouveauclient', this.clientFournisseur.id])
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['dashboard/nouveaufournisseur',this.clientFournisseur.id ])
    }
  }



  confirmerEtSupprimer() {
    if(this.clientFournisseur.id){
      if (this.origin === 'client') {
      this.clientService.delet(this.clientFournisseur.id).subscribe(res=>{
        this.suppritionResult.emit('success')
      },error => {
        this.suppritionResult.emit(error.error.message)
      })
      } else if (this.origin === 'fournisseur') {
        this.fournisseurService.delet(this.clientFournisseur.id).subscribe(res=>{
          this.suppritionResult.emit('success')
        },error => {
          this.suppritionResult.emit(error.error.message)
        })
      }

    }

  }
}





