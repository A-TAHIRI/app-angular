import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private toastr: ToastrService) {
  }

  success(msg: string) {
    return this.toastr.success(msg, '', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true


    })
  }

  info(msg: string) {
    return this.toastr.info(msg, '', {
        timeOut: 3000, // Durée d'affichage de la notification (en millisecondes)
        progressBar: true, // Afficher une barre de progression
        closeButton: true, // Afficher un bouton de fermeture})
        positionClass: 'toast-bottom-right',
        enableHtml: true
      }
    )
  }

  error(msg: string) {
    return this.toastr.error(msg, '', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true
    })
  }

  warning(msg: string) {
    return this.toastr.warning(msg, '', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true
    })
  }

  showErrors(errors: string[]) {
    let errorMessage = 'Les erreurs suivantes sont survenues :<br>';
    errors.forEach(error => {
      errorMessage += `
               <ul>
               <li>${error}</li>
               </ul>
                    `;
    });

    this.toastr.error(errorMessage, 'Erreurs', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true,// Permet l'utilisation de balises HTML dans le message

    });
  }


}
