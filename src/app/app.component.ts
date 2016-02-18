/**
 * Created by dellfort on 16/02/16.
 */

import { Component } from 'angular2/core';
//import {MainLayout} from './shared/components/layouts/main-layout/main-layout.component';
import {InitializeService} from './shared/services/initialize.service';
import {AdministrationComponent} from './administration/administration.component';
import {Store} from '../store/store';

@Component({
    selector: 'app',
    template: `<h1>NG2 + redux + ag-grid</h1>
               <p>{{ store.getState().uiState.message }} - initialized {{store.getState().uiState.initialized}}</p>
               <administration-component></administration-component>
               `,
    directives: [AdministrationComponent],
    providers: [InitializeService]
})
export class AppComponent {
    constructor(initializeService:InitializeService, private store: Store) {
        initializeService.initialize();
    }
}
