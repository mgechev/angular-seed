import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'profiles-assignrrf',
    templateUrl: 'assignRRF.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class ProfileBankAssignRRFComponent implements OnActivate {
    CandidateIDs: Array<string> = new Array<string>();
    returnPath: string;
    Title: string;
    isRRFSelected: boolean = false;

    constructor(private _router: Router) { }

    routerOnActivate() {
        this.getCandidateIds();
        this.returnPath = sessionStorage.getItem('returnPath');
        if (this.returnPath.includes('MyProfiles')) {
            this.Title = 'My Profiles';
        } else {
            this.Title = 'Company Profiles';
        }
    }
    getCandidateIds() {
        var CandidateIDs = sessionStorage.getItem('CandidateIDs');
        CandidateIDs = CandidateIDs.split(',');
        for (var index = 0; index < CandidateIDs.length; index++) {
            this.CandidateIDs[index] = CandidateIDs[index];
        }
        sessionStorage.removeItem('CandidateIDs');
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    onSelectRRF() {
        this.isRRFSelected = true;
    }
}
