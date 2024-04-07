import { Injectable } from '@angular/core';
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
@Injectable({
  providedIn: 'root'
})
export class GenererPdfService {

  constructor() { }

generatedPDF(id:string){
   const elmentToPrint:any = document.getElementById(id) ;


   html2canvas(elmentToPrint, {scale:2}).then((canvas)=>{
     const  pdf = new jsPDF();
     pdf.addImage(canvas.toDataURL('/img/img'),'PNG,JPG', 0,0,211,298);
     pdf.setProperties({
       title: 'Commande ',
       subject:'PDF from html with Angular',
       author: 'Abdelouafi'
     });
     pdf.setFontSize(12);
     pdf.text("Nunito", 14,22);
     pdf.save('Command.pdf');

   });
}

}
