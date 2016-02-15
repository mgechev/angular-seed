/**
 * Created by dellfort on 16/02/16.
 */

import { Component } from 'angular2/core';
import {Store} from '../store/store';

@Component({
  selector: 'app',
  template: `
    <h1>NG2 + redux + ag-grid</h1>
    <p>{{ store.getState().uiState.message }}</p>
    `
})

export class AppComponent {
  constructor(private store: Store) {}
}
