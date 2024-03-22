import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CommandeclientService} from "../../services/commandeclient/commandeclient.service";
import {CommandefournisseurService} from "../../services/commandefournisseur/commandefournisseur.service";

@Component({
  selector: 'app-cmd-clt-frs',
  templateUrl: './cmd-clt-frs.component.html',
  styleUrls: ['./cmd-clt-frs.component.css']
})
export class CmdCltFrsComponent  implements OnInit {

  origin = '';
  listCommande:Array<any>=[];
  mapLignesCommande = new Map();
  mapPrixTotalCommande = new Map();

  constructor(
     private router: Router,
     private activatedRoute: ActivatedRoute,
     private commandeClientService: CommandeclientService,
     private commandeFournisseurService : CommandefournisseurService


    ) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.commandesClientFournisseur();
  }

  /**
   * route pour crée une nouvelle commande client/fournisseur
   */
  nouvelleCommande():void{
    if (this.origin === 'client') {
      this.router.navigate(['nouvellecommandeclt']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouvellecommandefrs']);
    }
  }

  commandesClientFournisseur(){
    if (this.origin === 'fournisseur'){
    this.commandeFournisseurService.getAll().subscribe(cmd=>{
      this.listCommande= cmd;
      this.findAllLignesCommande();
    })
    }else if (this.origin === 'client'){
      this.commandeClientService.getAll().subscribe(cmd=>{
        this.listCommande= cmd;
        this.findAllLignesCommande();
      })
    }
  }

  findAllLignesCommande(): void {
    this.listCommande.forEach(cmd => {
      this.findLignesCommande(cmd.id);
    });
  }

  findLignesCommande(idCommande?: number): void {
    if (this.origin === 'client') {
      this.commandeClientService.findAllLigneCommandesClient(idCommande)
        .subscribe(list => {
          this.mapLignesCommande.set(idCommande, list);
          this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
        });
    } else if (this.origin === 'fournisseur') {
      this.commandeFournisseurService.findAllLigneCommandesFournisseur(idCommande)
        .subscribe(list => {
          this.mapLignesCommande.set(idCommande, list);
          this.mapPrixTotalCommande.set(idCommande, this.calculerTatalCmd(list));
        });
    }
  }

  calculerTatalCmd(list: Array<any>): number {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }

  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id);
  }



  toggleCollapse(menuId: string): void {
    const collapseId = 'collapse' + menuId;
    const collapseElement = document.getElementById(collapseId);

    if (collapseElement) {
      if (collapseElement.classList.contains('show')) {
        collapseElement.classList.remove('show');
      } else {
        collapseElement.classList.add('show');
      }
    }
  }


  isCollapsed(menuId: string) :void{
    const collapseId = 'collapse' + menuId;
    const collapseElement = document.getElementById(collapseId);

    // Vérifie si l'élément est actuellement en mode collapsé (c'est-à-dire s'il a la classe 'show')
    collapseElement && collapseElement.classList.contains('show');

  }
}
