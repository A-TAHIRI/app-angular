import {Component, Input, OnInit} from '@angular/core';
import {MvtstkService} from "../../services/mvtstk/mvtstk.service";

@Component({
  selector: 'app-detail-mvt-stk-article',
  templateUrl: './detail-mvt-stk-article.component.html',
  styleUrls: ['./detail-mvt-stk-article.component.css']
})
export class DetailMvtStkArticleComponent implements OnInit{
  imgUrl : string | ArrayBuffer ='assets/image/produit.png';
  stock: any;
  @Input()
  i :number=0;

  @Input()
  mvtstk:any;

  constructor(private mvtstkService : MvtstkService) {
  }
  ngOnInit(): void {
    this.stockReel(this.mvtstk.article.id);
    if (this.mvtstk.article.image !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.mvtstk.article.image;
    }else{
      this.imgUrl= 'assets/image/produit.png';
    }
  }

  /**
   * Method qui récupére stock réel par id Article
   * @param id
   */
  stockReel(id?:number){
    this.mvtstkService.getStock(id).subscribe(data=>{
      this.stock=data;
    })
  }




}
