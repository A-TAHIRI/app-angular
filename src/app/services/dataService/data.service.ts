import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  constructor() { }


  setData(data: any) {
    this.dataSubject.next(data);
  }
}
