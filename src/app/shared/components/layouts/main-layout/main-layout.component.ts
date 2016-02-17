import {Component} from 'angular2/core';
import {Store} from '../../../../../store/store';

@Component({
    selector: 'main-layout',
    template: `
    <h1>NG2 + redux + ag-grid</h1>
    <p>{{ store.getState().uiState.message }} - initialized {{store.getState().uiState.initialized}}</p>
    `
})
export class MainLayout {
    constructor(private store:Store) {
    }
}
