import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'sd-navbar',
  templateUrl: 'app/shared/navbar/navbar.component.html',
  styleUrls: ['app/shared/navbar/navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {}
