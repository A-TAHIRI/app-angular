import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {NotificationService} from "../../services/notification/notification.service";
import {FournisseurService} from "../../services/fournisseur/fournisseur.service";
import {ClientService} from "../../services/client/client.service";
import {round} from "@kurkle/color";

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
  countCltByDay:any
  countCltByLastDay:any
  countCltByYear:any
  countCltByLastYear:any
  countCltByMonth:any
  countCltByLastMonth:any
  countFrsByDay:any
  countFrsByLastDay:any
  countFrsByYear:any
  countFrsByLastYear:any
  countFrsByMonth:any
  countFrsByLastMonth:any

  constructor(
    private utilisateurService: UtilisateurService,
    private fournisseurService: FournisseurService,
    private clientService: ClientService,
    private notificationService: NotificationService
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


  }

  facteur(a: number, b: number) {
    if (a > b) {
      let def = a - b;
      const fact = (def * 100) / a;
      return  parseFloat(fact.toFixed(2));
    } else if (a < b) {
      let def = b - a;
      const fact = (def * 100) / a;
      return  parseFloat(fact.toFixed(2));
    }
    return null;
  }


  /**
   * Methode qui récupére le nombre des utilisateur aujourd'huit
   */
  getByDay() {
    this.utilisateurService.getByDay().subscribe(data => {
      this.countByDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }
  /**
   * Methode qui récupére le nombre des utilisateur d'hier
   */

  getByLastDay() {
    this.utilisateurService.getByLastDay().subscribe(data => {
      this.countByLastDay = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans le mois president
   */
  getByMonth() {
    this.utilisateurService.getByMonth().subscribe(data => {
      this.countByMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }
  /**
   * Methode qui récupére le nombre des utilisateur dans le mois actuel
   */
  getByThisMonth() {
    this.utilisateurService.getByThisMonth().subscribe(data => {
      this.countByThisMonth = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans cette année actuel
   */

  getByYear() {
    this.utilisateurService.getByYear().subscribe(data => {
      this.countByYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }

  /**
   * Methode qui récupére le nombre des utilisateur dans cette année passer
   */

  getByLastYear() {
    this.utilisateurService.getByLastYear().subscribe(data => {
      this.countByLastYear = data;

    }, error => {
      this.notificationService.error(error.error.error);
    })
  }


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


}
