import {Component, View, NgFor} from 'angular2/angular2';

import {NamesList} from '../services/NameList';

@Component({
  selector: 'component-2',
  appInjector: [NamesList]
})
@View({
  templateUrl: './templates/component2.html',
  directives: [NgFor]
})
export class Component2 {
  names: Array<string>;

  constructor(list: NamesList) {
    this.names = list.get();
  }
  addName(newname) {
    this.names.push(newname.value);
    newname.value = '';
  }
}