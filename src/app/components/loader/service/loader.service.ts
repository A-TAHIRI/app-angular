import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {LoaderModel} from "../loader.model";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 private  loaderSubject = new Subject<LoaderModel>();

 loaderModel =this.loaderSubject.asObservable();
  constructor() { }

  show(){
    this.loaderSubject.next({show:true});
  }

  hiede(){
    this.loaderSubject.next({show:false});
  }
}
