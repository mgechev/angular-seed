import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from 'angular2/router';
// import {HTTP_BINDINGS} from 'http/http';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {NameList} from './services/name_list';

@Component({
  selector: 'app',
  viewBindings: [NameList]
})
@RouteConfig([
  { as: 'home', component: Home, path: '/' },
  { as: 'about', component: About, path: '/about' }
])
@View({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['./app.css'],
  templateUrl: './app.html'
})
class App {}

bootstrap(App, [ROUTER_BINDINGS]);
