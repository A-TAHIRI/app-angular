import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adresse } from 'src/app/models/adresse';
import { Entreprise } from 'src/app/models/entreprise';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import {AuthRequestDto} from "../../dto/auth-request";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {FileUploadService} from "../../services/upload/file-upload.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  entreprise: Entreprise = {};
  adresse: Adresse = {};
  errorsMsg: Array<string> = [];
  pathFile='';

  constructor(
    private router: Router,
    private entrepriseService: EntrepriseService,
    private utilisateurService : UtilisateurService,
    private fileUploadService : FileUploadService
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
        this.errorsMsg = error.error.errors;
      this.router.navigate(['inscription']);
      }
    );
  }

  /**
   *au cour de l'inscription de l'entreprise en fait la conéction diret de user gnerer
   */
  conectEntreprise():void{
    const authRequestDto: AuthRequestDto = {
      email: this.entreprise.email,
      mdp: 'som3R@nd0mP@$$word'
    };
    this.utilisateurService.auth(authRequestDto).subscribe((res)=>{
    this.getUserByEmail(authRequestDto.email);
      localStorage.setItem('accessToken',  JSON.stringify(res.token) );
      localStorage.setItem('origin', 'inscription');
      this.router.navigate(['changermotdepasse']);
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
        console.log('File uploaded success');

      },
      (error) => {
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
      console.log(user)
      this.utilisateurService.setConnectedUser(user);
    });
  }

  }
