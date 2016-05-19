import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { DesignationInfo } from '../models/designationInfo';
import { DesignationService } from '../services/designation.service';

@Component({
    moduleId: module.id,
    selector: 'admin-designation-add',
    templateUrl: 'designationAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class DesignationAddComponent implements OnActivate {
    designation: DesignationInfo;
    errorMessage: string;
    params: string;
    constructor(private _designationService: DesignationService,
        private _router: Router) {
        this.designation = new DesignationInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._designationService.getDesignationById(this.params)
                .subscribe(
                results=> {
                    this.designation = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._designationService.editDesignation(this.designation)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Designation']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._designationService.addDesignation(this.designation)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Designation']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
