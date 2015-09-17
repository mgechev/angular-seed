import {Component, View} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home'
})
@View({
<<<<<<< HEAD
  templateUrl: './components/home/home.html'
=======
  templateUrl: './components/home/home.html?v=<%= VERSION %>',
  directives: [ROUTER_DIRECTIVES]
>>>>>>> d7a34007000ccd7e7c42d945f2734de1af5a905b
})
export class Home {}
