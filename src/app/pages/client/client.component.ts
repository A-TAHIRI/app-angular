import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from "../../services/client/client.service";
import {Client} from "../../models/client";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  liste !: Client[];
   errorsMsg ='';
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  client :Client={};

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
  this.clients();

  }

  clients(){
    this.clientService.getAll().subscribe(data=>{
      this.liste=data;
    })
  }

  cancelClick(): void {
    this.router.navigate(['clients']);
  }

  nouveauClient(): void {
    this.router.navigate(['nouveauclient']);
  }


  handleSuppression(event: any) {
    if( event === 'success'){
      this.clients();
    }else {
      this.errorsMsg=event;
    }
  }
}
