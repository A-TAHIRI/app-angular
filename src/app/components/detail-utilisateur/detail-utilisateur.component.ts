import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.css']
})
export class DetailUtilisateurComponent  implements OnInit {
@Input()
i:number=0;
  @Input()
  utilisateur : Utilisateur ={};
  @Input()
  imgUrl= '';

  @Output()
  suppressionResult = new EventEmitter();

  selectedUserIdToDelete?  = -1;
  constructor(
    private  router: Router,
    private utilisateurService: UtilisateurService
  ) {
  }
  ngOnInit(): void {
  }

  /**
   * rout pour modifier l'utilisateur
   * @param id
   */
  modifierUtilisateur(id: number | undefined) {
    this.router.navigate(['dashboard/nouvelutilisateur', id])

  }

  confirmerEtSupprimerUser() {
    if(this.selectedUserIdToDelete !== -1){
      this.utilisateurService.delet(this.selectedUserIdToDelete).subscribe((data)=>{
        this.suppressionResult.emit('success')
      }, error=>{
        this.suppressionResult.emit(error.error.error)
        }
        )


    }

  }

  annulerSuppressionUser() {
    this.selectedUserIdToDelete=-1;

  }

  selectUserDelet(id: number | undefined) {
    this.selectedUserIdToDelete=id;

  }
}
