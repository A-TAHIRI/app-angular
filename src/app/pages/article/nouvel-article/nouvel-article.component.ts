import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categirie';
import { ArticleService } from 'src/app/services/article/article.service';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import {FileUploadService} from "../../../services/upload/file-upload.service";
import {ArticleDto} from "../../../dto/article-dto";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styleUrls: ['./nouvel-article.component.css'],
})
export class NouvelArticleComponent implements OnInit {

  article:Article = {};
  categorie:Categorie={};
  liste :Array<Categorie>=[];
  errorsMsg:Array<string>=[];
  pathFile:any ;
  playImage ='';

  loading:boolean=false;
  protected readonly event = event;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private fileUploadService: FileUploadService,
    private utilisateurService: UtilisateurService,
    private activatedRouter : ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.getAllCategorie();
   const id =this.activatedRouter.snapshot.params['idArticle'];
   if(id){
     this.articleService.getArticle(id).subscribe((data)=>{
       this.article=data;
       this.categorie= this.article.categorie ? this.article.categorie:{};
     })
   }
  }

  /**
   * récupérer tous les categories
   */
  getAllCategorie(){
    this.categorieService.getToutesCategories()
      .subscribe(data => {
        this.liste=data;
      });
  }

  cancel(): void {
    this.router.navigate(['articles']);
  }

  /**
   * Method pou ejouter un article à la bdd
   */
  save(){
    this.article.categorie=this.categorie;
    this.article.idEntreprise=this.utilisateurService.getConnectedUser().entreprise?.id
    this.articleService.add(this.article).subscribe(() => {
      this.router.navigate(['articles']);
    },
      error => {
      this.errorsMsg=error.error.errors
      }
    );
  }

  /**
   * Method upload Image
   * @param event
   */
 onFileSelected(event:any){
   const file: File = event.target.files[0];
   this.fileUploadService.uploadFile(file).subscribe(
     (res : any) => {
       this.pathFile=res.pathFile;
       this.playImage = 'http://localhost:8082/file/image/' + res.pathFile;
       this.article.image = res.pathFile;
       console.log('File uploaded success');

     },
     (error) => {
       console.error('Error uploading file:', error);
     }
   );


 }


  calculetTTC() {
    if(this.article.prixUnitaireHt && this.article.tauxTva){
      this.article.prixUnitaireTtc = +this.article.prixUnitaireHt +(+(this.article.prixUnitaireHt*(this.article.tauxTva/100)));
    }
  }
}
