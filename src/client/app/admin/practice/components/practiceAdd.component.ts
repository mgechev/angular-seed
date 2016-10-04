import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PracticeInfo } from '../models/practiceInfo';
import { PracticeService } from '../services/practice.service';

@Component({
    moduleId: module.id,
    selector: 'admin-practice-add',
    templateUrl: 'practiceAdd.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class PracticeAddComponent implements OnInit {
    practice: PracticeInfo;
    errorMessage: string;
    params: number;
    constructor(private _practiceService: PracticeService,
        private activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.practice = new PracticeInfo(0, '');
    }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = Number(segment.getParam('Id'));
        if (this.params) {
            this._practiceService.getPracticeById(this.params)
                .subscribe(
                (results: any) => {
                    this.practice = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._practiceService.editPractice(this.practice)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Practice']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._practiceService.addPractice(this.practice)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Practice']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
