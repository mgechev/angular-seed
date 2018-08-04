import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cotw-home',
  template: '<cotw-find-map></cotw-find-map>',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor() {}
  newName = '';
  errorMessage: string;
  names: any[] = [];

  ngOnInit() {

  }

}
