import { Component, OnInit } from '@angular/core';

export interface NumbersModel {
  num: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public numModel: NumbersModel;
  constructor() {
  }

  ngOnInit() {
    this.numModel = {
      num: ''
    }
  }

  save(val: string, isValid: boolean) {
    // call API to save customer
    console.log(val, isValid);
  }
}
