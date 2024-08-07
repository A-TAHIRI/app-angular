import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-boutton-action',
  templateUrl: './boutton-action.component.html',
  styleUrls: ['./boutton-action.component.css']
})
export class BouttonActionComponent  implements OnInit {


  @Input()
  isNouveauVisible = true;
  @Input()
  isExporterVisible = true;
  @Input()
  isImporterVisible = true;
  @Output()
  clickEvent = new EventEmitter();
  @Output()
  exportEvent= new EventEmitter();

  ngOnInit(): void {

  }
  constructor() { }


  bouttonNouveauClick(): void {
    this.clickEvent.emit();
  }


  buttonExport(){
    this.exportEvent.emit()
  }

}
