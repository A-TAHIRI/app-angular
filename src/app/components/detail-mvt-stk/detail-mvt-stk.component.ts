import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-detail-mvt-stk',
  templateUrl: './detail-mvt-stk.component.html',
  styleUrls: ['./detail-mvt-stk.component.css']
})
export class DetailMvtStkComponent {

  @Input()
  mvtstk:any;

  @Input()
  i:number=0;

}
