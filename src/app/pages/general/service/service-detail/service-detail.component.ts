import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MesServicesService} from "../../../../services/mesServices/mes-services.service";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit{
  service: any;
  isActive =false;
  elementActif = 0;
  details: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private mesService: MesServicesService
  ) {}
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['idService'];
    if (id) {
      this.service = this.mesService.getById(id);
    }

    const idCaracteristique =
      this.activatedRoute.snapshot.params['idCaracteristique'];
    const url = window.location.href;
    const segments = url.split('/');
    const idService: any = segments[4];

    this.details = this.service.getCaracteristiqueById(
      idService,
      idCaracteristique
    );
  }

  onClick(index: number) {
    this.elementActif = index;
  }

}
