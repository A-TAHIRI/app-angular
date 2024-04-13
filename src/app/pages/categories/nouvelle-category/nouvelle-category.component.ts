import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategorieService} from "../../../services/categorie/categorie.service";
import {Categorie} from "../../../models/categirie";
import {CategorieDto} from "../../../dto/categorie-dto";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {FileUploadService} from "../../../services/upload/file-upload.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-nouvelle-category',
  templateUrl: './nouvelle-category.component.html',
  styleUrls: ['./nouvelle-category.component.css']
})
export class NouvelleCategoryComponent implements OnInit {
 categorie : Categorie= {};
  errorsMsg: Array<string>= [];
  pathFile ='';

  constructor(
    private router: Router,
    private categorieService: CategorieService,
    private utilisateurService : UtilisateurService,
    private  activatedRouter:ActivatedRoute,
    private fileUploadService:FileUploadService,
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    const idCategorie = this.activatedRouter.snapshot.params['idCategorie'] ;
        if (idCategorie){
          this.categorieService.getCategorie(idCategorie).subscribe(cat=>{
            this.categorie= cat;
          })
        }
  }

  /**
   * Method pour retourner vers la pagr categories
   */
  cancel(): void {
    this.router.navigate(['dashboard/categories']);
  }

  /**
   * Method pour ajouter une categories à la bdd
   */
  save(){
    // @ts-ignore
    this.categorie.idEntreprise = this.utilisateurService.getConnectedUser().entreprise.id;
    this.categorieService.ajouterCategorie(this.categorie).subscribe((data)=>{
      this.notificationService.success('La categorie a été ajouté avec succès.')
       this.router.navigate(['dashboard/categories']);
   },
     err =>{
      this.notificationService.showErrors(err.error.errors);
     this.router.navigate(['dashboard/nouvellecategorie']);
     }

   );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(
      (res : any) => {
        this.pathFile=res.pathFile;

        this.categorie.image = res.pathFile;
        this.notificationService.success('File uploaded success');
        console.log('File uploaded success');

      },
      (error) => {
        this.notificationService.error('Error uploading file:'+ error)
        console.error('Error uploading file:', error);
      }
    );

  }
}
