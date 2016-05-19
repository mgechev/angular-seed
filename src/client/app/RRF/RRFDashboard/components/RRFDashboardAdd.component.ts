import {Component, OnInit} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'rrf-dashboard-add',
    templateUrl: 'app/RRF/RRFDashboard/components/RRFDashboardAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RRFDashboardAddComponent implements OnInit {
    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    onSave(): void {
    }
}
