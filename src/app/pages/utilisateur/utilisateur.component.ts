import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {NotificationService} from "../../services/notification/notification.service";
import {Page} from "../../models/page";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../models/api-response";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DataService} from "../../services/dataService/data.service";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  liste !: Utilisateur[];
  errorMsg = '';
  imgUrl: string | ArrayBuffer = 'assets/image/user.png';
  messageSucces = '';
  pages: any;
// pagination

  private pagesSubject = new BehaviorSubject<any>(null);
  page$ = this.pagesSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  pageActuel: number;
  receivedData: any;

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    private notificationService: NotificationService,
    private dataService: DataService,
  ) {
    this.dataService.data$.subscribe(data => {
      if (data) {
        this.receivedData=data;
        this.goToPage(data);
      }

    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  ngOnInit(): void {
    this.tousUtilisateurs();
    this.users();


  }


  /**
   * naviger vers la page nouvelUtilisateur
   */
  nouvelUtilisateur(): void {
    this.router.navigate(['dashboard/nouvelutilisateur']);
  }

  /**
   * récupirer tous les utilisateurs
   */
  tousUtilisateurs() {
    this.utilisateurService.getAll().subscribe((data) => {
      // @ts-ignore
      this.liste = data.sort((a, b) => b.id - a.id);
    }, (error) => {
      this.notificationService.showErrors(error.error.errors);

    })
  }

  handleSuppression(event: any) {
    if (event === 'success') {
      this.notificationService.success('La suppression a été effectuée avec succès!');
      this.reload();
      this.tousUtilisateurs();
    } else {
      this.notificationService.error(event);
    }
  }

  reload() {
    window.location.reload();
  }


  users() {
    this.utilisateurService.getUsers().subscribe(data => {
      this.pages = data;
      this.pageActuel = this.pages.number;
    }, error => {
      this.notificationService.error(error.error.message);
    })
  }


  goToPage(name?: string, pageNumber: number = 0): void {
    this.utilisateurService.getUsers(name, pageNumber).subscribe(data => {
      this.pages = data;
      this.pageActuel = pageNumber;
    }, error => {
      this.notificationService.error(error.error.message);
    })

  }


}
