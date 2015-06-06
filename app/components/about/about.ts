import {Component, View, NgFor} from 'angular2/angular2';

import {NamesList} from '../../services/NameList';

@Component({
  selector: 'component-2',
  appInjector: [NamesList]
})
@View({
  templateUrl: './components/about/about.html?v=<%= VERSION %>',
  directives: [NgFor]
})
export class About {
  names: Array<string>;
  list: NamesList;

  constructor(list: NamesList) {
    this.list = list;
    this.names = list.get();
  }
  addName(newname) {
    this.list.add(newname.value);
    newname.value = '';
  }
}