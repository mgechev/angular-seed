import {Component} from '../../../../node_modules/angular2/core.d';
import {Store} from '../../../store/store';

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
