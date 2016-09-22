import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'universal-navbar',
  templateUrl: 'universal-navbar.component.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['file name of CSS']
})

export class NavBarComponent {

}
