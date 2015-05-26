/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {RouteConfig, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

import {NamesList} from './services/NameList';

@Component({
  selector: 'sample-app',
  appInjector: [NamesList]
})
@View({
  templateUrl: './templates/sample-app.html',
  directives: [NgFor]
})
class SampleApp {
  names: Array<string>;
  newName: string;

  constructor(list: NamesList) {
    this.names = list.get();
    this.newName = '';
  }
  addName(newname) {
    this.names.push(newname.value);
    newname.value = '';
  }
}


@Component({
  selector: 'app'
})
@RouteConfig([
  { path: '/', component: SampleApp, as: 'app' }
])
@View({
  template: '<router-outlet></router-outlet>',
  directives: [RouterOutlet]
})
class App {}

bootstrap(App, [routerInjectables]);
