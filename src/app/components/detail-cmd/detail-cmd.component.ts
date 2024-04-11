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
  pluss = new EventEmitter<number>();

  @Output()
  minus = new EventEmitter<number>();


  constructor(private  router : Router) {
  }
  ngOnInit(): void {
  }

  moinsClick(id :number): void {
    console.log(id)
    this.minus.emit(id);
  }
  plusClick(id:number): void {
    this.pluss.emit(id);
  }




}
