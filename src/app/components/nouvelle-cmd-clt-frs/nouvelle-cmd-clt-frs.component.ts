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
    private  router:Router,
    private clientService: ClientService,
    private fournisseurService: FournisseurService,
    private articleService: ArticleService,
    private utilisateurService: UtilisateurService,
    private  commandeClientService :CommandeclientService,
    private commandeFournisseurService:CommandefournisseurService
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
  enregistrerCommande( ) {
  if (this.origin === 'client'){
    const commandeClient: CommandeClient ={
      client: this.selectedClientFournisseur,
      reference: this.codeCommande,
      etatCommande:"EN_PREPARATION",
      dateCommande: new Date(),
      idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id,
      ligneCommandeClients:this.lignesCommande
    }
    this.commandeClientService.add(commandeClient).subscribe(cmd=>{
      this.router.navigate(['commandesclient'])
    }, error => {
      this.errorMsg= error.error.errors;
    });

  }else if (this.origin ==='fournisseur'){
    const commadeFournisseur: CommandeFournisseur ={
      fournisseur: this.selectedClientFournisseur,
      reference:this.codeCommande,
      etatCommande:"EN_PREPARATION",
      dateCommande: new Date(),
      idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id,
      ligneCommandeFournisseurs:this.lignesCommande
    }
    this.commandeFournisseurService.add(commadeFournisseur).subscribe(cmd=>{
      this.router.navigate(['commandesfournisseur']);
    },error => {
      this.errorMsg= error.error.errors;
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
    if (this.origin === 'client') {
      const ligneComdAlreadyExixts = this.lignesCommande.includes(lig =>  lig.article?.codeArticle === this.searchedArticle.codeArticle );
      if (ligneComdAlreadyExixts) {
        this.lignesCommande.forEach(lig => {
          if ( lig.article?.codeArticle === this.searchedArticle.codeArticle) {
            lig.quantite = lig.quantite + +this.quantite;
          }
        })
      } else {
        const lignCmd: LigneCommandeClient = {
          article: this.searchedArticle,
          prixUnitaire: this.searchedArticle.prixUnitaireTtc,
          quantite: +this.quantite,
          idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id
        }
        this.lignesCommande.push(lignCmd);
      }
      this.totalCommande = 0;
      this.lignesCommande.forEach(elem => {
        this.totalCommande += +elem.prixUnitaire * +elem.quantite;
      })
      this.searchedArticle = {};
      this.quantite = '';
      this.codeArticle = '';
      this.articleNotYetSelected = false;
      this.findAllArticle();

    } else if (this.origin === 'fournisseur') {
      const ligneComdAlreadyExixts = this.lignesCommande.includes(lig =>
        lig.article?.codeArticle === this.searchedArticle.codeArticle
      )
      if (ligneComdAlreadyExixts) {
        this.lignesCommande.forEach(lig => {
          if ( lig.article?.codeArticle === this.searchedArticle.codeArticle) {
            lig.quantite = lig.quantite + +this.quantite;
          }
        })
      } else {
        const lignCmd: LigneCommandeFournisseur = {
          article: this.searchedArticle,
          prixUnitaireHt: this.searchedArticle.prixUnitaireHt,
          quantite: +this.quantite,
          idEntreprise: this.utilisateurService.getConnectedUser().entreprise?.id
        }
        this.lignesCommande.push(lignCmd);
      }
      this.totalCommande = 0;
      this.lignesCommande.forEach(elem => {
        this.totalCommande += +elem.prixUnitaireHt * +elem.quantite;
      })
      this.searchedArticle = {};
      this.quantite = '';
      this.codeArticle = '';
      this.articleNotYetSelected = false;
      this.findAllArticle();

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
}
