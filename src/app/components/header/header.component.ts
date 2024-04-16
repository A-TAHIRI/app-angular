import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {UtilisateurDto} from "../../dto/utilisateur-dto";
import {Router} from "@angular/router";
import {DataService} from "../../services/dataService/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit{
  connectedUser: UtilisateurDto = {};
  imgUrl : string | ArrayBuffer ='assets/image/user.png';
  name:any;
  constructor( private elementRef: ElementRef ,
               private  renderer : Renderer2,
               private  utilisateurService: UtilisateurService,
               private  router: Router,
               private dataService: DataService
               ) {}
  toggleSidebar() {
    this.elementRef.nativeElement.ownerDocument.body.classList.toggle('toggle-sidebar')
  }
  private initSearchBarToggle(): void {
    const searchBarToggle = this.elementRef.nativeElement.querySelector('.search-bar-toggle');
    if (searchBarToggle) {
      this.renderer.listen(searchBarToggle, 'click', (event) => {
        const searchBar = this.elementRef.nativeElement.querySelector('.search-bar');
        searchBar.classList.toggle('search-bar-show');
      });
    }
  }

  ngOnInit(): void {
    this.initSearchBarToggle();
    this.connectedUser = this.utilisateurService.getConnectedUser()
    if (this.connectedUser.photo !== null){
      this.imgUrl= 'http://localhost:8082/file/image/'+this.connectedUser.photo;
    }else{
      this.imgUrl= 'assets/image/user.png';
    }
  }
  deconexion(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('connectedUser')
  }

  sendData() {
   return  this.dataService.setData(this.name);
  }
}
