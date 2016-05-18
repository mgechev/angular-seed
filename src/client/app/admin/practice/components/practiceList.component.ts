import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { PracticeInfo } from '../models/practiceInfo';
import { PracticeService } from '../services/practice.service';

@Component({
    selector: 'admin-practice-list',
    templateUrl: 'app/admin/practice/components/practiceList.component.html',
    directives: [ROUTER_DIRECTIVES]
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
            results=> {
                this.practiceList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(practice: PracticeInfo) {
        this._practiceService.deletePractice(practice)
            .subscribe(
            results=> {
                this.getPractices();
            },
            error => this.errorMessage = <any>error);
    }
}
