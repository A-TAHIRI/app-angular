import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.css']
})
export class DetailCmdComponent  implements  OnInit{

  @Input()
  origin='';

  @Input()
  ligneCommande :any={};
  constructor() {
  }
  ngOnInit(): void {
  }



}
