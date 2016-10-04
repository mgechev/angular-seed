import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DesignationInfo } from '../models/designationInfo';
import { DesignationService } from '../services/designation.service';

@Component({
    moduleId: module.id,
    selector: 'admin-designation-add',
    templateUrl: 'designationAdd.component.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class DesignationAddComponent implements OnInit {
    designation: DesignationInfo;
    errorMessage: string;
    params: number;
    constructor(private _designationService: DesignationService,
        private _router: ActivatedRoute) {
        this.designation = new DesignationInfo(0, '');
    }

    ngOnInit(segment: ActivatedRoute) {
        this.params = this._router.snapshot.params['Id'];
        //this.params = Number(segment.getParam('Id'));
        if (this.params) {
            this._designationService.getDesignationById(this.params)
                .subscribe(
                (results: any) => {
                    this.designation = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._designationService.editDesignation(this.designation)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Designation']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._designationService.addDesignation(this.designation)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Designation']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
