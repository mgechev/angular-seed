import {Component} from 'angular2/angular2';

@Component({
  selector: 'contributors',
  templateUrl: './components/contributors/contributors.html'
})
export class ContributorsComp {
  sayHi() {
    alert('jai ganesh');
  }
}
