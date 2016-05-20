import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'error-404',
  templateUrl: 'app/errorPages/500/500.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class Error500Component {
}
