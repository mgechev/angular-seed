import {Component, Template, bootstrap, Foreach} from 'angular2/angular2';
import {NameList} from 'services/NameList';

@Component({
  selector: 'sample-app',
  componentServices: [
    NameList
  ]
})
@Template({
  url: './templates/sample-app.html',
  directives: [Foreach]
})
class SampleApp {
  constructor() {
    this.names = NameList.get();
    this.newName = '';
  }
  addName(newname) {
    this.names.push(newname.value);
    newname.value = '';
  }
}

export default () => {
  bootstrap(SampleApp);
};
