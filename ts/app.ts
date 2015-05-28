/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

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

  constructor(list: NamesList) {
    this.names = list.get();
  }
  addName(newname) {
    this.names.push(newname.value);
    newname.value = '';
  }
}

bootstrap(SampleApp);
