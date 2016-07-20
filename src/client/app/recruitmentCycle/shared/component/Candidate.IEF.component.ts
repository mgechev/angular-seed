import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'recruiter-ief',
    templateUrl: 'Candidate.IEF.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RecruitmentIEFComponent implements OnActivate {
    returnPath: string;
    Title: string;
    InterviewerID: string;
    constructor(private _router: Router) {
    }
    //Router method overrid from OnActivate class
    routerOnActivate() {
        this.returnPath = sessionStorage.getItem('returnPath');
    }
    Back() {
        if(this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }
}
