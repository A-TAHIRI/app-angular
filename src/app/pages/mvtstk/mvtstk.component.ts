import {Component, OnInit} from '@angular/core';
import {MvtstkService} from "../../services/mvtstk/mvtstk.service";
import {MvtStk} from "../../models/mvt-stk";
import {NotificationService} from "../../services/notification/notification.service";
import {DataService} from "../../services/dataService/data.service";

@Component({
  selector: 'app-mvtstk',
  templateUrl: './mvtstk.component.html',
  styleUrls: ['./mvtstk.component.css']
})
export class MvtstkComponent implements OnInit{

  mvtstksByidArticle :Array<MvtStk>=[];
  mvtstkGroupByIdArticle: Array<MvtStk>=[];
  pageActuel: number;
  receivedData: any;
  allpages: any;


  constructor(
    private  mvtstkService : MvtstkService,
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
  }
  ngOnInit(): void {
    this.mvtstkByIdArticle();
    this.allMvtstk();

  }

  /**
   * Method pour récuoirer tous les mvtstks de l' article avec son id
   * @param id
   */
  mvtstksByArticle(id?:number){
    this.mvtstkService.getAllByArticle(id).subscribe(data=>{
      // @ts-ignore
      this.mvtstksByidArticle=data.sort((a,b)=>  b.id -a.id);
    })
  }

  /**
   * Method pour récupiré les mtstk regouper by idArticle
   */
  mvtstkByIdArticle(){
    this.mvtstkService.getMvtstkGroupByAricle().subscribe(data=>{
      // @ts-ignore
      this.mvtstkGroupByIdArticle=data.sort((a,b)=>  b.id -a.id);

    })
  }


  allMvtstk(){
    this.mvtstkService.getAllMvtstkByArticle().subscribe(data => {
      this.allpages = data;
      this.pageActuel = this.allpages.number;
    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.mvtstkService.getAllMvtstkByArticle(name, pageNumber).subscribe(data => {
      this.allpages = data;
      this.pageActuel = pageNumber;
    }, error => {
      this.notificationService.error(error.error.message);
    })

  }


}
