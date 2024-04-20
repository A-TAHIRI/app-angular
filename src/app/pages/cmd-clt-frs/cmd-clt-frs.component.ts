import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommandeclientService} from "../../services/commandeclient/commandeclient.service";
import {CommandefournisseurService} from "../../services/commandefournisseur/commandefournisseur.service";
import {GenererPdfService} from "../../services/genererPdf/generer-pdf.service";
import {DataService} from "../../services/dataService/data.service";
import {NotificationService} from "../../services/notification/notification.service";
import {CommandeClient} from "../../models/commande-client";
import {CommandeFournisseur} from "../../models/commande-fournisseur";

@Component({
  selector: 'app-cmd-clt-frs',
  templateUrl: './cmd-clt-frs.component.html',
  styleUrls: ['./cmd-clt-frs.component.css']
})
export class CmdCltFrsComponent implements OnInit {
  commadetype = '';
  origin = '';
  listCommande: Array<any> = [];
  mapLignesCommande = new Map();
  mapPrixTotalCommande = new Map();
  lignesCommandes: Array<any> = [];
  pageActuel: number;
  receivedData: any;
  allpages: any;
  totalcmd: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commandeClientService: CommandeclientService,
    private commandeFournisseurService: CommandefournisseurService,
    private genererPdfService: GenererPdfService,
    private notificationService: NotificationService,
    private dataService: DataService,
  ) {
    this.dataService.data$.subscribe(data => {
      if (data) {
        this.receivedData = data;
        this.goToPage(data);
      }

    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.commandesClientFournisseur();
    this.allCommandes();

  }

  /**
   * route pour crée une nouvelle commande client/fournisseur
   */
  nouvelleCommande(): void {
    if (this.origin === 'client') {
      this.router.navigate(['dashboard/nouvellecommandeclt']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['dashboard/nouvellecommandefrs']);
    }
  }

  pdf(id: string) {
    this.genererPdfService.generatedPDF(id);
  }

  /**
   * Method qui récupére les comandes client/fournisseur
   */
  commandesClientFournisseur() {
    if (this.origin === 'fournisseur') {
      this.commandeFournisseurService.getAll().subscribe(cmd => {
        this.listCommande = cmd.sort((a, b) => b.id - a.id);
        this.findAllLignesCommande();
      })
    } else if (this.origin === 'client') {
      this.commandeClientService.getAll().subscribe(cmd => {
        this.listCommande = cmd.sort((a, b) => b.id - a.id);
        this.findAllLignesCommande();
      })
    }
  }

  /**
   * Method qui parcourire les cmd pour les récupiré et calculer le total
   */
  findAllLignesCommande(): void {
    this.listCommande.forEach(cmd => {
      this.findLignesCommande(cmd.id);
    });
  }

  /**
   * Method pour recupiré les ligne de commande par id de la commade
   * @param idCommande
   */
  findLignesCommande(idCommande?: number): void {

    if (this.origin === 'client') {
      this.commandeClientService.findAllLigneCommandesClient(idCommande)
        .subscribe(list => {
          this.lignesCommandes = list;
          this.mapLignesCommande.set(idCommande, list);
          this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
        });
    } else if (this.origin === 'fournisseur') {
      this.commandeFournisseurService.findAllLigneCommandesFournisseur(idCommande)
        .subscribe(list => {
          this.lignesCommandes = list;
          this.mapLignesCommande.set(idCommande, list);
          this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
        });
    }
  }

  /**
   * Method qui parcouri les lingne de commade pour calculer le total
   * @param list
   */
  calculerTatalCmd(list: Array<any>): any {

    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total = total + ((+ligne.quantite) * (+ligne.prixUnitaire));
      }
    });
    return total.toFixed(2);
  }

  /**
   * Method qui reourne le total de la commade par son id
   * @param id
   */
  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id);

  }


  allCommandes() {
    if (this.origin === 'client') {
      this.commandeClientService.getAllCommandes().subscribe(data => {
        this.allpages = data;
        this.pageActuel = this.allpages.number;
      }, error => {
        this.notificationService.error(error.error.message);
      })
    } else if (this.origin === 'fournisseur') {
      this.commandeFournisseurService.getAllCommandes().subscribe(data => {
        this.allpages = data;
        this.pageActuel = this.allpages.number;
      }, error => {
        this.notificationService.error(error.error.message);
      })

    }
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    if (this.origin === 'client') {
      this.commandeClientService.getAllCommandes(name, pageNumber).subscribe(data => {
        this.allpages = data;
        this.pageActuel = pageNumber;
      }, error => {
        this.notificationService.error(error.error.message);
      })
    } else if (this.origin === 'fournisseur') {
      this.commandeFournisseurService.getAllCommandes(name, pageNumber).subscribe(data => {
        this.allpages = data;
        this.pageActuel = pageNumber;
      }, error => {
        this.notificationService.error(error.error.message);
      })
    }

  }





}
