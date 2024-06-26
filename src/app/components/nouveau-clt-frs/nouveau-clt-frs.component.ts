import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FileUploadService} from "../../services/upload/file-upload.service";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";
import {ClientService} from "../../services/client/client.service";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {Adresse} from "../../models/adresse";
import {Client} from "../../models/client";
import {Fournisseur} from "../../models/fournisseur";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-nouveau-clt-frs',
  templateUrl: './nouveau-clt-frs.component.html',
  styleUrls: ['./nouveau-clt-frs.component.css']
})
export class NouveauCltFrsComponent  implements OnInit {

  origin='';
  pathFile='';
  clientfournisseur : any ={};
  errorsMsg:Array<string>=[];
  playImage ='';
  adresse :Adresse={};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private  fileUploadService:FileUploadService,
    private  fourniseurService : FournisseurService,
    private  clientService : ClientService,
    private  utilisateurService:UtilisateurService,
    private notificationService : NotificationService
    ) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.clientFournisseur();
  }

  clientFournisseur(){
    const id= this.activatedRoute.snapshot.params['id'];
    if (id) {

      if (this.origin === 'client') {
        this.clientService.getClinet(id).subscribe(data => {
            this.clientfournisseur = data;
            this.adresse = this.clientfournisseur.adresse ? this.clientfournisseur.adresse : {};
          }, error => {
          this.notificationService.showErrors(error.error.message);

          }
        )

      } else if (this.origin === 'fournisseur') {
        this.fourniseurService.getFournisseur(id).subscribe(data => {
          this.clientfournisseur = data;
          this.adresse = this.clientfournisseur.adresse ? this.clientfournisseur.adresse : {};
        }, error => {
          this.notificationService.showErrors(error.error.message);
        })

      }
    }

  }




  cancelClick(): void {
    if (this.origin === 'client') {
      this.router.navigate(['dashboard/clients']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['dashboard/fournisseurs']);
    }
  }



  /**
   * upload photo
   * @param event
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(
      (res : any) => {
        this.pathFile=res.pathFile;
        this.clientfournisseur.photo = res.pathFile;
        this.playImage = 'http://localhost:8082/file/image/' + res.pathFile;
        this.notificationService.success('File uploaded success');
        console.log('File uploaded success');
      },
      (error) => {
        this.notificationService.error('Error uploading file:'+error)
        console.error('Error uploading file:', error);
      }
    );
  }

  enregister() {
    if (this.origin === 'client') {
      this.clientService.add(this.mapToClient()).subscribe(data=>{
        this.clientfournisseur= data;
        this.notificationService.success('Le client à été ajouter avec succès')
        this.router.navigate(['dashboard/clients']);
      },error => {
        this.notificationService.showErrors(error.error.errors);
      })

    } else if (this.origin === 'fournisseur') {

      this.fourniseurService.add(this.mapToFournisseur()).subscribe(data=>{
        this.clientfournisseur= data;
        this.notificationService.success('Le fournisseur à été ajouter avec succès')
        this.router.navigate(['dashboard/fournisseurs']);
      },error => {
        this.notificationService.showErrors(error.error.errors);
      });

    }
  }

  mapToClient(): Client{
    let  client :Client = this.clientfournisseur
    client.adresse= this.adresse;
    client.idEntreprise=this.utilisateurService.getConnectedUser().entreprise?.id;
    return client;
  }


  mapToFournisseur():Fournisseur{
    let  fournisseur :Fournisseur =this.clientfournisseur;
      fournisseur.adresse=this.adresse
    fournisseur.idEntreprise=this.utilisateurService.getConnectedUser().entreprise?.id;
    return fournisseur;
  }
}
