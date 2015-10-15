import {Component, provide, bootstrap, ViewEncapsulation} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'http/http';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {NameList} from './services/name_list';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: Home, as: 'Home' },
  { path: '/about', component: About, as: 'About' }
])
class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {useValue:App})
]);
