import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {NotificationService} from "../../services/notification/notification.service";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";
import {ClientService} from "../../services/client/client.service";
import {round} from "@kurkle/color";
import {CommandeclientService} from "../../services/commandeclient/commandeclient.service";
import {CommandefournisseurService} from "../../services/commandefournisseur/commandefournisseur.service";
import {LigneCommandeClient} from "../../models/ligne-commande-client";
import {LigneCommandeFournisseur} from "../../models/ligne-commande-fournisseur";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ArticleStats} from "../../models/articleStats";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  countByDay: any;
  countByLastDay: any;
  countByMonth: any;
  countByThisMonth: any;
  countByYear: any;
  countByLastYear: any;
  countCltByDay: any;
  countCltByLastDay: any;
  countCltByYear: any;
  countCltByLastYear: any;
  countCltByMonth: any;
  countCltByLastMonth: any;
  countFrsByDay: any;
  countFrsByLastDay: any;
  countFrsByYear: any;
  countFrsByLastYear: any;
  countFrsByMonth: any;
  countFrsByLastMonth: any;
  countCmdFrsByDay: any;
  countCmdFrsByLastDay: any;
  countCmdFrsByYear: any;
  countCmdFrsByLastYear: any;
  countCmdFrsByMonth: any;
  countCmdFrsByLastMonth: any;
  countCmdCltByDay: any;
  countCmdCltByLastDay: any;
  countCmdCltByYear: any;
  countCmdCltByLastYear: any;
  countCmdCltByMonth: any;
  countCmdCltByLastMonth: any;
  sumCmdFrsByDay: any;
  sumCmdFrsByLastDay: any;
  sumCmdFrsByYear: any;
  sumCmdFrsByLastYear: any;
  sumCmdFrsByMonth: any;
  sumCmdFrsByLastMonth: any;
  sumCmdCltByDay: any;
  sumCmdCltByLastDay: any;
  sumCmdCltByYear: any;
  sumCmdCltByLastYear: any;
  sumCmdCltByMonth: any;
  sumCmdCltByLastMonth: any;
  orderCmdCltByDay: any;
  orderCmdCltByLastDay: Array<any> = [];
  orderCmdCltByYear: Array<any> = [];
  orderCmdCltByLastYear: Array<any> = [];
  orderCmdCltByMonth: Array<any> = [];
  orderCmdCltByLastMonth: Array<any> = [];
  orderCmdFrsByDay: Array<any> = [];
  orderCmdFrsByLastDay: Array<any> = [];
  orderCmdFrsByYear: Array<any> = [];
  orderCmdFrsByLastYear: Array<any> = [];
  orderCmdFrsByMonth: Array<any> = [];
  orderCmdFrsByLastMonth: Array<any> = [];
  lignecommandeclt: Array<LigneCommandeClient> = [];
  user: any;
  role: any;
  isAdmin:boolean=false;
  toparticleToDays: Array<ArticleStats> = [];
  toparticleToMonth: Array<ArticleStats> = [];
  toparticleToYear: Array<ArticleStats> = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private fournisseurService: FournisseurService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private commandeClientService: CommandeclientService,
    private commandeFournisseurService: CommandefournisseurService
  ) {
  }

  ngOnInit(): void {
    this.getByDay();
    this.getByMonth();
    this.getByYear();
    this.getByLastDay();
    this.getByThisMonth();
    this.getByLastYear();
    this.getfrsByDay();
    this.getfrsByMonth();
    this.getfrsByYear();
    this.getfrsByLastDay();
    this.getfrsByThisMonth();
    this.getfrsByLastYear();
    this.getcltByDay();
    this.getcltByMonth();
    this.getcltByYear();
    this.getcltByLastDay();
    this.getcltByThisMonth();
    this.getcltByLastYear();
    this.getCmdcltByDay();
    this.getCmdcltByMonth();
    this.getCmdcltByYear();
    this.getCmdcltByLastDay();
    this.getCmdcltByThisMonth();
    this.getCmdcltByLastYear();
    this.getCmdfrsByDay();
    this.getCmdfrsByMonth();
    this.getCmdfrsByYear();
    this.getCmdfrsByLastDay();
    this.getCmdfrsByThisMonth();
    this.getCmdfrsByLastYear();
    this.getSumCmdfrsByDay();
    this.getSumCmdfrsByMonth();
    this.getSumCmdfrsByYear();
    this.getSumCmdfrsByLastDay();
    this.getSumCmdfrsByThisMonth();
    this.getSumCmdfrsByLastYear();
    this.getSumCmdcltByDay();
    this.getSumCmdcltByMonth();
    this.getSumCmdcltByYear();
    this.getSumCmdcltByLastDay();
    this.getSumCmdcltByThisMonth();
    this.getSumCmdcltByLastYear();
    this.getCmdCltByDayByOrderByTotalPrixDesc();
    this.getCmdCltByLastDayByOrderByTotalPrixDesc();
    this.getCmdCltByMonthByOrderByTotalPrixDesc();
    this.getCmdCltByLastMonthByOrderByTotalPrixDesc();
    this.getCmdCltByYearByOrderByTotalPrixDesc()
    this.getCmdCltByLastYearByOrderByTotalPrixDesc();
    this.getCmdFrsByDayByOrderByTotalPrixDesc();
    this.getCmdFrsByLastDayByOrderByTotalPrixDesc();
    this.getCmdFrsByMonthByOrderByTotalPrixDesc();
    this.getCmdFrsByLastMonthByOrderByTotalPrixDesc();
    this.getCmdFrsByYearByOrderByTotalPrixDesc();
    this.getCmdFrsByLastYearByOrderByTotalPrixDesc();
    this.getTopArticlesByCommandesToDay();
    this.getTopArticlesByCommandesToMonth();
    this.getTopArticlesByCommandesToYear();
   this.addparam();
  }


  addparam() {
    this.user = this.utilisateurService.getConnectedUser()
    this.role = this.user.roles;
    for (let i = 0; i <= this.role.length; i++) {
      if (this.role[i].roleName === "ADMIN") {
        this.isAdmin = true;
        break;
      }
    }
  }




  facteur(a: number, b: number) {
    if (a > b) {
      let def = a - b;
      const fact = (def * 100) / a;
      return parseFloat(fact.toFixed(2));
    } else if (a < b) {
      let def = b - a;
      const fact = (def * 100) / b;
      return parseFloat(fact.toFixed(2));
    }
    return null;
  }

  findLignCommande(id: number) {
    this.commandeClientService.findAllLigneCommandesClient().subscribe(data => {
      this.lignecommandeclt = data;
    }, error => {
      this.notificationService.error(error.error.errors);
    })

  }

  /************************************************************nombre de utilisateur***************************************************/

  /**
   * Methode qui récupére le nombre des utilisateur aujourd'huit
   */
  getByDay() {
    this.utilisateurService.getByDay().subscribe(data => {
      this.countByDay = data;

    }, error => {
      if(error.error.error != "Forbidden") {
        this.notificationService.error(error.error.error);
      }
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur d'hier
   */

  getByLastDay() {
    this.utilisateurService.getByLastDay().subscribe(data => {
      this.countByLastDay = data;

    }, error => {
      if(error.error.error != "Forbidden") {
        this.notificationService.error(error.error.error);
      }
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans le mois president
   */
  getByMonth() {
    this.utilisateurService.getByMonth().subscribe(data => {
      this.countByMonth = data;

    }, error => {
      if(error.error.error != "Forbidden") {
      this.notificationService.error(error.error.error);
      }
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans le mois actuel
   */
  getByThisMonth() {
    this.utilisateurService.getByThisMonth().subscribe(data => {
      this.countByThisMonth = data;

    }, error => {
      if(error.error.error != "Forbidden") {
        this.notificationService.error(error.error.error);
      }
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans cette année actuel
   */

  getByYear() {
    this.utilisateurService.getByYear().subscribe(data => {
      this.countByYear = data;

    }, error => {
      if(error.error.error != "Forbidden") {
        this.notificationService.error(error.error.error);
      }
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans cette année passer
   */

  getByLastYear() {
    this.utilisateurService.getByLastYear().subscribe(data => {
      this.countByLastYear = data;

    }, error => {
      if(error.error.error != "Forbidden") {
        this.notificationService.error(error.error.error);
      }
    })
  }


  /************************************************************nombre de fournisseur***************************************************/

  /**
   * Methode qui récupére le nombre des fournisseur aujourd'huit
   */
  getfrsByDay() {
    this.fournisseurService.getByDay().subscribe(data => {
      this.countFrsByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des fournisseur d'hier
   */

  getfrsByLastDay() {
    this.fournisseurService.getByLastDay().subscribe(data => {
      this.countFrsByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des fournisseur dans le mois president
   */
  getfrsByMonth() {
    this.fournisseurService.getByMonth().subscribe(data => {
      this.countFrsByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des fournisseur dans le mois actuel
   */
  getfrsByThisMonth() {
    this.fournisseurService.getByThisMonth().subscribe(data => {
      this.countFrsByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des fournisseur dans cette année actuel
   */

  getfrsByYear() {
    this.fournisseurService.getByYear().subscribe(data => {
      this.countFrsByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des fournisseur dans cette année passer
   */

  getfrsByLastYear() {
    this.fournisseurService.getByLastYear().subscribe(data => {
      this.countFrsByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /************************************************************nombre de client***************************************************/

  /**
   * Methode qui récupére le nombre des client aujourd'huit
   */
  getcltByDay() {
    this.clientService.getByDay().subscribe(data => {
      this.countCltByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des client d'hier
   */

  getcltByLastDay() {
    this.clientService.getByLastDay().subscribe(data => {
      this.countCltByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des client dans le mois president
   */
  getcltByMonth() {
    this.clientService.getByMonth().subscribe(data => {
      this.countCltByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des client dans le mois actuel
   */
  getcltByThisMonth() {
    this.clientService.getByThisMonth().subscribe(data => {
      this.countCltByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des client dans cette année actuel
   */

  getcltByYear() {
    this.clientService.getByYear().subscribe(data => {
      this.countCltByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des client dans cette année passer
   */

  getcltByLastYear() {
    this.clientService.getByLastYear().subscribe(data => {
      this.countCltByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /************************************************************nombre de commande client***************************************************/

  /**
   * Methode qui récupére le nombre des commandeClient aujourd'huit
   */
  getCmdcltByDay() {
    this.commandeClientService.getByDay().subscribe(data => {
      this.countCmdCltByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commandeClient d'hier
   */

  getCmdcltByLastDay() {
    this.commandeClientService.getByLastDay().subscribe(data => {
      this.countCmdCltByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commandeClient dans le mois president
   */
  getCmdcltByMonth() {
    this.commandeClientService.getByMonth().subscribe(data => {
      this.countCmdCltByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commandeClient dans le mois actuel
   */
  getCmdcltByThisMonth() {
    this.commandeClientService.getByThisMonth().subscribe(data => {
      this.countCmdCltByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commandeClient dans cette année actuel
   */

  getCmdcltByYear() {
    this.commandeClientService.getByYear().subscribe(data => {
      this.countCmdCltByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commandeClient dans cette année passer
   */

  getCmdcltByLastYear() {
    this.commandeClientService.getByLastYear().subscribe(data => {
      this.countCmdCltByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /************************************************************nombre de commande fournisseur***************************************************/

  /**
   * Methode qui récupére le nombre des commadefournisseur aujourd'huit
   */
  getCmdfrsByDay() {
    this.commandeFournisseurService.getByDay().subscribe(data => {
      this.countCmdFrsByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commadefournisseur d'hier
   */

  getCmdfrsByLastDay() {
    this.commandeFournisseurService.getByLastDay().subscribe(data => {
      this.countCmdFrsByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commadefournisseur dans le mois president
   */
  getCmdfrsByMonth() {
    this.commandeFournisseurService.getByMonth().subscribe(data => {
      this.countCmdFrsByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commadefournisseur dans le mois actuel
   */
  getCmdfrsByThisMonth() {
    this.commandeFournisseurService.getByThisMonth().subscribe(data => {
      this.countCmdFrsByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commadefournisseur dans cette année actuel
   */

  getCmdfrsByYear() {
    this.commandeFournisseurService.getByYear().subscribe(data => {
      this.countCmdFrsByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des commadefournisseur dans cette année passer
   */

  getCmdfrsByLastYear() {
    this.commandeFournisseurService.getByLastYear().subscribe(data => {
      this.countCmdFrsByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /************************************************************Depance COMMANDE FOURNISSEUR***************************************************/


  /**
   * Methode qui récupére le revenue des commadefournisseur aujourd'huit
   */
  getSumCmdfrsByDay() {
    this.commandeFournisseurService.getSumByDay().subscribe(data => {
      this.sumCmdFrsByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commadefournisseur d'hier
   */

  getSumCmdfrsByLastDay() {
    this.commandeFournisseurService.getSumByLastDay().subscribe(data => {
      this.sumCmdFrsByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commadefournisseur dans le mois actuel
   */
  getSumCmdfrsByMonth() {
    this.commandeFournisseurService.getSumByMonth().subscribe(data => {
      this.sumCmdFrsByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commadefournisseur dans le mois president
   */
  getSumCmdfrsByThisMonth() {
    this.commandeFournisseurService.getSumByLastMonth().subscribe(data => {
      this.sumCmdFrsByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commadefournisseur dans cette année actuel
   */

  getSumCmdfrsByYear() {
    this.commandeFournisseurService.getSumByYear().subscribe(data => {
      this.sumCmdFrsByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commadefournisseur dans cette année passer
   */

  getSumCmdfrsByLastYear() {
    this.commandeFournisseurService.getSumByLastYear().subscribe(data => {
      this.sumCmdFrsByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /************************************************************REVENUE COMMANDE CLIENT***************************************************/

  /**
   * Methode qui récupére le revenue des commandeClient aujourd'huit
   */
  getSumCmdcltByDay() {
    this.commandeClientService.getSumByDay().subscribe(data => {
      this.sumCmdCltByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commandeClient d'hier
   */

  getSumCmdcltByLastDay() {
    this.commandeClientService.getSumByLastDay().subscribe(data => {
      this.sumCmdCltByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commandeClient dans le mois president
   */
  getSumCmdcltByMonth() {
    this.commandeClientService.getSumByLastMonth().subscribe(data => {
      this.sumCmdCltByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commandeClient dans le mois actuel
   */
  getSumCmdcltByThisMonth() {
    this.commandeClientService.getSumByMonth().subscribe(data => {
      this.sumCmdCltByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commandeClient dans cette année actuel
   */

  getSumCmdcltByYear() {
    this.commandeClientService.getSumByYear().subscribe(data => {
      this.sumCmdCltByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le revenue des commandeClient dans cette année passer
   */

  getSumCmdcltByLastYear() {
    this.commandeClientService.getSumByLastYear().subscribe(data => {
      this.sumCmdCltByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /************************************COMMANDE CLIENT PAR ORDER DESC TOALPRIX ***************************************/


  /**
   * Methode qui récupére les commandeClient par order desc totalprix aujourd'huit
   */
  getCmdCltByDayByOrderByTotalPrixDesc() {
    this.commandeClientService.getCmdCltByDayByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdCltByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeClient par order desc totalprix d'hier
   */
  getCmdCltByLastDayByOrderByTotalPrixDesc() {
    this.commandeClientService.getCmdCltByLastDayByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdCltByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeClient par order desc totalprix dans le mois actuel
   */
  getCmdCltByMonthByOrderByTotalPrixDesc() {
    this.commandeClientService.getCmdCltByMonthByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdCltByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeClient par order desc totalprix dans le mois president
   */
  getCmdCltByLastMonthByOrderByTotalPrixDesc() {
    this.commandeClientService.getCmdCltByLastMonthByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdCltByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeClient par order desc totalprix dans cette année actuel
   */

  getCmdCltByYearByOrderByTotalPrixDesc() {
    this.commandeClientService.getCmdCltByYearByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdCltByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére les commandeClient par order desc totalprix dans cette année passer
   */

  getCmdCltByLastYearByOrderByTotalPrixDesc() {
    this.commandeClientService.getCmdCltByLastYearByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdCltByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /******************************* COMMANDES FOURNISSEURS PAR ORDER DESC TOTLPRIX *****************************************************/

  /**
   * Methode qui récupére les commandeFournisseur par order desc totalprix aujourd'huit
   */
  getCmdFrsByDayByOrderByTotalPrixDesc() {
    this.commandeFournisseurService.getCmdFrsByDayByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdFrsByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeFournisseur par order desc totalprix d'hier
   */
  getCmdFrsByLastDayByOrderByTotalPrixDesc() {
    this.commandeFournisseurService.getCmdFrsByLastDayByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdFrsByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeFournisseur par order desc totalprix dans le mois actuel
   */
  getCmdFrsByMonthByOrderByTotalPrixDesc() {
    this.commandeFournisseurService.getCmdFrsByMonthByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdFrsByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeFournisseur par order desc totalprix dans le mois president
   */
  getCmdFrsByLastMonthByOrderByTotalPrixDesc() {
    this.commandeFournisseurService.getCmdFrsByLastMonthByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdFrsByLastMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére les commandeFournisseur par order desc totalprix dans cette année actuel
   */

  getCmdFrsByYearByOrderByTotalPrixDesc() {
    this.commandeFournisseurService.getCmdFrsByYearByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdFrsByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére les commandeFournisseur par order desc totalprix dans cette année passer
   */

  getCmdFrsByLastYearByOrderByTotalPrixDesc() {
    this.commandeFournisseurService.getCmdFrsByLastYearByOrderByTotalPrixDesc().subscribe(data => {
      this.orderCmdFrsByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**********************************************************Top articles *****************************************************************/


  /**
   * Methode qui récupére top articles  to day
   */
  getTopArticlesByCommandesToDay() {
    this.commandeClientService.getTopArticlesByCommandesToDay().subscribe(data => {
      this.toparticleToDays = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére top articles  to month
   */

  getTopArticlesByCommandesToMonth() {
    this.commandeClientService.getTopArticlesByCommandesToMonth().subscribe(data => {
      this.toparticleToMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


  /**
   * Methode qui récupére top articles  to year
   */

  getTopArticlesByCommandesToYear() {
    this.commandeClientService.getTopArticlesByCommandesToYear().subscribe(data => {
      this.toparticleToYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

}
