/**
 * Created by dellfort on 16/02/16.
 */

import { Component } from 'angular2/core';
import {MainLayout} from './shared/components/layouts/main-layout/main-layout.component';
import {InitializeService} from './shared/services/initialize.service';

@Component({
    selector: 'app',
    template: `<main-layout></main-layout>`,
    directives: [MainLayout],
    providers: [InitializeService]
})
export class AppComponent {
    constructor(initializeService:InitializeService) {
        initializeService.initialize();
    }
}
