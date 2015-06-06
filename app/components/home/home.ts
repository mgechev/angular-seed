import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'component-1'
})
@View({
  templateUrl: './components/home/home.html?v=<%= VERSION %>',
})
export class Home {}