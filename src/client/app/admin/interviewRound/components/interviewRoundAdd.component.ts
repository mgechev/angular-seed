import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { InterviewRoundInfo } from '../models/interviewRoundInfo';
import { InterviewRoundService } from '../services/interviewRound.service';

@Component({
    moduleId: module.id,
    selector: 'admin-interview-round-add',
    templateUrl: 'interviewRoundAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class InterviewRoundAddComponent implements OnActivate {
    interviewRound: InterviewRoundInfo;
    errorMessage: string;
    params: number;
    constructor(private _interviewRoundService: InterviewRoundService,
        private _router: Router) {
        this.interviewRound = new InterviewRoundInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = Number(segment.getParam('id'));
        if (this.params) {
            this._interviewRoundService.getInterviewRoundById(this.params)
                .subscribe(
                results=> {
                    this.interviewRound = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._interviewRoundService.editInterviewRound(this.interviewRound)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/InterviewRounds']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._interviewRoundService.addInterviewRound(this.interviewRound)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/InterviewRounds']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
