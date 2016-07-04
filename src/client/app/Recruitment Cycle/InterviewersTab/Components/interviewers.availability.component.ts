import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'interviewers-availability',
    templateUrl: 'interviewers.availability.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RecruitmentInterviewAvailabilityComponent implements OnActivate {
    returnPath: string;
    Title: string;
    InterviewerID: string;
    constructor(private _router: Router) {
    }
    //Router method overrid from OnActivate class
    routerOnActivate() {
        // this.getCandidateIds();
        this.returnPath = sessionStorage.getItem('returnPath');
    }
    Back() {
        if(this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    //Get all RRF details assigned to interviewers
    getAllAssignedRRF(_interviewerId: string) {
        /** add logic to get all RRF */
    }



}// End Class