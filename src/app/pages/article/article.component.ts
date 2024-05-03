import{ Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';



import { ArticleService } from 'src/app/services/article/article.service';
import {Article} from "../../models/article";
import {NotificationService} from "../../services/notification/notification.service";
import {DataService} from "../../services/dataService/data.service";
import {Page} from "../../models/page";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

 liste !:  Article[];
  errorsMsg='';
  messageSucces ='';
  pageActuel: number;
  receivedData: any;
  allpages: any;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private notificationService:NotificationService,
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
  };

  ngOnInit(): void {
    this.articles();
    this.allArticles()
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
  allArticles(){
    this.articleService.getAllArticles().subscribe(data => {
      this.allpages =  data;
      this.pageActuel = this.allpages.number;
    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.articleService.getAllArticles(name, pageNumber).subscribe(data => {
      this.allpages = data     ;

      this.pageActuel = pageNumber;
    }, error => {
      this.notificationService.error(error.error.message);
    })

  }
}
