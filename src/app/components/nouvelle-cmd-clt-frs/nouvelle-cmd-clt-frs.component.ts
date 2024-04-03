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
  quantite = '';
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
    private commandeFournisseurService: CommandefournisseurService
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
      this.commandeClientService.add(commande as CommandeClient).subscribe(cmd => {
        this.router.navigate(['dashboard/commandesclient'])
      }, error => {
        this.errorMsg = error.error.errors;
      });
    } else if (this.origin === 'fournisseur') {

      this.commandeFournisseurService.add(commande as CommandeFournisseur).subscribe(cmd => {
        this.router.navigate(['dashboard/commandesfournisseur']);
      }, error => {
        this.errorMsg = error.error.errors;
      });
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
        this.lignesCommande.push(ligneCmd);
      } else if (this.origin === 'client') {

        const ligneCmd: LigneCommandeClient = {
          article: this.searchedArticle,
          prixUnitaire: this.searchedArticle.prixUnitaireTtc,
          quantite: +this.quantite,
          idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id
        }
        this.lignesCommande.push(ligneCmd);
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
    this.router.navigate(['/dashboard/commandes'+this.origin])
  }
}
