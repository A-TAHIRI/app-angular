import {Component, OnInit} from '@angular/core';
import {MvtstkService} from "../../services/mvtstk/mvtstk.service";
import {MvtStk} from "../../models/mvt-stk";

@Component({
  selector: 'app-mvtstk',
  templateUrl: './mvtstk.component.html',
  styleUrls: ['./mvtstk.component.css']
})
export class MvtstkComponent implements OnInit{

  mvtstksByidArticle :Array<MvtStk>=[];
  mvtstkGroupByIdArticle: Array<MvtStk>=[];


  constructor(private  mvtstkService : MvtstkService) {
  }
  ngOnInit(): void {
    this.mvtstkByIdArticle();

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



}
