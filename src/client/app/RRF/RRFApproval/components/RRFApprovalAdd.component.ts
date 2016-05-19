import {Component, OnInit} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'rrf-approval-add',
    templateUrl: 'app/RRF/RRFApproval/components/RRFApprovalAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RRFApprovalAddComponent implements OnInit {
    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    onSave(): void {
    }
}
