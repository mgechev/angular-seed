import {
  ComponentAnnotation as Component,
  ViewAnnotation as View,
  bootstrap,
  For
} from 'angular2/angular2';

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
  constructor(list:NamesList) {
    this.names = list.get();
    this.newName = '';
  }
  addName(newname) {
    this.names.push(newname.value);
    newname.value = '';
  }
}

bootstrap(SampleApp);
