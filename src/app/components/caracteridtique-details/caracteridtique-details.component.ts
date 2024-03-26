import {Component, Input, OnInit} from '@angular/core';
import {MesServicesService} from "../../services/mesServices/mes-services.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-caracteridtique-details',
  templateUrl: './caracteridtique-details.component.html',
  styleUrls: ['./caracteridtique-details.component.css']
})
export class CaracteridtiqueDetailsComponent implements  OnInit{
  details:any;

  constructor(private  service:MesServicesService,
              private activatedRoute: ActivatedRoute
              ) {
  }
  ngOnInit(): void {
    const idCaracteristique = this.activatedRoute.snapshot.params['idCaracteristique'];
    const url = window.location.href;
    const segments = url.split("/");
    const idService: any = segments[4];
    this.details=this.service.getCaracteristiqueById(idService, idCaracteristique);
    console.log(this.details);
  }



}
