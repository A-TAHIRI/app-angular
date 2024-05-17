import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from "../../services/client/client.service";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";
import {Article} from "../../models/article";
import {ArticleService} from "../../services/article/article.service";
import {LigneCommandeClient} from "../../models/ligne-commande-client";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {LigneCommandeFournisseur} from "../../models/ligne-commande-fournisseur";
import {CommandeClient} from "../../models/commande-client";
import {CommandeFournisseur} from "../../models/commande-fournisseur";
import {CommandeclientService} from "../../services/commandeclient/commandeclient.service";
import {CommandefournisseurService} from "../../services/commandefournisseur/commandefournisseur.service";
import {NotificationService} from "../../services/notification/notification.service";
import {v4 as uuidv4} from 'uuid';
import {MvtstkService} from "../../services/mvtstk/mvtstk.service";


@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  templateUrl: './nouvelle-cmd-clt-frs.component.html',
  styleUrls: ['./nouvelle-cmd-clt-frs.component.css']
})
export class NouvelleCmdCltFrsComponent implements OnInit {
  origin = '';
  imgUrl: string = 'http://localhost:8082/file/image/';
  selectedClientFournisseur: any = {};
  listClientFournisseur: Array<any> = [];
  errorMsg: Array<string> = [];
  searchedArticle: Article = {};
  codeArticle = '';
  quantite: any;
  lignesCommande: Array<any> = [];
  oldlignesCommande: Array<any> = [];
  codeCommande = '';
  totalCommande = 0;
  listArticle: Array<any> = [];
  articleNotYetSelected: boolean = false;
  id: any;
  oldeCommade: any = {};
  url: string;
  stock:any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private fournisseurService: FournisseurService,
    private articleService: ArticleService,
    private utilisateurService: UtilisateurService,
    private commandeClientService: CommandeclientService,
    private commandeFournisseurService: CommandefournisseurService,
    private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private mvtstkService : MvtstkService
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.findAllClientFournisseur();
    this.findAllArticle();
    this.recupercmd();
    this.url = this.router.url;


  }


  uniqueId = uuidv4();

  recupercmd() {
    this.id = this.activatedRouter.snapshot.params['idcmd'];
    if (this.id) {
      if (this.origin === 'client') {
        this.commandeClientService.getById(this.id).subscribe(data => {
          this.oldeCommade = data;
          this.id = data.id;
          this.selectedClientFournisseur = data.client;
          this.totalCommande = data.totalPrix;
          this.commandeClientService.findAllLigneCommandesClient(this.id).subscribe(data => {
            this.lignesCommande = data;
            this.oldlignesCommande=data;

          });
        });

      } else if (this.origin === 'fournisseur') {
        this.commandeFournisseurService.getById(this.id).subscribe(data => {
          this.oldeCommade = data;
          this.id = data.id;
          this.selectedClientFournisseur = data.fournisseur;
          this.totalCommande = data.totalPrix;
          this.commandeFournisseurService.findAllLigneCommandesFournisseur(this.id).subscribe(data => {
            this.lignesCommande = data;
            this.oldlignesCommande=data;
          });
        })
      }
    }
  }


  /**
   * Methode qui retourne tous les fournisseurs/clients
   */
  findAllClientFournisseur() {
    if (this.origin === 'client') {
      this.clientService.getAll().subscribe(data => {
        this.listClientFournisseur = data;
      })
    } else if (this.origin === 'fournisseur') {
      this.fournisseurService.getAll().subscribe(data => {
        this.listClientFournisseur = data;


      })
    }
  }

  /**
   * Methode qui retourne l'article par son codeArticle
   * @param codeArticle
   */
  findArticleByCode(codeArticle: string) {
    if (codeArticle) {
      this.articleService.findArticleByCode(codeArticle).subscribe(data => {
        this.searchedArticle = data;
      }, error => {
        this.errorMsg = error.error.message
      })
    }

  }

  /**
   * methode pour récupérer rous les articles
   */
  findAllArticle() {
    this.articleService.getAll().subscribe(data => {
      this.listArticle = data;
    })
  }




  /**
   * Method pour ajouter une commade client/fournisseur a la bdd
   */
  enregistrerCommande() {
    const commande = this.preparerCommande();
    if (this.url === '/dashboard/nouvellecommandefrs/' + this.id || this.url === '/dashboard/nouvellecommandeclt/' + this.id) {
      commande.id = this.oldeCommade.id;
      commande.reference = this.oldeCommade.reference;
    }

        if (this.origin == 'client') {
          if (commande.ligneCommandeClients.length != 0) {
            this.calculerTotalCommande();
            commande.totalPrix = this.totalCommande;
            this.commandeClientService.add(commande as CommandeClient).subscribe(cmd => {
              this.notificationService.success('La commade client à été ajouter avec succes')
              this.router.navigate(['dashboard/commandesclient'])
            }, error => {
              this.notificationService.error(error.error.message);
            });
          } else {
            this.notificationService.error("Veuillez renseigner le code de l'articl et la quantité");
          }

        } else if (this.origin === 'fournisseur') {
          if (commande.ligneCommandeFournisseurs.length != 0) {
            this.calculerTotalCommande();
            commande.totalPrix = this.totalCommande;
            this.commandeFournisseurService.add(commande as CommandeFournisseur).subscribe(cmd => {
              this.notificationService.success('La commade fournisseur à été ajouter avec succes')
              this.router.navigate(['dashboard/commandesfournisseur']);
            }, error => {
              this.notificationService.error(error.error.message);
            });

          } else {
            this.notificationService.error("Veuillez renseigner le code de l'article et la quantité");
          }
        }


  }

  /**
   * method pour filtrer les articles par son codeArticle
   */
  filtrerArticle() {
    if (this.codeArticle.length === 0) {
      this.findAllArticle();
    }
    this.listArticle = this.listArticle.filter(art =>
      art.codeArticle?.startsWith(this.codeArticle) || art.designation?.startsWith(this.codeArticle))
  }

  /**
   * Method pour ajouter une ligne de commade a la commande client/fournisseur
   */
  ajouterLigneCommande() {
    if(this.oldeCommade.etatCommande==='LIVREE'){
      this.notificationService.error('La commande est déga livrée !');
    }else {
      this.checkLigneCommande();
      this.calculerTotalCommande();
      this.searchedArticle = {};
      this.quantite = '';
      this.codeArticle = '';
      this.articleNotYetSelected = false;
      this.findAllArticle();
    }

  }

  /**
   * Method pour calculer le total de la commade
   */
  calculerTotalCommande():void{
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite;
        parseFloat(this.totalCommande.toFixed(2));
      }
    });
  }


  /**
   * Method pour verifier l'article si il existe il incremet la quontité sion  il  crée ligne de commade
   * @private
   */


 private checkLigneCommande():void{

    const ligneCmdAlreadyExists = this.lignesCommande.find(lig => lig.article?.codeArticle === this.searchedArticle.codeArticle);
    if (ligneCmdAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig && lig.article?.codeArticle === this.searchedArticle.codeArticle) {
          // @ts-ignore
          lig.quantite = lig.quantite + +this.quantite;
        this.mvtstkService.getStock(lig.article?.id).subscribe(data=>{
          if(lig.quantite>data){
            this.notificationService.error("L'article "+lig.article.designation +"n'est plus disponible");
          }
        })
        }

      });
    } else {


      if (this.origin === 'fournisseur'
      ) {
            const ligneCmd: LigneCommandeFournisseur = {
              article: this.searchedArticle,
              prixUnitaire: this.searchedArticle.prixUnitaireTtc,
              quantite: +this.quantite,
              idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id
            }
            if (ligneCmd.article == null || ligneCmd.quantite == 0) {
              this.notificationService.error("Veuillez rensigner les données de l'article");
            } else {
              this.lignesCommande.push(ligneCmd);
            }
      } else if (this.origin === 'client') {

        const ligneCmd: LigneCommandeClient = {

          article: this.searchedArticle,
          prixUnitaire: this.searchedArticle.prixUnitaireTtc,
          quantite: +this.quantite,
          idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id
        }
        this.mvtstkService.getStock(ligneCmd.article.id).subscribe(data=> {
          this.stock = data;

        if (ligneCmd.article === null || ligneCmd.quantite === 0) {
          this.notificationService.error("Veuillez rensigner les données de l'article");
        }else if(  ligneCmd.quantite > this.stock ){
            this.notificationService.error("L'article "+ligneCmd.article.designation +"n'est plus disponible");
        } else {

          this.lignesCommande.push(ligneCmd);
        }
        });

      }
    }
  }

  /**
   * Method pour selectioner l'article pour l'ajouter à la ligne de commade client/fournisseur
   * @param article
   */
  selectArticleClick(article:Article):void{
    this.searchedArticle = article;
    this.codeArticle = article.codeArticle ? article.codeArticle : '';
    this.articleNotYetSelected = true;
  }

  /**
   * Method pour preparer les commade
   * @private
   */


 private preparerCommande():any{
    if (this.origin === 'client') {
        return {
          client: this.selectedClientFournisseur,
          reference: 'cmdclt' + this.uniqueId,
          etatCommande: 'EN_PREPARATION',
          dateCommande:new Date(),
          idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id,
          ligneCommandeClients: this.lignesCommande
        }
    } else if (this.origin === 'fournisseur') {
      return {
        fournisseur: this.selectedClientFournisseur,
        reference: 'cmdfrs' + this.uniqueId,
        dateCommande:new Date(),
        etatCommande: 'EN_PREPARATION',
        idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id,
        ligneCommandeFournisseurs:this.lignesCommande
      };
    }
  }


  cancel() {
    this.router.navigate(['/dashboard/commandes' + this.origin])
  }


  /**
   * Method pour augmenter la quantité d'une ligne de commade par son id
   * @param id
   */
  plus(id:number)
   {
    if (this.lignesCommande[id] && this.lignesCommande[id].quantite >= 0) {
      this.url = this.router.url;
      if (this.url === '/dashboard/nouvellecommandeclt' || this.url === '/dashboard/nouvellecommandefrs' ) {
        this.lignesCommande[id].quantite += 1;
        this.calculerTotalCommande()
      }else if( this.url === '/dashboard/nouvellecommandefrs/' + this.id || this.url === '/dashboard/nouvellecommandeclt/' + this.id){
        this.oldlignesCommande[id].quantite +=1;
        this.calculerTotalCommande()
      }

    }


  }

  /**
   * Method pour diminuer la quantité d'une ligne de commade par son id , et lorsque la quantité atendre 0 en supprime la ligne de la liste de  ligne de commade
   * @param id
   */
  moins(id: number)
   {
    if ((this.lignesCommande[id] && this.lignesCommande[id].quantite >= 1)||(this.oldlignesCommande[id] && this.oldlignesCommande[id].quantite >= 1)) {

      if (this.url === '/dashboard/nouvellecommandeclt' || this.url === '/dashboard/nouvellecommandefrs') {
        this.lignesCommande[id].quantite -= 1;
        this.calculerTotalCommande()
      } else if (this.url === '/dashboard/nouvellecommandefrs/' + this.id || this.url === '/dashboard/nouvellecommandeclt/' + this.id) {
        this.oldlignesCommande[id].quantite -= 1;
        this.calculerTotalCommande()

      }

      if (this.lignesCommande[id].quantite == 0) {
        this.deletmvtstk(this.lignesCommande[id].id);
        this.deleligneclient(this.lignesCommande[id].id);
        this.lignesCommande.splice(id);
        this.calculerTotalCommande();
      } else if (this.oldlignesCommande[id].quantite == 0) {
        this.deletmvtstk(this.oldlignesCommande[id].id)
        this.deleligneclient(this.oldlignesCommande[id].id);
        this.oldlignesCommande.splice(id);
        this.calculerTotalCommande()
      }
    }

  }

  /**
   * Methode pour supprimer mvtstk par son id de ligne de commande clt frs
   * @param id
   */

  deletmvtstk(id :number){
    this.mvtstkService.delet(id).subscribe(data=>{
      this.notificationService.success('Le mvtstk à été bien supprimer')
    },error => {
      this.notificationService.error(error.error.error)
    })
  }

  /**
   * Methode pour supprimer une ligne de commande clt frs
   * @param id
   */
 deleligneclient(id:number){
   if (this.origin=='client') {
     this.commandeClientService.delet(id).subscribe(data=>{
       this.notificationService.success("la ligne à été bien supprimer")
     },error => {
       this.notificationService.error(error.error.errors);

     });
   }else if(this.origin=='fournisseur'){
     this.commandeFournisseurService.delet(id).subscribe(data=>{
       this.notificationService.success("la ligne à été bien supprimer")
     },error => {
       this.notificationService.error(error.error.errors);
     })
   }

 }
}
