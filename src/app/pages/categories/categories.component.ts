import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategorieService} from "../../services/categorie/categorie.service";
import {CategorieDto} from "../../dto/categorie-dto";
import {Categorie} from "../../models/categirie";
import {NotificationService} from "../../services/notification/notification.service";
import {DataService} from "../../services/dataService/data.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  liste !: CategorieDto[];
  cat: Categorie = {};
  errorsMsg: Array<string> = [];
  selectedCatIdToDelete? = -1;
  basImgUrl: string = 'assets/image/category.jpg';
  imgUrl: string = 'http://localhost:8082/file/image/'
  messageSucces = '';
  pageActuel: number;
  receivedData: any;
  allpages: any;

  constructor(
    private router: Router,
    private categorieService: CategorieService,
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
    this.getAll();
    this.allCategories();

  }


  /**
   * ajouter une categorie à bdd
   */
  nouvelleCategory(): void {
    this.router.navigate(['dashboard/nouvellecategorie']);
  }

  /**
   * récupére toutes les categories
   */
  getAll() {
    this.categorieService.getToutesCategories().subscribe((data) => {
        this.liste = data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }, error => {
        this.notificationService.showErrors(error.error.errors)
        this.router.navigate(['dashboard'])
      }
    )
  }

  /**
   * Route pour recupiré la categourie et la modifier
   * @param id
   */
  modifierCategoie(id: number | undefined): void {
    this.router.navigate(['dashboard/nouvellecategorie', id])

  }

  /**
   * selectioner la categorie à supprimer
   * @param id
   */
  selectCatPourSupprimer(id?: number) {

    this.selectedCatIdToDelete = id;
  }

  /**
   * anuler la supprission
   */
  annulerSuppressionCat() {
    this.selectedCatIdToDelete = -1;
  }

  /**
   * confirmer la suppristion d'une categorie
   */
  confirmerEtSupprimerCat() {

    if (this.selectedCatIdToDelete !== -1) {
      this.categorieService.supprimerCategorie(this.selectedCatIdToDelete).subscribe(res => {
          this.notificationService.success('La suppression a été effectuée avec succès!')
          this.reload();
          this.getAll();
        },
        error => {
          this.notificationService.error(error.error.message)
          this.router.navigate(['dashboard/categories'])
        });
    }
  }
  reload() {
    window.location.reload();
  }
  allCategories(){
    this.categorieService.getAllCategories().subscribe(data => {
      this.allpages = data;
      this.pageActuel = this.allpages.number;
    }, error => {
      this.notificationService.error(error.error.message);
    })
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.categorieService.getAllCategories(name, pageNumber).subscribe(data => {
      this.allpages = data;
      this.pageActuel = pageNumber;
    }, error => {
      this.notificationService.error(error.error.message);
    })

  }


}
