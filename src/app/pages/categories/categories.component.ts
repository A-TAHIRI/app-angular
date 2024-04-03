import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategorieService} from "../../services/categorie/categorie.service";
import {CategorieDto} from "../../dto/categorie-dto";
import {Categorie} from "../../models/categirie";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  liste !: CategorieDto[];
  cat : Categorie ={};
  errorsMsg:Array<string>=[];
  selectedCatIdToDelete?  = -1;
  basImgUrl : string  ='assets/image/category.jpg';
  imgUrl:string ='http://localhost:8082/file/image/'
  messageSucces='';

  constructor(
    private router: Router,
   private  categorieService: CategorieService,
   // private lobibox : Lobibox,


  ) { }

  ngOnInit(): void {
    this.getAll()


  }


  /**
   * ajouter une categorie à bdd
   */
  nouvelleCategory(): void {
    this.router.navigate(['dashboard/nouvellecategorie']);
  }

  /**
   * récupére toutes les categories
   */
  getAll(){
   this.categorieService.getToutesCategories().subscribe((data)=>{
     this.liste=data.sort((a: { id: number; }, b: { id: number; })=>  b.id -a.id);
   }, error => {
     this.errorsMsg=error.error.errors
     }

   )
  }

  /**
   * Route pour recupiré la categourie et la modifier
   * @param id
   */
  modifierCategoie(id : number | undefined ):void{
    this.router.navigate(['dashboard/nouvellecategorie', id])

  }

  /**
   * selectioner la categorie à supprimer
   * @param id
   */
  selectCatPourSupprimer(id? : number){

    this.selectedCatIdToDelete= id;
  }

  /**
   * anuler la supprission
   */
  annulerSuppressionCat(){
    this.selectedCatIdToDelete= -1;
  }

  /**
   * confirmer la suppristion d'une categorie
   */
  confirmerEtSupprimerCat(){

    if (this.selectedCatIdToDelete !== -1){
      this.categorieService.supprimerCategorie(this.selectedCatIdToDelete).subscribe(res=>{
          this.messageSucces='La suppression a été effectuée avec succès!';
       this.getAll();
      },
        error=>{
    //lobibox.notify("error",{msg:error.error.message,sound:true,icon:false})
           this.errorsMsg= error.error.message;
        });
    }

  }

  reload() {
    window.location.reload();
  }
}
