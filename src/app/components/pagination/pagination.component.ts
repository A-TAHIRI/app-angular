import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void {
    this.visiblePageNumbers()
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

  visiblePageNumbers() {
    let pageNumbers = [];
    for (let i = this.pageActuel; i <= Math.min(this.pageActuel + 9, this.pages.totalPages); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }


  goToPage(name: string, pageNumber: number) {
    this.gotoEvent.emit({name, pageNumber});
  }


  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(name, direction === 'forward' ? this.pageActuel + 1 : this.pageActuel - 1);
  }

}
