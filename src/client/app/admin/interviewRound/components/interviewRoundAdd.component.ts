import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { InterviewRoundInfo } from '../models/interviewRoundInfo';
import { InterviewRoundService } from '../services/interviewRound.service';

@Component({
    moduleId: module.id,
    selector: 'admin-interview-round-add',
    templateUrl: 'interviewRoundAdd.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class InterviewRoundAddComponent implements OnInit {
    interviewRound: InterviewRoundInfo;
    errorMessage: string;
    params: number;
    constructor(private _interviewRoundService: InterviewRoundService,
        private activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.interviewRound = new InterviewRoundInfo(0, '');
    }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = Number(segment.getParam('Id'));
        if (this.params) {
            this._interviewRoundService.getInterviewRoundById(this.params)
                .subscribe(
                (results: any) => {
                    this.interviewRound = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._interviewRoundService.editInterviewRound(this.interviewRound)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/InterviewRounds']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._interviewRoundService.addInterviewRound(this.interviewRound)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/InterviewRounds']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
