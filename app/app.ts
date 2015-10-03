import {Component, View, bind, bootstrap} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_BINDINGS,
  ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';
// import {HTTP_BINDINGS} from 'http/http';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {NameList} from './services/name_list';

@Component({
  selector: 'app',
  viewBindings: [NameList]
})
@RouteConfig([
  { path: '/', component: Home, as: 'Home' },
  { path: '/about', component: About, as: 'About' }
])
@View({
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  directives: [ROUTER_DIRECTIVES]
})
class App {}

bootstrap(App, [
  ROUTER_BINDINGS,
  bind(ROUTER_PRIMARY_COMPONENT).toValue(App)
]);
