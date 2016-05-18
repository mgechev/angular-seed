import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { DesignationInfo } from '../models/designationInfo';
import { DesignationService } from '../services/designation.service';

@Component({
    selector: 'admin-designation-list',
    templateUrl: 'app/admin/designation/components/designationList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class DesignationListComponent implements OnInit {
    designationList: Array<DesignationInfo>;
    errorMessage: string;
    constructor(private _designationService: DesignationService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getDesignations();
    }

    getDesignations() {
        this._designationService.getDesignations()
            .subscribe(
            results=> {
                this.designationList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(designation: DesignationInfo) {
        this._designationService.deleteDesignation(designation)
            .subscribe(
            results=> {
                this.getDesignations();
            },
            error => this.errorMessage = <any>error);
    }
}
