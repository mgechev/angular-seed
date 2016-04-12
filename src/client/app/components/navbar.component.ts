import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'sd-navbar',
  templateUrl: './app/components/navbar.component.html',
  styleUrls: ['./app/components/navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {}
