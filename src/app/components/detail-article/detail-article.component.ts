import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent  implements OnInit {

  articleDeletById?= -1;
  imgUrl : string | ArrayBuffer ='assets/image/produit.png';
  @Input() thScopes!: string[];

@Output()
suppressionResult = new EventEmitter();
@Input()
i : number=0;

  @Input()
  article : Article = {};

  constructor(
   private router: Router,
   private articleService: ArticleService

  ) { }

  ngOnInit(): void {
    if (this.article.image !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.article.image;
    }else{
      this.imgUrl= 'assets/image/produit.png';
    }

  }

  /**
   * modifier un aricle par id
   * @param id
   */
  modifierArticle(id: number | undefined) {
    this.router.navigate(['dashboard/nouvelarticle', id])
  }



  confirmerEtSupprimerArticle() {
    if(this.articleDeletById !== -1){
      this.articleService.delet(this.articleDeletById).subscribe((data)=>{
       this.suppressionResult.emit('success')
      },
        error=>{
         this.suppressionResult.emit(error.error.error);
        })
    }

  }


  selectArticlePourSupprimer(id?: number ) {
    this.articleDeletById=id;

  }

  annulerSuppressionArticle() {
    this.articleDeletById=-1;

  }
}
