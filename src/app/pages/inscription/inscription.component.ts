import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adresse } from 'src/app/models/adresse';
import { Entreprise } from 'src/app/models/entreprise';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {FileUploadService} from "../../services/upload/file-upload.service";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthRequest} from "../../models/auth-request";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  entreprise: Entreprise = {};
  adresse: Adresse = {};
  errors: Array<string> = [];
  pathFile='';

  constructor(
    private router: Router,
    private entrepriseService: EntrepriseService,
    private utilisateurService : UtilisateurService,
    private fileUploadService : FileUploadService,
    private  notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['']);
  }

  /**
   * inscription de l'entrepise
   */
  save() {
    this.entreprise.adresse = this.adresse;
    this.entrepriseService.add(this.entreprise).subscribe(
      (data) => {
        this.conectEntreprise()
      },
      (error) => {

        this.notificationService.error(error.error.message);
        this.notificationService.showErrors(error.error.errors);
      this.router.navigate(['inscrire']);
      }
    );
  }

  /**
   *au cour de l'inscription de l'entreprise en fait la conéction diret de user gnerer
   */
  conectEntreprise():void{
    const authRequest: AuthRequest = {
      email: this.entreprise.email,
      mdp: 'som3R@nd0mP@$$word'
    };
    this.utilisateurService.auth(authRequest).subscribe((res)=>{
      this.getUserByToken(res.token);
      localStorage.setItem('accessToken',  JSON.stringify(res.token) );
      localStorage.setItem('origin', 'inscription');
      this.notificationService.info(" Veuillez changer votre mot passe");
      setTimeout(() => {
        this.router.navigate(['changermotdepasse']).then(() => {
          location.reload();
        });
      }, 3000); // Attente de 3 secondes avant la redirection
    },error => {
      this.notificationService.error(error.error.message);
    });

  }

  /**
   * upload l'image
   * @param event
   */
  onFileSelected(event:any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(
      (res: any) => {
        this.pathFile = res.pathFile;
        this.entreprise.image = res.pathFile;
        this.notificationService.success('File uploaded success');
        console.log('File uploaded success');

      },
      (error) => {
        this.notificationService.error('Error uploading file:'+ error)
        console.error('Error uploading file:', error);
      }
    );
  }

  /**
   * recupirer l'utilisateur crée à partire de l'entreprise et  le stocke dans localeStorage
   * @param email
   */
  getUserByEmail( email ? : string):void{
    this.utilisateurService.getUtilisateurByEmail(email).subscribe((user)=>{
      this.utilisateurService.setConnectedUser(user);
    });
  }
  /**
   * recupérer l'user connécté
   */
  getUserByToken(token:string):void{
    this.utilisateurService.getUtilisateurByToken(token).subscribe((user)=>{
      this.utilisateurService.setConnectedUser(user);
    },error => this.notificationService.error('Impossible de récupérer les informations de l’utilisateur'));
  }

  }
