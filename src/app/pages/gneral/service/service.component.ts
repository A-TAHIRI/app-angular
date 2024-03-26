import {Component, OnInit} from '@angular/core';
import {MesServicesService} from "../../../services/mesServices/mes-services.service";


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent  implements  OnInit{
  mesServices:any;
  constructor(private  service : MesServicesService) {
  }
  ngOnInit(): void {
    this.mesServices= this.service.datas();
  }





}
