import {Component, View} from 'angular2/angular2';

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
    Click on <em>about</em> to get your reward!
    </p>
  `,
})
export class Home {}
