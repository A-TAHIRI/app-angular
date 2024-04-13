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
import {ArticleDto} from "../../dto/article-dto";
import {NotificationService} from "../../services/notification/notification.service";

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
  quantite :any ;
  lignesCommande: Array<any> = [];
  codeCommande = '';
  totalCommande = 0;
  listArticle: Array<any> = [];
  articleNotYetSelected: boolean = false;
  datCommande: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private fournisseurService: FournisseurService,
    private articleService: ArticleService,
    private utilisateurService: UtilisateurService,
    private commandeClientService: CommandeclientService,
    private commandeFournisseurService: CommandefournisseurService,
    private notificationService:NotificationService
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.findAllClientFournisseur();
    this.findAllArticle();
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
    if (this.origin === 'client') {
      if (commande.ligneCommandeClients.length != 0) {
        this.commandeClientService.add(commande as CommandeClient).subscribe(cmd => {
          this.notificationService.success('La commade client à été ajouter avec succes')
          this.router.navigate(['dashboard/commandesclient'])
        }, error => {
          this.notificationService.showErrors(error.error.errors);
        });

      } else {
        this.notificationService.error("Veuillez renseigner le code de l'articl et la quantité");
      }

    } else if (this.origin === 'fournisseur') {
      if (commande.ligneCommandeFournisseurs.length != 0) {
        this.commandeFournisseurService.add(commande as CommandeFournisseur).subscribe(cmd => {
          this.notificationService.success('La commade fournisseur à été ajouter avec succes')
          this.router.navigate(['dashboard/commandesfournisseur']);
        }, error => {
          this.notificationService.showErrors(error.error.errors);
        });

      } else {
        this.notificationService.error("Veuillez renseigner le code de l'articl et la quantité");
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

      this.checkLigneCommande();
      this.calculerTotalCommande();
      this.searchedArticle = {};
      this.quantite = '';
      this.codeArticle = '';
      this.articleNotYetSelected = false;
      this.findAllArticle();


  }

  /**
   * Method pour calculer le total de la commade
   */
  calculerTotalCommande(): void {
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite;
        this.totalCommande.toFixed(2)
      }
    });
  }


  /**
   * Method pour verifier l'article si il existe il incremet la quontité sion  il  crée ligne de commade
   * @private
   */
  private checkLigneCommande(): void {
    const ligneCmdAlreadyExists = this.lignesCommande.find(lig => lig.article?.codeArticle === this.searchedArticle.codeArticle);
    if (ligneCmdAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig && lig.article?.codeArticle === this.searchedArticle.codeArticle) {
          // @ts-ignore
          lig.quantite = lig.quantite + +this.quantite;
        }

      });
    } else {


      if (this.origin === 'fournisseur') {

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
        if (ligneCmd.article == null || ligneCmd.quantite == 0) {
          this.notificationService.error("Veuillez rensigner les données de l'article");
        } else {
          this.lignesCommande.push(ligneCmd);
        }

      }
    }
  }

  /**
   * Method pour selectioner l'article pour l'ajouter à la ligne de commade client/fournisseur
   * @param article
   */
  selectArticleClick(article: Article) {
    this.searchedArticle = article;
    this.codeArticle = article.codeArticle ? article.codeArticle : '';
    this.articleNotYetSelected = true;
  }

  /**
   * Method pour preparer les commade
   * @private
   */
  private preparerCommande(): any {
    if (this.origin === 'client') {
      return {
        client: this.selectedClientFournisseur,
        reference: this.codeCommande,
        etatCommande: "EN_PREPARATION",
        dateCommande: new Date(),
        idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id,
        ligneCommandeClients: this.lignesCommande
      };
    } else if (this.origin === 'fournisseur') {
      return {
        fournisseur: this.selectedClientFournisseur,
        reference: this.codeCommande,
        etatCommande: "EN_PREPARATION",
        dateCommande: new Date(),
        idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id,
        ligneCommandeFournisseurs: this.lignesCommande
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
  plus(id: number) {
    if (this.lignesCommande[id]&& this.lignesCommande[id].quantite>=0) {
      const url = this.router.url;
      if (url == '/dashboard/nouvellecommandeclt' || url == '/dashboard/nouvellecommandefrs') {
       this.lignesCommande[id].quantite += 1;

        this.calculerTotalCommande()
      }
    }


  }

  /**
   * Method pour diminuer la quantité d'une ligne de commade par son id , et lorsque la quantité atendre 0 en supprime la ligne de la liste de  ligne de commade
   * @param id
   */
  moins(id: number) {
    if (this.lignesCommande[id] && this.lignesCommande[id].quantite>=1) {
      const url = this.router.url;
      if (url == '/dashboard/nouvellecommandeclt' || url == '/dashboard/nouvellecommandefrs') {
         this.lignesCommande[id].quantite -= 1;
        this.calculerTotalCommande()
      }
      if (this.lignesCommande[id].quantite==0){
        this.lignesCommande.splice(id);
        this.calculerTotalCommande()
      }


    }

  }

}
