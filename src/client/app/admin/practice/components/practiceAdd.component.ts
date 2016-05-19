import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { PracticeInfo } from '../models/practiceInfo';
import { PracticeService } from '../services/practice.service';

@Component({
    selector: 'admin-practice-add',
    templateUrl: 'app/admin/practice/components/practiceAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class PracticeAddComponent implements OnActivate {
    practice: PracticeInfo;
    errorMessage: string;
    params: number;
    constructor(private _practiceService: PracticeService,
        private _router: Router) {
        this.practice = new PracticeInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = Number(segment.getParam('id'));
        if (this.params) {
            this._practiceService.getPracticeById(this.params)
                .subscribe(
                results=> {
                    this.practice = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._practiceService.editPractice(this.practice)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Practice']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._practiceService.addPractice(this.practice)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Practice']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
