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
  messageSucces='';

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
      // @ts-ignore
      this.liste=data.sort((a, b )=>  b.id -a.id);
    })
  }

  cancelClick(): void {
    this.router.navigate(['clients']);
  }

  nouveauClient(): void {
    this.router.navigate(['dashboard/nouveauclient']);
  }


  handleSuppression(event: any) {
    if( event === 'success'){
      this.messageSucces='La suppression a été effectuée avec succès!';
      this.clients();

    }else {
      this.errorsMsg=event;
    }
  }

  reload() {
    window.location.reload();
  }
}
