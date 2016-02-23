import {Component} from 'angular2/core';
import {Store} from '../../../store/store';

@Component({
  selector: 'manage',
  template: `
    <section>
      <h1>Manage</h1>
      <p>Start managing!</p>
    </section>
  `
})

export class ManageComponent {
  constructor(private store:Store) {
  }
}
