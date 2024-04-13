import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';



import { ArticleService } from 'src/app/services/article/article.service';
import {Article} from "../../models/article";
import {NotificationService} from "../../services/notification/notification.service";

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
    private articleService: ArticleService,
    private notificationService:NotificationService
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
         this.liste = data.sort((a,b)=> b.id -a.id);

       }
       )
    }


  handleSuppression(event: any) {
    if( event === 'success'){
      this.notificationService.success('La suppression a été effectuée avec succès!')
      this.reload();
      this.articles();
    }else {
      this.notificationService.error(event);


    }
  }

  reload() {
    window.location.reload();
  }
}
