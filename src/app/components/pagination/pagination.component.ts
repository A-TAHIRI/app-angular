import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// @ts-ignore
import * as _ from 'underscore';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void {



  }

  @Input()
  i: number = 0;
  @Input()
  receivedData: any;

  @Input()
  pages: any;

  @Input()
  pageActuel: any;




  @Output()
  gotoEvent = new EventEmitter<{ name: string, pageNumber: number }>;

  getPager(  ) {
    let totalItems=this.pages.totalElements;
    let pageSize=this.pages.size;
    let curretPage=this.pageActuel;
  let totalPages=this.pages.totalPages;
  let startPage:number;
    let endPage:number;
    if (totalPages<=10){
      startPage=1;
      endPage=totalPages;
    }else if (curretPage<=6){
      startPage=1;
      endPage=10;
    }else if (curretPage+4>=totalPages){
      startPage=totalPages-9;
      endPage=totalPages;
    }else {
      startPage=curretPage-5;
      endPage=curretPage+4;
    }
    let startIndex=(curretPage-1)*pageSize;
    let endIndex=Math.min(startIndex+pageSize-1,totalItems-1);
    let allpages= _.range(startPage,endPage+1);

    return{
      totalItems:totalItems,
      curretPage:curretPage,
      pageSize:pageSize,
      totalPages:totalPages,
      startPage:startPage,
      endPage:endPage,
      startIndex:startIndex,
      endIndex:endIndex,
      allpages:allpages
    };
  }


  goToPage(name: string, pageNumber: number) {
    this.gotoEvent.emit({name, pageNumber});
  }


  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(name, direction === 'forward' ? this.pageActuel + 1 : this.pageActuel - 1);
  }

}
