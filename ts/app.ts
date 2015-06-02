/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Component1} from './components/component1';
import {Component2} from './components/component2';

@Component({
  selector: 'sample-app'
})
@RouteConfig([
  { path: '/', component: Component1, as: 'component1' },
  { path: '/component2', component: Component2, as: 'component2' }
])
@View({
  templateUrl: './templates/sample-app.html',
  directives: [RouterOutlet, RouterLink]
})
class SampleApp {}

bootstrap(SampleApp, [routerInjectables]);
