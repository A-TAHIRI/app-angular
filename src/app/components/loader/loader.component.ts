import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from "./service/loader.service";
import {Subscription} from "rxjs";
import {state} from "@angular/animations";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements  OnInit ,OnDestroy{

  show = false;
  subscription : Subscription | undefined;
  constructor( private  loaderService : LoaderService) {
  }
  ngOnInit(): void {
    this.subscription= this.loaderService.loaderModel.subscribe(state =>{
      this.show=state.show;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
