import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";





@Injectable({
  providedIn: 'root'
})
export class NotificationService {



  constructor(private tostar:ToastrService) { }

  success(msg:string){
   return this.tostar.success(msg,'',{
     timeOut:3000,
     progressBar:true,
     closeButton:true,
     positionClass: 'toast-bottom-right'


   })
  }
   info(msg:string){
   return  this.tostar.info(msg ,'',{
     timeOut: 3000, // Durée d'affichage de la notification (en millisecondes)
     progressBar: true, // Afficher une barre de progression
     closeButton: true, // Afficher un bouton de fermeture})
       positionClass: 'toast-top-right'
   }
   )}
   error(msg:string){
   return  this.tostar.error(msg,'',{
     timeOut:3000,
     progressBar:true,
     closeButton:true,
     positionClass: 'toast-top-right'
   })
   }

   warning(msg:string){
   return  this.tostar.warning(msg,'',{
     timeOut:3000,
     progressBar:true,
     closeButton:true,
     positionClass: 'toast-top-right'
   })
   }


}
