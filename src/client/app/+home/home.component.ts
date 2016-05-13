import { FORM_DIRECTIVES, COMMON_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

// import { NameListService } from '../shared/index';

@Component({
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [COMMON_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeComponent {
  newName: string;
  constructor(/*public nameListService: NameListService*/) {}

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }
}
