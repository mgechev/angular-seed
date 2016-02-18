import { Component } from 'angular2/core';
import {Store} from '../../store/store';
import {AssignmentsComponent} from './assignments/assignments.component';

@Component({
  selector: 'administration-component',
  directives: [AssignmentsComponent],
  template: `
    <section>
      <section>Navigation</section>
      <section>
          <assignments-component
            [assignments]="store.getState().assignmentsState"
            [users]="store.getState().usersState"
          ></assignments-component>
      </section>

    </section>
  `
})

export class AdministrationComponent {
  constructor(private store: Store) {}
}
