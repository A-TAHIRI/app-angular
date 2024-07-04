import{ Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import {Article} from "../../models/article";
import {NotificationService} from "../../services/notification/notification.service";
import {DataService} from "../../services/dataService/data.service";
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
  /**
   * route pou crée un nauveaux article
   */
  nouvelArticle(): void {
    this.router.navigate(['dashboard/nouvelarticle']);
  }
  /**
   * Method pouanuler l'action et retourner vers la pages articles
   */
  cancel(): void {
    this.router.navigate(['dashboard/articles']);
  }
  /**
   * Method qui récuper tous les articles
   * @private
   */
   private articles() {
     this.articleService.getAll().subscribe((data)=> {
         this.liste = data.sort((a,b)=> b.id -a.id);

       }
       )
    }
  /**
   * Method qui gere evenement de supprission de l'article qui vien de component enfant
   * @param event
   */
  handleSuppression(event: any) {
    if( event === 'success'){
      this.notificationService.success('La suppression a été effectuée avec succès!')
      this.reload();
      this.articles();
    }else {
      this.notificationService.error(event);


    }
  }
  /**
   * Method pour rechrger la page actuel
   */
  reload() {
    window.location.reload();
  }
  /**
   * Methode qui recuper les articles par page
   */
  allArticles(){
    this.articleService.getAllArticles().subscribe(data => {
      this.allpages =  data;
      this.pageActuel = this.allpages.number;
    }, error => {
      this.notificationService.error(error.error.message);
    })
  }
  /**
   * Method pour aler vers la page selectioner
   * @param name
   * @param pageNumber
   */
  goToPage(name?: string, pageNumber: number = 0): void {
    this.articleService.getAllArticles(name, pageNumber).subscribe(data => {
      this.allpages = data     ;

      this.pageActuel = pageNumber;
    }, error => {
      this.notificationService.error(error.error.message);
    })

  }
}
