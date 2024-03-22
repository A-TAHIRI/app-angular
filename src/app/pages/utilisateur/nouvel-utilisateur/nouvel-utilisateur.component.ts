import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { UtilisateurDto } from 'src/app/dto/utilisateur-dto';
import { Adresse } from 'src/app/models/adresse';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import {FileUploadService} from "../../../services/upload/file-upload.service";

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.css'],
})
export class NouvelUtilisateurComponent implements OnInit {
  utilisateur: Utilisateur = new Utilisateur();
  adresse: Adresse = {};
  errorsMsg: Array<string> = [];
  pathFile = '';
  protected readonly event = event;

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    private fileUploadService : FileUploadService,
    private  activatedRouter : ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const idUser = this.activatedRouter.snapshot.params['idUtilisateur'];
    if(idUser){
   this.utilisateurService.getUtilisateur(idUser).
      subscribe((data)=>{
        this.utilisateur=data;
        this.adresse= this.utilisateur.adresse ? this.utilisateur.adresse :{};
      })
    }

  }

  /**
   * Method pour retourner à la pages utilisateurs
   */
  cancel(): void {
    this.router.navigate(['utilisateurs']);
  }

  /**
   * Method pur ajouter utilisateur à la bdd
   */
  ajouter( ) {
      this.utilisateur.adresse = this.adresse;
      this.utilisateur.entreprise = this.utilisateurService.getConnectedUser().entreprise;
      this.utilisateurService.add(this.utilisateur).subscribe((data) => {
          this.router.navigate(['utilisateurs']);
        }, (err) => {
          this.errorsMsg = err.error.errors;
        }
      );

  }

  /**
   * Method Upload image
   * @param event
   */
  onFileSelected(event:any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(
      (res: any) => {
        this.pathFile = res.pathFile;
        this.utilisateur.photo = res.pathFile;
        console.log('File uploaded success');

      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

}
