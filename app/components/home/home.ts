import {Component, View} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home'
})
@View({
  templateUrl: './components/home/home.html?v=<%= VERSION %>',
  directives: [ROUTER_DIRECTIVES]
})
export class Home {}
