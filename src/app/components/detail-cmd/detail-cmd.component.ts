import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.css']
})
export class DetailCmdComponent  implements  OnInit{
  @Input()
  i:number=0;
  url ='';


  @Input()
  origin='';

  @Input()
  ligneCommande :any={};



  @Output()
  pluss = new EventEmitter();
  @Output()
  minus = new EventEmitter();


  constructor(private  router : Router) {
  }
  ngOnInit(): void {
  }

  moinsClick(): void {
    this.minus.emit();
  }
  plusClick(): void {
    this.pluss.emit();
  }




}
