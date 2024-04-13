import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from "../../services/client/client.service";
import {Client} from "../../models/client";
import {NotificationService} from "../../services/notification/notification.service";

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
    private clientService: ClientService,
    private notificationService:NotificationService
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
      this.notificationService.success('La suppression a été effectuée avec succès!')
      this.reload();
      this.clients();

    }else {
      this.notificationService.error(event);
      this.router.navigate(['dashboard/clients'])

    }
  }

  reload() {
    window.location.reload();
  }
}
