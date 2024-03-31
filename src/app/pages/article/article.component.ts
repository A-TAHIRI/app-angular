import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';



import { ArticleService } from 'src/app/services/article/article.service';
import {Article} from "../../models/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

 liste !:  Article[];
  errorsMsg='';
  messageSucces ='';
  constructor(
    private router: Router,
    private articleService: ArticleService
    ) {};

  ngOnInit(): void {
    this.articles();
  }



  nouvelArticle(): void {
    this.router.navigate(['dashboard/nouvelarticle']);
  }

  cancel(): void {
    this.router.navigate(['dashboard/articles']);
  }

   private articles() {
     this.articleService.getAll().subscribe((data)=> {
         this.liste = data;

       }
       )
    }


  handleSuppression(event: any) {
    if( event === 'success'){
      this.messageSucces='La suppression a été effectuée avec succès!';
      this.articles();
    }else {
      this.errorsMsg=event;
    }
  }

  reload() {
    window.location.reload();
  }
}
