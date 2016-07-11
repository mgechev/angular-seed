import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
    directives: [ROUTER_DIRECTIVES],
})

export class DashboardComponent {
}
