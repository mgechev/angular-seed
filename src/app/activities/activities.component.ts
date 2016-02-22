import {Component} from 'angular2/core';
import {Store} from '../../store/store';

@Component({
  selector: 'activities',
  template: `
    <section>
      <h1>Activities</h1>
      <p>Start being active!</p>
    </section>
  `
})

export class ActivitiesComponent {
  constructor(private store: Store) {}
}
