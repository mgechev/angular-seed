import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { InterviewRoundInfo } from '../models/interviewRoundInfo';
import { InterviewRoundService } from '../services/interviewRound.service';

@Component({
    selector: 'admin-interview-round-list',
    templateUrl: 'app/admin/interviewRound/components/interviewRoundList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class InterviewRoundListComponent implements OnInit {
    interviewRoundList: Array<InterviewRoundInfo>;
    errorMessage: string;
    constructor(private _interviewRoundService: InterviewRoundService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getInterviewRound();
    }

    getInterviewRound() {
        this._interviewRoundService.getInterviewRound()
            .subscribe(
            results=> {
                this.interviewRoundList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(interviewRound : InterviewRoundInfo) {
        this._interviewRoundService.deleteInterviewRound(interviewRound)
            .subscribe(
            results=> {
                this.getInterviewRound();
            },
            error => this.errorMessage = <any>error);
    }
}
