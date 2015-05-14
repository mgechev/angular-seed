import {
  ComponentAnnotation as Component,
  ViewAnnotation as View,
  bootstrap,
  For
} from 'angular2/angular2';

import {NameList} from 'services/NameList';

@Component({
  selector: 'sample-app',
  injectables: [NameList]
})
@View({
  templateUrl: './templates/sample-app.html',
  directives: [For]
})
class SampleApp {
  constructor() {
//    this.names = list.get();
//    this.newName = '';
  }
  addName(newname) {
//    this.names.push(newname.value);
//    newname.value = '';
  }
}

bootstrap(SampleApp);
