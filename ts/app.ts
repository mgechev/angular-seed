/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, For} from 'angular2/angular2';

import {NamesList} from './services/NameList';

@Component({
  selector: 'sample-app',
  injectables: [NamesList]
})
@View({
  templateUrl: './templates/sample-app.html',
  directives: [For]
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

bootstrap(SampleApp);
