import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  readonly baseUrl = 'http://localhost:8082';
  constructor( private  http:HttpClient ) { }

  /**
   * method for uploading fils
   * @param file
   */
  uploadFile(file: File) {
    const url =  this.baseUrl+`/file/upload`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(url, formData);
  }


}
