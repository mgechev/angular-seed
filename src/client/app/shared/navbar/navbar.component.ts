import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {

  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  public myFunction() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
  }
}
