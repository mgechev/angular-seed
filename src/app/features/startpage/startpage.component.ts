import {Component} from 'angular2/core';
import {Store} from '../../store/store';

@Component({
  selector: 'startpage',
  template: `
    <section>
      <h1>Startpage</h1>
      <p>Hello..</p>
    </section>
  `
})

export class StartpageComponent {
  constructor(private store:Store) {
  }
}
