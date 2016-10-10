import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PracticeInfo } from '../models/practiceInfo';
import { PracticeService } from '../services/practice.service';

@Component({
    moduleId: module.id,
    selector: 'admin-practice-list',
    templateUrl: 'practiceList.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class PraciceListComponent implements OnInit {
    practiceList: Array<PracticeInfo>;
    errorMessage: string;
    constructor(private _practiceService: PracticeService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getPractices();
    }

    getPractices() {
        this._practiceService.getPractices()
            .subscribe(
            (results: any) => {
                this.practiceList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(practice: PracticeInfo) {
        this._practiceService.deletePractice(practice)
            .subscribe(
            results => {
                this.getPractices();
            },
            error => this.errorMessage = <any>error);
    }
}
