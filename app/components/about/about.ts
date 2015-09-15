import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

import {NamesList} from '../../services/NameList';

@Component({
  selector: 'about'
})
@View({
  templateUrl: './components/about/about.html',
  directives: [CORE_DIRECTIVES]
})
export class About {
  constructor(public list: NamesList) {
  }
  addName(newname) {
    this.list.add(newname.value);
    newname.value = '';
  }
}
