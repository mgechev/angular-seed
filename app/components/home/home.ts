import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'home'
})
@View({
  template: `
    <h1>Howdy!</h1>

    <h2>
    Gratz!
    </h2>

    <p>
    Your deployment of Angular 2 Seed worked perfectly!
    Click <a [router-link]="['/about']">here</a> to get your reward!
    </p>
  `,
  directives: [RouterLink]
})
export class Home {}
