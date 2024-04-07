import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandeclientService} from "../../../services/commandeclient/commandeclient.service";
import {CommandefournisseurService} from "../../../services/commandefournisseur/commandefournisseur.service";
import {UtilisateurService} from "../../../services/utilisateur/utilisateur.service";
import {EntrepriseService} from "../../../services/entreprise/entreprise.service";
import {ClientService} from "../../../services/client/client.service";
import {FournisseurService} from "../../../services/fournisseur/fournisseur.service";
import {Entreprise} from "../../../models/entreprise";
import {GenererPdfService} from "../../../services/genererPdf/generer-pdf.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  origin = '';
  entreprise: Entreprise = {};
  cltfrs: any = {};
  commande: any = {};
  errorsMsg: Array<string> = [];
  cltid: number = 0;
  frsid: number = 0;
  lignesCommandes: Array<any>=[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private commandeClientService: CommandeclientService,
    private commadeFournisseurService: CommandefournisseurService,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private entrepriseService: EntrepriseService,
    private clientService: ClientService,
    private fournisseurService: FournisseurService,
    private genererPdfService:GenererPdfService
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    })
    this.factureCltFrs();
    this.utilisateurService.getConnectedUser();
    this.cltFrs();
    this.entrepris();
    this. findLignesCommande();
  }

  /**
   * Method pour récupiré la commade par son id
   */
  factureCltFrs() {
    const id = this.activatedRoute.snapshot.params['idcommande'];
    if (id) {
      if (this.origin === 'client') {
        this.commandeClientService.getById(id).subscribe(data => {
          this.commande = data;
          this.entrepris()
          this.cltid = data.client.id;
          this.cltFrs();
          this. findLignesCommande();
        }, error => {
          this.errorsMsg = error.error.message;
        })
      } else if (this.origin === 'fournisseur') {
        this.commadeFournisseurService.getById(id).subscribe(data => {
          this.commande = data;
          this.entrepris()
          this.frsid = data.fournisseur.id;
          this.cltFrs();
          this.findLignesCommande();
        }, error => {
          this.errorsMsg = error.error.message;
        })
      }
    }
  }

  /**
   * recupiré l'enreprise par son id
   */
  entrepris() {
    if (this.commande.idEntreprise)
      this.entrepriseService.getById(this.commande.idEntreprise).subscribe(data => {
        this.entreprise = data;
      })
  }


  /**
   * recupiré cltfrs par son id
   */
  cltFrs() {
      if (this.cltid) {
        this.clientService.getClinet(this.cltid).subscribe(data => {
          this.cltfrs = data
        })
      } else if (this.frsid) {
        this.fournisseurService.getFournisseur(this.frsid).subscribe(data => {
          this.cltfrs = data
        })
      }
    }


  /**
   * Method pour recupiré les ligne de commande par id de la commade
   * @param idCommande
   */
  findLignesCommande() {
    const id = this.activatedRoute.snapshot.params['idcommande'];
    if (id) {
      if (this.origin === 'client') {
        this.commandeClientService.findAllLigneCommandesClient(id)
          .subscribe(list => {
            this.lignesCommandes = list.sort((a,b)=> b.id -a.id);
          });
      } else if (this.origin === 'fournisseur') {
        this.commadeFournisseurService.findAllLigneCommandesFournisseur(id)
          .subscribe(list => {
            this.lignesCommandes = list.sort((a,b)=> b.id -a.id);
          });
      }
    }
  }

  /**
   * Method qui parcouri les lingne de commade pour calculer le total avec tva
   * @param list
   */
  calculerTatalCmd(list: Array<any>): any {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total = total+((+ligne.quantite) * (+ligne.prixUnitaire));
      }
    });
    return total.toFixed(2);
  }

  /**
   * Method qui parcouri les lingne de commade pour calculer le total
   * @param list
   */
  calculerTatalCmdSonTva(list: Array<any>): any {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.article.prixUnitaireHt && ligne.quantite) {
        total = total+((+ligne.quantite) * (+ligne.article.prixUnitaireHt));
      }
    });
    return total.toFixed(2);
  }

 tva(list:any){
    let  tva: number = 0;
     tva = this.calculerTatalCmd(list)-this.calculerTatalCmdSonTva(list);
     return tva.toFixed(2);
 }

  Telecharger(id:string){
    const elmentToPrint:any = document.getElementById(id) ;
    elmentToPrint.style.background='e9ecef '
    html2canvas(elmentToPrint, {scale:2}).then((canvas)=>{
      const  pdf = new jsPDF('p','mm','a4'); // Créer une instance de jsPDF avec la taille de la page A4
      const  imgDta =canvas.toDataURL('image/png');  // Convertir le canvas en image data
      const imgWith =210; // Largeur de la page A4 en mm
      const imgHeigh= canvas.height * imgWith/canvas.width; // Calculer la hauteur en conservant les proportions
      pdf.addImage(imgDta, 'PNG,JPG,JPEG ',0,0,imgWith, imgHeigh); // Ajouter l'image au PDF
      pdf.setProperties({
        title: 'Facture 24-'+this.commande.id,
        subject:'Détails de la commade '+this.commande.id,
        author: 'Abdelouafi'

      });


      pdf.save('Facture n°: 24-'+this.commande.id + '.pdf');

    });
  }



}
