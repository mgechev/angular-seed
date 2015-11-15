import {Component} from 'angular2/angular2';
import {
ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [ROUTER_DIRECTIVES]

})
export class HomeCmp { }
