/**
 * Created by dellfort on 16/02/16.
 */

import { Component } from 'angular2/core';
import {Store} from '../store/store';
import { AdministrationComponent } from './administration/administration.component';

@Component({
  selector: 'app',
  directives: [AdministrationComponent],
  template: `
    <h1>NG2 + redux + ag-grid</h1>
    <p>{{ store.getState().uiState.message }}</p>
    <administration-component></administration-component>
  `
})

export class AppComponent {
  constructor(private store: Store) {}
}
