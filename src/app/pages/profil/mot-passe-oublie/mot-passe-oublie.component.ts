import {Component, OnInit} from '@angular/core';
import {SendEmailService} from "../../../services/sendEmail/send-email.service";
import {Email} from "../../../models/email";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mot-passe-oublie',
  templateUrl: './mot-passe-oublie.component.html',
  styleUrls: ['./mot-passe-oublie.component.css']
})
export class MotPasseOublieComponent implements OnInit{

  userEmail: any ;
   errorMsg= '';
constructor(
  private sendEmailService : SendEmailService,
  private router : Router
) {
}


  ngOnInit(): void {

  }

  /**
   * envoyer email
   */
  send(){

    const email: Email = {
     "to":this.userEmail,
      "subject":"Renitialiser mot de passe",
       "cc":[],
      "MultipartFile":[],

    }

    this.sendEmailService.sendEmail(email).subscribe(data=>{
      this.router.navigate(['/']);
    },error => {
      this.errorMsg=error.error.error
    });



  }

}
