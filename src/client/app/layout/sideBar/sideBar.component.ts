import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {IfAuthorizeDirective} from '../../shared/directives/ifAuthorize.directive';

@Component({
  selector: 'sidebar',
  templateUrl: 'app/layout/sideBar/sideBar.component.html',
  directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective]
})
export class SideBarComponent {
}
